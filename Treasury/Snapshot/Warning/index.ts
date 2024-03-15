import { isly } from "isly"
import { Coinage } from "./Coinage"
import { Overdraft } from "./Overdraft"

export type Warning = Overdraft | Coinage

export namespace Warning {
	export const type = isly.union(Overdraft.type, Coinage.type)
}
