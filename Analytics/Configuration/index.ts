import { AuditLog as ConfigAuditLog } from "./AuditLog"
import { Base as ConfigBase } from "./Base"
import { Operation as ConfigOperation } from "./Operation"
import { Transaction as ConfigTransaction } from "./Transaction"

export namespace Configuration {
	export import Base = ConfigBase
	export import Transaction = ConfigTransaction
	export import Operation = ConfigOperation
	export import AuditLog = ConfigAuditLog
}
export type FlattenKeys<T extends Record<string, unknown>> = {
	[K in Extract<keyof T, string>]: T[K] extends Record<string, unknown> ? K | `${K}.${Extract<keyof T[K], string>}` : K
}[Extract<keyof T, string>]
