import { performance } from 'perf_hooks'

export const timer = async <R>(
  exec: () => Promise<R>,
  print: string | boolean = false,
): Promise<{ took: number; res: R }> => {
  const start = performance.now()
  const res = await exec()
  const end = performance.now()
  const took = end - start
  const name = typeof print === 'string' ? print : exec.name
  if (print) console.info(`Function "${name}" took ${took} milliseconds`)
  return { took, res }
}

export default timer
