# p-rate

Run n number of promises concurrently. If the limit is reached
wait for a promise to finish before adding another. This is
particularly useful in a looping scenario.

```typescript
import rateLimit from 'p-rate'
import { setTimeout } from 'node:timers/promises'

const limiter = rateLimit(3)
// No delay
await limiter.add(setTimeout(1000))
// No delay
await limiter.add(setTimeout(1000))
// Limit reached so wait for one promise to finish before resolving
await limiter.add(setTimeout(1000))
// Executed one second later
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
