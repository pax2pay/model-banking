import * as gracely from "gracely"
import * as isoly from "isoly"
import * as userwidgetsui from "@userwidgets/ui"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Application as ClientApplication } from "./../../Client/Application"
import { Me as ClientMe } from "./../../Client/Me"
import { Organization as ClientOrganization } from "./../../Client/Organization"
import { User as ClientUser } from "./../../Client/User"
import { Treasury } from "./Treasury"

export interface EntityTags {
	application: Record<string, isoly.DateTime | undefined>
	organization: Record<string, isoly.DateTime | undefined>
	user: Record<string, isoly.DateTime | undefined>
}

export class Client extends rest.Client<gracely.Error> {
	realm?: string
	treasury = new Treasury(this.client)
	private entityTags: EntityTags = { application: {}, organization: {}, user: {} }
	readonly userwidgets: {
		me: userwidgetsui.Client.Me
		user: userwidgetsui.Client.User
		application: userwidgetsui.Client.Application
		organization: userwidgetsui.Client.Organization
		client: rest.Client<gracely.Error>
	} = {
		me: new userwidgetsui.Client.Me(this.client),
		user: new userwidgetsui.Client.User(this.client, this.entityTags),
		application: new userwidgetsui.Client.Application(this.client, this.entityTags),
		organization: new userwidgetsui.Client.Organization(this.client, this.entityTags),
		client: this,
	}

	static create<T = Record<string, any>>(server: string, key: string, load?: (client: http.Client) => T): Client & T {
		let httpClient: http.Client<gracely.Error>
		const result: Client = new Client(
			(httpClient = new http.Client<gracely.Error>(server, key, {
				appendHeader: request => ({ realm: result.realm }),
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
