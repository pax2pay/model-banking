import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Account } from "../../Account"
import { Charge } from "./Charge"
import { Details } from "./Details"
import { History } from "./History"
import { Status } from "./Status"

export class Accounts {
	readonly charge: Charge
	readonly details: Details
	readonly status: Status
	readonly history: History
	constructor(private readonly client: http.Client) {
		this.charge = new Charge(this.client)
		this.details = new Details(this.client)
		this.status = new Status(this.client)
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
