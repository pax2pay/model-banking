import { isly } from "isly"
import { Buffer as WarningBuffer } from "./Buffer"
import { Overdraft as WarningOverdraft } from "./Overdraft"
import { Unguarded as WarningUnguarded } from "./Unguarded"

export type Warning = Warning.Overdraft | Warning.Unguarded | Warning.Buffer

export namespace Warning {
	export import Overdraft = WarningOverdraft
	export import Unguarded = WarningUnguarded
	export import Buffer = WarningBuffer
	export const type = isly.union<Warning, Overdraft, Unguarded, Buffer>(Overdraft.type, Unguarded.type, Buffer.type)
}
