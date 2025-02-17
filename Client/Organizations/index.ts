import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Organization } from "../../Organization"
import { Groups } from "./Groups"
import { Rules } from "./Rules"

export class Organizations {
	readonly Rules = new Rules(this.client)
	readonly groups = new Groups(this.client)

	constructor(private readonly client: http.Client) {}
	async list(options?: {
		limit?: string
		cursor?: string
	}): Promise<(Organization[] & { cursor?: string | undefined }) | gracely.Error> {
		return this.client.get<Organization[] & { cursor?: string | undefined }>(`/organization`, options)
	}
	async create(organization: Organization): Promise<Organization | gracely.Error> {
		return this.client.post<Organization>(`/organization`, organization)
	}
	async update(id: string, changeable: Organization.Changeable): Promise<Organization | gracely.Error> {
		return this.client.patch<Organization>(`/organization/${id}`, changeable)
	}
}
