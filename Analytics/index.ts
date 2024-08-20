import { Configuration as AnalyticsConfiguration } from "./Configuration"
import { Event as AnalyticsEvent } from "./Event"

export namespace Analytics {
	export import Event = AnalyticsEvent
	export import Configuration = AnalyticsConfiguration
}
