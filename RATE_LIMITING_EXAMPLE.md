# 🚦 Rate Limiting Implementation Example

## How to Add Rate Limiting to Your API Routes

### 1. Import Rate Limiter in Your API Route:

```typescript
// Add to src/app/api/video-info/route.ts
import { createRateLimiter, getClientIdentifier } from '@/lib/rateLimiter';

const rateLimiter = createRateLimiter(5, 60000); // 5 requests per minute

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Get client identifier
  const clientId = getClientIdentifier(request);

  // Check rate limit
  const { allowed, resetTime, remaining } = rateLimiter.isAllowed(clientId);

  if (!allowed) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded. Please try again later.',
        resetTime: resetTime
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetTime?.toString() || '',
          'Retry-After': '60'
        }
      }
    );
  }

  // Add rate limit headers to successful responses
  const headers = {
    'X-RateLimit-Remaining': remaining?.toString() || '0'
  };

  // ... rest of your existing code ...
}
```

### 2. Different Limits for Different Endpoints:

```typescript
// Video Info: 10 requests per minute (lighter operation)
const videoInfoLimiter = createRateLimiter(10, 60000);

// Downloads: 3 requests per minute (heavy operation)
const downloadLimiter = createRateLimiter(3, 60000);
```

### 3. Frontend Rate Limit Handling:

```typescript
// Add to your frontend fetch calls
const response = await fetch('/api/video-info', {
  method: 'POST',
  body: JSON.stringify({ url })
});

if (response.status === 429) {
  const data = await response.json();
  const resetTime = new Date(data.resetTime);
  showError(`Rate limit exceeded. Try again after ${resetTime.toLocaleTimeString()}`);
  return;
}
```

## 📊 Recommended Rate Limits:

| Endpoint | Limit | Window | Reasoning |
|----------|-------|---------|-----------|
| **Video Info** | 10 req/min | 1 minute | Lightweight operation |
| **Download** | 3 req/min | 1 minute | Heavy bandwidth usage |
| **Global** | 20 req/min | 1 minute | Overall protection |

## 🔄 Implementation Steps:

1. Copy the rate limiter file to `src/lib/rateLimiter.ts`
2. Import and use in your API routes
3. Add error handling in frontend
4. Test with multiple requests
5. Monitor and adjust limits as needed

This will help prevent abuse and ensure fair usage across all users!