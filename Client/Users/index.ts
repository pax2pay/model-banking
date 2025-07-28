import { gracely } from "gracely"
import { http } from "cloudly-http"
import { User } from "../../User"
import { Invites } from "./Invites"

export class Users {
	#invites?: Invites
	get invites(): Invites {
		return (this.#invites ??= new Invites(this.client))
	}
	constructor(private readonly client: http.Client) {}

	async create(user: User.Creatable): Promise<User | gracely.Error> {
		return await this.client.post<User>("/user", user)
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
	async updatePassword(email: string, creatable: User.Password.Creatable): Promise<User | gracely.Error> {
		return await this.client.put<User>(`/user/${email}/password`, creatable)
	}
	async updateAccess(email: string, access: User.Access): Promise<User | gracely.Error> {
		return await this.client.put<User>(`/user/${email}/access`, access)
	}
}
