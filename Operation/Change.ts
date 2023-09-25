import { isly } from "isly"
import { Balances } from "../Balances"
import { ChangeType } from "./ChangeType"

export type Change = Partial<Record<Balances.Entry, ChangeType>> & { type: Change.Type }

export namespace Change {
	export const types = ["incoming", "finalizeIncoming", "outgoing", "finalizeOutgoing", "deposit", "remove"] as const
	export type Type = typeof types[number]
	export const type = isly.object<Change>({
		type: isly.string(types),
		actual: ChangeType.type.optional(),
		incomingReserved: ChangeType.type.optional(),
		outgoingReserved: ChangeType.type.optional(),
	})
	export const is = type.is
	export type Incoming = Pick<Record<Balances.Entry, ChangeType<"add">>, "incomingReserved"> & { type: "incoming" }
	export namespace Incoming {
		export const type = isly.object<Incoming>({
			type: isly.string("incoming" satisfies Type),
			incomingReserved: ChangeType.Add.type,
		})
		export const is = type.is
	}
	export type FinalizeIncoming = Pick<Record<Balances.Entry, ChangeType<"subtract">>, "incomingReserved"> &
		Pick<Record<Balances.Entry, ChangeType<"add">>, "actual"> & { type: "finalizeIncoming" }
	export namespace FinalizeIncoming {
		export const type = isly.object<FinalizeIncoming>({
			type: isly.string("finalizeIncoming" satisfies Type),
			actual: ChangeType.Add.type,
			incomingReserved: ChangeType.Subtract.type,
		})
		export const is = type.is
	}
	export type Outgoing = Pick<Record<Balances.Entry, ChangeType<"add">>, "outgoingReserved"> & { type: "outgoing" }
	export namespace Outgoing {
		export const type = isly.object<Outgoing>({
			type: isly.string("outgoing" satisfies Type),
			outgoingReserved: ChangeType.Add.type,
		})
		export const is = type.is
	}
	export type FinalizeOutgoing = Pick<Record<Balances.Entry, ChangeType<"subtract">>, "outgoingReserved"> &
		Pick<Record<Balances.Entry, ChangeType<"add">>, "actual"> & { type: "finalizeOutgoing" }
	export namespace FinalizeOutgoing {
		export const type = isly.object<FinalizeOutgoing>({
			type: isly.string("finalizeOutgoing" satisfies Type),
			actual: ChangeType.Add.type,
			outgoingReserved: ChangeType.Subtract.type,
		})
		export const is = type.is
	}
	export type Deposit = Pick<Record<Balances.Entry, ChangeType<"add">>, "actual"> & { type: "deposit" }
	export namespace Deposit {
		export const type = isly.object<Deposit>({
			type: isly.string("deposit" satisfies Type),
			actual: ChangeType.Add.type,
		})
		export const is = type.is
	}
	export type Remove = Pick<Record<Balances.Entry, ChangeType<"subtract">>, "actual"> & { type: "remove" }
	export namespace Remove {
		export const type = isly.object<Remove>({
			type: isly.string("remove" satisfies Type),
			actual: ChangeType.Subtract.type,
		})
		export const is = type.is
	}
}
