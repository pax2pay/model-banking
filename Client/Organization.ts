import { gracely } from "gracely"
import { isoly } from "isoly"
import { userwidgets } from "@userwidgets/model"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"

export interface EntityTags {
	application: Record<string, isoly.DateTime | undefined>
	organization: Record<string, isoly.DateTime | undefined>
	user: Record<string, isoly.DateTime | undefined>
}

export class Organization extends rest.Collection<gracely.Error> {
	constructor(client: http.Client, readonly entityTags: EntityTags) {
		super(client)
	}
	async create(
		organization: userwidgets.Organization.Creatable,
		applicationId: string
	): Promise<userwidgets.Organization | gracely.Error> {
		const result = await this.client.post<userwidgets.Organization>("/api/organization", organization, {
			application: applicationId,
		})
		!gracely.Error.is(result) && (this.entityTags.organization[result.id] = isoly.DateTime.now())
		return result
	}
	async fetch(organizationId: string): Promise<userwidgets.Organization | gracely.Error> {
		const result = await this.client.get<userwidgets.Organization>(`/api/organization/${organizationId}`)
		!gracely.Error.is(result) && (this.entityTags.organization[result.id] = isoly.DateTime.now())
		return result
	}
	async list(): Promise<userwidgets.Organization[] | gracely.Error> {
		const result = await this.client.get<userwidgets.Organization[]>(`/api/organization`)
		!gracely.Error.is(result) &&
			result.reduce(
				(entityTags, organization) => ((entityTags.organization[organization.id] = isoly.DateTime.now()), entityTags),
				this.entityTags
			)
		return result
	}
	async changeName(
		organizationId: string,
		organization: userwidgets.Organization.Creatable,
		applicationId: string
	): Promise<userwidgets.Organization | gracely.Error> {
		const entityTag = this.entityTags.organization[organizationId]
		const result = await this.client.put<userwidgets.Organization>(
			`/api/organization/${organizationId}/name`,
			organization,
			{
				...(entityTag && { ifMatch: [entityTag] }),
				application: applicationId,
			}
		)
		!gracely.Error.is(result) && (this.entityTags.organization[result.id] = isoly.DateTime.now())
		return result
	}
	async removeUser(organizationId: string, email: string) {
		const entityTag = this.entityTags.organization[organizationId]
		const result = await this.client.delete<userwidgets.Organization>(
			`/api/organization/${organizationId}/user/${email}`,
			{
				...(entityTag && { ifMatch: [entityTag] }),
			}
		)
		!gracely.Error.is(result) && (this.entityTags.organization[organizationId] = isoly.DateTime.now())
		return result
	}
}
