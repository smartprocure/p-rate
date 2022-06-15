const rateLimit = (limit: number) => {
  const set = new Set<Promise<any>>()
  const add = async (prom: Promise<any>) => {
    if (set.size === limit) {
      await Promise.race(set)
    }
    set.add(prom)
    prom.then(() => set.delete(prom))
  }
  const finish = () => Promise.all(set)
  return { add, finish }
}

export default rateLimit
