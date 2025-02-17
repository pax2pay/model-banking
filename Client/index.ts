import { gracely } from "gracely"
import { userwidgets } from "@userwidgets/model"
import { http } from "cloudly-http"
import { Accounts } from "./Accounts"
import { Audit } from "./Audit"
import { Cards } from "./Cards"
import { Exchanges } from "./Exchanges"
import { Labels } from "./Labels"
import { Logs } from "./Logs"
import { Operations } from "./Operations"
import { Organizations } from "./Organizations"
import { Processor } from "./Processor"
import { Reports } from "./Reports"
import { Rules } from "./Rules"
import { Settlements } from "./Settlements"
import { Transactions } from "./Transactions"
import { Treasury } from "./Treasury"
import { Version } from "./Version"

export class Client {
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
	readonly processors = new Processor(this.client)
	readonly version = new Version(this.client)
	onUnauthorized?: (client: Client) => Promise<boolean>
	private constructor(private readonly client: http.Client<gracely.Error>) {
		this.client.onUnauthorized = async () => this.onUnauthorized != undefined && (await this.onUnauthorized(this))
	}
	set key(value: string | undefined) {
		this.client.key = value
	}
	get key(): string | undefined {
		return this.client.key
	}
	set onError(value: ((request: http.Request, response: http.Response) => Promise<boolean>) | undefined) {
		this.client.onError = value
	}
	get onError(): ((request: http.Request, response: http.Response) => Promise<boolean>) | undefined {
		return this.client.onError
	}
	static create(server: string, key?: string): Client {
		const httpClient: http.Client<gracely.Error> = new http.Client<gracely.Error>(server, key, {
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
		})
		const result: Client = new Client(httpClient)
		return result
	}
}
