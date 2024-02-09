import { pax2pay } from "./index"

describe("FX", () => {
	it("static", () => {
		expect(pax2pay.FX.convert(30.72, "SEK", "GBP", fx)).toEqual(2.31)
		expect(pax2pay.FX.convert(2.31, "GBP", "GBP", fx)).toEqual(2.31)
	})
	it("undefined", () => {
		expect(pax2pay.FX.convert(2.31, "GBP", "SEK", fx)).toEqual(undefined)
	})
})
const fx = {
	GBP: {
		AUD: 1.9333968256,
		BGN: 2.2802871481,
		BRL: 6.3401560148,
		CAD: 1.7126739653,
		CHF: 1.1043008682,
		CNY: 9.1373484224,
		CZK: 28.8936656241,
		DKK: 8.7111492969,
		EUR: 1.1681469333,
		GBP: 1,
		HKD: 9.9310331712,
		HRK: 8.9211358293,
		HUF: 447.9825684648,
		IDR: 19834.5133673381,
		ILS: 4.7846770643,
		INR: 105.5206035069,
		ISK: 173.2149983976,
		JPY: 188.2360848368,
		KRW: 1699.4297872384,
		MXN: 21.8311280083,
		MYR: 6.0031126726,
		NOK: 13.3624807268,
		NZD: 2.0914809065,
		PHP: 71.4818098001,
		PLN: 5.0934250682,
		RON: 5.8116890052,
		RUB: 111.7026372231,
		SEK: 13.298875308,
		SGD: 1.7050251073,
		THB: 45.2649624917,
		TRY: 38.4776185197,
		USD: 1.2705671228,
		ZAR: 24.3859345373,
	},
}
