import { AuditLog as ConfigAuditLog } from "./AuditLog"
import { Base as ConfigBase } from "./Base"
import { Ledger as ConfigLedger } from "./Ledger"
import { Transaction as ConfigTransaction } from "./Transaction"

export namespace Configuration {
	export import Base = ConfigBase
	export import Ledger = ConfigLedger
	export import AuditLog = ConfigAuditLog
	export import Transaction = ConfigTransaction
}
export type FlattenKeys<T extends Record<string, unknown>> = {
	[K in Extract<keyof T, string>]: T[K] extends Record<string, unknown> ? K | `${K}.${Extract<keyof T[K], string>}` : K
}[Extract<keyof T, string>]
