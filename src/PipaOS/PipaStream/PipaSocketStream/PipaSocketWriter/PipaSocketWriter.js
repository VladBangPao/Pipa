import { PipaPeeper } from "../../../../PipaPeeper/PipaPeeper.js";
import { PipaSocketStream } from "../PipaSocketStream.js";
export class PipaSocketWriter extends PipaSocketStream{
    constructor(){
        this.peeper = PipaPeeper()

    }
}