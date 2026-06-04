import { gracely } from "gracely"
import { http } from "cloudly-http"
import { User } from "../../User"

export class PasswordResets {
	constructor(private readonly client: http.Client) {}

	async create(creatable: User.PasswordReset.Creatable): Promise<gracely.Result | gracely.Error> {
		return await this.client.post<gracely.Result>("/user/password-reset", creatable)
	}
	async fetch(emailHash: string, token: string): Promise<User.PasswordReset | gracely.Error> {
		return await this.client.get<User.PasswordReset>(`/user/password-reset/${emailHash}/${token}`)
	}
	async confirm(emailHash: string, token: string, reset: User.Password.Creatable): Promise<User | gracely.Error> {
		return await this.client.post<User>(`/user/password-reset/${emailHash}/${token}/confirm`, reset)
	}
}
