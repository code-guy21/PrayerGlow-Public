# Premium Features in PrayerGlow

This directory contains example code demonstrating how PrayerGlow implements premium features in a way that enhances the core spiritual experience without limiting essential prayer content.

## Our Philosophy

PrayerGlow follows these core principles regarding premium features:

1. **Core Prayer Content Remains Accessible**
   - All fundamental prayers and spiritual practices
   - Basic versions of all prayer types
   - Daily scripture and reflections
   - Core Prayer Garden functionality

2. **Premium Features Enhance, Not Restrict**
   - Premium features provide deeper, richer experiences
   - Advanced visualizations and interactions
   - Extended content and guidance
   - Enhanced personalization

3. **Subscription Tiers**
   - **Basic (Free)**: Complete core prayer experience
   - **Premium**: Enhanced individual prayer journey
   - **Family**: Shared prayer experiences for families

## Implementation Approach

The code in this directory provides a conceptual framework for how premium features are implemented, with a focus on:

1. **Clear Feature Definition**
   - Features are explicitly categorized by subscription level
   - Core spiritual functionality is always available to all users

2. **Graceful Feature Availability**
   - Users see appropriate guidance for premium features
   - Non-intrusive upgrade prompts
   - Focus remains on the prayer experience

3. **Spiritual Journey Continuity**
   - Prayer history and garden growth persist across subscription changes
   - Core spiritual data is never paywalled
   - User's prayer journey remains intact regardless of subscription status

## Key Files

- `model.go`: Defines the data structures for premium features
- `tiers.go`: Demonstrates how features are organized by subscription level
- `middleware.go`: Shows the conceptual approach to feature access checks

## Note on Implementation

These files show the structural approach to premium features integration with associated components for subscription management, platform-specific purchase validation, and family sharing capabilities.