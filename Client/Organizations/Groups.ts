import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Organization } from "../../Organization"

export class Groups {
	constructor(private readonly client: http.Client) {}
	async replace(organization: string, groups: string[]): Promise<Organization | gracely.Error> {
		return this.client.put<Organization>(`/organization/group`, groups, {
			organization,
		})
	}
}
