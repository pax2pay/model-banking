import { gracely } from "gracely"
import { http } from "cloudly-http"
import { User } from "../../User"

export class Invites {
	constructor(private readonly client: http.Client) {}

	async create(creatable: User.Invite.Creatable): Promise<User.Invite.Storable | gracely.Error> {
		// TODO return type without token
		return await this.client.post<User.Invite.Storable>("/user/invite", creatable)
	}
	async fetch(identifier: string): Promise<User.Invite | gracely.Error> {
		return await this.client.get<User.Invite>(`/user/invite/${identifier}`)
	}
	async list(): Promise<User.Invite.Storable[] | gracely.Error> {
		// TODO: update return type without token
		return await this.client.get<User.Invite.Storable[]>("/user/invite")
	}
	async remove(identifier: string): Promise<User.Invite | gracely.Error> {
		return await this.client.delete<User.Invite>(`/user/invite/${identifier}`)
	}
}
