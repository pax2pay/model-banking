import { Creatable as EntryCreatable } from "./Creatable"
import { Failed as EntryFailed } from "./Failed"
import { fromCreatable } from "./fromCreatable"
import { Succeeded as EntrySucceeded } from "./Succeeded"
import { Summary as EntrySummary } from "./Summary"
import { type as entryType } from "./type"

export type Entry = EntrySucceeded | EntryFailed
export namespace Entry {
	export interface Capture extends EntrySucceeded {
		type: "capture"
	}
	export interface Refund extends EntrySucceeded {
		type: "refund"
	}
	export import Creatable = EntryCreatable
	export import Failed = EntryFailed
	export import Succeeded = EntrySucceeded
	export import Summary = EntrySummary
	export const type = entryType
	export const from = fromCreatable
}
