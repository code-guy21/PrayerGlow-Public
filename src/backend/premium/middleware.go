package premium

import (
	"context"
	"net/http"
)

// Context keys
type contextKey string

const (
	userSubscriptionKey contextKey = "user_subscription"
)

// FeatureAccessMiddleware checks if the user has access to premium features
// Access control for premium features
func FeatureAccessMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Premium feature access flow:
		// 1. Identify user
		// 2. Check subscription status
		// 3. Apply appropriate permissions
		
		// Retrieve user subscription information
		userIdentifier := getAuthenticatedUserID(r)
		if userIdentifier == "" {
			// If not authenticated, treat as basic user
			ctx := context.WithValue(r.Context(), userSubscriptionKey, SubscriptionLevel(BasicLevel))
			next.ServeHTTP(w, r.WithContext(ctx))
			return
		}
		
		// Query subscription database
		subscription, _ := getSubscriptionForUser(userIdentifier)
		
		// Add subscription to context
		ctx := context.WithValue(r.Context(), userSubscriptionKey, subscription.CurrentLevel)
		
		// Continue to the next handler
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// RequireFeatureAccess creates middleware that ensures access to a specific feature
// Ensures core prayer content remains accessible while checking feature permissions
func RequireFeatureAccess(feature PrayerFeature) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Get the subscription level from context
			subscriptionLevel, ok := r.Context().Value(userSubscriptionKey).(SubscriptionLevel)
			if !ok {
				subscriptionLevel = BasicLevel
			}
			
			// Check if the user has access to this feature
			hasAccess := HasFeatureAccess(subscriptionLevel, feature)
			
			if !hasAccess {
				// For core spiritual features, provide access to the basic version
				if isCoreSpiritualFeature(feature) {
					// Get the basic version of the feature instead
					basicFeature := getBasicVersionOfFeature(feature)
					
					// Update context with information about using basic version
					ctx := context.WithValue(r.Context(), "using_basic_version", true)
					ctx = context.WithValue(ctx, "requested_feature", feature)
					ctx = context.WithValue(ctx, "provided_feature", basicFeature)
					
					// Continue with basic version
					next.ServeHTTP(w, r.WithContext(ctx))
					return
				}
				
				// For premium-only features, provide information about upgrading
				// but in a non-intrusive way that respects the spiritual context
				respondWithUpgradeInfo(w, feature)
				return
			}
			
			// User has access, continue
			next.ServeHTTP(w, r)
		})
	}
}

// Get authenticated user ID from request context
func getAuthenticatedUserID(r *http.Request) string {
	// Authentication logic
	return "example-user-id"
}

// Retrieve a user's subscription information
func getSubscriptionForUser(userID string) (Subscription, error) {
	// Subscription retrieval logic
	return Subscription{
		UserID:       userID,
		CurrentLevel: BasicLevel,
	}, nil
}

// Check if a feature is a core spiritual feature (all users get at least basic access)
func isCoreSpiritualFeature(feature PrayerFeature) bool {
	// Core spiritual features always have basic versions available
	// This ensures essential prayer functionality is never paywalled
	switch feature {
	case CoreRosaryFeature,
		EnhancedRosaryFeature,
		BasicGardenFeature,
		AdvancedGardenFeature:
		return true
	default:
		// Other features evaluated based on spiritual significance
		return false
	}
}

// Get the basic version of a premium feature
func getBasicVersionOfFeature(feature PrayerFeature) PrayerFeature {
	// Every premium feature has a basic counterpart
	// This ensures the core spiritual experience is always available
	switch feature {
	case EnhancedRosaryFeature:
		return CoreRosaryFeature
	case AdvancedGardenFeature:
		return BasicGardenFeature
	default:
		// Map other features to their basic versions
		return feature
	}
}

// Respond with upgrade information in a spiritually respectful manner
func respondWithUpgradeInfo(w http.ResponseWriter, feature PrayerFeature) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Use 200 instead of 403 for a better user experience
	
	// Return premium feature information with a respectful message
	
	// For example:
	// {
	//   "message": "This enhanced prayer experience is available with PrayerGlow Premium",
	//   "feature_name": "Advanced Rosary Visualization",
	//   "feature_description": "Experience a more immersive prayer journey with realistic physics, advanced visuals, and audio guidance.",
	//   "upgrade_info": {
	//     "url": "/premium/learn-more",
	//     "message": "Enhance your prayer journey"
	//   }
	// }
	
	w.Write([]byte(`{"message":"Feature requires premium subscription"}`))
}