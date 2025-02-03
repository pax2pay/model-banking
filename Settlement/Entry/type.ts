import { isly } from "isly"
import type { Entry } from "."
import { Failed } from "./Failed"
import { Succeeded } from "./Succeeded"

export const type = isly.union<Entry, Succeeded, Failed>(Succeeded.type, Failed.type)
