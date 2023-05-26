import { gracely } from "gracely"
import { userwidgets } from "@userwidgets/model"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Accounts } from "./Accounts"
import { Application as ClientApplication } from "./Application"
import { Me as ClientMe } from "./Me"
import { Operations } from "./Operations"
import { Organization as ClientOrganization } from "./Organization"
import { Organizations } from "./Organizations"
import { Transactions } from "./Transactions"
import { Treasury } from "./Treasury"
import { User as ClientUser } from "./User"
import { Version } from "./Version"

export class Client extends rest.Client<gracely.Error> {
	realm?: string
	organization?: string
	readonly userwidgets = new userwidgets.ClientCollection(this.client, "/widgets")
	readonly accounts = new Accounts(this.client)
	readonly operations = new Operations(this.client)
	readonly organizations = new Organizations(this.client)
	readonly transactions = new Transactions(this.client)
	readonly treasury = new Treasury(this.client)
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
	export type Application = ClientApplication
	export const Application = ClientApplication
	export type Organization = ClientOrganization
	export const Organization = ClientOrganization
	export type Me = ClientMe
	export const Me = ClientMe
	export type User = ClientUser
	export const User = ClientUser
	export type Unauthorized = (client: rest.Client<never>) => Promise<boolean>
}
