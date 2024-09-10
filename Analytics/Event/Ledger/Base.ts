import { Base as EventBase } from "../Base"

export interface Base<T> extends EventBase<T> {
	organization?: string
	account?: string
	meta?: Record<string, string>
}
