
import winston, { Logform, Logger, loggers } from 'winston';

//const logger : Logger = Polyglot.logger;

// export const stdoutWrite = process.stdout.write.bind(process.stdout);
// const stderrWrite = process.stderr.write.bind(process.stderr);
// /** Intercept console.log, b/c this is where Matter logs by default **/
// process.stdout.write = (data, callback) => {
//   logger.info(data);

//   return stdoutWrite(data, callback);
// };
// process.stderr.write = (data, callback) => {
//   logger.error(data);

//   return stderrWrite(data, callback);
// };



import { Logger as MatterLogger, Level, levelFromString } from '@project-chip/matter.js/log';
import { stringify } from 'querystring';
import { format } from 'util';
//import {clone} from 'isy-nodejs/Utils';
//let { Utils } = await import ('isy-nodejs');


// function plainLogFormatter(now: Date, level: Level, facility: string, prefix: string, values: any[]) {
//     const creator = plaintextCreator();

//     const formattedValues = renderDiagnostic(values, {
//         ...creator,
//         key: text => creator.text(`${text}: `),
//         value: producer => creator.text(producer()),
//         strong: producer => creator.text(`*${producer()}*`),
//         weak: producer => creator.text(producer()),
//         status: (status, producer) => `${creator.text(statusIcon(status))}${producer()}`,
//         via: text => creator.text(text),
//     });

//     return `${formatTime(now)} ${Level[level]} ${facility} ${prefix}${formattedValues}`;
//

//let matterLogger = clone(logger,'matter.js');

//2024-07-03 16:30:43.693
// MatterLogger.addLogger(
//     "polyLogger",
//     (level, message) => logger.log(Level[level].toLowerCase().replace('notice','info'),message.slice(23).remove(Level[level]).trimStart()), /*Preserve existing formatting, but trim off date*/
// 	{
//         defaultLogLevel: levelFromString(logger.level),
// 		logFormat: 'plain'
//     });

// MatterLogger.defaultLogLevel = levelFromString(logger.level);
//MatterLogger.logFormatter = (now,level,facility,nesting,values) => `[${facility}]${values.map(value => JSON.stringify(value)).join(' ')}`s
//MatterLogger.setLogFormatterForLogger("polyLogger", (now,l,facility,nesting,values) => JSON.stringify(value))

//MatterLogger.log = (level, message) => logger.log(Level[level].toLowerCase().replace('notice','info'),message);

//MatterLogger.log = (level, message) => logger.log(Level[level], message);
    //MatterLogger.setLogger(identifier, log)
    //TODO: Map winston log levels to matter log levels;
   // MatterLogger.defaultLogLevel = levelFromString(logger.level);
    // for(const l of MatterLogger.logger)
    // {
    //   l.log = (level,message) => logger.log(Level[level].toLowerCase().replace('notice','info'),message);
    // }

declare global {

	interface String {

	remove(searchValue: string | RegExp): string;

	removeAll(searchValue: string | RegExp): string;

	right(numChars: number): string;
	left(numChars: number): string;
	rightWithToken(maxNumChars: number, token?: string): string;

	leftWithToken(maxNumChars: number, token?: string): string;


	}

}


export function right(this: string, numChars: number)
{
	var l = this.length;
	return this.substring(length - numChars)
}

export function left(this: string, numChars: number)
{

	return this.substring(0,numChars - 1)
}

export function rightWithToken(this: string, maxNumChars: number, token: string = ' ')
{

	var s = this.split(token);
	var sb = s.pop();
	var sp = s.pop()
	while(sp !== undefined && sb.length + sp.length + token.length <= maxNumChars )
	{
		sb = sp + token + sb;
		sp = s.pop();
	}

    return sb;
}

export function leftWithToken(this: string, maxNumChars: number, token: string = ' ')
{
	var s = this.split(token).reverse();
	var sb = s.pop();
	var sp = s.pop();
	while(sp !== undefined && sb.length + sp?.length + token.length <= maxNumChars)
	{

		sb = sb + token + sp;

		sp = s.pop();
	}
    return sb;
}

export function remove(this: string, searchValue: string | RegExp)
{

	return this.replace(searchValue, '');
}

export function removeAll(this: string, searchValue: string | RegExp)
{

	return this.replaceAll(searchValue, '');
}

String.prototype.remove = remove;
String.prototype.removeAll = removeAll;
String.prototype.left = left;
String.prototype.right = right;
String.prototype.leftWithToken = leftWithToken;
String.prototype.rightWithToken = rightWithToken;
