# PrayerGlow API Documentation

This directory contains documentation for PrayerGlow's backend API services that support the prayer experience.

## API Domains

The PrayerGlow API is organized into the following domains:

### Prayer APIs

- **Prayer Content API**: Endpoints for retrieving prayer texts, scripture readings, and guided prayer content
- **Prayer History API**: Services for recording and retrieving prayer activity history
- **Prayer Stats API**: Endpoints for aggregated prayer statistics and milestones

### Garden APIs

- **Garden State API**: Services for managing the user's Prayer Garden state
- **Garden Element API**: Endpoints for garden elements and their spiritual mapping
- **Garden Growth API**: Services tracking garden growth and prayer activity relationship

### User APIs

- **Authentication API**: Secure user authentication services
- **Profile API**: User profile and preferences management
- **Device Sync API**: Services for synchronizing prayer data across devices

### Premium APIs

- **Subscription API**: Endpoints for managing user subscriptions
- **Feature Access API**: Services for verifying access to premium features
- **Receipt Validation API**: Services for validating in-app purchases

## API Principles

The PrayerGlow API follows specific design principles:

- **RESTful Design**: Consistent resource-oriented endpoints
- **Secure by Default**: Authentication required for all non-public endpoints
- **Mobile Optimized**: Efficient payloads and batched operations
- **Offline Support**: Sync protocols for offline prayer recording

## API Versioning

All API routes follow the pattern `/api/v1/{resource}` to support future evolution while maintaining backward compatibility.

## Documentation Format

Each API is documented with:

- Endpoint URL and method
- Required authentication
- Request parameters
- Response format
- Example requests and responses
- Error handling
- Rate limits

For detailed information on API design principles, see the [API Principles document](../api-principles.md).