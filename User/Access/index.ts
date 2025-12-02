import { isly } from "isly"
import { zod } from "zod"
import { Permission as AccessPermission } from "./Permission"

/** read < write < developer < admin */
export type Access = zod.infer<typeof Access.typeZod>
export namespace Access {
	export import Permission = AccessPermission
	export const type = isly.object({
		uk: Access.Permission.type.optional(),
		uguk: Access.Permission.type.optional(),
		eea: Access.Permission.type.optional(),
		test: Access.Permission.type.optional(),
		"*": isly.object({ user: Access.Permission.Level.type.optional() }).optional(),
	})
	export const typeZod = zod.object({
		uk: Access.Permission.typeZod.optional(),
		uguk: Access.Permission.typeZod.optional(),
		eea: Access.Permission.typeZod.optional(),
		test: Access.Permission.typeZod.optional(),
		"*": zod.object({ user: Access.Permission.Level.typeZod.optional() }).optional(),
	})
}
