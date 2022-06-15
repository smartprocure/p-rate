# p-ratelimit

Run n number of promises concurrently. If the limit is reached
and another is added, wait for at least one to finish before adding
the next promise. This is particularly useful in a looping scenario.

```typescript
import rateLimit from 'p-ratelimit'
import { setTimeout } from 'node:timers/promises'

const limiter = rateLimit(3)
// No delay
await limiter.add(setTimeout(1000))
await limiter.add(setTimeout(1000))
await limiter.add(setTimeout(1000))
// Wait for one promise to finish before adding
await limiter.add(setTimeout(1000))
```

Looping

```typescript
// Limit concurrency to at most 3
const limiter = rateLimit(3)

for (let i = 0; i < 5; i++) {
  await limiter.add(setTimeout(1000))
}
// Wait for everything to finish up
await limiter.finish()

// This code should take around two seconds to run
```
