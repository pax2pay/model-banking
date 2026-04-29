export type Result = "passed" | "failed" | "incomplete"
export namespace Result {
	export const precedence: Record<Result, number> = {
		failed: 3,
		incomplete: 2,
		passed: 1,
	}
	export function aggregate(results: Result[]): Result {
		return results.reduce((r, e) => (precedence[e] > precedence[r] ? e : r), "passed")
	}
}
