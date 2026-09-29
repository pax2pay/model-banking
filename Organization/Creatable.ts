import { isly } from "isly"
import { zod } from "../zod"
import { Contact } from "./Contact"
import { Fx } from "./Fx"
import { Risk } from "./Risk"

export interface Creatable {
	name: string
	code: string
	risk: Risk
	contact?: Contact.Creatable
	fx?: Fx
}
export namespace Creatable {
	export const type = isly.object<Creatable>({
		name: isly.string(),
		code: isly.string(new RegExp(/^[A-Za-z0-9\-_]+$/)),
		risk: Risk.type,
		contact: Contact.Creatable.type.optional(),
		fx: Fx.type.optional(),
	})
	export const typeZod: zod.ZodType<Creatable> = zod
		.object({
			name: zod.string(),
			code: zod.string().regex(/^[A-Za-z0-9\-_]+$/),
			risk: Risk.typeZod,
			contact: Contact.Creatable.typeZod.optional(),
			fx: Fx.typeZod.optional(),
		})
		.meta({ id: "Organization.Creatable" })
}
