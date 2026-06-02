import { gracely } from "gracely"
import { http } from "cloudly-http"
import { User } from "../../User"

export class Resets {
	constructor(private readonly client: http.Client) {}

	async create(creatable: User.Reset.Creatable): Promise<User.Reset.Storable | gracely.Error> {
		// TODO: update type without token
		return await this.client.post<User.Reset.Storable>("/user/reset", creatable)
	}
	async fetch(emailHash: string, token: string): Promise<User.Reset | gracely.Error> {
		return await this.client.get<User.Reset>(`/user/reset/${emailHash}/${token}`)
	}
}
