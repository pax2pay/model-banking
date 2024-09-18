import { filter, listener } from "cloudly-analytics-common"
import { Transaction as ModelTransaction } from "../../Transaction"
import type { FlattenKeys } from "."
import { Base } from "./Base"

export namespace Transaction {
	type Selectors = Base.Selectors | `value.${FlattenKeys<Required<ModelTransaction>>}${"[*]" | ""}`
	export const mapping = {
		...Base.mapping,
		counterpartType: "value.counterpart.type",
		counterpart: { selector: "value.counterpart", transform: "stringify" },
		counterpartCode: "value.counterpart.code",
		currency: "value.currency",
		amount: { selector: "value.amount", transform: "string" },
		description: "value.description",
		organization: "value.organization",
		account: "value.accountId",
		accountName: "value.accountName",
		accountAddress: { selector: "value.account", transform: "stringify" },
		accountType: "value.account.type",
		type: "value.type",
		direction: "value.direction",
		id: "value.id",
		referenceSupplier: "value.reference.supplier",
		referenceReference: "value.reference.reference",
		referenceReturnId: "value.reference.returnId",
		referenceEndToEndId: "value.reference.endToEndId",
		posted: "value.posted",
		transacted: "value.transacted",
		by: "value.by",
		charge: { selector: "value.charge", transform: "string" },
		actualBalance: { selector: "value.balance.actual", transform: "string" },
		reservedBalance: { selector: "value.balance.reserved", transform: "string" },
		availableBalance: { selector: "value.balance.available", transform: "string" },
		operations: { selector: "value.operations[*]", transform: {
			account: "account",
			currency: "currency",
			changes: { 
				selector: "changes", 
				transform: [
					"array",
					{
						key: "key",
						value: {
							selector: "value",
							transform: {
								type: "type",
								amount: { selector: "amount", transform: "string" },
								status: "status",
								result: { selector: "result", transform: "string" }
							}
						}
					}
				]
			},
			type: "type",
			transaction: "transaction",
			counter: { selector: "counter", transform: "string" },
			created: "created",
			signature: "signature",
			previous: "previous",
		}},
		status: "value.status",
		rail: "value.rail",
		flags: "value.flags",
		oldFlags: "value.oldFlags",
		notes: { selector: "value.notes", transform: "stringify" },
		risk: { selector: "value.risk", transform: "string" },
		state: { selector: "value.state", transform: "stringify" },
		// eslint-disable-next-line
	} as const satisfies filter.Mapping.RecordWithSelector<Selectors>;
	export type Fields = keyof typeof mapping
	export const schema: listener.BigQueryApi.BaseField<Fields>[] = [
		...Base.schema,
		{ name: "counterpartType", type: "STRING" },
		{ name: "counterpart", type: "STRING" },
		{ name: "counterpartCode", type: "STRING", mode: "NULLABLE" },
		{ name: "currency", type: "STRING" },
		{ name: "amount", type: "NUMERIC" },
		{ name: "description", type: "STRING" },
		{ name: "organization", type: "STRING" },
		{ name: "account", type: "STRING" },
		{ name: "accountName", type: "STRING", mode: "NULLABLE" },
		{ name: "accountAddress", type: "STRING" },
		{ name: "accountType", type: "STRING" },
		{ name: "type", type: "STRING", mode: "NULLABLE" },
		{ name: "direction", type: "STRING", mode: "NULLABLE" },
		{ name: "id", type: "STRING" },
		{ name: "referenceSupplier", type: "STRING", mode: "NULLABLE" },
		{ name: "referenceReference", type: "STRING", mode: "NULLABLE" },
		{ name: "referenceReturnId", type: "STRING", mode: "NULLABLE" },
		{ name: "referenceEndToEndId", type: "STRING", mode: "NULLABLE" },
		{ name: "posted", type: "TIMESTAMP" },
		{ name: "transacted", type: "TIMESTAMP", mode: "NULLABLE" },
		{ name: "by", type: "STRING", mode: "NULLABLE" },
		{ name: "charge", type: "NUMERIC", mode: "NULLABLE" },
		{ name: "actualBalance", type: "NUMERIC" },
		{ name: "reservedBalance", type: "NUMERIC" },
		{ name: "availableBalance", type: "NUMERIC" },
		{ name: "operations", type: "RECORD", mode: "REPEATED", fields: [
				{ name: "account", type: "STRING" },
				{ name: "currency", type: "STRING" },
				{ name: "changes", type: "RECORD", mode: "REPEATED", fields: [
					{ name: "key", type: "STRING" },
					{ name: "value", type: "RECORD", fields: [
						{ name: "type", type: "STRING" },
						{ name: "amount", type: "NUMERIC" },
						{ name: "status", type: "STRING" },
						{ name: "result", type: "NUMERIC", mode: "NULLABLE" },
					]}
				] },
				{ name: "type", type: "STRING" },
				{ name: "transaction", type: "STRING" },
				{ name: "counter", type: "NUMERIC" },
				{ name: "created", type: "TIMESTAMP" },
				{ name: "signature", type: "STRING" },
				{ name: "previous", type: "STRING" },
			]
		},
		{ name: "status", type: "STRING" },
		{ name: "rail", type: "STRING", mode: "NULLABLE" },
		{ name: "flags", type: "STRING", mode: "REPEATED" },
		{ name: "oldFlags", type: "STRING", mode: "REPEATED" },
		{ name: "notes", type: "STRING" },
		{ name: "risk", type: "NUMERIC", mode: "NULLABLE" },
		{ name: "state", type: "STRING", mode: "NULLABLE" },
	]
}
