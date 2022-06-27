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

    var server = net.createServer((socket)=>{
      this.config_socket(socket)
    })

    server.listen(this.port, ()=>{
      console.log("listening on port: ", this.port)
    })

  }
  config_write_stream(){
    this.wstream.on('close',()=>{
      console.log('write stream has closed')
    })
    this.wstream.on('open', ()=>{
      console.log('write stream has opened')

    })
    this.wstream.on('ready', ()=>{
      console.log('write stream is ready')

    })

  }


  config_socket(socket){
    socket.allowHalfOpen=true
    socket.on('close', (error)=>{
      console.log('socket closed: ', error)
    });
    socket.on('connect', (conn)=>{
      console.log('connection established:', conn)
    })
    socket.on('drain', ()=>{
      socket.resume()
    })
    socket.on('end', ()=>{
      socket.resume()
    })
    socket.on('error', (err)=>{
      console.log('Socket error:', err)
    })
    socket.on('timeout', ()=>{
      socket.resume()
    })

    socket.on('data', (data)=>{
      console.log("recieving data:", data)
      this.wstream.write(data)
      console.log("number of bytes written thus far", this.wstream.bytesWritten)
    })
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