export interface Message<TEventInfo> {
    seqnum: number;
    sid: string;
    timestamp: string;
    control: string;
    action: string;
    node: string;
    eventInfo: TEventInfo;
}
