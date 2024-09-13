import { filter, listener } from "cloudly-analytics-common"
import { Audit } from "../../Audit"

export namespace AuditLog {
	type Selectors = `value.${Exclude<keyof Audit, "resource"> | `resource.${keyof Audit["resource"]}`}`
	export const mapping = {
		auditCreated: "value.created",
		resourceId: "value.resource.id",
		resourceType: "value.resource.type",
		resourceAction: "value.resource.action",
		before: { selector: "value.resource.before", transform: "stringify" },
		after: { selector: "value.resource.after", transform: "stringify" },
		by: "value.by",
		messages: "value.messages"
		// eslint-disable-next-line
	} as const satisfies filter.Mapping.RecordWithSelector<Selectors>;
	export type Fields = keyof typeof mapping
	export const schema: listener.BigQueryApi.BaseField<Fields>[] = [
		{ name: "auditCreated", type: "TIMESTAMP" },
		{ name: "resourceId", type: "STRING" },
		{ name: "resourceType", type: "STRING" },
		{ name: "resourceAction", type: "STRING" },
		{ name: "before", type: "STRING" },
		{ name: "after", type: "STRING" },
		{ name: "by", type: "STRING" },
		{ name: "messages", type: "STRING", mode: "REPEATED" },
	]
}
