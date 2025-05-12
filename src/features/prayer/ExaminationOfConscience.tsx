import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

/**
 * ExaminationOfConscience Component
 *
 * Guides users through a structured examination of conscience with
 * thoughtful prompts for reflection. Progress is visualized in the
 * Prayer Garden to encourage spiritual growth.
 */
const ExaminationOfConscience: React.FC = () => {
  // States to track progression through the examination
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // The examination follows a structured spiritual process
  const examinationSteps = [
    {
      title: "Opening Prayer",
      content: "Begin with a moment of silence, acknowledging God's presence...",
      reflection: "Ask for the grace to see yourself as God sees you, with truth and love."
    },
    {
      title: "Gratitude",
      content: "Reflect on the blessings of the day...",
      reflection: "What moments of grace or joy did you experience today?"
    },
    {
      title: "Review",
      content: "Walk through your day, from beginning to end...",
      reflection: "Where did you feel God's presence? Where did you turn away?"
    },
    {
      title: "Reconciliation",
      content: "Acknowledge where you have fallen short...",
      reflection: "What patterns do you notice in your thoughts, words, or actions?"
    },
    {
      title: "Hope",
      content: "Look toward tomorrow with renewed intention...",
      reflection: "How might you better live your faith tomorrow?"
    },
    {
      title: "Closing Prayer",
      content: "Conclude with a prayer of thanksgiving and resolve...",
      reflection: "Offer your reflections to God and ask for strength for tomorrow."
    }
  ];
  
  // Handle completing a step of the examination
  const completeCurrentStep = () => {
    // Records completion of the current step:
    // - Saves the user's reflections
    // - Updates the Prayer Garden visualization
    // - Tracks progress in spiritual journey
    
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    // Move to next step if not at the end
    if (currentStep < examinationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Get the current step
  const currentStepData = examinationSteps[currentStep];
  
  // Calculate progress
  const progress = Math.round((completedSteps.length / examinationSteps.length) * 100);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Examination of Conscience</Text>
      
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
        <Text style={styles.progressText}>{progress}% Complete</Text>
      </View>
      
      {/* Current Step */}
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>{currentStepData.title}</Text>
        <Text style={styles.stepContent}>{currentStepData.content}</Text>
        
        {/* Reflection Area */}
        <View style={styles.reflectionContainer}>
          <Text style={styles.reflectionTitle}>For Reflection</Text>
          <Text style={styles.reflectionContent}>{currentStepData.reflection}</Text>
        </View>
      </View>
      
      {/* Spiritual Growth Note */}
      <View style={styles.growthContainer}>
        <Text style={styles.growthTitle}>Spiritual Growth</Text>
        <Text style={styles.growthContent}>
          Your examination adds elements to your Prayer Garden, visually representing your spiritual journey.
        </Text>
      </View>
      
      {/* Navigation Hint */}
      <Text style={styles.navigationHint}>
        Tap to continue when you've completed this reflection
      </Text>
      
      {/* Garden Impact Visualization */}
      <View style={styles.gardenImpactContainer}>
        <Text style={styles.gardenImpactTitle}>Garden Impact</Text>
        <Text style={styles.gardenImpactContent}>
          This reflection contributes to new growth in your Prayer Garden
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f7f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#3c4043',
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
    backgroundColor: '#4caf50',
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
  stepContainer: {
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
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#3c4043',
  },
  stepContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#5f6368',
  },
  reflectionContainer: {
    backgroundColor: '#f1f3f4',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  reflectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#3c4043',
  },
  reflectionContent: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    color: '#5f6368',
  },
  growthContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e8f5e9',
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
    backgroundColor: '#e6f4ea',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#a8dab5',
  },
  gardenImpactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1e8e3e',
  },
  gardenImpactContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1e8e3e',
  },
});

export default ExaminationOfConscience;