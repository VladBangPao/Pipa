//Grab a file descriptor represented as <FileHandle>
// using: fsPromises.open( filename, flags, mode)
import * as fs from "node:fs";
import { stat } from 'node:fs';
import { truncate } from 'node:fs';
//only use promises as opposed to callbacks when you know the underlying
//function is asyncronous in its behavior and when using callbacks is not
//too messy. Callbacks does not guarantee that behavior underneath is asyncronous
//It can be defensive in nature. Whereas Promises is more offensive.

//This returns an <fs.ReadStream> which inherits from Readable Streams objects
//It has close, open, and ready events

//This is what we'll use if reading from a socket and writing to a file (now we need to reverse it by changing the file names)
var filename2 = './testfile.something'
var filename = './testfile2.something'
function pipa(filename, filename2){
    var wstream = fs.createWriteStream(filename2, {flags:'a', start:0})
    var rstream = fs.createReadStream(filename, {flags:'r+', pos:0})
    var pstream = rstream.pipe(wstream, {end:false}, ()=>{})  
    var counter = 0;
    wstream.on('data', (src)=>{
        wstream.start+=1
        rstream.pos+=1
        counter+=1
    })
    rstream.on('close', ()=>{
        //clean up read file
        fs.open(filename, 'w', (err, fd) => {
            for (var i = 0; i<=counter; i+=1){
                fs.write(fd, "",0, {}, ()=>{
                })
            }
            fs.close(fd)
            counter=0
        });
    })
}