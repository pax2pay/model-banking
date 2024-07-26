import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Audit as AuditLog } from "../Audit"

export class Audit {
	constructor(private readonly client: http.Client) {}
	async list(resource?: AuditLog.Resource): Promise<AuditLog[] | gracely.Error> {
		return this.client.get<AuditLog[]>(`/audit/${resource}`)
	}
}
