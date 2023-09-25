import { isly } from "isly"
import { Balances } from "../Balances"
import { Change as Change } from "./Change"

export type Changes = Partial<Record<Balances.Entry | Balances.Counters.Counter, Change>>

export namespace Changes {
	export const type = isly.object<Changes>({
		actual: Change.type.optional(),
		incomingReserved: Change.type.optional(),
		outgoingReserved: Change.type.optional(),
	})
	export const is = type.is
	export type Incoming = Pick<Record<Balances.Entry, Change<"add">>, "incomingReserved"> & { type: "incoming" }
	export namespace Incoming {
		export const type = isly.object<Incoming>({
			incomingReserved: Change.Add.type,
		})
		export const is = type.is
	}
	export type FinalizeIncoming = Pick<Record<Balances.Entry, Change<"subtract">>, "incomingReserved"> &
		Pick<Record<Balances.Entry, Change<"add">>, "actual"> & { type: "finalizeIncoming" }
	export namespace FinalizeIncoming {
		export const type = isly.object<FinalizeIncoming>({
			actual: Change.Add.type,
			incomingReserved: Change.Subtract.type,
		})
		export const is = type.is
	}
	export type Outgoing = Pick<Record<Balances.Entry, Change<"add">>, "outgoingReserved"> & { type: "outgoing" }
	export namespace Outgoing {
		export const type = isly.object<Outgoing>({
			outgoingReserved: Change.Add.type,
		})
		export const is = type.is
	}
	export type FinalizeOutgoing = Pick<Record<Balances.Entry, Change<"subtract">>, "outgoingReserved"> &
		Pick<Record<Balances.Entry, Change<"add">>, "actual"> & { type: "finalizeOutgoing" }
	export namespace FinalizeOutgoing {
		export const type = isly.object<FinalizeOutgoing>({
			actual: Change.Add.type,
			outgoingReserved: Change.Subtract.type,
		})
		export const is = type.is
	}
	export type Deposit = Pick<Record<Balances.Entry, Change<"add">>, "actual"> & { type: "deposit" }
	export namespace Deposit {
		export const type = isly.object<Deposit>({
			actual: Change.Add.type,
		})
		export const is = type.is
	}
	export type Remove = Pick<Record<Balances.Entry, Change<"subtract">>, "actual"> & { type: "remove" }
	export namespace Remove {
		export const type = isly.object<Remove>({
			actual: Change.Subtract.type,
		})
		export const is = type.is
	}
}
