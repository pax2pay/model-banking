import { isly } from "isly"
import { Balances } from "../Balances"
import { ChangeType } from "./ChangeType"

export type Change = Partial<Record<Balances.Entry, ChangeType>>

export namespace Change {
	export const type = isly.object<Change>({
		actual: ChangeType.type.optional(),
		incomingReserved: ChangeType.type.optional(),
		outgoingReserved: ChangeType.type.optional(),
	})
	export const is = type.is
	// export type Reservation = { reserved: { type: "add"; amount: number } }
	// export type Deposit = { actual: { type: "add"; amount: number } }
	// export type Finalization = {
	// 	reserved: { type: "subtract"; amount: number }
	// 	actual: { type: "subtract"; amount: number }
	// }
	// export function isReservation(value: Reservation | any): value is Reservation {
	// 	return (
	// 		Change.is({ ...value }) &&
	// 		value.actual == undefined &&
	// 		typeof value.reserved == "object" &&
	// 		value.reserved.type == "add"
	// 	)
	// }
	// export function isDeposit(value: Deposit | any): value is Deposit {
	// 	return (
	// 		Change.is({ ...value }) &&
	// 		value.reserved == undefined &&
	// 		typeof value.actual == "object" &&
	// 		value.actual.type == "add"
	// 	)
	// }
	// export function isFinalization(value: Finalization | any): value is Finalization {
	// 	return (
	// 		Change.is({ ...value }) &&
	// 		typeof value.actual == "object" &&
	// 		value.actual.type == "subtract" &&
	// 		typeof value.reserved == "object" &&
	// 		value.reserved.type == "subtract"
	// 	)
	// }
}
