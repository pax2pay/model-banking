import { isly } from "isly"

// Standalone isly type for rules, kept out of Rule/index.ts to avoid a circular
// import (Rule/index → Rule/State → State/Card → Card → Rule). Rule is currently
// typed as `never`, so this validates to `never[]` when used as an array.
export const type = isly.any<never>()
