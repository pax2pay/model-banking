import { isly } from "isly"
import { Overdraft as WarningOverdraft } from "./Overdraft"
import { Unguarded as WarningUnguarded } from "./Unguarded"

export type Warning = Warning.Overdraft | Warning.Unguarded

export namespace Warning {
	export import Overdraft = WarningOverdraft
	export import Unguarded = WarningUnguarded
	export const type = isly.union<Warning, Overdraft, Unguarded>(Overdraft.type, Unguarded.type)
}
