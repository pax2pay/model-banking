import { flagly } from "flagly"
import { authly } from "authly"
import { userwidgets } from "@userwidgets/model"
import { Key } from "./Key"
import { Realm } from "./Realm"

// const roleTransformer: authly.Property.Transformer = {
// 	apply(payload: authly.Payload) {
// 		return undefined
// 	},
// 	reverse(payload: authly.Payload) {
// 		payload && "role" in payload && typeof payload.role == "string" && (payload.role = flagly.parse(payload.role))
// 		return payload
// 	},
// }

export class Authenticator {
	private readonly verifier: userwidgets.User.Key.Verifier<Key> = userwidgets.User.Key.Verifier.create<Key>(this.key)

	constructor(private readonly key: string) {
		// this.verifier.add(roleTransformer)
	}
	async authenticate(token: string | undefined, permissions: Key.Permissions): Promise<Key | false | undefined> {
		let result: Key | false | undefined
		const key = await this.verifier.verify(token)
		if (!key)
			result = undefined
		else if ("role" in key.permissions && key.permissions.role) {
			const rolePermissions = fromRole(key.permissions.role)
			console.log("a: ", a)
		} else {
			Object.entries(key.permissions).map(([realm, o]) => console.log(o))
			"*" in permissions && (permissions = findRealmPermissions(key.permissions, permissions))
			"*" in key.permissions && (key.permissions = findRealmPermissions(permissions, key.permissions))
			result = flagly.get.path(key.permissions, flagly.Flags.stringify(permissions)) && key
		}
		return result
	}
}
function fromRole(roles: Key.Permissions.Roles): Key.Permissions.Realms {
	const result: Key.Permissions.Realms = {}
	for (const realm in roles) {
		for (const role in roles[realm as "*" | Realm]) {
			result[realm as "*" | Realm] = Key.Permissions.role[role as Key.Permissions.Role]
		}
	}
	return result
}
function findRealmPermissions(permissions: Key.Permissions, starPermissions: Key.Permissions): Key.Permissions {
	return { [Object.keys(permissions)[0]]: starPermissions["*"] }
}
