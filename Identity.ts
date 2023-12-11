import { userwidgets } from "@userwidgets/model"
import { Key } from "./Key"
import { Realm } from "./Realm"

export class Identity {
	constructor(readonly key: Key, readonly realm?: Realm, readonly organization?: string) {}
	check(constraint: Key.Permissions, realm?: Realm, organization?: string): boolean {
		return [
			{ [`${realm ?? this.realm}-${organization ?? this.organization}`]: constraint },
			{ [`${organization ?? this.organization}`]: constraint },
			{ [`${realm ?? this.realm}-*`]: constraint },
			{ [`*-*`]: constraint },
		].some(e => userwidgets.User.Permissions.check(this.key.permissions, e))
	}

	static async authenticate(
		header: { authorization?: string | undefined; realm?: Realm; organization?: string },
		constraint: Key.Permissions,
		verifier: userwidgets.User.Key.Verifier<Key> = productionVerifier
	): Promise<Identity | undefined> {
		const authorization = header.authorization?.startsWith("Bearer ")
			? header.authorization.replace("Bearer ", "")
			: undefined
		const key = await verifier.verify(authorization)
		const result =
			key &&
			new Identity(key, (key.realm ?? header.realm) as Realm, (key.organization ?? header.organization) as string)
		return result?.check(constraint) ? result : undefined
	}
}
const publicKey =
	"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2W8CD2kpfS4QIRV2/rgm4NVvsvJsYNMHtnIl9ADvO3A81hAmRKvOAPVoXICe6+EuZ47jGjGL7f48GEoQuITfBPv/MosCDj1YhJ56ILDynCSd8FlxDrhv8pl5IquST7tcL6Hc6m+vuvoTLrFQ5QqNxv0a5eDd/YTrWv7SUuRfBEhYd/wMysGynN3QauHqy5ceBCt1nv1MJLGlSzczMRK7wjy1zi2g9NCHZBOoo1HXOpi727Xh+YXHc9EP2TN0oOXyxykv45nkGIDI0Qek3/pfkavClBffc1sEqA+rUx7YqRN9KGYxwLMLug+NOOh3ptqjfobXbR5fx/sUWhvcjUMTE1JreTrWYbGmVnjd/SeYSClfmGhdTBUfqnZbaABv0ruTXva18qRhP4y143vHMk/k8HzbuROTKAzrtEeLIjgwUgDcnE+JwDqcb8tKSGV6i++TiTldlSBCRTT4dK2hpHJje80b2abqtrbCkxbJlT98UsAAoiq2eW1X6lYmCfiGCJPkfswibQ2tPAKKNe/2xuHPsjx4FuXGmV0dbzmCwSIQoApXqOvKzoNFi6AaKIjxfNmiEigLwKpNrw08H0lVZbq/9MMxI3TzMTZjY9QmBKVLSGy3Z6IJqZpyK22lv7whJcllG0Qw8tv8+7wmC8SR3+4jpuxuFGZ+69CW+otx+CPMJjcCAwEAAQ=="
const productionVerifier = userwidgets.User.Key.Verifier.create<Key>(publicKey)
