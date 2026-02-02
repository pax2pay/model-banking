import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Organization } from "../../Organization"

export class Risk {
	constructor(private readonly client: http.Client) {}
	async set(organization: string, risk: Organization.Risk): Promise<Organization | gracely.Error> {
		return this.client.put<Organization>(`/organization/${organization}/risk`, { risk })
	}
}
