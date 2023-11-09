import { flagly } from "flagly"
import { authly } from "authly"
import { userwidgets } from "@userwidgets/model"
import { Key } from "./Key"
import { Realm } from "./Realm"

const roleTransformer: authly.Property.Transformer = {
	apply(payload: authly.Payload) {
		return undefined
	},
	reverse(payload: authly.Payload) {
		payload && "role" in payload && typeof payload.role == "string" && (payload.role = JSON.parse(payload.role))
		return payload
	},
}

export class Authenticator {
	private readonly verifier: userwidgets.User.Key.Verifier<Key> = userwidgets.User.Key.Verifier.create<Key>(this.key)

	constructor(private readonly key: string) {
		this.verifier.add(roleTransformer)
	}
	async authenticate(token: string, permissions: Key.Permissions): Promise<Key | false | undefined> {
		let result: Key | false | undefined
		const key = await this.verifier.verify(token)
		if (!key)
			result = undefined
		else if (key?.role) {
			let rolePermissions = fromRole(key.role)
			"*" in permissions && (permissions = findRealmPermissions(rolePermissions, permissions))
			"*" in rolePermissions && (rolePermissions = findRealmPermissions(permissions, rolePermissions))
			console.log("role permissions: ", rolePermissions)
			console.log("required perms: ", permissions)
			result = flagly.get.path(rolePermissions, flagly.Flags.stringify(permissions)) && {
				...key,
				permissions: rolePermissions,
			}
		} else {
			"*" in permissions && (permissions = findRealmPermissions(key.permissions, permissions))
			"*" in key.permissions && (key.permissions = findRealmPermissions(permissions, key.permissions))
			console.log("key permissions: ", key.permissions)
			console.log("required perms: ", permissions)
			result = flagly.get.path(key.permissions, flagly.Flags.stringify(permissions)) && key
		}
		return result
	}
}
function fromRole(role: Partial<Record<"*" | Realm, Key.Permissions.Role>>): Key.Permissions {
	return Object.fromEntries(
		(Object.entries(role) as [Realm, Key.Permissions.Role][]).map(([realm, role]) => [
			realm,
			Key.Permissions.role[role],
		])
	) as Partial<Record<"*" | Realm, Key.Permissions.Realm>>
}
function findRealmPermissions(permissions: Key.Permissions, starPermissions: Key.Permissions): Key.Permissions {
	const realm = Object.keys(permissions).find(k => Realm.is(k))
	console.log("realm: ", realm)

	return typeof realm == "string" ? { [realm]: starPermissions["*"] } : {}
}
// "*" in key.permissions
// ? (Object.keys(permissions).forEach((k: "*" | Realm) => (key.permissions[k] = key.permissions["*"])),
// delete key.permissions["*"])
// : (Object.keys(key.permissions).forEach((k: "*" | Realm) => (permissions[k] = permissions["*"])),
// delete permissions["*"])
