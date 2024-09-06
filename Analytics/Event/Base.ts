import { isoly } from "isoly"
import { Realm } from "../../Realm"

export type Base<T> = {
	realm: Realm
	organization?: string
	account?: string
	entity: { type: string; id: string }
	action: string
	created: isoly.DateTime
	isError?: true
	value: T
}
