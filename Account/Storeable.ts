import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Organization } from "../Organization"
import { Realm } from "../Realm"
import { Creatable } from "./Creatable"

export namespace Account {
	export interface Storable {
		realm: Realm
		organization: string
		name: string
		id: cryptly.Identifier
		created: isoly.DateTime
	}
	export function fromCreatable(account: Creatable, organization: Organization): Account.Storable {
		return {
			...account,
			realm: organization.realm,
			organization: organization.code,
			id: cryptly.Identifier.generate(8),
			created: isoly.DateTime.now(),
		}
	}
	export namespace Storable {
		export const type = isly.object<Account.Storable>({
			realm: Realm.type,
			organization: isly.string(),
			name: isly.string(),
			id: isly.string(),
			created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		})
		export const is = type.is
		export const flaw = type.flaw
	}
}
