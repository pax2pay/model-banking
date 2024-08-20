export interface Flags {
	current: string[]
	previous: string[]
}
export namespace Flags {
	export function flag(flags: Flags, changes: string[] | undefined): Flags {
		const current = new Set<string>(flags.current)
		const previous = new Set<string>(flags.previous)
		for (const flag of changes ?? []) {
			if (!flag.startsWith("-")) {
				previous.delete(flag)
				current.add(flag)
			} else if (current.has(flag.substring(1))) {
				current.delete(flag.substring(1))
				previous.add(flag.substring(1))
			}
		}
		return { current: Array.from(current), previous: Array.from(previous) }
	}
}
