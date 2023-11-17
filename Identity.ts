import { userwidgets } from "@userwidgets/model"
import { Key } from "./Key"
import { Realm } from "./Realm"

export class Identity {
	constructor(readonly key: Key) {}
	check(constraint: Key.Permissions, realm?: Realm, organization?: string) {
		return [
			{ [`${this.key.realm ?? realm}-${this.key.organization ?? organization}`]: constraint },
			{ [`${this.key.realm ?? realm}-*`]: constraint },
			{ [`*-*`]: constraint },
		].some(e => userwidgets.User.Permissions.check(this.key.permissions, e))
	}

	static async authenticate(
		header: { authorization?: string | undefined; realm?: Realm; organization?: string },
		constraint: Key.Permissions,
		verifier: userwidgets.User.Key.Verifier<Key> = productionVerifier
	): Promise<Identity | undefined> {
		const key: Key | undefined = await verifier.verify(header.authorization)
		const result = key && new Identity(key)
		return result?.check(constraint, header.realm, header.organization) ? result : undefined
	}
}
const publicKey =
	"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAtEHMQ+myaJa+0MvItYX936J78rgykGpMaf7qeQ+UENauyjzAJIPGyjMMim/t1cdnhf4a4i8v4EaQMyQXcOheIyZDs6ps7s5HDqvq9WrPVevP6N8QiFT1n5WKyMakzVtDSh6wva9PTihFoRQcZEvaio9fUXNLT0qxiB6bmwXMA+oGuVWCymqLcOY3ZLbKBYt1symO9YSpTR1jaUiGtzWtaYZ2QrWZ25LimhVkgv1ewgtMx9ybH/MiRvL29u8tttvVdFoAgABP+LHJrUQG0ykWopgNQHoWNUusqplSinHJy1avgG/xH2g8wiGR8byBsnEITq6qk3ShTV/pZfHo2ckvQzYaL17/sU4+G1lscJNoB0nQkwgTopCWbBHjxV9xNyM3CbQbdo113QcqXKlNWxeUUEVttIat+zZhcr43JZPvTfHxzLLVnsT7d9FTgsJpiolOirCJ4uW4YUKmngTNWV1dkjhe5cFAX346YcwdO0oDUcWdiGg1zD739HDsMZy9s8CPcRWHZlYntVfELqoILlaO3GEaGaY3dEV2TgWOwYwIWgTTfXWC+LO+ybxafb/DyHKmPZMhox2mITuodigNtRrfhLk2xVYQjeBpQd++nbChj2GLeGCOaLAqq2ZpVOEMgG9jHpUiGeqhk81D4YCRJvy0ubRVg/oqrfUTQtnFiURQy4UCAwEAAQ=="
const productionVerifier = userwidgets.User.Key.Verifier.create<Key>(publicKey)
