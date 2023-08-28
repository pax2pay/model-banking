import { Cancel as EntryCancel } from "./Cancel"
import { Capture as EntryCapture } from "./Capture"
import { Creatable as EntryCreatable } from "./Creatable"
import { Refund as EntryRefund } from "./Refund"
import { Summary as EntrySummary } from "./Summary"
import { Unknown as EntryUnknown } from "./Unknown"

export type Entry = EntryRefund | EntryCancel | EntryCapture | EntryUnknown

export namespace Entry {
	export type Summary = EntrySummary
	export const Summary = EntrySummary
	export type Creatable = EntryCreatable
	export const Creatable = EntryCreatable
	export type Refund = EntryRefund
	export const Refund = EntryRefund
	export type Cancel = EntryCancel
	export const Cancel = EntryCancel
	export type Capture = EntryCapture
	export const Capture = EntryCapture
	export type Unknown = EntryUnknown
	export const Unknown = EntryUnknown
}
