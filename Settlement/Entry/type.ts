import { isly } from "isly"
import { zod } from "../../zod"
import type { Entry } from "."
import { Failed } from "./Failed"
import { Succeeded } from "./Succeeded"

export const type = isly.union<Entry, Succeeded, Failed>(Succeeded.type, Failed.type)
export const typeZod: zod.ZodType<Entry> = zod.union([Succeeded.typeZod, Failed.typeZod])
