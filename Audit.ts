import { storage } from "cloudly-storage"
import { isly } from "isly"

export type Audit = storage.AuditLogger.Entry<Audit.Type>
export namespace Audit {
	export type Type = { [K in keyof typeof Resource.value]: typeof Resource.value[K][number] }
	export type Resource = keyof typeof Resource.value
	export namespace Resource {
		export const value = {
			rule: ["change", "add", "remove"],
			user: ["login", "change"],
			settlements: [
				"archive",
				"collect",
				"create",
				"inspect",
				"payout",
				"remove",
				"expect",
				"issue",
				"create-entry",
				"replace-entry",
			],
			marqeta: ["gateway-create", "gateway-update", "hook-register", "hook-update", "product-create", "user-create"],
			account: [
				"buffer",
				"counterpart-remove",
				"counterpart-replace",
				"listener-create",
				"listener-remove",
				"rail-create",
				"rail-remove",
				"rail-replace",
				"rule-create",
				"rule-remove",
				"rule-replace",
				"create",
				"status",
				"operation",
				"remove",
				"update",
			],
			label: ["create", "remove", "replace"],
			transaction: ["operation", "cancel", "system", "update", "note"],
			organization: [
				"group-replace",
				"listener-create",
				"listener-remove",
				"rule-create",
				"rule-remove",
				"rule-replace",
				"create",
				"remove",
				"update",
				"inactivate",
			],
			route: ["create"],
			clearbank: ["assessmentFailed", "validationFailed"],
		} as const
		export const keys = Object.keys(value) as (keyof typeof value)[]
		export const type = isly.string(keys)
	}
}
