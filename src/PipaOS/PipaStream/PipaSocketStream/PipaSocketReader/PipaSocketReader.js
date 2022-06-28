import { PipaPeeper } from "../../../../PipaPeeper/PipaPeeper.js";
import { PipaSocketStream } from "../PipaSocketStream.js";
export class PipaSocketReader extends PipaSocketStream{
    constructor(){
        this.peeper = PipaPeeper()

    }
}