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
var filename = './testfile.something'
var filename2 = './testfile2.something'
var wstream = fs.createWriteStream(filename2, {flags:'a', start:0})
var rstream = fs.createReadStream(filename, {flags:'r+', pos:0})
var pstream = rstream.pipe(wstream, {end:false}, ()=>{})  
wstream.on('data', (src)=>{
    wstream.start+=1
    rstream.pos+=1
    //This is where i need to delete the previous char from read file
})
rstream.on('close', ()=>{
    //clean up read file
    fs.open(filename, 'w', (err, fd) => {
        for (var i = 0; i<=100; i+=1){
            fs.write(fd, "",0, {}, ()=>{
            })
        }
        fs.close(fd)
    });
})




  



