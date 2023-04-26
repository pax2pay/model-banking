import * as gracely from "gracely"
import { userwidgets } from "@userwidgets/model"
import * as rest from "cloudly-rest"

export class Me extends rest.Collection<gracely.Error> {
	async login(credentials: userwidgets.User.Credentials): Promise<userwidgets.User.Key | gracely.Error> {
		let result: gracely.Error | userwidgets.User.Key
		if (credentials.password == undefined)
			result = gracely.client.malformedContent("password", "string", "Password is required for login.")
		else {
			const token = await this.client.get<string>("/me", {
				authorization: userwidgets.User.Credentials.toBasic({ user: credentials.user, password: credentials.password }),
			})
			result = gracely.Error.is(token)
				? token
				: (await userwidgets.User.Key.unpack(token)) ?? gracely.client.unauthorized("Failed to verify token.")
			if (!gracely.Error.is(result)) {
				this.client.key = result.token
				sessionStorage.setItem("token", result.token)
			}
		}
		return result
	}
	async register(
		tag: userwidgets.User.Tag,
		credentials: userwidgets.User.Credentials.Register
	): Promise<userwidgets.User.Key | gracely.Error> {
		const token = await this.client.post<string>(`/me/${tag.token}`, credentials)
		const result = gracely.Error.is(token)
			? token
			: (await userwidgets.User.Key.unpack(token)) ?? gracely.client.unauthorized("Failed to verify token.")
		!gracely.Error.is(result) && (this.client.key = result.token) && sessionStorage.setItem("token", result.token)
		return result
	}
	async join(tag: userwidgets.User.Tag): Promise<userwidgets.User.Key | gracely.Error> {
		const response = await this.client.patch<string>(`/me/${tag.token}`, undefined)
		const result = gracely.Error.is(response)
			? response
			: (await userwidgets.User.Key.unpack(response)) ?? gracely.client.unauthorized("Failed to verify token.")
		!gracely.Error.is(result) && (this.client.key = result.token) && sessionStorage.setItem("token", result.token)
		return result
	}
}
