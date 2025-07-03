import { isoly } from "isoly"
import { Scheme } from "./Scheme"

export namespace Statistics {
	export type Request = {
		scheme: Scheme
		range: isoly.DateRange
		options?: { limit: number; cursor?: string }
	}
	export type Response = {
		new: number
		old: number
		withTransaction: number
		cursor?: string
	}
}
