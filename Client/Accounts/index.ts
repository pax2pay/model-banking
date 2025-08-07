import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Account } from "../../Account"
import { Buffer } from "./Buffer"
import { Counterparts } from "./Counterparts"
import { Details } from "./Details"
import { History } from "./History"
import { Rules } from "./Rules"
import { Status } from "./Status"

export class Accounts {
	readonly buffer: Buffer
	readonly details: Details
	readonly rules: Rules
	readonly status: Status
	readonly counterparts: Counterparts
	readonly history: History
	constructor(private readonly client: http.Client) {
		this.buffer = new Buffer(this.client)
		this.details = new Details(this.client)
		this.rules = new Rules(this.client)
		this.status = new Status(this.client)
		this.counterparts = new Counterparts(this.client)
		this.history = new History(this.client)
	}

	async create(account: Account.Creatable): Promise<Account | gracely.Error> {
		return this.client.post<Account>("/account", account)
	}
	async get(account: string): Promise<Account | gracely.Error> {
		return this.client.get<Account>(`/account/${account}`)
	}
	async list(options?: {
		limit?: string
		cursor?: string
		organization?: string
	}): Promise<(Account[] & { cursor?: string | undefined }) | gracely.Error> {
		return this.client.get<Account[] & { cursor?: string | undefined }>("/account", options)
	}
}
