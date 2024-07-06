import { EventType } from './EventType.js';
import { NodeEvent } from './NodeEvent.js';
class PropertyChangedEvent extends NodeEvent<string, EventType.PropertyChanged> {
	property: string;
	formattedValue: string;
	constructor (eventData: any) {
		super(eventData);
		this.property = eventData.control;
		this.formattedValue = eventData.fmtAct;
	}
}
