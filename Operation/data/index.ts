import { pax2pay } from "../../index"
import { capture as dataCapture } from "./capture"
import { refund as dataRefund } from "./refund"
import { state as dataState } from "./state"
import { transaction as dataTransaction } from "./transaction"

export namespace data {
	export const transaction = dataTransaction
	export const sum: pax2pay.Operation.Changes.Sum = {
		/* mock sum */
	} as pax2pay.Operation.Changes.Sum
	export const counterbalance = "test-counterbalance"
	export const settlement = "test-settlement"
	export const charge = 100
	export const state = dataState
	export const capture = dataCapture
	export const refund = dataRefund
}
