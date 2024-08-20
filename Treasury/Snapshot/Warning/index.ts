import { isly } from "isly"
import { Overdraft } from "./Overdraft"
import { Unguarded } from "./Unguarded"

export type Warning = Overdraft | Unguarded

export namespace Warning {
	export const type = isly.union<Warning, Overdraft, Unguarded>(Overdraft.type, Unguarded.type)
}
