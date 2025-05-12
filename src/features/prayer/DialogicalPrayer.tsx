import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

/**
 * DialogicalPrayer Component
 *
 * Facilitates a guided conversation-style prayer experience based on
 * scripture readings. Includes reflection prompts and journaling
 * to deepen the spiritual connection.
 */
const DialogicalPrayer: React.FC = () => {
  // States to track the prayer phase and user reflections
  const [currentPhase, setCurrentPhase] = useState(0);
  const [scriptureReflection, setScriptureReflection] = useState('');
  
  // The dialogical prayer follows a structured conversation approach
  const prayerPhases = [
    {
      title: "Preparation",
      instruction: "Begin by quieting your heart and mind, acknowledging God's presence with you.",
      prompt: "Take a few deep breaths and become aware of God's loving gaze upon you."
    },
    {
      title: "Scripture Encounter",
      instruction: "Read the scripture passage slowly, allowing the words to resonate.",
      prompt: "\"Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.\" - Matthew 11:28-29",
      scriptureRef: "Matthew 11:28-29"
    },
    {
      title: "Reflection",
      instruction: "Consider what word or phrase stands out to you in the passage.",
      prompt: "What is resonating in your heart? What might God be highlighting for you personally?"
    },
    {
      title: "Conversation",
      instruction: "Speak to God about what has emerged in your reflection.",
      prompt: "Share your thoughts, feelings, questions, or concerns with God as you would with a trusted friend."
    },
    {
      title: "Listening",
      instruction: "Quiet your mind and listen for God's response.",
      prompt: "Be attentive to thoughts, feelings, memories, or insights that arise. How might God be speaking to you?"
    },
    {
      title: "Response",
      instruction: "Consider how you will carry this conversation into your day.",
      prompt: "Is there an invitation or action emerging from this time of prayer?"
    },
    {
      title: "Conclusion",
      instruction: "Thank God for this time of conversation.",
      prompt: "Close with a prayer of gratitude for this sacred time of dialogue."
    }
  ];
  
  // Handle moving to the next phase
  const advanceToNextPhase = () => {
    // Processes completion of the current phase:
    // - Saves the user's reflections
    // - Updates the Prayer Garden
    // - Tracks prayer journey progress
    
    // Move to next phase if not at the end
    if (currentPhase < prayerPhases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    }
  };
  
  // Get the current phase data
  const currentPhaseData = prayerPhases[currentPhase];
  
  // Calculate progress
  const progress = Math.round(((currentPhase + 1) / prayerPhases.length) * 100);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dialogical Prayer</Text>
      
      {/* Scripture Reference */}
      {currentPhaseData.scriptureRef && (
        <Text style={styles.scriptureRef}>{currentPhaseData.scriptureRef}</Text>
      )}
      
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
        <Text style={styles.progressText}>{progress}% Complete</Text>
      </View>
      
      {/* Current Phase */}
      <View style={styles.phaseContainer}>
        <Text style={styles.phaseTitle}>{currentPhaseData.title}</Text>
        <Text style={styles.phaseInstruction}>{currentPhaseData.instruction}</Text>
        
        {/* Prompt Area */}
        <View style={styles.promptContainer}>
          <Text style={styles.promptContent}>{currentPhaseData.prompt}</Text>
        </View>
      </View>
      
      {/* Reflection Journal Area */}
      <View style={styles.reflectionContainer}>
        <Text style={styles.reflectionTitle}>Your Reflection</Text>
        <View style={styles.reflectionInputPlaceholder}>
          <Text style={styles.reflectionPlaceholderText}>
            [Journal area for recording your thoughts and prayers]
          </Text>
        </View>
      </View>
      
      {/* Spiritual Growth Note */}
      <View style={styles.growthContainer}>
        <Text style={styles.growthTitle}>Spiritual Accompaniment</Text>
        <Text style={styles.growthContent}>
          This dialogical prayer guides you through a conversation with God, helping deepen your relationship through scripture-based reflection.
        </Text>
      </View>
      
      {/* Garden Impact Visualization */}
      <View style={styles.gardenImpactContainer}>
        <Text style={styles.gardenImpactTitle}>Garden Impact</Text>
        <Text style={styles.gardenImpactContent}>
          This prayer time nurtures specific elements in your Prayer Garden, representing your growing relationship with God.
        </Text>
      </View>
      
      {/* Navigation Hint */}
      <Text style={styles.navigationHint}>
        Take your time with each phase. Tap to continue when you're ready.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#3c4043',
  },
  scriptureRef: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    fontStyle: 'italic',
    color: '#5f6368',
  },
  progressContainer: {
    height: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7986cb',
    borderRadius: 12,
  },
  progressText: {
    position: 'absolute',
    top: 2,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  phaseContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  phaseTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#3c4043',
  },
  phaseInstruction: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#5f6368',
  },
  promptContainer: {
    backgroundColor: '#e8eaf6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  promptContent: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    color: '#3c4043',
  },
  reflectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  reflectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#3c4043',
  },
  reflectionInputPlaceholder: {
    height: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  reflectionPlaceholderText: {
    color: '#9e9e9e',
    textAlign: 'center',
    fontSize: 14,
  },
  growthContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e8eaf6',
    borderRadius: 8,
  },
  growthTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#3c4043',
  },
  growthContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#5f6368',
  },
  navigationHint: {
    textAlign: 'center',
    fontSize: 14,
    color: '#5f6368',
    marginBottom: 20,
  },
  gardenImpactContainer: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  gardenImpactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1976d2',
  },
  gardenImpactContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1976d2',
  },
});

export default DialogicalPrayer;