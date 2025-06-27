import { gracely } from "gracely"
import { userwidgets } from "@userwidgets/model"
import { slackly } from "slackly"
import { Key } from "./Key"
import { Realm } from "./Realm"

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
		verifier?: userwidgets.User.Key.Verifier<Key>,
		output?: "undefined",
		notify?: Identity.Notify
	): Promise<Identity<T> | undefined>
	static async authenticate<T extends Identity.Require = Record<string, never>>(
		header: { authorization?: string | undefined; realm?: Realm; organization?: string },
		constraint: Key.Permissions | Key.Permissions[],
		requires?: T,
		verifier?: userwidgets.User.Key.Verifier<Key>,
		output?: "error",
		notify?: Identity.Notify
	): Promise<Identity<T> | gracely.Error>
	static async authenticate<T extends Identity.Require = Record<string, never>>(
		header: { authorization?: string | undefined; realm?: Realm; organization?: string },
		constraint: Key.Permissions | Key.Permissions[],
		requires?: T,
		verifier: userwidgets.User.Key.Verifier<Key> = productionVerifier,
		output: "error" | "undefined" = "undefined",
		notify?: Identity.Notify
	): Promise<Identity<T> | (gracely.Error | undefined)> {
		let result: Identity<T> | gracely.Error | undefined
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
	"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAskunS2sOXSIOBMHnKDY0zYbZZqy6LJDIFuBluYuHPafrf4uWQ/edmLXfcZ5B8o+ZqO4bInoz0IyDBgKsIhy0zx3PDpWfp3brcbVczfidWjqehdOb93qpr620L9zDVGxVRm0ePM/MMx+RuIC0PmiXlz4My36V41N0mRFE+IbuzhxNRWxGv7yBx9UG06L7TIE/ukwq7wnu28MATm6pf2wVa6DwfvOUFiJV6UncBRVBtiV5WPvarwE4RGUi4yq/bf03SPN7yxqFkTKuuJYUzI2I7iyLlJ4kgFW+sQ+5lb0uxarDYUxXTAJWqbaT39RRWyoS4N9xs7JkmwoClwTHPClfxh0ZuVZGYuNYEc+tNpkgD0SSKYryHXVEhoDGqOes/gLeiKqJFlQmKYGJAp6LxLdk4sROvcHBLF4kus/VNFhO1Uuev0a61F8OeTM6GkdMp9ueFh17N03VAoyLRhVsLA5MJtyPe9MOmvizezlfCSDu2o5hwUPwRMzHTRaYlAyI8RryL/JlZ0y/sMMatP9SxuA+CkDB+ez2Hzm+qRjExBdZiqTNJ4mK0pCJyBVPKu1/rKHCZNmCmkNfdloCdAQpA/ySjttQYAuT0WISWTB2cd6qMjaNRKTcVVzuF9CpsL4IFUsmj+fq+bEtLn9Ovoz6kXZF2Rak3vwEqBP6TKusL9Piv9sCAwEAAQ=="
const productionVerifier = userwidgets.User.Key.Verifier.create<Key>(publicKey)
