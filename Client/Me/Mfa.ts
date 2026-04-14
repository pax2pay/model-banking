import { gracely } from "gracely"
import { http } from "cloudly-http"
import { User } from "../../User"

export class Mfa {
	constructor(private readonly client: http.Client) {}

	async setupTotp(totp: User.mfa.Totp, otp: User.mfa.Totp.Otp): Promise<User | gracely.Error> {
		return this.client.put<User>(`/me/mfa/totp`, totp, { ...(otp ? { totp: otp } : undefined) })
	}
}
