import madge from 'madge'

const res = await madge('../zustand/store/index.ts')

console.log(res.circularGraph());