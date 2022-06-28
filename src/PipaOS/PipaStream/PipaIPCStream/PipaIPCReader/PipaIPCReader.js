import { PipaPeeper } from "../../../../PipaPeeper/PipaPeeper.js";
import { PipaIPCStream } from "../PipaIPCStream.js";
export class PipaIPCReader extends PipaIPCStream{
    constructor(){
        this.peeper = PipaPeeper()

    }
}