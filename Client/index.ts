import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Accounts } from "./Accounts"
import { Operations } from "./Operations"
import { Organizations } from "./Organizations"
import { Transactions } from "./Transactions"
import { Version } from "./Version"

export class Client extends rest.Client<gracely.Error> {
	realm?: string
	organization?: string
	readonly accounts = new Accounts(this.client)
	readonly operations = new Operations(this.client)
	readonly organizations = new Organizations(this.client)
	readonly transactions = new Transactions(this.client)
	readonly version = new Version(this.client)

	static create<T = Record<string, any>>(server: string, key: string, load?: (client: http.Client) => T): Client & T {
		let httpClient: http.Client<gracely.Error>
		const result: Client = new Client(
			(httpClient = new http.Client<gracely.Error>(server, key, {
				appendHeader: request => ({ ...request.header, realm: result.realm, organization: result.organization }),
				onError: async (request: http.Request, response: http.Response) => {
					const output = { ...response, body: await response.body }
					console.error("client.onError", output)
					return false
				},
			}))
		)
		if (load)
			Object.assign(result, load(httpClient))
		return result as Client & T
	}
}
