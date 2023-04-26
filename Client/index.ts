import * as gracely from "gracely"
import * as isoly from "isoly"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Accounts } from "./Accounts"
import { Application as ClientApplication } from "./Application"
import { Me as ClientMe } from "./Me"
import { Operations } from "./Operations"
import { Organization as ClientOrganization } from "./Organization"
import { Organizations } from "./Organizations"
import { Transactions } from "./Transactions"
import { User as ClientUser } from "./User"
import { Version } from "./Version"

export interface EntityTags {
	application: Record<string, isoly.DateTime | undefined>
	organization: Record<string, isoly.DateTime | undefined>
	user: Record<string, isoly.DateTime | undefined>
}

export class Client extends rest.Client<gracely.Error> {
	realm?: string
	organizationId?: string
	entityTags: EntityTags = { application: {}, organization: {}, user: {} }
	readonly userwidgets = {
		me: new ClientMe(this.client),
		user: new ClientUser(this.client, this.entityTags),
		application: new ClientApplication(this.client, this.entityTags),
		organization: new ClientOrganization(this.client, this.entityTags),
		set onUnauthorized(callback: (client: rest.Client<never>) => Promise<boolean>) {
			this.client.onUnauthorized = callback
		},
		client: this as Client,
	}
	readonly accounts = new Accounts(this.client)
	readonly operations = new Operations(this.client)
	readonly organizations = new Organizations(this.client)
	readonly transactions = new Transactions(this.client)
	readonly version = new Version(this.client)

	static create<T = Record<string, any>>(server: string, key: string, load?: (client: http.Client) => T): Client & T {
		let httpClient: http.Client<gracely.Error>
		const result: Client = new Client(
			(httpClient = new http.Client<gracely.Error>(server, key, {
				appendHeader: request => ({ ...request.header, realm: result.realm, organization: result.organizationId }),
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
