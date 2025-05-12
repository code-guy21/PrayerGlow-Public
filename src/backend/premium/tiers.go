package premium

import (
	"sync"
)

// Example feature access level structure
var featureAccessLevels = map[string]string{
	// Basic Access - Available to all users
	"core_feature_1": "basic",
	"core_feature_2": "basic",
	"core_feature_3": "basic",
	"core_feature_4": "basic",
	"core_feature_5": "basic",

	// Premium Access - Enhanced features
	"premium_feature_1": "premium",
	"premium_feature_2": "premium",
	"premium_feature_3": "premium",
	"premium_feature_4": "premium",
	"premium_feature_5": "premium",

	// Family Access - Shared features
	"family_feature_1": "family",
	"family_feature_2": "family",
	"family_feature_3": "family",
}

// Sample feature access map for demonstration purposes
var featureAccessMap = map[PrayerFeature]SubscriptionLevel{
	// Basic Category - Available to all users
	CoreRosaryFeature:       BasicLevel,
	BasicGardenFeature:      BasicLevel,

	// Premium Category - Enhanced experiences
	EnhancedRosaryFeature:   PremiumLevel,
	AdvancedGardenFeature:   PremiumLevel,

	// Family Category - Shared experiences
	SharedGardenFeature:     FamilyLevel,
}

// Cache for optimization
var (
	cacheMutex sync.RWMutex
	cache      map[string]interface{}
)

// HasFeatureAccess checks if a given subscription level has access to a specific feature
func HasFeatureAccess(level SubscriptionLevel, feature PrayerFeature) bool {
	requiredLevel, exists := featureAccessMap[feature]
	if !exists {
		return false
	}
	return level >= requiredLevel
}

// GetRequiredLevelForFeature returns the minimum level required for a feature
func GetRequiredLevelForFeature(feature PrayerFeature) SubscriptionLevel {
	level, exists := featureAccessMap[feature]
	if !exists {
		// Default to premium if feature is unknown
		return PremiumLevel
	}
	return level
}

// GetBasicFeatures returns all features available at the Basic level
func GetBasicFeatures() []PrayerFeature {
	var features []PrayerFeature
	
	for feature, level := range featureAccessMap {
		if level == BasicLevel {
			features = append(features, feature)
		}
	}
	
	return features
}

// GetPremiumFeatures returns all features available at the Premium level
// This includes both Premium-specific features and Basic features
func GetPremiumFeatures() []PrayerFeature {
	var features []PrayerFeature
	
	for feature, level := range featureAccessMap {
		if level <= PremiumLevel {
			features = append(features, feature)
		}
	}
	
	return features
}

// GetFamilyFeatures returns all features available at the Family level
// This includes Family-specific features and all features from lower tiers
func GetFamilyFeatures() []PrayerFeature {
	var features []PrayerFeature
	
	for feature := range featureAccessMap {
		features = append(features, feature)
	}
	
	return features
}

// BasicPrayerRepository defines the interface for spiritual content
// This demonstrates how all users have access to core prayer content
type BasicPrayerRepository interface {
	// GetCorePrayers retrieves fundamental prayers available to all users
	GetCorePrayers() ([]string, error)
	
	// GetDailyScripture retrieves daily scripture readings
	GetDailyScripture() (string, error)
	
	// GetBasicExamination retrieves the basic examination of conscience format
	GetBasicExamination() (string, error)
}

// SpiritualGrowthService defines methods for tracking spiritual growth
// All users have access to spiritual growth tracking
type SpiritualGrowthService interface {
	// TrackPrayerActivity records a completed prayer session
	TrackPrayerActivity(userID string, prayerType string) error
	
	// GetGardenGrowthForUser retrieves data about the user's Prayer Garden
	GetGardenGrowthForUser(userID string) (interface{}, error)
	
	// GetPrayerStats retrieves statistics about the user's prayer journey
	GetPrayerStats(userID string) (interface{}, error)
}