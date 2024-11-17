import type { ISYNode } from './ISYNode.js';

export class ISYError extends Error {
	constructor(message: string);
	constructor(error: Error);
	constructor(messageOrError: string | Error) {
		if (messageOrError instanceof Error) {
			super(messageOrError.message);
			this.stack = messageOrError.stack;
			this.cause = messageOrError;
			this.name = 'ISYError';
		} else if (typeof messageOrError === 'string') {
			super(messageOrError);
			this.name = 'ISYError';
		}
	}
}

class ISYNodeError extends ISYError {
	constructor(message: string, node: ISYNode);
	constructor(error: Error, node: ISYNode);
	constructor(messageOrError: string | Error, node: ISYNode) {
		super(messageOrError as any);
		this.name = 'ISYNodeError';
		this.node = node;
	}

	node: ISYNode;
}