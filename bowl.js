import * as net from 'node:net';
import * as fs from "node:fs";
import * as path from "node:path";
import { existsSync } from 'fs';


export class BowlClient {
  constructor(host, port, bowlname){
    this.bowlname = bowlname
    this.bowlpath = './tmp/'+this.bowlname
    this.mkdr(this.bowlpath)
    this.sock = new Socket({allowHalfOpen:true, writable:true})
    this.sock.connect({port:3000, host:'localhost', keepAlive:true})
    setInterval(()=>{
      //create a new file for local pipa to pipe to
      //create local pipa object, and pipa the data to the tmp_uniqueId file from bowlpath
      //then use stream(tmp_uniqueId). local pipa cleans after itself in bowlpath every iteration.

    }, 2500)
    
  }

  stream(source){
    pipeline(
      fs.createReadStream(source),
      this.sock,
      (err)=>{
          if (err){
              console.log('Pipeline failed', err)
          }else{
              console.log('Pipeline succeeded');
          }
      }
    );
  }
  mkdr(path){
      if (!fs.existsSync(path.dirname(path))){
        fs.mkdirSync(path.dirname(path));
      }
      fs.writeFileSync(path, "", {flag:'a'})
  }

  
}
  
var bowl = new BowlClient('localhost',3000, 'new.bowl')