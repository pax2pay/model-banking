import { isoly } from "isoly"
import { Audit } from "../../Audit"
import { Realm } from "../../Realm"
import { Base } from "./Base"

export type AuditLog = Base<Audit> & {
	entity: { type: "auditLog"; id: string }
	action: "created"
}
export namespace AuditLog {
	export function create(value: Audit, realm: Realm, action: AuditLog["action"]): AuditLog {
		return {
			realm,
			entity: { type: "auditLog", id: value.id },
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
