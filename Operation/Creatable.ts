import * as isoly from "isoly"
import { Balances } from "../Balances"

export type Status = "pending" | "success" | "failed" //| "cancelled"

type ChangeType = { type: "add" | "subtract"; amount: number; status: Status }
export type Change = Partial<Record<Balances.Entry, ChangeType>>

export namespace Change {
	export function is(value: any | Change): value is Change {
		return (
			typeof value == "object" &&
			(value.actual == undefined || isChangeType(value.actual)) &&
			(value.reserved == undefined || isChangeType(value.reserved)) &&
			(value.actual || value.reserved)
		)
	}
	export function isChangeType(value: ChangeType | any): value is ChangeType {
		return (
			typeof value == "object" &&
			typeof value.amount == "number" &&
			value.amount > 0 &&
			(value.type == "add" || value.type == "subtract") &&
			typeof value.status == "string" &&
			(value.status == "pending" || value.status == "success" || value.status == "failed")
		)
	}
	export type Reservation = { reserved: { type: "add"; amount: number } }
	export type Deposit = { actual: { type: "add"; amount: number } }
	export type Finalization = {
		reserved: { type: "subtract"; amount: number }
		actual: { type: "subtract"; amount: number }
	}
	export function isReservation(value: Reservation | any): value is Reservation {
		return (
			Change.is({ ...value }) &&
			value.actual == undefined &&
			typeof value.reserved == "object" &&
			value.reserved.type == "add"
		)
	}
	export function isDeposit(value: Deposit | any): value is Deposit {
		return (
			Change.is({ ...value }) &&
			value.reserved == undefined &&
			typeof value.actual == "object" &&
			value.actual.type == "add"
		)
	}
	export function isFinalization(value: Finalization | any): value is Finalization {
		return (
			Change.is({ ...value }) &&
			typeof value.actual == "object" &&
			value.actual.type == "subtract" &&
			typeof value.reserved == "object" &&
			value.reserved.type == "subtract"
		)
	}
}

export interface Creatable {
	currency: isoly.Currency
	change: Change
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			typeof value == "object" &&
			isoly.Currency.is(value.currency) &&
			typeof value.change == "object" &&
			Change.is(value.change)
		)
	}
}
