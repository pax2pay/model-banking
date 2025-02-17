import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Operation } from "../Operation"

export class Operations {
	constructor(private readonly client: http.Client) {}
	async list(options?: {
		start?: string
		end?: string
		limit?: string
		cursor?: string
		prefix?: string
	}): Promise<(Operation[] & { cursor?: string | undefined }) | gracely.Error> {
		const search =
			options?.start && options?.end
				? `?start=${options?.start}&end=${options?.end}`
				: options?.start
				? `?start=${options?.start}`
				: options?.end
				? `?end=${options?.end}`
				: ""
		return this.client.get<Operation[] & { cursor?: string | undefined }>(
			`/operation${search}`,
			options && (({ start, end, ...headers }) => headers)(options)
		)
	}
}
