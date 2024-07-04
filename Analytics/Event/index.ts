import { Base as EventBase } from "./Base"
import { Operation as OperationEvent } from "./Operation"
import { Transaction as TransactionEvent } from "./Transaction"

export type Event = (Event.Transaction | Event.Operation) & { version: string }
export namespace Event {
	export type Base<T> = EventBase<T>
	export import Transaction = TransactionEvent
	export import Operation = OperationEvent
}
