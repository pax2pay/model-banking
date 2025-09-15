import { gracely } from "gracely"
import { Realm } from "../Realm"
import { Access } from "./Access"
import { JWT } from "./JWT"

export class Identity {
	get realm(): Realm {
		return this.payload.realm
	}
	constructor(public readonly payload: JWT.Payload, public readonly jwt: string) {}

	authenticate(constraint: Access.Permission | Access.Permission[]): Identity | gracely.Error {
		let allowed: boolean
		if (Array.isArray(constraint))
			allowed = constraint.some(c => this.authenticate(c))
		else
			allowed = Access.Permission.check(constraint, this.payload.permission)
		return allowed ? this : gracely.client.forbidden()
	}

	/** Key will default to production jwt verification key */
	static async open(
		authorization: string | undefined,
		options?: { get?: (id: string) => Promise<JWT.Payload.LongTerm | undefined>; key?: string }
	): Promise<Identity | gracely.Error> {
		const jwt = authorization?.startsWith("Bearer ") ? authorization.replace("Bearer ", "") : undefined
		const payload = jwt ? await JWT.open({ public: options?.key }, options?.get).verify(jwt) : undefined
		return jwt && payload ? new Identity(payload, jwt) : gracely.client.unauthorized()
	}
}
export namespace Identity {}
