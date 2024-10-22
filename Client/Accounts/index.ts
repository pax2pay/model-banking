import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Account } from "../../Account"
import { Buffer } from "./Buffer"
import { Counterparts } from "./Counterparts"
import { Rails } from "./Rails"
import { Rules } from "./Rules"
import { Status } from "./Status"

export class Accounts extends rest.Collection<gracely.Error> {
	readonly buffer = new Buffer(this.client)
	readonly Rails = new Rails(this.client)
	readonly rules = new Rules(this.client)
	readonly status = new Status(this.client)
	readonly counterparts = new Counterparts(this.client)

	constructor(client: http.Client) {
		super(client)
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
