import { isly } from "isly"
import { Permission as AccessPermission } from "./Permission"

/** read < write < developer < admin */
export interface Access {
	uk?: Access.Permission.Realm
	uguk?: Access.Permission.Realm
	eea?: Access.Permission.Realm
	test?: Access.Permission.Realm
	"*"?: Access.Permission.Global
}
export namespace Access {
	export import Permission = AccessPermission
	export const type = isly.object({
		uk: Access.Permission.type.optional(),
		uguk: Access.Permission.type.optional(),
		eea: Access.Permission.type.optional(),
		test: Access.Permission.type.optional(),
		"*": isly.object({ user: Access.Permission.Level.type.optional() }).optional(),
	})
}
