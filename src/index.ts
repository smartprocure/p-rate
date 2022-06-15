const rateLimit = (limit: number) => {
  const set = new Set<Promise<any>>()
  const add = async (prom: Promise<any>) => {
    // Add to set
    set.add(prom)
    // Remove from set after resolving
    prom.then(() => set.delete(prom))
    // Limit was reached
    if (set.size === limit) {
      await Promise.race(set)
    }
  }
  const finish = () => Promise.all(set)
  return { add, finish }
}

export default rateLimit
