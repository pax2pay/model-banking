import { isly } from "isly"
import { Cancel as EntryCancel } from "./Cancel"
import { Capture as EntryCapture } from "./Capture"
import { Refund as EntryRefund } from "./Refund"
import { Unknown as EntryUnknown } from "./Unknown"

export type Creatable = EntryCancel.Creatable | EntryCapture.Creatable | EntryRefund.Creatable | EntryUnknown.Creatable

export namespace Creatable {
	export const type = isly.union(
		EntryCancel.Creatable.type,
		EntryCapture.Creatable.type,
		EntryRefund.Creatable.type,
		EntryUnknown.Creatable.type
	)
	export const is = undefined
}
