import { gracely } from "gracely"
import { userwidgets } from "@userwidgets/model"
import { Key } from "./Key"
import { Realm } from "./Realm"

export class Identity {
	#realms: Realm[] | undefined
	get realms(): Realm[] | undefined {
		return (this.#realms ??= Identity.getRealms(this.key.permissions))
	}

	constructor(readonly key: Key, readonly realm?: Realm, readonly organization?: string) {}
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

	static async authenticate<T extends Partial<Record<"realm" | "organization", true>> = Record<string, never>>(
		header: { authorization?: string | undefined; realm?: Realm; organization?: string },
		constraint: Key.Permissions | Key.Permissions[],
		requires?: T,
		verifier?: userwidgets.User.Key.Verifier<Key>,
		output?: "undefined"
	): Promise<(keyof T extends keyof Identity ? Required<Pick<Identity, keyof T>> & Identity : Identity) | undefined>
	static async authenticate<T extends Partial<Record<"realm" | "organization", true>> = Record<string, never>>(
		header: { authorization?: string | undefined; realm?: Realm; organization?: string },
		constraint: Key.Permissions | Key.Permissions[],
		requires?: T,
		verifier?: userwidgets.User.Key.Verifier<Key>,
		output?: "error"
	): Promise<(keyof T extends keyof Identity ? Required<Pick<Identity, keyof T>> & Identity : Identity) | gracely.Error>
	static async authenticate<T extends Partial<Record<"realm" | "organization", true>> = Record<string, never>>(
		header: { authorization?: string | undefined; realm?: Realm; organization?: string },
		constraint: Key.Permissions | Key.Permissions[],
		requires?: T,
		verifier?: userwidgets.User.Key.Verifier<Key>,
		output?: "error" | "undefined"
	): Promise<
		| (keyof T extends keyof Identity ? Required<Pick<Identity, keyof T>> & Identity : Identity)
		| (gracely.Error | undefined)
	>
	static async authenticate<T extends Partial<Record<"realm" | "organization", true>> = Record<string, never>>(
		header: { authorization?: string | undefined; realm?: Realm; organization?: string },
		constraint: Key.Permissions | Key.Permissions[],
		requires?: T,
		verifier: userwidgets.User.Key.Verifier<Key> = productionVerifier,
		output: "error" | "undefined" = "undefined"
	): Promise<
		| (keyof T extends keyof Identity ? Required<Pick<Identity, keyof T>> & Identity : Identity)
		| (gracely.Error | undefined)
	> {
		let result:
			| (keyof T extends keyof Identity ? Required<Pick<Identity, keyof T>> & Identity : Identity)
			| gracely.Error
			| undefined
		const authorization = header.authorization?.startsWith("Bearer ")
			? header.authorization.replace("Bearer ", "")
			: undefined
		const key = await Identity.verify(authorization, verifier)
		if (!key)
			output !== "undefined" && (result = gracely.client.unauthorized())
		else {
			const realms = Identity.getRealms(key.permissions)
			const identity = new Identity(
				key,
				(realms?.length == 1 ? realms[0] : header.realm) as Realm,
				(key.organization ?? header.organization) as string
			)
			const requirement = (
				value: Identity | undefined
			): value is
				| (keyof T extends keyof Identity ? Required<Pick<Identity, keyof T>> & Identity : Identity)
				| undefined =>
				(requires?.organization ? !!identity?.organization : true) &&
				(requires?.realm ? Realm.type.is(identity?.realm) : true)
			result =
				(identity?.check(constraint) && requirement(identity) && identity) ||
				(output === "undefined" ? undefined : gracely.client.forbidden())
		}
		return result
	}
	static async verify(
		authorization: string | undefined,
		verifier: userwidgets.User.Key.Verifier<Key> = productionVerifier
	): Promise<Key | undefined> {
		return await verifier.verify(authorization)
	}
	static getRealms(permissions: Key.Permissions): Realm[] {
		return [
			...new Set(
				Object.keys(permissions).flatMap(code =>
					code.split("-")[0] == "*" ? Realm.realms : Realm.type.get(code.split("-")[0]) ?? []
				)
			),
		]
	}
}
const publicKey =
	"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2W8CD2kpfS4QIRV2/rgm4NVvsvJsYNMHtnIl9ADvO3A81hAmRKvOAPVoXICe6+EuZ47jGjGL7f48GEoQuITfBPv/MosCDj1YhJ56ILDynCSd8FlxDrhv8pl5IquST7tcL6Hc6m+vuvoTLrFQ5QqNxv0a5eDd/YTrWv7SUuRfBEhYd/wMysGynN3QauHqy5ceBCt1nv1MJLGlSzczMRK7wjy1zi2g9NCHZBOoo1HXOpi727Xh+YXHc9EP2TN0oOXyxykv45nkGIDI0Qek3/pfkavClBffc1sEqA+rUx7YqRN9KGYxwLMLug+NOOh3ptqjfobXbR5fx/sUWhvcjUMTE1JreTrWYbGmVnjd/SeYSClfmGhdTBUfqnZbaABv0ruTXva18qRhP4y143vHMk/k8HzbuROTKAzrtEeLIjgwUgDcnE+JwDqcb8tKSGV6i++TiTldlSBCRTT4dK2hpHJje80b2abqtrbCkxbJlT98UsAAoiq2eW1X6lYmCfiGCJPkfswibQ2tPAKKNe/2xuHPsjx4FuXGmV0dbzmCwSIQoApXqOvKzoNFi6AaKIjxfNmiEigLwKpNrw08H0lVZbq/9MMxI3TzMTZjY9QmBKVLSGy3Z6IJqZpyK22lv7whJcllG0Qw8tv8+7wmC8SR3+4jpuxuFGZ+69CW+otx+CPMJjcCAwEAAQ=="
const productionVerifier = userwidgets.User.Key.Verifier.create<Key>(publicKey)
