import { pax2pay } from "../index"

describe("Reworking incoming logs to processable logs", () => {
	it("Reworking incoming logs to processable logs", () => {
		const log = pax2pay.Log.fromEvents(logg as any)
		expect(log).toMatchInlineSnapshot(`
[
  {
    "collection": "locations",
    "created": "2024-11-25T12:58:14.701Z",
    "entries": [
      {
        "data": {
          "cf-connecting-ip": "85.224.37.6",
          "cf-ipcountry": "SE",
          "colo": "CPH",
          "country": "CPH",
        },
        "message": "Locations",
      },
    ],
    "id": "zzzyQ8kUgOIWzfN7",
    "realm": undefined,
    "script": "worker-banking-log",
  },
]
`)
	})
	it("Reworking incoming logs to processable logs", () => {
		const log = pax2pay.Log.fromEvents(events as any)
		expect(log).toMatchInlineSnapshot(`
[
  {
    "collection": "card",
    "created": "2024-06-19T14:00:17.264Z",
    "entries": [
      {
        "data": {
          "account": "6AEY3VzL",
          "details": {
            "expiry": [
              24,
              12,
            ],
            "holder": "Pax2pay",
          },
          "limit": [
            "GBP",
            925,
          ],
          "preset": "test-pg-200",
          "realm": "test",
        },
        "message": "Request body",
      },
      {
        "data": {
          "account": "6AEY3VzL",
          "created": "2024-06-19T14:00:18.241Z",
          "details": {
            "expiry": [
              24,
              12,
            ],
            "holder": "Pax2pay",
            "iin": "111111",
            "last4": "4510",
            "token": "1111114510/16/1224/1400/jyPy5TG61u0ntPSu0ncgfk_TFPheEGY57LFpsE4AEIgoP19z/RIlC_Uw2EaWmOlu6VVn1Gw",
          },
          "history": [
            {
              "created": "2024-06-19T14:00:18.241Z",
              "status": "created",
              "type": "card",
            },
          ],
          "id": "zzzyQwwndBzqyTzO",
          "limit": [
            "GBP",
            925,
          ],
          "organization": "iIynYFfd",
          "preset": "test-pg-200",
          "realm": "test",
          "reference": "zzzyQwwndBzqyTzO",
          "rules": [],
          "scheme": "mastercard",
          "spent": [
            "GBP",
            0,
          ],
          "status": "active",
        },
        "message": "Card Create Result",
      },
    ],
    "id": "${log[0].id}",
    "realm": "test",
    "resource": "abcd1234",
    "script": "worker-banking-card",
  },
]
`)
	})
	it("Require entries", () => {
		const log = pax2pay.Log.fromEvents(eventsWithoutEntries as any)
		expect(log).toMatchInlineSnapshot(`[]`)
	})
})
const events = [
	{
		scriptName: "worker-banking-card",
		logs: [
			{
				message: [{ collection: "card", realm: "test", ip: "453345" }],
				level: "log",
				timestamp: 1718805617276,
			},
			{
				message: [
					{
						message: "Request body",
						data: {
							account: "6AEY3VzL",
							realm: "test",
							details: { expiry: [24, 12], holder: "Pax2pay" },
							limit: ["GBP", 925],
							preset: "test-pg-200",
						},
					},
				],
				level: "log",
				timestamp: 1718805617276,
			},
			{
				message: ["Belongn't"],
				level: "log",
				timestamp: 1718805618241,
			},
			{
				message: [
					{
						message: "Card Create Result",
						resource: "abcd1234",
						data: {
							account: "6AEY3VzL",
							scheme: "mastercard",
							organization: "iIynYFfd",
							realm: "test",
							created: "2024-06-19T14:00:18.241Z",
							details: {
								expiry: [24, 12],
								holder: "Pax2pay",
								iin: "111111",
								token:
									"1111114510/16/1224/1400/jyPy5TG61u0ntPSu0ncgfk_TFPheEGY57LFpsE4AEIgoP19z/RIlC_Uw2EaWmOlu6VVn1Gw",
								last4: "4510",
							},
							history: [{ type: "card", status: "created", created: "2024-06-19T14:00:18.241Z" }],
							id: "zzzyQwwndBzqyTzO",
							limit: ["GBP", 925],
							preset: "test-pg-200",
							reference: "zzzyQwwndBzqyTzO",
							rules: [],
							spent: ["GBP", 0],
							status: "active",
						},
					},
				],
				level: "log",
				timestamp: 1718805618912,
			},
		],
		eventTimestamp: 1718805617264,
	},
]

const eventsWithoutEntries = [
	{
		scriptName: "worker-banking-card",
		logs: [
			{
				message: [{ collection: "card", realm: "test", requireEntries: true }],
				level: "log",
				timestamp: 1718805617276,
			},
		],
		eventTimestamp: 1718805617264,
	},
]

const logg = [
	{
		scriptName: "worker-banking-log",
		logs: [
			{
				message: [
					"Events",
					[
						{
							truncated: false,
							executionModel: "stateless",
							outcome: "ok",
							scriptVersion: {
								id: "74fdb662-a041-40e4-92a6-8a90625271b8",
							},
							scriptName: "worker-banking-ledger",
							diagnosticsChannelEvents: [],
							exceptions: [],
							logs: [],
							eventTimestamp: 1732539493418,
							event: {
								request: {
									url: "https://banking.pax2pay.app/rule",
									method: "GET",
									headers: {
										accept: "*/*",
										"accept-encoding": "gzip, br",
										"accept-language": "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3",
										authorization: "REDACTED",
										"cf-connecting-ip": "85.224.37.6",
										"cf-ipcountry": "SE",
										"cf-ray": "8e81cf19dfb59307",
										"cf-visitor": '{"scheme":"https"}',
										connection: "Keep-Alive",
										host: "banking.pax2pay.app",
										organization: "undefined",
										origin: "https://dash.pax2pay.app",
										priority: "u=4",
										realm: "test",
										referer: "https://dash.pax2pay.app/",
										"sec-fetch-dest": "empty",
										"sec-fetch-mode": "cors",
										"sec-fetch-site": "same-site",
										"user-agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
										"x-forwarded-proto": "https",
										"x-real-ip": "85.224.37.6",
									},
									cf: {
										longitude: "17.63430",
										httpProtocol: "HTTP/3",
										tlsCipher: "AEAD-AES128-GCM-SHA256",
										continent: "EU",
										asn: 2119,
										clientAcceptEncoding: "gzip, deflate, br, zstd",
										tlsClientExtensionsSha1: "ed+KgazMX8Rv/ZSEbsh4E/Z716M=",
										isEUCountry: "1",
										verifiedBotCategory: "",
										tlsClientAuth: {
											certIssuerDNLegacy: "",
											certIssuerSKI: "",
											certSubjectDNRFC2253: "",
											certSubjectDNLegacy: "",
											certFingerprintSHA256: "",
											certNotBefore: "",
											certSKI: "",
											certSerial: "",
											certIssuerDN: "",
											certVerified: "NONE",
											certNotAfter: "",
											certSubjectDN: "",
											certPresented: "0",
											certRevoked: "0",
											certIssuerSerial: "",
											certIssuerDNRFC2253: "",
											certFingerprintSHA1: "",
										},
										tlsExportedAuthenticator: {
											clientFinished: "18327d13cd717b51431d0751439c1b74b74e35264010cd1e0228a6ea384db610",
											clientHandshake: "0c75f69b171c4b8f09295a08c0199eebc0024919a2713648eff862876ddbf56a",
											serverHandshake: "fd822e8dac927218a393cfcf429fbb3d5482fe8dd1481fad2704e98024a67e41",
											serverFinished: "6fd3e6b6d5233b5e1116e62fb1a08d8b3137cb8736c9569d0a412b8741c9589f",
										},
										tlsVersion: "TLSv1.3",
										city: "Uppsala",
										timezone: "Europe/Stockholm",
										tlsClientHelloLength: "607",
										requestPriority: "",
										edgeRequestKeepAliveStatus: 1,
										tlsClientRandom: "DYDbhGD31yosy1I6EVZ0ikEwXNpdalXSEqbAlm3CqAg=",
										region: "Uppsala County",
										latitude: "59.85510",
										postalCode: "753 35",
										regionCode: "C",
										asOrganization: "Telenor Sverige AB",
										colo: "CPH",
										country: "SE",
									},
								},
								response: {
									status: 200,
								},
							},
						},
					],
				],
				level: "log",
				timestamp: 1732539494701,
			},
		],
		eventTimestamp: 1732539494701,
		event: {
			consumedEvents: [
				{
					scriptName: "worker-banking-ledger",
				},
			],
		},
		id: 17,
	},
]
