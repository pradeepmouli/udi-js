export class ISYError extends Error {
    constructor(messageOrError) {
        if (messageOrError instanceof Error) {
            super(messageOrError.message);
            this.stack = messageOrError.stack;
            this.cause = messageOrError;
            this.name = 'ISYError';
        }
        else if (typeof messageOrError === 'string') {
            super(messageOrError);
            this.name = 'ISYError';
        }
    }
}
class ISYNodeError extends ISYError {
    constructor(messageOrError, node) {
        super(messageOrError);
        this.name = 'ISYNodeError';
        this.node = node;
    }
    node;
}
//# sourceMappingURL=ISYError.js.map