import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { Log } from "../Log"

export class Logs {
	constructor(private readonly client: http.Client) {}
	async list(options?: {
		collection?: string
		limit?: number
		cursor?: string
		dateRange?: isoly.DateRange
	}): Promise<(Log[] & { cursor?: string | undefined }) | gracely.Error> {
		const query = Object.entries({
			...(options?.dateRange ?? {}),
		})
			.map(([k, v]) => `${k}=${v}`)
			.join("&")
		const path = options?.collection ? `/log/${options.collection}` : `/log`
		return await this.client.get<Log[] & { cursor?: string | undefined }>(path + (query && "?" + query), {
			...(options?.cursor ? { cursor: options.cursor } : {}),
			...(options?.limit ? { limit: options?.limit.toString() } : {}),
		})
	}
}
