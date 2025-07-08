// from: https://github.com/pax2pay/merchant-categoriser
// using: https://onlineyamltools.com/convert-yaml-to-json
export const merchants = [
	{
		name: "ryanair",
		unambiguousMcc: "3246",
	},
	{
		name: "easyjet",
		unambiguousMcc: "3245",
	},
	{
		name: "wizzair",
		unambiguousMcc: "3301",
		mccs: ["4511", "3835"],
		contains: ["wizz"],
	},
	{
		name: "aer lingus",
		unambiguousMcc: "3043",
		mccs: ["4511"],
		startsWith: ["AER LINGUS", "AERLINGUS"],
	},
	{
		name: "air malta",
		unambiguousMcc: "3028",
	},
	{
		name: "vueling",
		mccs: ["4511"],
		startsWith: ["vueling"],
	},
	{
		name: "jet2",
		mccs: ["4511", "4722"],
		startsWith: ["JET 2"],
		contains: ["jet2"],
	},
	{
		name: "eurowings",
		mccs: ["4511"],
		startsWith: ["Eurowings"],
	},
	{
		name: "turkish air",
		unambiguousMcc: "3047",
	},
	{
		name: "tap",
		unambiguousMcc: "3035",
	},
	{
		name: "pegasus",
		mccs: ["4511"],
		startsWith: ["pegasus", "flypegasus"],
	},
	{
		name: "royal air maroc",
		unambiguousMcc: "3048",
	},
	{
		name: "qatar air",
		unambiguousMcc: "3136",
	},
	{
		name: "blue island",
		mccs: ["4511"],
		startsWith: ["blue island"],
	},
	{
		name: "klm",
		unambiguousMcc: "3010",
	},
	{
		name: "iberia",
		unambiguousMcc: "3102",
	},
	{
		name: "emirates",
		unambiguousMcc: "3026",
	},
	{
		name: "aegean airlines",
		mccs: ["4511"],
		startsWith: ["aegean"],
	},
	{
		name: "tui",
		mccs: ["4722"],
		startsWith: ["tui"],
	},
	{
		name: "united airlines",
		unambiguousMcc: "3000",
	},
	{
		name: "cathay pacific airlines",
		unambiguousMcc: "3099",
	},
	{
		name: "air serbia",
		mccs: ["4511"],
		startsWith: ["Air Serbia"],
	},
	{
		name: "copa air",
		unambiguousMcc: "3219",
	},
	{
		name: "bamboo airways",
		mccs: ["4511"],
		startsWith: ["bamboo"],
	},
	{
		name: "latam airlines",
		unambiguousMcc: "3052",
		mccs: ["4511"],
		startsWith: ["latam", "lan airlines", "lan airline"],
	},
	{
		name: "flydubai",
		unambiguousMcc: "3070",
		mccs: ["4511"],
		startsWith: ["FLYDUBAI"],
	},
	{
		name: "condor",
		mccs: ["4511"],
		startsWith: ["condor"],
	},
	{
		name: "transavia",
		mccs: ["4511"],
		startsWith: ["transavia"],
	},
	{
		name: "austrian air",
		unambiguousMcc: "3051",
	},
	{
		name: "alitalia",
		unambiguousMcc: "3013",
	},
	{
		name: "apg airlines",
		mccs: ["4511"],
		startsWith: ["apg airlines"],
	},
	{
		name: "iceland air",
		unambiguousMcc: "3050",
	},
	{
		name: "flyone",
		mccs: ["5411", "4511"],
		startsWith: ["flyone"],
	},
	{
		name: "avianca",
		unambiguousMcc: "3039",
	},
	{
		name: "brussels airlines",
		unambiguousMcc: "3029",
	},
	{
		name: "saudia",
		unambiguousMcc: "3014",
	},
	{
		name: "aeromexico",
		unambiguousMcc: "3076",
	},
	{
		name: "gulf air",
		unambiguousMcc: "3040",
	},
	{
		name: "ethiopian airlines",
		unambiguousMcc: "3294",
	},
	{
		name: "egypt air",
		unambiguousMcc: "3037",
		mccs: ["4511"],
		startsWith: ["egypt"],
	},
	{
		name: "albawings",
		mccs: ["4511"],
		startsWith: ["albawings"],
	},
	{
		name: "iberojet",
		mccs: ["4511"],
		startsWith: ["Iberojet", "EVELOP"],
	},
	{
		name: "norwegian air",
		unambiguousMcc: "3211",
		mccs: ["4511"],
		startsWith: ["norwegian"],
	},
	{
		name: "vistara",
		mccs: ["4511"],
		startsWith: ["vistara", "airvistara", "TATA SIA AIR"],
	},
	{
		name: "air greenland",
		mccs: ["4511"],
		startsWith: ["air greenlan"],
	},
	{
		name: "sky express",
		mccs: ["4511"],
		startsWith: ["sky express"],
	},
	{
		name: "air canada",
		unambiguousMcc: "3009",
	},
	{
		name: "philippine airlines",
		unambiguousMcc: "3022",
	},
	{
		name: "south african airlink",
		mccs: ["4511"],
		startsWith: ["south african"],
	},
	{
		name: "air benelux",
		mccs: ["4511"],
		startsWith: ["airbenelux"],
	},
	{
		name: "tunisair",
		unambiguousMcc: "3049",
	},
	{
		name: "lufthansa",
		unambiguousMcc: "3008",
	},
	{
		name: "corendon airlines",
		mccs: ["4511"],
		contains: ["CORENDON"],
	},
	{
		name: "uganda airlines",
		mccs: ["4511"],
		startsWith: ["uganda airlines"],
	},
	{
		name: "freebird airlines",
		mccs: ["4511", "7399"],
		contains: ["freebirdairline"],
	},
	{
		name: "kenya airway",
		unambiguousMcc: "3295",
	},
	{
		name: "kuwait air",
		unambiguousMcc: "3038",
	},
	{
		name: "british airways",
		unambiguousMcc: "3005",
	},
	{
		name: "czech airlines",
		unambiguousMcc: "3217",
	},
	{
		name: "lot polish airlines",
		unambiguousMcc: "3182",
	},
	{
		name: "volotea",
		mccs: ["4511"],
		startsWith: ["Volotea"],
	},
	{
		name: "flybe",
		mccs: ["4511"],
		startsWith: ["flybe"],
	},
	{
		name: "bulgaria air",
		mccs: ["4511"],
		startsWith: ["bulgaria air"],
	},
	{
		name: "sas",
		unambiguousMcc: "3016",
		mccs: ["4121"],
		startsWith: ["sas", "SCANDINAVIAN"],
	},
	{
		name: "qantas",
		unambiguousMcc: "3012",
	},
	{
		name: "air india",
		unambiguousMcc: "3020",
	},
	{
		name: "air europa",
		mccs: ["4511"],
		startsWith: ["air europa"],
	},
	{
		name: "royal jordanian",
		mccs: ["4511"],
		startsWith: ["royal jord", "ALIA - THE", "ALIA-THE"],
	},
	{
		name: "virgin atlantic",
		unambiguousMcc: "3144",
	},
	{
		name: "flexflight",
		mccs: ["4511"],
		startsWith: ["flexflight"],
	},
	{
		name: "rwandair",
		mccs: ["4511"],
		startsWith: ["RWANDAIR"],
	},
	{
		name: "hahn air",
		mccs: ["4511"],
		startsWith: ["hahn air"],
	},
	{
		name: "american air",
		unambiguousMcc: "3001",
	},
	{
		name: "pakistan international airlines",
		unambiguousMcc: "3024",
	},
	{
		name: "singapore airlines",
		unambiguousMcc: "3075",
		mccs: ["4511"],
		startsWith: ["singapore"],
	},
	{
		name: "delta air lines",
		unambiguousMcc: "3058",
	},
	{
		name: "croatia airlines",
		unambiguousMcc: "3088",
	},
	{
		name: "air asia",
		mccs: ["4511", "4722"],
		startsWith: ["airasia", "air asia", "AIRASIA FLIGHT"],
	},
	{
		name: "hawaiian airlines",
		unambiguousMcc: "3196",
	},
	{
		name: "oman air",
		unambiguousMcc: "3183",
		mccs: ["4511"],
		startsWith: ["oman air", "omanair"],
	},
	{
		name: "etihad air",
		unambiguousMcc: "3034",
		mccs: ["4511"],
		startsWith: ["etihad"],
	},
	{
		name: "middle east airlines",
		unambiguousMcc: "3175",
	},
	{
		name: "logan air",
		mccs: ["4511"],
		startsWith: ["loganair"],
	},
	{
		name: "aurigny",
		mccs: ["4511"],
		contains: ["aurigny"],
	},
	{
		name: "eastern airways",
		mccs: ["4511"],
		startsWith: ["eastern airw"],
	},
	{
		name: "sun express",
		mccs: ["4511"],
		contains: ["sunexpress"],
	},
	{
		name: "spirit air",
		unambiguousMcc: "3260",
	},
	{
		name: "air france",
		unambiguousMcc: "3007",
	},
	{
		name: "malaysia airlines",
		unambiguousMcc: "3100",
	},
	{
		name: "finnair",
		unambiguousMcc: "3042",
	},
	{
		name: "swiss air",
		unambiguousMcc: "3015",
		mccs: ["4511"],
		startsWith: ["swiss"],
	},
	{
		name: "air china",
		unambiguousMcc: "3261",
		mccs: ["4511"],
		startsWith: ["Air Chin"],
	},
	{
		name: "ana air",
		unambiguousMcc: "3161",
		mccs: ["4511"],
		startsWith: ["A.N.A AIR", "A.N.A. AIR"],
	},
	{
		name: "ae bsp",
		mccs: ["4511"],
		startsWith: ["AE BSP"],
	},
	{
		name: "thai airways",
		unambiguousMcc: "3077",
		mccs: ["4511"],
		startsWith: ["Thai Airways", "ThaiAirways"],
	},
	{
		name: "jet blue",
		unambiguousMcc: "3174",
		mccs: ["4511"],
		startsWith: ["JET AIRWAYS", "JetBlue", "Jet Blue"],
	},
	{
		name: "westjet",
		unambiguousMcc: "3180",
		mccs: ["4511"],
		startsWith: ["WESTJET AIRWAYS", "WESTJET AIRLINES", "Westjet"],
	},
	{
		name: "aerolineas",
		unambiguousMcc: "3030",
		mccs: ["4511"],
		startsWith: ["AEROLINEAS"],
	},
	{
		name: "air seoul",
		mccs: ["4511"],
		startsWith: ["AIR SEOUL"],
	},
	{
		name: "azerbaijan airlines",
		mccs: ["4511"],
		startsWith: ["AZERBAIJAN"],
	},
	{
		name: "air dolomiti",
		mccs: ["4511"],
		startsWith: ["Air Dolomiti"],
	},
	{
		name: "bangkok airways",
		mccs: ["4511"],
		startsWith: ["BANGKOK AIRW"],
	},
	{
		name: "china airlines",
		unambiguousMcc: "3078",
		startsWith: ["CHINA AIR"],
	},
	{
		name: "china eastern airlines",
		unambiguousMcc: "3206",
		startsWith: ["CHINAEAST"],
	},
	{
		name: "eva air",
		unambiguousMcc: "3084",
		mccs: ["4511"],
		startsWith: ["EVA AIR"],
	},
	{
		name: "jetstar airways",
		unambiguousMcc: "3079",
		startsWith: ["JETSTAR"],
	},
	{
		name: "km malta airlines",
		mccs: ["4511"],
		startsWith: ["KM MALTA"],
	},
	{
		name: "ita airways",
		mccs: ["4511"],
		startsWith: ["Airita"],
	},
	{
		name: "china southern airlines",
		mccs: ["4511"],
		startsWith: ["China south"],
	},
	{
		name: "world2fly",
		mccs: ["4511"],
		startsWith: ["World 2 fly", "world2fly"],
	},
	{
		name: "sata denmark",
		mccs: ["4511"],
		startsWith: ["Sata Denmark", "SataDenmark"],
	},
	{
		name: "air baltic",
		mccs: ["4511"],
		startsWith: ["Air Baltic", "Airbaltic"],
	},
	{
		name: "ajet",
		mccs: ["4511"],
		startsWith: ["AJET"],
	},
	{
		name: "flynorse",
		mccs: ["4511"],
		startsWith: ["FLYNORSE"],
	},
	{
		name: "hainan air",
		unambiguousMcc: "3168",
		mccs: ["4511"],
		startsWith: ["HAINAN"],
	},
	{
		name: "sichuan airlines",
		mccs: ["4511"],
		startsWith: ["SICHUAN AIRL"],
	},
	{
		name: "korean air",
		unambiguousMcc: "3082",
		mccs: ["4511"],
		startsWith: ["KOREAN AIR"],
	},
	{
		name: "gol airlines",
		unambiguousMcc: "3247",
		startsWith: ["GOL AIR"],
	},
	{
		name: "azul brazilian airlines",
		unambiguousMcc: "3300",
		startsWith: ["AZUL AIR"],
	},
	{
		name: "flysafair",
		mccs: ["4511"],
		startsWith: ["FlySafair"],
	},
	{
		name: "air mauritius",
		unambiguousMcc: "3298",
		startsWith: ["AIRMAURITIUS"],
	},
	{
		name: "alaska airlines",
		unambiguousMcc: "3256",
		startsWith: ["ALASKA AIR"],
	},
	{
		name: "allegiant air",
		mccs: ["4511"],
		startsWith: ["ALLEGNT AIR", "ALLEGNT*AIR"],
	},
	{
		name: "plus ultra líneas aéreas",
		mccs: ["4511"],
		startsWith: ["PLUS ULTRA"],
	},
	{
		name: "parkwing",
		mccs: ["4582"],
		startsWith: ["PARKWING"],
	},
	{
		name: "albergo - food and drinks",
		mccs: ["5812"],
		startsWith: ["ALBERGO"],
	},
	{
		name: "amtrak",
		mccs: ["4112"],
		startsWith: ["AMTRAK"],
	},
	{
		name: "italo treno",
		mccs: ["4112"],
		contains: ["ITALOTRENO"],
	},
	{
		name: "ilsa web",
		mccs: ["4112"],
		contains: ["ILSA WEB"],
	},
	{
		name: "rail ninja",
		mccs: ["4722", "4789"],
		startsWith: ["RailNinja"],
	},
	{
		name: "irish rail",
		mccs: ["4789", "4112"],
		startsWith: ["IRISH RAIL"],
	},
	{
		name: "österreichische bundesbahnen",
		mccs: ["4111"],
		startsWith: ["OEBB"],
	},
	{
		name: "rail europe",
		mccs: ["4722"],
		startsWith: ["RAIL EUROPE"],
	},
	{
		name: "via rail canada",
		mccs: ["4112"],
		startsWith: ["VIA RAIL"],
	},
	{
		name: "direct ferries",
		mccs: ["4111", "4411"],
		startsWith: ["DIRECTF"],
	},
	{
		name: "booking.com",
		mccs: ["4722"],
		startsWith: ["BKG*"],
	},
	{
		name: "advertising",
		mccs: ["7311", "5818"],
		contains: ["FACEBK", "google *ad", "googleadwords", "facebook"],
	},
	{
		name: "best western",
		unambiguousMcc: "3502",
		mccs: ["7011"],
		startsWith: ["BEST WESTERN", "BW HOTEL", "B.WESTERN", "B.W."],
	},
	{
		name: "una hotels",
		mccs: ["7011"],
		contains: ["UNAH"],
	},
	{
		name: "unaway hotels",
		mccs: ["7011"],
		startsWith: ["UNAW"],
	},
	{
		name: "albergo - lodging",
		mccs: ["6513", "7011"],
		startsWith: ["ALBERGO"],
	},
	{
		name: "leonardo hotels",
		mccs: ["7011"],
		startsWith: ["LEONARDO HOTEL"],
	},
	{
		name: "hotel mercure",
		unambiguousMcc: "3579",
		mccs: ["7011"],
		startsWith: ["MERCURE"],
	},
	{
		name: "nh hotels & resorts",
		mccs: ["7011", "5812", "4722"],
		startsWith: ["NH"],
	},
	{
		name: "novotel hotels",
		unambiguousMcc: "3642",
		mccs: ["7011"],
		startsWith: ["NOVOTEL"],
	},
	{
		name: "ac hotels",
		mccs: ["7011", "3509", "5812", "3719"],
		startsWith: ["AC Hotel"],
	},
	{
		name: "marriott hotels",
		mccs: ["7011", "3509", "3513", "6513", "3690", "3740"],
		startsWith: ["MARRIOTT"],
	},
	{
		name: "sheraton hotels and resorts",
		mccs: ["7011", "3509", "3503", "6513", "5812"],
		startsWith: ["SHERATON"],
	},
	{
		name: "ih hotels",
		mccs: ["7011"],
		startsWith: ["IH Hotels"],
	},
	{
		name: "ih hotels",
		mccs: ["7011"],
		startsWith: ["IH Hotels"],
	},
	{
		name: "ibis hotels",
		mccs: ["7011", "3533", "3501", "6513", "3672"],
		startsWith: ["IBIS"],
	},
	{
		name: "hyatt hotels & resorts",
		mccs: ["7011", "3640", "3812", "6513", "4722", "3751"],
		startsWith: ["HYATT"],
	},
	{
		name: "hilton hotels & resorts",
		mccs: ["7011", "3604", "3504", "3535", "5812", "6513", "7399", "3833", "3692", "3665", "4722"],
		startsWith: ["HILTON"],
	},
	{
		name: "holiday inn",
		mccs: ["7011", "3501", "5812", "3637", "6513", "3655"],
		startsWith: ["HOLIDAY INN"],
	},
	{
		name: "four seasons",
		unambiguousMcc: "3543",
		mccs: ["7011", "3543", "6513", "3501", "4411"],
		startsWith: ["FOUR SEASONS", "FOURSEASONS"],
	},
	{
		name: "doubletree by hilton",
		mccs: ["7011", "3692", "3504", "3535", "6513", "5813"],
		startsWith: ["DOUBLETREE", "DOUBLE TREE"],
	},
	{
		name: "crowne plaza hotels",
		mccs: ["7011", "6513", "3750", "3501", "3504", "3655"],
		startsWith: ["CROWNE PLAZA"],
	},
] as const
