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
import { Transactions as ClientTransactions } from "./Transactions"
import { Treasury } from "./Treasury"
import { Version } from "./Version"

export class Client {
	realm?: string
	organization?: string
	readonly accounts: Accounts
	readonly cards: Cards
	readonly operations: Operations
	readonly exchanges: Exchanges
	readonly organizations: Organizations
	readonly reports: Reports
	readonly audits: Audit
	readonly logs: Logs
	readonly rules: Rules
	readonly settlements: Settlements
	readonly transactions: ClientTransactions
	readonly treasury: Treasury
	readonly flags: Labels
	readonly groups: Labels
	readonly processors: Processor
	readonly version: Version
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
	private constructor(private readonly client: http.Client<gracely.Error>) {
		this.client.onUnauthorized = async () => this.onUnauthorized != undefined && (await this.onUnauthorized(this))
		this.accounts = new Accounts(this.client)
		this.cards = new Cards(this.client)
		this.operations = new Operations(this.client)
		this.exchanges = new Exchanges(this.client)
		this.organizations = new Organizations(this.client)
		this.reports = new Reports(this.client)
		this.audits = new Audit(this.client)
		this.logs = new Logs(this.client)
		this.rules = new Rules(this.client)
		this.settlements = new Settlements(this.client)
		this.transactions = new ClientTransactions(this.client)
		this.treasury = new Treasury(this.client)
		this.flags = new Labels(this.client, "flag")
		this.groups = new Labels(this.client, "group")
		this.processors = new Processor(this.client)
		this.version = new Version(this.client)
	}
	readonly userwidgets = (server: string, application: string) =>
		new userwidgets.ClientCollection(new http.Client(server), { application })
	onUnauthorized?: (client: Client) => Promise<boolean>

	static create(server: string, key?: string): Client {
		const httpClient: http.Client<gracely.Error> = new http.Client<gracely.Error>(server, key, {
			appendHeader: request => ({
				...request.header,
				realm: result.realm,
				...(request.header.organization ?? result.organization
					? { organization: request.header.organization ?? result.organization }
					: {}),
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
export namespace Client {
	export import Transactions = ClientTransactions
}
