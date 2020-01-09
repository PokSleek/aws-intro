export interface ConsentEvent {
    consent: Consent
}
export interface Consent {
    uuid: string,
    channelType: string,
    channelValue: string,
    countryCode: string,
}
