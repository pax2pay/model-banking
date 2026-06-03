import { gracely } from "gracely"
import { http } from "cloudly-http"
import { User } from "../../User"

export class PasswordResets {
	constructor(private readonly client: http.Client) {}

	async create(creatable: User.PasswordReset.Creatable): Promise<gracely.Result | gracely.Error> {
		// TODO: update type without token
		return await this.client.post<gracely.Result>("/user/reset", creatable)
	}
	async fetch(emailHash: string, token: string): Promise<User.PasswordReset | gracely.Error> {
		return await this.client.get<User.PasswordReset>(`/user/reset/${emailHash}/${token}`)
	}
}
