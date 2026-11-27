// Matches min-release-age in .npmrc: 7 days, except for our own packages.
const own = ["authly", "cloudly-http", "cryptly", "gracely", "isly", "isoly", "typedly"]

export default {
	cooldown: name => (name.startsWith("@pax2pay/") || own.includes(name) ? 0 : 7),
	format: ["time", "cooldown"],
}
