let count: number = 0
export default defineEventHandler((event) => {
  count++
  return {
    count
  }
})
