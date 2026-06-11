import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Card } from "../Card"
import { Transaction } from "../Transaction"

export class MCCPolicies {
	constructor(private readonly client: http.Client) {}
	async create(policy: Transaction.MCCPolicy.Creatable): Promise<Transaction.MCCPolicy | gracely.Error> {
		return this.client.post<Transaction.MCCPolicy>(`/mcc-policy`, policy)
	}
	async update(id: string, policy: Transaction.MCCPolicy.Creatable): Promise<Transaction.MCCPolicy | gracely.Error> {
		return this.client.put<Transaction.MCCPolicy>(`/mcc-policy/${id}`, policy)
	}
	async list(filter: { organization?: string; stack?: Card.Stack }): Promise<Transaction.MCCPolicy[] | gracely.Error> {
		const query = Object.entries(filter)
			.map(([key, value]) => `${key}=${value}`)
			.join("&")
		return this.client.get<Transaction.MCCPolicy[]>(`/mcc-policy${query ? `?${query}` : ""}`)
	}
	async remove(id: string): Promise<Transaction.MCCPolicy | gracely.Error> {
		return this.client.delete<Transaction.MCCPolicy>(`/mcc-policy/${id}`)
	}
}
