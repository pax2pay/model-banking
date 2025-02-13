import { Iin } from "./Iin"

export type PerMonth = Record<1 | 2 | 3, { count: Partial<Record<Iin, number>>; volume: Partial<Record<Iin, number>> }>
