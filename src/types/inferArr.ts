export type InferArr<T extends any[]> = T extends (infer U)[] ? U : never
