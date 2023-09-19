export namespace Cell {
	export function toCsv(value: number | string | undefined | null): string {
		return `"${value ?? ""}"`
	}
}
