import { gracely } from "gracely"
import { http } from "cloudly-http"
import { User } from "../../User"

export class Invites {
	constructor(private readonly client: http.Client) {}

	async create(creatable: User.invite.Creatable): Promise<User.invite.Row | gracely.Error> {
		// TODO: update type without token
		return await this.client.post<User.invite.Row>("/user/invite", creatable)
	}
	async fetch(emailHash: string, token: string): Promise<User.invite.Verified | gracely.Error> {
		return await this.client.get<User.invite.Verified>(`/user/invite/${emailHash}/${token}`)
	}
	async list(): Promise<User.invite.Row[] | gracely.Error> {
		return await this.client.get<User.invite.Row[]>("/user/invite")
	}
	async remove(identifier: string): Promise<gracely.Result | gracely.Error> {
		return await this.client.delete<gracely.Result>(`/user/invite/${identifier}`)
	}
}
