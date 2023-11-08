import { flagly } from "flagly"
import { userwidgets } from "@userwidgets/model"
import { Key } from "./Key"
import { Realm } from "./Realm"

export class Authenticator {
	private readonly verifier: userwidgets.User.Key.Verifier<Key> = userwidgets.User.Key.Verifier.create<Key>(this.key)

	constructor(private readonly key: string) {}
	async authenticate(token: string, permissions: Key.Permissions): Promise<boolean> {
		let result: boolean
		// const key = { role: { test: "admin" } } as const
		// await this.verifier.verify(token)
		const key: { permissions: Key.Permissions; role?: Key.Permissions.Role } = {
			permissions: { asdf: { cards: true } },
		}
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
