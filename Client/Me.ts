import { gracely } from "gracely"
import { authly } from "authly"
import { http } from "cloudly-http"
import { Realm } from "../Realm"
import { User } from "../User"

export class Me {
	constructor(private readonly client: http.Client) {}

	async login(email: string, password: string, realm: Realm): Promise<User | gracely.Error> {
		return await this.client.get<User>(`/me/${realm}`, {
			authorization: `Basic ${authly.Base64.encode(email + ":" + password, "standard", "=")}`,
		})
	}
}
