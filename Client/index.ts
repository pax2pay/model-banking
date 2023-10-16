import { gracely } from "gracely"
import { userwidgets } from "@userwidgets/model"
import { http } from "cloudly-http"
import { rest } from "cloudly-rest"
import { Accounts } from "./Accounts"
import { Cards } from "./Cards"
import { Flags } from "./Flags"
import { Operations } from "./Operations"
import { Organizations } from "./Organizations"
import { Rules } from "./Rules"
import { Settlements } from "./Settlements"
import { Transactions as ClientTransactions } from "./Transactions"
import { Treasury } from "./Treasury"
import { Version } from "./Version"

export class Client extends rest.Client<gracely.Error> {
	realm?: string
	organization?: string
	readonly accounts = new Accounts(this.client)
	readonly cards = new Cards(this.client)
	readonly operations = new Operations(this.client)
	readonly organizations = new Organizations(this.client)
	readonly rules = new Rules(this.client)
	readonly settlements = new Settlements(this.client)
	readonly transactions = new ClientTransactions(this.client)
	readonly treasury = new Treasury(this.client)
	readonly flags = new Flags(this.client)
	readonly userwidgets = new userwidgets.ClientCollection(this.client, { pathPrefix: "/widgets" })
	readonly version = new Version(this.client)

	static create<T = Record<string, any>>(server: string, key: string, load?: (client: http.Client) => T): Client & T {
		let httpClient: http.Client<gracely.Error>
		const result: Client = new Client(
			(httpClient = new http.Client<gracely.Error>(server, key, {
				appendHeader: request => ({ ...request.header, realm: result.realm, organization: result.organization }),
			}))
		)
		if (load)
			Object.assign(result, load(httpClient))
		return result as Client & T
	}
}
export namespace Client {
	export const Transactions = ClientTransactions
	export namespace Transactions {
		export type Index = ClientTransactions.Index
	}
	export type Unauthorized = (client: rest.Client<never>) => Promise<boolean>
}
