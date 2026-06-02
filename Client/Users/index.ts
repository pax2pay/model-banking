import { gracely } from "gracely"
import { http } from "cloudly-http"
import { User } from "../../User"
import { Invites } from "./Invites"
import { Resets } from "./Resets"

export class Users {
	#invites?: Invites
	get invites(): Invites {
		return (this.#invites ??= new Invites(this.client))
	}
	#resets?: Resets
	get resets(): Resets {
		return (this.#resets ??= new Resets(this.client))
	}
	constructor(private readonly client: http.Client) {}

	async create(user: User.Creatable): Promise<User | gracely.Error> {
		return await this.client.post<User>("/user", user)
	}
	async resetPassword(reset: User.Reset.Creatable): Promise<gracely.Result | gracely.Error> {
		return await this.client.put<gracely.Result>(`/user/password`, reset)
	}
	async fetch(email: string): Promise<User | gracely.Error> {
		return await this.client.get<User>(`/user/${email}`)
	}
	async list(): Promise<User[] | gracely.Error> {
		return await this.client.get<User[]>("/user")
	}
	async remove(email: string): Promise<User | gracely.Error> {
		return await this.client.delete<User>(`/user/${email}`)
	}
	async updateAccess(email: string, access: User.Access): Promise<User | gracely.Error> {
		return await this.client.put<User>(`/user/${email}/access`, access)
	}
	async removeMfa(email: string) {
		return this.client.delete<User>(`/user/${email}/mfa/totp`)
	}
}
