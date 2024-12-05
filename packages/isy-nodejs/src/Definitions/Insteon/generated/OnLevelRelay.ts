export enum OnLevelRelay {
    Off = 0,
    On = 100
}


export namespace OnLevelRelay {
	export function toBoolean(value: OnLevelRelay): boolean {
		return value === OnLevelRelay.On;
	}

	export function fromBoolean(value: boolean): OnLevelRelay {
		return value ? OnLevelRelay.On : OnLevelRelay.Off;
	}
}