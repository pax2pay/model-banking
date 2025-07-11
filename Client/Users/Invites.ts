import { gracely } from "gracely"
import { http } from "cloudly-http"
import { User } from "../../User"

export class Invites {
	constructor(private readonly client: http.Client) {}

	async create(creatable: User.Invite.Creatable): Promise<User | gracely.Error> {
		return await this.client.post<User>("/user/invite", creatable)
	}
	async fetch(identifier: string): Promise<User | gracely.Error> {
		return await this.client.get<User>(`/user/invite/${identifier}`)
	}
	async list(): Promise<User[] | gracely.Error> {
		return await this.client.get<User[]>("/user/invite")
	}
	async remove(identifier: string): Promise<User | gracely.Error> {
		return await this.client.delete<User>(`/user/invite/:${identifier}`)
	}
}
