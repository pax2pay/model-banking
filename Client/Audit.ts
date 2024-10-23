import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { Audit as AuditLog } from "../Audit"

export class Audit {
	constructor(private readonly client: http.Client) {}
	async list(
		options?: {
			resource?: AuditLog.Resource
			limit?: number
			cursor?: string
		} & Partial<isoly.DateRange>
	): Promise<AuditLog[] | gracely.Error> {
		const queries = options && http.Search.stringify(options)
		return this.client.get<AuditLog[]>(
			`/audit${options?.resource ? "/" + options?.resource : ""}${queries ? "?" + queries : ""}`
		)
	}
}
