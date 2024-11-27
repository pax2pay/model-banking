import { pax2pay } from "../index"

describe("Reworking incoming logs to processable logs", () => {
	it("Reworking incoming logs to processable logs", () => {
		const log = pax2pay.Log.fromEvents(events as any)
		expect(log).toMatchInlineSnapshot(`
[
  {
    "collection": "card",
    "created": "2024-11-26T08:19:08.027Z",
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
            15,
          ],
          "preset": "test-ta-pg-200",
          "realm": "test",
        },
        "message": "Request body",
      },
      {
        "data": {
          "cf-connecting-ip": "345345",
          "cf-ipcountry": "SE",
          "country": "SE",
          "datacenter": "CPH",
        },
        "message": "Locations",
      },
      {
        "data": {
          "account": "6AEY3VzL",
          "created": "2024-11-26T08:19:10.998Z",
          "details": {
            "expiry": [
              24,
              12,
            ],
            "holder": "Pax2pay",
            "iin": "111111",
            "last4": "6557",
          },
          "history": [
            {
              "created": "2024-11-26T08:19:10.998Z",
              "status": "created",
              "type": "card",
            },
          ],
          "id": "zzzyQ8WmTHnkayqC",
          "limit": [
            "GBP",
            15,
          ],
          "organization": "6OSoVdty",
          "preset": "test-ta-pg-200",
          "realm": "test",
          "reference": "zzzyQ8WmTHnkayqC6AEY3VzL",
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
    "resource": "zzzyQ8WmTHnkayqC",
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

const events = [
	{
		truncated: false,
		executionModel: "stateless",
		outcome: "ok",
		scriptVersion: {
			id: "d4f1fe27-2c36-4202-b3c9-c1e77034665c",
		},
		scriptName: "worker-banking-card",
		diagnosticsChannelEvents: [],
		exceptions: [],
		logs: [
			{
				message: [
					{
						collection: "card",
						realm: "test",
					},
				],
				level: "log",
				timestamp: 1732609148028,
			},
			{
				message: [
					{
						message: "Request body",
						data: {
							account: "6AEY3VzL",
							realm: "test",
							details: {
								expiry: [24, 12],
								holder: "Pax2pay",
							},
							limit: ["GBP", 15],
							preset: "test-ta-pg-200",
						},
					},
				],
				level: "log",
				timestamp: 1732609148028,
			},
			{
				message: [
					{
						message: "Locations",
						data: {
							"cf-connecting-ip": "345345",
							"cf-ipcountry": "SE",
							datacenter: "CPH",
							country: "SE",
						},
					},
				],
				level: "log",
				timestamp: 1732609148028,
			},
			{
				message: [
					"Processors.issue result: ",
					{
						account: "6AEY3VzL",
						scheme: "mastercard",
						organization: "6OSoVdty",
						realm: "test",
						created: "2024-11-26T08:19:10.998Z",
						details: {
							expiry: [24, 12],
							holder: "Pax2pay",
							iin: "111111",
							token: "1111116557/16/1224/0818/qNANi18rvyEXUPrxaq0nPUOgpoYYgFYA5WtW9gIjz2BNlys8/vLm4g75ZzHHk7WS3e2bDsg",
							last4: "6557",
						},
						history: [
							{
								type: "card",
								status: "created",
								created: "2024-11-26T08:19:10.998Z",
							},
						],
						id: "zzzyQ8WmTHnkayqC",
						limit: ["GBP", 15],
						preset: "test-ta-pg-200",
						reference: "zzzyQ8WmTHnkayqC6AEY3VzL",
						rules: [],
						spent: ["GBP", 0],
						status: "active",
					},
				],
				level: "log",
				timestamp: 1732609151188,
			},
			{
				message: [
					"create.issued: ",
					{
						account: "6AEY3VzL",
						scheme: "mastercard",
						organization: "6OSoVdty",
						realm: "test",
						created: "2024-11-26T08:19:10.998Z",
						details: {
							expiry: [24, 12],
							holder: "Pax2pay",
							iin: "111111",
							token: "1111116557/16/1224/0818/qNANi18rvyEXUPrxaq0nPUOgpoYYgFYA5WtW9gIjz2BNlys8/vLm4g75ZzHHk7WS3e2bDsg",
							last4: "6557",
						},
						history: [
							{
								type: "card",
								status: "created",
								created: "2024-11-26T08:19:10.998Z",
							},
						],
						id: "zzzyQ8WmTHnkayqC",
						limit: ["GBP", 15],
						preset: "test-ta-pg-200",
						reference: "zzzyQ8WmTHnkayqC6AEY3VzL",
						rules: [],
						spent: ["GBP", 0],
						status: "active",
					},
				],
				level: "log",
				timestamp: 1732609151188,
			},
			{
				message: [
					"create.result: ",
					{
						account: "6AEY3VzL",
						scheme: "mastercard",
						organization: "6OSoVdty",
						realm: "test",
						created: "2024-11-26T08:19:10.998Z",
						details: {
							expiry: [24, 12],
							holder: "Pax2pay",
							iin: "111111",
							token: "1111116557/16/1224/0818/qNANi18rvyEXUPrxaq0nPUOgpoYYgFYA5WtW9gIjz2BNlys8/vLm4g75ZzHHk7WS3e2bDsg",
							last4: "6557",
						},
						history: [
							{
								type: "card",
								status: "created",
								created: "2024-11-26T08:19:10.998Z",
							},
						],
						id: "zzzyQ8WmTHnkayqC",
						limit: ["GBP", 15],
						preset: "test-ta-pg-200",
						reference: "zzzyQ8WmTHnkayqC6AEY3VzL",
						rules: [],
						spent: ["GBP", 0],
						status: "active",
					},
				],
				level: "log",
				timestamp: 1732609151658,
			},
			{
				message: [
					{
						message: "Card Create Result",
						resource: "zzzyQ8WmTHnkayqC",
						data: {
							account: "6AEY3VzL",
							scheme: "mastercard",
							organization: "6OSoVdty",
							realm: "test",
							created: "2024-11-26T08:19:10.998Z",
							details: {
								expiry: [24, 12],
								holder: "Pax2pay",
								iin: "111111",
								last4: "6557",
							},
							history: [
								{
									type: "card",
									status: "created",
									created: "2024-11-26T08:19:10.998Z",
								},
							],
							id: "zzzyQ8WmTHnkayqC",
							limit: ["GBP", 15],
							preset: "test-ta-pg-200",
							reference: "zzzyQ8WmTHnkayqC6AEY3VzL",
							rules: [],
							spent: ["GBP", 0],
							status: "active",
						},
					},
				],
				level: "log",
				timestamp: 1732609151658,
			},
		],
		eventTimestamp: 1732609148027,
		event: {
			request: {
				url: "https://banking.pax2pay.app/card",
				method: "POST",
				headers: {
					accept: "*/*",
					"accept-encoding": "gzip, br",
					authorization: "REDACTED",
					"cf-connecting-ip": "83.233.243.146",
					"cf-ipcountry": "SE",
					"cf-ray": "8e8873a71f6b1d22",
					"cf-visitor": '{"scheme":"https"}',
					connection: "Keep-Alive",
					"content-length": "175",
					"content-type": "application/json",
					host: "banking.pax2pay.app",
					organization: "6OSoVdty",
					realm: "test",
					"x-forwarded-proto": "https",
					"x-real-ip": "83.233.243.146",
				},
				cf: {
					clientTcpRtt: 24,
					longitude: "18.05600",
					latitude: "59.32470",
					tlsCipher: "AEAD-AES256-GCM-SHA384",
					continent: "EU",
					asn: 29518,
					tlsClientExtensionsSha1: "bJfDPn82Ud8taZ6+PSOSubkqDGs=",
					isEUCountry: "1",
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
						clientFinished:
							"b6fcaf2b44895ad33b1f67d8a889afee45f0a71f90e9c41693b01cbfc9d78b209b7d2877ece38332cd065b1bcb102e31",
						clientHandshake:
							"711ef29f5b2f930e8948ed1a1b9dea37ce1672201b4e0a34e9d4f7072eea02eb91cdf506c903b72e73475eff21fdcfe6",
						serverHandshake:
							"bf8718f0e3c8eb3f89cc69439687453e3d9f0efa706475e41f79e067a3cf3bd461df7392e77cc98af2a3fa649706e0d0",
						serverFinished:
							"664f7dd4cc68abf7488eff6297ddc582f17026f65610c51befdc2ddb2fdafe601590891588c3be4293d7457e01b27ba0",
					},
					tlsVersion: "TLSv1.3",
					colo: "CPH",
					timezone: "Europe/Stockholm",
					verifiedBotCategory: "",
					edgeRequestKeepAliveStatus: 1,
					requestPriority: "weight=16;exclusive=0;group=0;group-weight=0",
					tlsClientHelloLength: "508",
					tlsClientRandom: "5ToX2cd0gSnBb4VwurzAe7sK662jUs7WhDHv3k8YrkQ=",
					asOrganization: "Bredband2 AB",
					country: "SE",
					httpProtocol: "HTTP/2",
				},
			},
			response: {
				status: 200,
			},
		},
		id: 1,
	},
]
