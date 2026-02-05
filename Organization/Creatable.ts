import { isly } from "isly"
import { Rule } from "../Rule"
import { type as ruleType } from "../Rule/type"
import { Contact } from "./Contact"
import { Fx } from "./Fx"
import { Risk } from "./Risk"

export interface Creatable {
	name: string
	code: string
	risk: Risk
	rules?: Rule[]
	contact?: Contact.Creatable
	groups?: string[]
	fx?: Fx
}
export namespace Creatable {
	export const type = isly.object<Creatable>({
		name: isly.string(),
		code: isly.string(new RegExp(/^[A-Za-z0-9\-_]+$/)),
		risk: Risk.type,
		rules: ruleType.array().optional(),
		contact: Contact.Creatable.type.optional(),
		groups: isly.string().array().optional(),
		fx: Fx.type.optional(),
	})
}
