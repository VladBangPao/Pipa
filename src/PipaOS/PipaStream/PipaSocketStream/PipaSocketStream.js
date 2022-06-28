import { PipaPeeper } from "../../../../PipaPeeper/PipaPeeper.js";
import { PipaStream } from "../PipaStream.js"
export class PipaSocketStream extends PipaStream{
    constructor(){
        this.peeper = PipaPeeper()

    }
}