import { isly } from "isly"
import { Cancel as CancelSettlement } from "./Cancel"
import { Capture as CaptureSettlement } from "./Capture"
import { Refund as RefundSettlement } from "./Refund"

export type Settlement = CancelSettlement | CaptureSettlement | RefundSettlement

export namespace Settlement {
	export type Cancel = CancelSettlement
	export const Cancel = CancelSettlement
	export type Capture = CaptureSettlement
	export const Capture = CaptureSettlement
	export type Refund = RefundSettlement
	export const Refund = RefundSettlement
	export const type = isly.union(Cancel.type, Capture.type, Refund.type)
	export const is = type.is
}
