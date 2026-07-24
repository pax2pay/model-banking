import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Card } from "../Card"
import { policy } from "../policy"

export class Policies {
	constructor(private readonly client: http.Client) {}
	async create(policy: policy.Mcc.Creatable): Promise<policy.Mcc | gracely.Error> {
		return this.client.post<policy.Mcc>(`/policy/mcc`, policy)
	}
	async update(policy: policy.Mcc.Updatable): Promise<policy.Mcc | gracely.Error> {
		return this.client.put<policy.Mcc>(`/policy/mcc`, policy)
	}
	async list(filter: { organization?: string; stack?: Card.Stack }): Promise<policy.Mcc[] | gracely.Error> {
		const query = Object.entries(filter)
			.map(([key, value]) => `${key}=${value}`)
			.join("&")
		return this.client.get<policy.Mcc[]>(`/policy/mcc${query ? `?${query}` : ""}`)
	}
	async remove(id: string): Promise<policy.Mcc | gracely.Error> {
		return this.client.delete<policy.Mcc>(`/policy/mcc/${id}`)
	}
}
