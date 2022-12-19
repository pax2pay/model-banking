import * as cryptly from "cryptly"
import * as gracely from "gracely"
import * as isoly from "isoly"
import { Creatable as OperationCreatable } from "./Creatable"

export interface Operation extends OperationCreatable {
	id: cryptly.Identifier
	created: isoly.DateTime
	//index?: number
}
export namespace Operation {
	export function is(value: any | Operation): value is Operation {
		return (
			typeof value == "object" &&
			cryptly.Identifier.is(value.id, 8) &&
			isoly.DateTime.is(value.created) &&
			OperationCreatable.is({ ...value })
		)
	}
	export function fromCreatable(operation: Creatable): Operation {
		const id = cryptly.Identifier.generate(8)
		const timestamp = isoly.DateTime.now()
		return {
			...operation,
			id: id,
			created: timestamp,
		}
	}

	export function reverse(operation: Operation): Operation {
		const id = cryptly.Identifier.generate(8)
		const timestamp = isoly.DateTime.now()
		const reverseChange = Object.fromEntries(
			Object.entries(operation.change)
				.filter(([k, v]) => v.status == "success")
				.map(([k, v]) => [k, { type: v.type == "add" ? "subtract" : "add", amount: v.amount, status: "pending" }])
		)
		return {
			...operation,
			id: id,
			created: timestamp,
			change: reverseChange,
		}
	}
	export function openFinalization(reservation: Operation): Operation | gracely.Error {
		return typeof reservation.change.actual == "object" ||
			typeof reservation.change.reserved == "undefined" ||
			reservation.change.reserved.status == "failed"
			? gracely.client.invalidContent("Operation", "Amount is not reserved.")
			: {
					id: cryptly.Identifier.generate(8),
					created: isoly.DateTime.now(),
					currency: reservation.currency,
					change: {
						actual: { type: "subtract", amount: reservation.change.reserved.amount, status: "pending" },
						reserved: { type: "subtract", amount: reservation.change.reserved.amount, status: "pending" },
					},
			  }
	}

	// export function id(operation: Operation): string {
	// 	return `${operation.created}/${operation.id}`
	// }

	export type Creatable = OperationCreatable
	export const Creatable = OperationCreatable
}

//export { ChangeType, Change }
