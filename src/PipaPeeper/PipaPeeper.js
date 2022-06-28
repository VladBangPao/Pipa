//Create a general PipaEmitter that every class should instantiate
//within its properties, that all of its functions can use
//That is our event loop architechture!
import { EventEmitter } from 'node:events';
export class PipaPeeper extends EventEmitter {}

//USAGE
//FOR THIS PROGRAM JUST USE THIS PARADIGM. DO NOT USE SetImmediate()
//to get asyncronous behavior, so that we maintain a queue
// const pipaEmitter = new PipaEmitter();
//READ EVENTS WITH (use this seldomly)
// pipaEmitter.on('event', (a, b) => { 
//     console.log(a, b, this);
//     // Prints: a b {}
//   });
//WRITE EVENTS WITH (use this a lot basically)
// pipaEmitter.emit('event', 'a', 'b');

//Using once for situations where you want the listener to only
//be called one time for each type of event (VERY RARELY USED)

//Using node error events without at least one registered error
//listener throws an error. If you have a listener you should be fine
// const myEmitter = new MyEmitter();
// myEmitter.on('error', (err) => {
//   console.error('whoops! there was an error');
// });
// myEmitter.emit('error', new Error('whoops!'));

//This is to prioritize a listener for priority and performance reasons
// server.prependListener('connection', (stream) => {
//     console.log('someone connected!');
//   });


//
//emitter.setMaxListeners(n)
// By default EventEmitters will print a warning if more 
// than 10 listeners are added for a particular event. 
// This is a useful default that helps finding memory leaks. 
// The emitter.setMaxListeners() method allows the limit to 
// be modified for this specific EventEmitter instance. 
// The value can be set to Infinity (or 0) to indicate an 
// unlimited number of listeners.

