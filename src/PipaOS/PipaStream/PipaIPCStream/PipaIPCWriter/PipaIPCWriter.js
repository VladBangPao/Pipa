import { PipaPeeper } from "../../../../PipaPeeper/PipaPeeper.js";
import { PipaIPCStream } from "../PipaIPCStream.js";
export class PipaIPCWriter extends PipaIPCStream{
    constructor(){
        this.peeper = PipaPeeper()

    }
}