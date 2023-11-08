import { flagly } from "flagly"
import { authly } from "authly"
import { userwidgets } from "@userwidgets/model"
import { Key } from "./Key"
import { Realm } from "./Realm"

export const a: authly.Property.Transformer = {
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
		this.verifier.add(a)
	}
	async authenticate(token: string, permissions: Key.Permissions): Promise<boolean> {
		let result: boolean
		const key = await this.verifier.verify(token)
		if (!key)
			result = false
		else if (key?.role) {
			const rolePermissions = Object.fromEntries(
				(Object.entries(key.role) as [Realm, Key.Permissions.Role][]).map(([realm, role]) => [
					realm,
					Key.Permissions.role[role],
				])
			) as Partial<Record<"*" | Realm, Key.Permissions.Realms>>
			result = flagly.get.path(rolePermissions, flagly.Flags.stringify(permissions))
		} else
			result = flagly.get.path(key.permissions, flagly.Flags.stringify(permissions))
		return result
	}
}
