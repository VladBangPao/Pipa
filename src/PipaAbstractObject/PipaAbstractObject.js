//Pipa Abstract Object is an abstraction from any Os 
//Streamable Object such as net/ipc sockets and files
//It manages the paths from which things are actually
//read and written to using Node Api and the host os
//Pipa Abstract Objects have a read and write Pipa Stream
//They can have a unique id, for future applications

import { PipaPeeper } from "../PipaPeeper/PipaPeeper.js";
export class PipaAbstractObject {

    constructor(){
        this.peeper = PipaPeeper()
    }

    



}