import { gracely } from "gracely"
import { userwidgets } from "@userwidgets/model"
import { http } from "cloudly-http"
import { rest } from "cloudly-rest"
import { Accounts } from "./Accounts"
import { Audit } from "./Audit"
import { Cards } from "./Cards"
import { Exchanges } from "./Exchanges"
import { Labels } from "./Labels"
import { Logs } from "./Logs"
import { Operations } from "./Operations"
import { Organizations } from "./Organizations"
import { Reports } from "./Reports"
import { Rules } from "./Rules"
import { Settlements } from "./Settlements"
import { Transactions } from "./Transactions"
import { Treasury } from "./Treasury"
import { Version } from "./Version"

export class Client extends rest.Client<gracely.Error> {
	realm?: string
	organization?: string
	readonly accounts = new Accounts(this.client)
	readonly cards = new Cards(this.client)
	readonly operations = new Operations(this.client)
	readonly exchanges = new Exchanges(this.client)
	readonly organizations = new Organizations(this.client)
	readonly reports = new Reports(this.client)
	readonly audits = new Audit(this.client)
	readonly logs = new Logs(this.client)
	readonly rules = new Rules(this.client)
	readonly settlements = new Settlements(this.client)
	readonly transactions = new Transactions(this.client)
	readonly treasury = new Treasury(this.client)
	readonly flags = new Labels(this.client, "flag")
	readonly groups = new Labels(this.client, "group")
	readonly userwidgets = (server: string, application: string) =>
		new userwidgets.ClientCollection(new http.Client(server), { application })
	readonly version = new Version(this.client)

	static create<T = Record<string, any>>(server: string, key?: string, load?: (client: http.Client) => T): Client & T {
		let httpClient: http.Client<gracely.Error>
		const result: Client = new Client(
			(httpClient = new http.Client<gracely.Error>(server, key, {
				appendHeader: request => ({
					...request.header,
					realm: result.realm,
					organization: request.header.organization ?? result.organization,
				}),
				postprocess: async response => {
					let result = response
					const body = await response.body
					if (Array.isArray(body))
						result = http.Response.create(
							Object.defineProperty(body, "cursor", {
								value: response.header.cursor ?? response.header.link?.split?.(",")[0],
							})
						)
					return result
				},
			}))
		)
		if (load)
			Object.assign(result, load(httpClient))
		return result as Client & T
	}
}
export namespace Client {
	export type Unauthorized = (client: rest.Client<never>) => Promise<boolean>
}
