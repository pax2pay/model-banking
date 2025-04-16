import { Rail } from "../../Rail"
import { Authorization as PreTransactionAuthorization } from "./Authorization"
import { Incoming as PreTransactionIncoming } from "./Incoming"
import { Outgoing as PreTransactionOutgoing } from "./Outgoing"

export type PreTransaction = PreTransaction.Outgoing | PreTransaction.Authorization | PreTransaction.Incoming
export namespace PreTransaction {
	export type Resolved =
		| (PreTransaction & { counterpart: Rail.Address; type: "outgoing" })
		| PreTransaction.Incoming
		| PreTransaction.Authorization

	export import Authorization = PreTransactionAuthorization
	export import Incoming = PreTransactionIncoming
	export import Outgoing = PreTransactionOutgoing
}
