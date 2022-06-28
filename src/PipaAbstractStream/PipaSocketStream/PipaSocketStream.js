import { PipaPeeper } from "../../../../PipaPeeper/PipaPeeper.js";
import { PipaAbstractStream } from "../PipaAbstractStream.js"
export class PipaSocketStream extends PipaAbstractStream{
    constructor(){
        this.peeper = PipaPeeper()

    }
}