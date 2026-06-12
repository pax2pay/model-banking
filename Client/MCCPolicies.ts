import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Card } from "../Card"
import { MCCPolicy } from "../MCCPolicy"

export class MCCPolicies {
	constructor(private readonly client: http.Client) {}
	async create(policy: MCCPolicy.Creatable): Promise<MCCPolicy | gracely.Error> {
		return this.client.post<MCCPolicy>(`/mcc-policy`, policy)
	}
	async update(id: string, policy: MCCPolicy.Creatable): Promise<MCCPolicy | gracely.Error> {
		return this.client.put<MCCPolicy>(`/mcc-policy/${id}`, policy)
	}
	async list(filter: { organization?: string; stack?: Card.Stack }): Promise<MCCPolicy[] | gracely.Error> {
		const query = Object.entries(filter)
			.map(([key, value]) => `${key}=${value}`)
			.join("&")
		return this.client.get<MCCPolicy[]>(`/mcc-policy${query ? `?${query}` : ""}`)
	}
	async remove(id: string): Promise<MCCPolicy | gracely.Error> {
		return this.client.delete<MCCPolicy>(`/mcc-policy/${id}`)
	}
}
