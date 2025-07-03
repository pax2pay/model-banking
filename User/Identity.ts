import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Realm } from "../Realm"
import { Access } from "./Access"
import { JWT } from "./JWT"

export class Identity {
	get realm(): Realm {
		return this.payload.realm
	}
	constructor(private readonly payload: JWT.Payload, private readonly jwt: string) {}

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
		header: http.Request.Header,
		options: { whitelist?: JWT.Whitelist; key?: string }
	): Promise<Identity | gracely.Error> {
		const jwt = header.authorization?.startsWith("Bearer ") ? header.authorization.replace("Bearer ", "") : undefined
		const payload = jwt
			? await JWT.open({ public: options.key ?? Identity.key }, options.whitelist).verify(jwt)
			: undefined
		return jwt && payload ? new Identity(payload, jwt) : gracely.client.unauthorized()
	}
}
export namespace Identity {
	export const key =
		"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2W8CD2kpfS4QIRV2/rgm4NVvsvJsYNMHtnIl9ADvO3A81hAmRKvOAPVoXICe6+EuZ47jGjGL7f48GEoQuITfBPv/MosCDj1YhJ56ILDynCSd8FlxDrhv8pl5IquST7tcL6Hc6m+vuvoTLrFQ5QqNxv0a5eDd/YTrWv7SUuRfBEhYd/wMysGynN3QauHqy5ceBCt1nv1MJLGlSzczMRK7wjy1zi2g9NCHZBOoo1HXOpi727Xh+YXHc9EP2TN0oOXyxykv45nkGIDI0Qek3/pfkavClBffc1sEqA+rUx7YqRN9KGYxwLMLug+NOOh3ptqjfobXbR5fx/sUWhvcjUMTE1JreTrWYbGmVnjd/SeYSClfmGhdTBUfqnZbaABv0ruTXva18qRhP4y143vHMk/k8HzbuROTKAzrtEeLIjgwUgDcnE+JwDqcb8tKSGV6i++TiTldlSBCRTT4dK2hpHJje80b2abqtrbCkxbJlT98UsAAoiq2eW1X6lYmCfiGCJPkfswibQ2tPAKKNe/2xuHPsjx4FuXGmV0dbzmCwSIQoApXqOvKzoNFi6AaKIjxfNmiEigLwKpNrw08H0lVZbq/9MMxI3TzMTZjY9QmBKVLSGy3Z6IJqZpyK22lv7whJcllG0Qw8tv8+7wmC8SR3+4jpuxuFGZ+69CW+otx+CPMJjcCAwEAAQ=="
}
