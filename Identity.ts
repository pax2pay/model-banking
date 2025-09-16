import { gracely } from "gracely"
import { userwidgets } from "@userwidgets/model"
import { storage } from "cloudly-storage"
import { slackly } from "slackly"
import { Key } from "./Key"
import { Realm } from "./Realm"
import { User } from "./User"

export class Identity<T extends Identity.Require = never> {
	#realms: Realm[] | undefined
	get realms(): Realm[] | undefined {
		return (this.#realms ??= Identity.getRealms(this.key.permissions))
	}

	constructor(
		readonly key: Key,
		readonly realm: T["realm"] extends true ? Realm : Realm | undefined,
		readonly organization: T["organization"] extends true ? string : string | undefined
	) {}
	check(constraint: Key.Permissions | Key.Permissions[], realm?: Realm, organization?: string): boolean {
		return Array.isArray(constraint)
			? constraint.some(c => this.check(c, realm, organization))
			: [
					{ [`${realm ?? this.realm}-${organization ?? this.organization}`]: constraint },
					{ [`${organization ?? this.organization}`]: constraint },
					{ [`${realm ?? this.realm}-*`]: constraint },
					{ [`*-*`]: constraint },
			  ].some(e => userwidgets.User.Permissions.check(this.key.permissions, e))
	}
	collectionCheck(collection: string): boolean {
		return Object.values(this.key.permissions).some(
			value => (typeof value == "object" && value[collection]) || value == true
		)
	}

	static async authenticate<T extends Identity.Require = Record<string, never>>(
		header: Identity.Header,
		constraint: Key.Permissions | Key.Permissions[],
		requires?: T,
		key?: string,
		output?: "undefined",
		notify?: Identity.Notify,
		store?: storage.KeyValueStore<User.JWT.Payload.LongTerm>
	): Promise<Identity<T> | undefined>
	static async authenticate<T extends Identity.Require = Record<string, never>>(
		header: { authorization?: string | undefined; realm?: Realm; organization?: string },
		constraint: Key.Permissions | Key.Permissions[],
		requires?: T,
		key?: string,
		output?: "error",
		notify?: Identity.Notify,
		store?: storage.KeyValueStore<User.JWT.Payload.LongTerm>
	): Promise<Identity<T> | gracely.Error>
	static async authenticate<T extends Identity.Require = Record<string, never>>(
		header: { authorization?: string | undefined; realm?: Realm; organization?: string },
		constraint: Key.Permissions | Key.Permissions[],
		requires?: T,
		key: string = publicKey,
		output: "error" | "undefined" = "undefined",
		notify?: Identity.Notify,
		store?: storage.KeyValueStore<User.JWT.Payload.LongTerm>
	): Promise<Identity<T> | (gracely.Error | undefined)> {
		let result: Identity<T> | gracely.Error | undefined
		const authorization = header.authorization?.startsWith("Bearer ")
			? header.authorization.replace("Bearer ", "")
			: undefined
		const verified = await Identity.verify(authorization, key, store)
		if (!verified)
			output !== "undefined" && (result = gracely.client.unauthorized())
		else {
			const realms = Identity.getRealms(verified.permissions)
			const identity = new Identity(
				verified,
				((realms.length == 1 ? realms[0] : header.realm && realms.includes(header.realm) ? header.realm : undefined) ??
					verified.realm) as Realm,
				(verified.organization ?? header.organization) as string
			)
			const requirement = (
				value: Identity | undefined
			): value is
				| (keyof T extends keyof Identity ? Required<Pick<Identity, keyof T>> & Identity : Identity)
				| undefined =>
				(requires?.organization ? !!identity?.organization : true) &&
				(requires?.realm ? Realm.type.is(identity?.realm) : true)
			if (identity?.check(constraint) && requirement(identity))
				result = identity
			else if (output === "undefined")
				result = undefined
			else {
				await notify?.slack.send(
					"notifications",
					`Unauthorized access attempt at ${notify.method.toUpperCase()} ${notify.endpoint}`
				)
				console.log(
					identity.key.email,
					"unauthorized access attempt at",
					notify?.method.toUpperCase(),
					notify?.endpoint
				)
				result = gracely.client.forbidden()
			}
		}
		return result
	}
	static async verify(
		authorization: string | undefined,
		key: string = publicKey,
		store?: storage.KeyValueStore<User.JWT.Payload.LongTerm>
	): Promise<Key | undefined> {
		const verifier = userwidgets.User.Key.Verifier.create<Key>(key)
		const jwt = User.JWT.open({ public: key }, store)
		const unpacked = authorization ? await jwt.unpack(authorization) : undefined
		let verified: Key | undefined
		if (User.JWT.Payload.type.is(unpacked) && authorization) {
			const payload = await jwt.verify(authorization)
			verified = payload && Key.from(payload, authorization)
		} else
			verified = await verifier.verify(authorization)
		return verified
	}
	static async getRealm(header: Identity.Header, key: string = publicKey): Promise<Realm | undefined> {
		let result: Realm | undefined
		const authorization = header.authorization?.startsWith("Bearer ")
			? header.authorization.replace("Bearer ", "")
			: undefined
		const jwt = User.JWT.open({ public: key })
		const unpacked = authorization ? await jwt.unpack(authorization) : undefined
		if (User.JWT.Payload.type.is(unpacked))
			result = unpacked.realm
		else {
			const verified = await userwidgets.User.Key.Verifier.create<Key>(key).verify(authorization)
			const realms = verified && Identity.getRealms(verified.permissions)
			result =
				realms &&
				(realms.length == 1 ? realms[0] : header.realm && realms.includes(header.realm) ? header.realm : undefined)
		}
		return result
	}
	static getRealms(permissions: Key.Permissions): Realm[] {
		return [
			...new Set(
				Object.keys(permissions).flatMap(code =>
					code.split("-").length > 1 && code.split("-")[0] == "*"
						? Realm.realms
						: Realm.type.get(code.split("-")[0]) ?? []
				)
			),
		]
	}
}

export namespace Identity {
	export type Require = {
		realm?: true
		organization?: true
	}
	export interface Header {
		authorization?: string | undefined
		realm?: Realm
		organization?: string
	}
	export type Notify = {
		slack: slackly.Connection<"notifications">
		endpoint: string
		method: string
	}
}
const publicKey =
	"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2W8CD2kpfS4QIRV2/rgm4NVvsvJsYNMHtnIl9ADvO3A81hAmRKvOAPVoXICe6+EuZ47jGjGL7f48GEoQuITfBPv/MosCDj1YhJ56ILDynCSd8FlxDrhv8pl5IquST7tcL6Hc6m+vuvoTLrFQ5QqNxv0a5eDd/YTrWv7SUuRfBEhYd/wMysGynN3QauHqy5ceBCt1nv1MJLGlSzczMRK7wjy1zi2g9NCHZBOoo1HXOpi727Xh+YXHc9EP2TN0oOXyxykv45nkGIDI0Qek3/pfkavClBffc1sEqA+rUx7YqRN9KGYxwLMLug+NOOh3ptqjfobXbR5fx/sUWhvcjUMTE1JreTrWYbGmVnjd/SeYSClfmGhdTBUfqnZbaABv0ruTXva18qRhP4y143vHMk/k8HzbuROTKAzrtEeLIjgwUgDcnE+JwDqcb8tKSGV6i++TiTldlSBCRTT4dK2hpHJje80b2abqtrbCkxbJlT98UsAAoiq2eW1X6lYmCfiGCJPkfswibQ2tPAKKNe/2xuHPsjx4FuXGmV0dbzmCwSIQoApXqOvKzoNFi6AaKIjxfNmiEigLwKpNrw08H0lVZbq/9MMxI3TzMTZjY9QmBKVLSGy3Z6IJqZpyK22lv7whJcllG0Qw8tv8+7wmC8SR3+4jpuxuFGZ+69CW+otx+CPMJjcCAwEAAQ=="
