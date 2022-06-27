import * as net from 'node:net';
import * as fs from "node:fs";
import * as path from "node:path";

//This is the pull side of a Pipa. It needs the following:
//A server listener on a port of your choice that keeps accepting new connections on a socket
//A socket to filter (just a file) pipa
//thats it!
export class FilterServer {
  constructor(port, filtername){
    this.port = port
    this.filtername = filtername
    this.filterpath = './tmp/'+this.filtername
    this.mkdr()
    this.wstream = fs.createWriteStream(this.filterpath)
    this.config_write_stream()
    this.socket = null
    var server = net.createServer((socket)=>{
      this.socket=socket
      this.config_socket(socket)
    })

    server.listen(this.port, ()=>{
      console.log("listening on port: ", this.port)
    })

  }
  config_write_stream(){
    this.wstream.on('close',()=>{
      this.wstream = fs.createWriteStream(this.filterpath)
      this.write('wstream.on.close.createWriteStream.config_write_stream()')
      this.config_write_stream()
    })
    this.wstream.on('open', ()=>{
      this.write('wstream.on.open.write()')
    })
    this.wstream.on('ready', ()=>{
      this.write('wstream.on.ready.write()')
    })
  }


  config_socket(){
    this.socket.allowHalfOpen=true
    this.socket.on('close', (error)=>{
      this.socket = net.createConnection({ host:this.host, port: this.port }, () => {
        this.write('this.socket.on.close.createConnection.write.config_socket()')
        this.config_socket()
      });
    });
    this.socket.on('connect', (conn)=>{
      this.mkdr()
      this.write('socket.on.connect.write()')
    })
    this.socket.on('drain', ()=>{
      this.write('socket.on.drain.write.resume()')
      this.socket.resume()
    })
    this.socket.on('end', ()=>{
      this.socket = net.createConnection({ host:this.host, port: this.port }, () => {
      this.write('this.socket.on.end.createConnection.write.config_socket()')
      this.config_socket()
      })
    })
    this.socket.on('error', (err)=>{
      this.socket = net.createConnection({ host:this.host, port: this.port }, () => {
      this.write('this.socket.on.error.createConnection.write.config_socket()')
      this.config_socket()
      })
    })
    this.socket.on('timeout', ()=>{
      this.socket.close()
      this.socket = net.createConnection({ host:this.host, port: this.port }, () => {
      this.write('this.socket.on.timeout.close..createConnection.write.config_socket()')
      this.config_socket()
      })
    })
    this.socket.on('data', (data)=>{
      this.write('this.socket.on.data.write()', data)
      console.log("number of bytes written thus far", this.wstream.bytesWritten)
    })
  }
  write(message, data){
    if(data){
      this.wstream.write(data)
    }else{
      try{
        var data = this.socket.read();
        if(data !== null){
          console.log(message);
          this.wstream.write(data);
        }
      }catch{
      }
    }
    
  }
  
  mkdr(){
    if (!fs.existsSync(path.dirname(this.filterpath))){
      fs.mkdirSync(path.dirname(this.filterpath));
    }
    console.log("grabbing a filter", this.filterpath)
    fs.writeFileSync(this.filterpath,"", {flag:'a'})
  }
}

var filter = new FilterServer(3000, "new.filter")