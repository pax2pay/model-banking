import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Organization } from "../Organization"

export class Organizations extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async list(): Promise<Organization[] | gracely.Error> {
		return this.client.get<Organization[]>(`/organization`)
	}
	async create(organization: Organization.Creatable): Promise<Organization | gracely.Error> {
		return this.client.post<Organization>(`/organization`, organization)
	}
}
