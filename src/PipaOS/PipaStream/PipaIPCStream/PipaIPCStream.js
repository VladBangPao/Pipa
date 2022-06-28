import { PipaPeeper } from "../../../../PipaPeeper/PipaPeeper.js";
import { PipaStream } from "../PipaStream.js"
export class PipaIPCStream extends PipaStream{
    constructor(){
        this.peeper = PipaPeeper()

    }
}