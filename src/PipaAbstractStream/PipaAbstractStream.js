//This implements the interface for all lower level Pipa Stream objects
import { PipaPeeper } from "../PipaPeeper/PipaPeeper.js";
export class PipaAbstractStream {
    constructor(){
        this.peeper = PipaPeeper()
    }


}