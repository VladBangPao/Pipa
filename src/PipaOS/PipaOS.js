//Pipa OS is an abstraction from any Os 
//Resource such as net/ipc sockets and files
import { PipaPeeper } from "../PipaPeeper/PipaPeeper.js";
import { PipaObject } from "../PipaObject.js"
export class PipaOS extends PipaObject{

    constructor(){
        this.peeper = PipaPeeper()
    }

    



}