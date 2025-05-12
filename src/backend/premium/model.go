package premium

import (
	"time"
)

// SubscriptionLevel represents the user's subscription status
type SubscriptionLevel int

const (
	// BasicLevel is the free level with core prayer functionality
	BasicLevel SubscriptionLevel = iota
	// PremiumLevel includes enhanced prayer experiences
	PremiumLevel
	// FamilyLevel includes shared prayer features for families
	FamilyLevel
)

// String returns a string representation of the subscription level
func (t SubscriptionLevel) String() string {
	return []string{
		"Basic",
		"Premium",
		"Family",
	}[t]
}

// SubscriptionPlan represents a plan that users can subscribe to
type SubscriptionPlan struct {
	ID          string           `json:"id" db:"id"`
	Name        string           `json:"name" db:"name"`
	Description string           `json:"description" db:"description"`
	Level       SubscriptionLevel `json:"level" db:"level"`
	// Price information omitted for public repository
	IsActive    bool             `json:"is_active" db:"is_active"`
	CreatedAt   time.Time        `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time        `json:"updated_at" db:"updated_at"`
}

// Subscription represents a user's active subscription
type Subscription struct {
	ID           string           `json:"id" db:"id"`
	UserID       string           `json:"user_id" db:"user_id"`
	PlanID       string           `json:"plan_id" db:"plan_id"`
	Status       string           `json:"status" db:"status"`
	CurrentLevel SubscriptionLevel `json:"current_level" db:"current_level"`
	StartDate    time.Time        `json:"start_date" db:"start_date"`
	EndDate      time.Time        `json:"end_date" db:"end_date"`
	CreatedAt    time.Time        `json:"created_at" db:"created_at"`
	UpdatedAt    time.Time        `json:"updated_at" db:"updated_at"`
}

// PrayerFeature identifies a specific prayer functionality
type PrayerFeature string

// Example prayer feature categories
const (
	// Basic features available to all users
	CoreRosaryFeature       PrayerFeature = "core_feature_a"
	BasicGardenFeature      PrayerFeature = "core_feature_b"

	// Enhanced features for premium subscribers
	EnhancedRosaryFeature    PrayerFeature = "premium_feature_a"
	AdvancedGardenFeature    PrayerFeature = "premium_feature_b"

	// Family features for shared experiences
	SharedGardenFeature     PrayerFeature = "family_feature_a"
)

// FeatureResponse is returned when checking feature access
type FeatureResponse struct {
	HasAccess bool   `json:"has_access"`
	Feature   string `json:"feature"`
	Message   string `json:"message,omitempty"`
}

// PremiumPrinciple represents our approach to premium features
type PremiumPrinciple struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

// GetPremiumPrinciples returns the core principles guiding our premium approach
func GetPremiumPrinciples() []PremiumPrinciple {
	return []PremiumPrinciple{
		{
			Name: "Spiritual First",
			Description: "Core prayer experiences remain accessible to all users. Premium features enhance rather than restrict essential spiritual content.",
		},
		{
			Name: "Enhanced Experience",
			Description: "Premium features offer deeper, richer prayer experiences through advanced visuals, audio guidance, and personalized content.",
		},
		{
			Name: "Family Connection",
			Description: "Family features enable shared prayer experiences while respecting individual spiritual journeys.",
		},
		{
			Name: "Sustainable Development",
			Description: "Premium subscriptions support ongoing development of high-quality prayer content and experiences.",
		},
	}
}