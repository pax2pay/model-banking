import { flagly } from "flagly"
import { userwidgets } from "@userwidgets/model"
import { Key } from "./Key"

export class Authenticator {
	private readonly verifier: userwidgets.User.Key.Verifier<Key> = userwidgets.User.Key.Verifier.create<Key>(this.key)
	constructor(private readonly key: string) {}

	async authenticate(token: string, permissions: Key.Permissions): Promise<boolean> {
		let result: boolean
		const h: flagly.Flags = {} as any
		const key = { role: "fincrime" } as const //await this.verifier.verify(token)
		if (!key)
			result = false
		else if (key?.role) {
			const rolePermissions = Key.Permissions.realmRole[key.role]
			const a = rolePermissions != true && flagly.get(permissions, flagly.Flags.stringify(rolePermissions))
			console.log("a: ", a)
			result = true
		} else
			result = false
		return result
	}
}
