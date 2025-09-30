import { gracely } from "gracely"
import { http } from "cloudly-http"
import { storage } from "cloudly-storage"
import { pax2pay } from "index"
import { reports } from "../../reports"

export class Tpl {
	constructor(private readonly client: http.Client) {}

	async getQuarterly(
		realm: pax2pay.Realm,
		processor: string,
		[start, end]: NonNullable<storage.KeyValueStore.ListOptions["range"]>,
		cursor?: string,
		limit?: number
	): Promise<(reports.visa.Data & { cursor?: string }) | gracely.Error> {
		const search =
			`?start=${start}&end=${end}` + `${cursor ? `&cursor=${cursor}` : ""}` + `${limit ? `&limit=${limit}` : ""}`
		return await this.client.get<reports.visa.Data & { cursor?: string }>(
			`/processor/${realm}-${processor}/report/quarterly${search}`
		)
	}
}
