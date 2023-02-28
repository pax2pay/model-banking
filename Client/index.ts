import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Accounts } from "./Accounts"
import { Decisions } from "./Decisions"
import { Operations } from "./Operations"
import { Organizations } from "./Organizations"
import { Queue } from "./Queue"
import { Transactions } from "./Transactions"
import { Version } from "./Version"

export class Client extends rest.Client<gracely.Error> {
	readonly account = new Accounts(this.client)
	readonly decision = new Decisions(this.client)
	readonly operation = new Operations(this.client)
	readonly organization = new Organizations(this.client)
	readonly queue = new Queue(this.client)
	readonly transaction = new Transactions(this.client)
	readonly version = new Version(this.client)

	static create<T = Record<string, any>>(server: string, key: string, load?: (client: http.Client) => T): Client & T {
		let httpClient: http.Client<gracely.Error>
		const result = new Client((httpClient = new http.Client<gracely.Error>(server, key)))
		if (load)
			Object.assign(result, load(httpClient))
		return result as Client & T
	}
}
