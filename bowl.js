import * as net from 'node:net';
import * as fs from "node:fs";
import * as path from "node:path";
import { existsSync } from 'fs';


export class BowlClient {
  constructor(host, port, bowlname){
    this.bowlname = bowlname
    this.bowlpath = './tmp/'+this.bowlname
    this.mkdr()
    this.socket = net.createConnection({host:host, port:port})
    this.config_socket()
    this.rstream = fs.createReadStream(this.bowlpath)
    this.config_read_stream()
    this.file_watcher = fs.watch(this.bowlpath, {persistent:true})
    this.config_fsWatcher()
  }

  config_fsWatcher(){
    this.file_watcher.on('close',()=>{
      var data = this.rstream.read()
      if (data !== null){
        this.socket.write(data, ()=>{})
      }
      this.file_watcher = fs.watch(this.bowlpath, {persistent:true})
      this.config_fsWatcher()

    });
    this.file_watcher.on('change', ()=>{
      var data = this.rstream.read()
      if (data !== null){
        this.socket.write(data, ()=>{})
      }
    });
    this.file_watcher.on('error', (eventType, filename)=>{
      var data = this.rstream.read()
      if (data !== null){
        this.socket.write(data, ()=>{})
      }
      this.file_watcher = fs.watch(this.bowlpath, {persistent:true})
      this.config_fsWatcher()
    });
  }
  config_read_stream(){
    this.rstream.on('close',()=>{
      console.log('read stream has closed')

      var data = this.rstream.read()
      if (data !== null){
        this.socket.write(data+'\n')
      }
      this.rstream = fs.createReadStream(this.bowlpath)
      this.config_read_stream()
    })
    this.rstream.on('open', ()=>{
      console.log('read stream has opened')
      var data = this.rstream.read()
      if (data !== null){
        this.socket.write(data)
      }
    })
    this.rstream.on('ready', ()=>{
      console.log('read stream is ready')
      var data = this.rstream.read()
      if (data !== null){
        this.socket.write(data)
      }

    })

  }
  config_socket(){
    this.socket.allowHalfOpen=true
    this.socket.on('close', (error)=>{
      console.log('socket closed: ', error)
    });
    this.socket.on('connect', (conn)=>{
      console.log('connection established:', conn)
    })
    this.socket.on('drain', ()=>{
      this.socket.resume()
    })
    this.socket.on('end', ()=>{
      this.socket.resume()
    })
    this.socket.on('error', (err)=>{
      console.log('Socket error:', err)
    })
    this.socket.on('timeout', ()=>{
      this.socket.resume()
    })
    this.socket.on('lookup', ()=>{
      console.log('looking up host')
    })
    this.socket.on('data', (data)=>{
      this.socket.write(data)
    })


  }

  mkdr(){
      if (!fs.existsSync(path.dirname(this.bowlpath))){
        fs.mkdirSync(path.dirname(this.bowlpath));
      }
      console.log("grabbing a bowl", this.bowlpath)
      fs.writeFileSync(this.bowlpath, "", {flag:'a'})
  }

  local_pipa(f1, f2){
    this.f1 = f1
    this.f2 = f2
    var rstream = fs.createReadStream(f1, {flags:'r+', pos:0})
    var wstream = fs.createWriteStream(f2, {flags:'a', start:0})
    var pstream = rstream.pipe(wstream, {end:false}, ()=>{})  
    var counter = 0;
    wstream.on('data', (src)=>{
        wstream.start+=1
        rstream.pos+=1
        counter+=1
        //This is where i need to delete the previous char from read file
    })
    rstream.on('close', ()=>{
        //clean up read file
        fs.open(f1, 'w', (err, fd) => {
            for (var i = 0; i<=counter; i+=1){
                fs.write(fd, "",0, {}, ()=>{
                })
            }
            fs.close(fd)
            counter=0
        });
    })
  }
}
  
var bowl = new BowlClient('localhost',3000, 'new.bowl')