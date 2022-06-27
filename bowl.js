import { Socket} from 'node:net';
import { dirname } from "node:path";
import { existsSync, mkdirSync, writeFileSync, createReadStream, unlinkSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { LocalPipa } from "./localPipa.js"
import { pipeline } from "node:stream";



export class BowlClient {
  constructor(host, port, bowlname){
    this.bowlname = bowlname
    this.bowlpath = './tmp/'+this.bowlname
    this.mkdr(this.bowlpath)
    this.sock = new Socket({allowHalfOpen:true, writable:true})
    this.sock.connect({port:port, host:host, keepAlive:true})
    setInterval(()=>{
      var id = uuidv4()
      var id_path = './tmp/'+id
      writeFileSync(id_path, "", {flag:'a'})
      new LocalPipa(this.bowlpath, id_path, ()=>{
        this.stream(id_path)
      })
    }, 1000)
    
  }

  stream(source){
    pipeline(
      createReadStream(source),
      this.sock,
      (err)=>{
          if (err){
              console.log('Pipeline failed', err)
              
          }else{
              console.log('Pipeline succeeded');
              unlinkSync(source)
          }
      }
    );
  }

  mkdr(somepath){
      if (!existsSync(dirname(somepath))){
        mkdirSync(dirname(somepath));
      }
      writeFileSync(somepath, "", {flag:'a'})
  }

  
}
  
var bowl = new BowlClient('localhost',3000, 'new.bowl')