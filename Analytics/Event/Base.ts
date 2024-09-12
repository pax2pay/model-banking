import { isoly } from "isoly"
import { Realm } from "../../Realm"

export type Base<T> = {
	realm: Realm
	entity: { type: string; id: string }
	action: string
	created: isoly.DateTime
	isError?: true
	meta?: Record<string, unknown>
	value: T
}
