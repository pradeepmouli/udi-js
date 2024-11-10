'use strict';

const isyMatterServer = require('..');
const assert = require('assert').strict;

assert.strictEqual(isyMatterServer(), 'Hello from isyMatterServer');
console.info('isyMatterServer tests passed');
