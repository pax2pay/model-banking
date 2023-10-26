import { Account as modelAccount } from "../Account"
import { Operation as modelOperation } from "../Operation"
import { Organization as modelOrganization } from "../Organization"
import { Rail as modelRail } from "../Rail"
import { Transaction as modelTransaction } from "../Transaction"

export interface Event {
	organization?: string
	account?: string
	entity: Entity
	action: string
	data: any
}

type Entity = "account" | "transaction" | "operation" | "rail" | "organization" | "authorization" | "supplier"
export namespace Event {
	export namespace Account {
		export function created(account: modelAccount, organization: string): Event {
			return { organization, entity: "account", action: "created", data: account }
		}
	}
	export namespace Operation {
		export function performed(operation: modelOperation, organization: string, account: string): Event {
			return { organization, account, entity: "operation", action: "performed", data: operation }
		}
	}
	export namespace Organization {
		export function created(organization: modelOrganization): Event {
			return { entity: "organization", action: "created", data: organization }
		}
	}
	export namespace Rail {
		export function added(rail: modelRail, organization: string, account: string): Event {
			return { organization, account, entity: "rail", action: "added", data: rail }
		}
	}
	export namespace Transaction {
		export function initiated(transaction: modelTransaction, organization: string, account: string): Event {
			return {
				organization,
				account,
				entity: "transaction",
				action: "initiated",
				data: transaction,
			}
		}
		export function finalized(transaction: modelTransaction, organization: string, account: string): Event {
			return {
				organization,
				account,
				entity: "transaction",
				action: "finalized",
				data: transaction,
			}
		}
		export function incoming(transaction: modelTransaction, organization: string, account: string): Event {
			return {
				organization,
				account,
				entity: "transaction",
				action: "incoming",
				data: transaction,
			}
		}
		export function validated(transaction: modelTransaction, organization: string, account: string): Event {
			return {
				organization,
				account,
				entity: "transaction",
				action: "validated",
				data: transaction,
			}
		}
		export function expired(transaction: modelTransaction, organization: string, account: string): Event {
			return {
				organization,
				account,
				entity: "transaction",
				action: "expired",
				data: transaction,
			}
		}
	}
	export namespace Supplier {
		export namespace PaxGiro {
			export function response(response: any, organization: string, account: string): Event {
				return {
					organization,
					account,
					entity: "supplier",
					action: "transaction response",
					data: response,
				}
			}
		}
	}
}
