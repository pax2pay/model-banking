export class MockKv<T> {
	private readonly data: Record<string, { value: T | undefined } | undefined> = {}
	async set(key: string, value: T | undefined) {
		this.data[key] = value ? { value } : undefined
	}
	async get(key: string) {
		return this.data[key]
	}
}
