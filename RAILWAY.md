# Railway Deployment Instructions

## IMPORTANT: Use Dockerfile Build

This project MUST use the custom Dockerfile for deployment.

### Railway Settings:
1. **Builder**: Dockerfile
2. **Root Directory**: /
3. **Dockerfile Path**: Dockerfile

### If Railway Uses Nixpacks:
1. Delete the deployment
2. Create a new project
3. Ensure "Use Dockerfile" is selected

### Environment Variables:
- NODE_ENV=production
- NEXT_TELEMETRY_DISABLED=1

### Expected Build Process:
- Multi-stage Docker build
- No cache mounting issues
- Standalone Next.js output
- Production optimized

This configuration ensures zero TypeScript cache conflicts and reliable deployments.