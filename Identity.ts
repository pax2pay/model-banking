import { userwidgets } from "@userwidgets/model"
import { Key } from "./Key"
import { Realm } from "./Realm"

export class Identity {
	constructor(readonly key: Key) {}
	check(constraint: Key.Permissions, realm?: Realm, organization?: string) {
		return [
			{ [`${this.key.realm ?? realm}|${this.key.organization ?? organization}`]: constraint },
			{ [`${this.key.realm ?? realm}|*`]: constraint },
			{ [`*|*`]: constraint },
		].some(e => userwidgets.User.Permissions.check(this.key.permissions, e))
	}

	static async authenticate(
		header: { authorization?: string | undefined; realm?: Realm; organization?: string },
		constraint: Key.Permissions,
		verifier?: userwidgets.User.Key.Verifier<Key>
	): Promise<Identity | undefined> {
		const key: Key | undefined = await (verifier ?? productionVerifier)?.verify(header.authorization)
		const result = key && new Identity(key)
		return result?.check(constraint, header.realm, header.organization) ? result : undefined
	}
}
const publicKey = ""
const productionVerifier: userwidgets.User.Key.Verifier<Key> = userwidgets.User.Key.Verifier.create<Key>(publicKey)
