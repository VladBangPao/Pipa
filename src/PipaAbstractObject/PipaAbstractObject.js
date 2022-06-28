//Pipa Abstract Object is an abstraction from any Os 
//Streamable Object such as net/ipc sockets and files
//It manages the paths from which things are actually
//read and written to using Node Api and the host os
//Pipa Abstract Objects have a read and write Pipa Stream
//They can have a unique id, for future applications

import { PipaPeeper } from "../PipaPeeper/PipaPeeper.js";
export class PipaAbstractObject {
    //This should recognize from schema
    //what kind of object its handling and what it needs
    //aoio is abstract object input output
    constructor(aoio){
        this.peeper = PipaPeeper()
        this.aoio = aoio
        this.object = fetchObject(aoio)
    }

    fetchObject(aoio){
        if(aoio['type']=='socket'){
            return this.socket(aoio['config'])
        }else if(aoio['type']=='file'){
            return this.file(aoio['config'])
        }else if(aoio['type']=='IPC'){
            return this.ipc(aoio['config'])
        }else{
            this.peeper.emit('error', new Error('Gee whizz! Schema needs a type! Try again!'))
        }
    }

    file(){

    }
    socket(){

    }
    ipc(){
        
    }


}