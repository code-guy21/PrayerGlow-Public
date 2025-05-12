import * as THREE from 'three';
import { Asset } from 'expo-asset';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

/**
 * Asset loading configuration
 */
interface AssetLoaderConfig {
  basePath: string;
  fallbackEnabled: boolean;
  maxRetries: number;
  retryDelay: number;
  timeout: number;
}

/**
 * Default configuration for asset loading
 */
const DEFAULT_CONFIG: AssetLoaderConfig = {
  basePath: 'assets/models/',
  fallbackEnabled: true,
  maxRetries: 3,
  retryDelay: 1000,
  timeout: 10000,
};

/**
 * Cache for loaded models to prevent redundant loading
 */
const modelCache = new Map<string, THREE.Group>();

/**
 * Load a GLTF model with fallback mechanisms for reliability
 * 
 * Features:
 * - Caching to prevent redundant loading
 * - Automatic retries on failure
 * - Progress tracking
 * - Timeout handling
 * - Fallback to placeholder geometries
 * 
 * @param modelName Name of the model to load (without extension)
 * @param onProgress Optional callback for loading progress (0-1)
 * @param config Optional configuration parameters
 */
export const loadGLTFWithFallback = async (
  modelName: string,
  onProgress?: (progress: number) => void,
  config: Partial<AssetLoaderConfig> = {}
): Promise<THREE.Group> => {
  // Merge with default config
  const fullConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Check cache first
  if (modelCache.has(modelName)) {
    if (onProgress) onProgress(1);
    return modelCache.get(modelName)!.clone();
  }
  
  // Set up loading with retries
  let retries = 0;
  let lastError: Error | null = null;
  
  while (retries < fullConfig.maxRetries) {
    try {
      // Try to load the model
      const model = await loadGLTF(
        `${fullConfig.basePath}${modelName}.glb`,
        onProgress,
        fullConfig.timeout
      );
      
      // Cache the loaded model
      modelCache.set(modelName, model.clone());
      
      return model;
    } catch (error) {
      lastError = error as Error;
      retries++;
      
      console.warn(
        `Failed to load model ${modelName}, attempt ${retries}/${fullConfig.maxRetries}`,
        error
      );
      
      // Wait before retrying
      if (retries < fullConfig.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, fullConfig.retryDelay));
      }
    }
  }
  
  // All retries failed, check if fallbacks are enabled
  if (fullConfig.fallbackEnabled) {
    console.warn(
      `Using fallback for ${modelName} after ${fullConfig.maxRetries} failed attempts`
    );
    
    // Create a fallback based on the model type
    const fallbackModel = createFallbackModel(modelName);
    return fallbackModel;
  }
  
  // If fallbacks are disabled, throw the last error
  throw lastError || new Error(`Failed to load model ${modelName}`);
};

/**
 * Load a GLTF model from a URI
 * 
 * @param uri The URI of the model to load
 * @param onProgress Optional callback for loading progress
 * @param timeout Timeout in milliseconds
 */
const loadGLTF = async (
  uri: string,
  onProgress?: (progress: number) => void,
  timeout = 10000
): Promise<THREE.Group> => {
  return new Promise(async (resolve, reject) => {
    // Set up timeout
    const timeoutId = setTimeout(() => {
      reject(new Error(`Loading ${uri} timed out after ${timeout}ms`));
    }, timeout);
    
    try {
      // Load the asset through Expo's asset system
      const asset = Asset.fromURI(uri);
      await asset.downloadAsync();
      
      if (!asset.localUri) {
        throw new Error(`Failed to download asset: ${uri}`);
      }
      
      // Create GLTF loader
      const loader = new GLTFLoader();
      
      // Load the model
      loader.load(
        asset.localUri,
        (gltf) => {
          clearTimeout(timeoutId);
          resolve(gltf.scene);
          if (onProgress) onProgress(1);
        },
        (progressEvent) => {
          if (progressEvent.lengthComputable && onProgress) {
            onProgress(progressEvent.loaded / progressEvent.total);
          }
        },
        (error) => {
          clearTimeout(timeoutId);
          reject(error);
        }
      );
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
};

/**
 * Create a fallback model when loading fails
 * This ensures the app can still function even if assets fail to load
 * 
 * @param modelType Type of model to create a fallback for
 */
const createFallbackModel = (modelType: string): THREE.Group => {
  const fallbackGroup = new THREE.Group();
  
  // Create different fallbacks based on model type
  switch (modelType) {
    case 'tree':
      // Simple tree shape
      const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 8);
      const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = 1;
      
      const foliageGeometry = new THREE.SphereGeometry(1, 8, 8);
      const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage.position.y = 2.5;
      
      fallbackGroup.add(trunk);
      fallbackGroup.add(foliage);
      break;
      
    case 'flower':
      // Simple flower shape
      const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8);
      const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.y = 0.25;
      
      const flowerGeometry = new THREE.SphereGeometry(0.2, 8, 8);
      const flowerMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
      const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
      flower.position.y = 0.6;
      
      fallbackGroup.add(stem);
      fallbackGroup.add(flower);
      break;
      
    case 'path':
      // Simple path shape
      const pathGeometry = new THREE.BoxGeometry(0.5, 0.05, 4);
      const pathMaterial = new THREE.MeshStandardMaterial({ color: 0xA0522D });
      const path = new THREE.Mesh(pathGeometry, pathMaterial);
      
      fallbackGroup.add(path);
      break;
      
    default:
      // Generic fallback
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0xFF00FF });
      const mesh = new THREE.Mesh(geometry, material);
      fallbackGroup.add(mesh);
  }
  
  // Tag as fallback for debugging
  fallbackGroup.userData.isFallback = true;
  
  return fallbackGroup;
};

/**
 * Preload and cache multiple models for faster access later
 * 
 * @param modelNames Array of model names to preload
 * @param onProgress Optional callback for overall loading progress
 */
export const preloadModels = async (
  modelNames: string[],
  onProgress?: (progress: number) => void
): Promise<void> => {
  let completed = 0;
  
  // Load models concurrently with Promise.all
  await Promise.all(
    modelNames.map(async (modelName) => {
      try {
        // Don't load if already cached
        if (!modelCache.has(modelName)) {
          await loadGLTFWithFallback(
            modelName,
            (modelProgress) => {
              // Calculate overall progress
              const modelWeight = 1 / modelNames.length;
              const modelContribution = modelProgress * modelWeight;
              const overallProgress = (completed / modelNames.length) + modelContribution;
              
              if (onProgress) onProgress(overallProgress);
            }
          );
        }
      } catch (error) {
        console.warn(`Failed to preload model ${modelName}`, error);
      } finally {
        completed++;
        if (onProgress) onProgress(completed / modelNames.length);
      }
    })
  );
};