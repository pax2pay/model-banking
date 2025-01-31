import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Operation } from "../Operation"

export class Operations extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
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
	async getOperationsOnTransaction(transactionId: string): Promise<Operation[] | gracely.Error> {
		return this.client.get<Operation[]>(`/transaction/${transactionId}/operations`)
	}
}
