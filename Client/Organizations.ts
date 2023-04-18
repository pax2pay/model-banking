import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Organization } from "../Organization"

export class Organizations extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async list(options?: {
		limit?: string
		cursor?: string
	}): Promise<(Organization[] & { cursor?: string | undefined }) | gracely.Error> {
		return this.client.get<Organization[] & { cursor?: string | undefined }>(`/organization`, options)
	}
	async create(organization: Organization.Creatable): Promise<Organization | gracely.Error> {
		return this.client.post<Organization>(`/organization`, organization)
	}
}
