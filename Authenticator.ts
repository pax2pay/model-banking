import { flagly } from "flagly"
import { userwidgets } from "@userwidgets/model"
import { Key } from "./Key"
import { Realm } from "./Realm"

export class Authenticator {
	private readonly verifier: userwidgets.User.Key.Verifier<Key> = userwidgets.User.Key.Verifier.create<Key>(this.key)

	constructor(private readonly key: string) {}
	async authenticate(token: string | undefined, ...permissions: Key.Permissions[]): Promise<Key | false | undefined> {
		let result: Key | false | undefined
		const key = await this.verifier.verify(token)
		if (!key)
			result = undefined
		else if ("role" in key.permissions && key.permissions.role) {
			const rolePermissions = fromRole(key.permissions.role)
			console.log("rolePermissions: ", rolePermissions)
			console.log("required permissions: ", permissions)
			result = permissions.some(p => flagly.get.path(rolePermissions, flagly.Flags.stringify(p))) && key
		} else {
			console.log("key permissions: ", key.permissions)
			console.log("required permissions: ", permissions)
			// Object.entries(key.permissions).map(([realm, o]) => console.log(o))
			// "*" in permissions && (permissions = findRealmPermissions(key.permissions, permissions))
			// "*" in key.permissions && (key.permissions = findRealmPermissions(permissions, key.permissions))
			result = permissions.some(p => flagly.get.path(key.permissions, flagly.Flags.stringify(p))) && key
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
export function findRealmPermissions(permissions: Key.Permissions, starPermissions: Key.Permissions): Key.Permissions {
	return { [Object.keys(permissions)[0]]: starPermissions["*"] }
}
