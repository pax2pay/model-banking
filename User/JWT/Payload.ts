import { isly } from "isly"
import { Realm } from "../../Realm"
import { zod } from "../../zod"
import { Access } from "../Access"

export type Payload = Payload.LongTerm | Payload.ShortTerm //zod.infer<typeof Payload.typeZod>
export namespace Payload {
	export type Creatable = zod.infer<typeof Creatable.typeZod>
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			sub: isly.string(),
			permission: Access.Permission.type,
			realm: Realm.type,
		})
		export const typeZod = zod.object({
			sub: zod.string(),
			permission: Access.Permission.typeZod,
			realm: Realm.typeZod,
		})
	}
	export type Base = zod.infer<typeof Base.typeZod>
	export namespace Base {
		export const type = isly.object<Base>({
			aud: isly.string(),
			iat: isly.number(),
			iss: isly.string(),
			sub: isly.string(),
			permission: Access.Permission.type,
			realm: Realm.type,
			token: isly.string().optional(),
		})
		export const typeZod = zod.object({
			aud: zod.string(),
			iat: zod.number(),
			iss: zod.string(),
			sub: zod.string(),
			permission: Access.Permission.typeZod,
			realm: Realm.typeZod,
			token: zod.string().optional(),
		})
	}
	export type LongTerm = zod.infer<typeof LongTerm.typeZod>
	export namespace LongTerm {
		export const type = Base.type.extend<LongTerm>({ id: isly.string() })
		export const typeZod = Base.typeZod.extend({ id: zod.string() })
	}
	export type ShortTerm = zod.infer<typeof ShortTerm.typeZod>
	export namespace ShortTerm {
		export const type = Base.type.extend<ShortTerm>({ exp: isly.number() })
		export const typeZod = Base.typeZod.extend({ exp: zod.number() })
	}
	export const configuration = { aud: "https://banking.pax2pay.app", iss: "pax2pay" }
	export const type = isly.union<Payload>(LongTerm.type, ShortTerm.type)
	export const typeZod = zod.union([LongTerm.typeZod, ShortTerm.typeZod])
}
