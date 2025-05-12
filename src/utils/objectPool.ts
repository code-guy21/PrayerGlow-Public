/**
 * Generic object pooling implementation for optimizing performance
 * 
 * Object pooling is a creational design pattern that uses a set of initialized objects
 * kept ready to use, rather than allocating and destroying them on demand.
 * This is particularly beneficial for 3D scenes where object creation is expensive.
 * 
 * Key benefits:
 * - Reduces garbage collection overhead
 * - Improves performance during high-activity periods
 * - Minimizes memory fragmentation
 * 
 * @template T The type of objects stored in the pool
 */
export class ObjectPool<T> {
  private pool: T[] = [];
  private createFn: () => T;
  private resetFn: (item: T) => void;
  private maxSize: number;
  
  /**
   * Creates a new object pool
   * 
   * @param createFn Factory function to create new objects
   * @param resetFn Function to reset objects before reuse
   * @param initialSize Optional number of objects to pre-populate the pool with
   * @param maxSize Optional maximum size of the pool (defaults to unlimited)
   */
  constructor(
    createFn: () => T,
    resetFn: (item: T) => void,
    initialSize = 0,
    maxSize = Number.MAX_SAFE_INTEGER
  ) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.maxSize = maxSize;
    
    // Pre-populate pool with initial objects
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn());
    }
  }
  
  /**
   * Get an object from the pool, or create a new one if the pool is empty
   * 
   * @returns An object of type T
   */
  get(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    return this.createFn();
  }
  
  /**
   * Release an object back to the pool
   * 
   * @param item The item to return to the pool
   */
  release(item: T): void {
    this.resetFn(item);
    
    // Only add to pool if below max size
    if (this.pool.length < this.maxSize) {
      this.pool.push(item);
    }
    // Otherwise the object will be left for garbage collection
  }
  
  /**
   * Prewarm the pool by creating additional objects
   * 
   * @param count Number of objects to create
   */
  prewarm(count: number): void {
    const createCount = Math.min(count, this.maxSize - this.pool.length);
    for (let i = 0; i < createCount; i++) {
      this.pool.push(this.createFn());
    }
  }
  
  /**
   * Clear all objects from the pool
   */
  clear(): void {
    this.pool = [];
  }
  
  /**
   * Get the current size of the pool
   */
  get size(): number {
    return this.pool.length;
  }
}

/**
 * A specialized object pool for Three.js meshes
 * Implements common reset operations specific to Three.js objects
 */
export class ThreeMeshPool<T extends THREE.Mesh> extends ObjectPool<T> {
  constructor(
    createFn: () => T,
    initialSize = 0,
    maxSize = Number.MAX_SAFE_INTEGER
  ) {
    // Define a reset function specifically for Three.js meshes
    const resetMesh = (mesh: T) => {
      // Reset transforms
      mesh.position.set(0, 0, 0);
      mesh.rotation.set(0, 0, 0);
      mesh.scale.set(1, 1, 1);
      
      // Reset visibility
      mesh.visible = true;
      
      // Reset user data
      mesh.userData = {};
      
      // Additional mesh-specific resets could be added here
    };
    
    super(createFn, resetMesh, initialSize, maxSize);
  }
}