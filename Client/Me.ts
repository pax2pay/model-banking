import { gracely } from "gracely"
import { authly } from "authly"
import { http } from "cloudly-http"
import { User } from "../User"

export class Me {
	constructor(private readonly client: http.Client) {}

	async login(me: User.Me): Promise<User | gracely.Error> {
		return await this.client.get<User>(`/me/${me.realm}`, {
			authorization: `Basic ${authly.Base64.encode(
				new authly.TextEncoder().encode(me.email + ":" + me.password),
				"standard",
				"="
			)}`,
		})
	}
}
