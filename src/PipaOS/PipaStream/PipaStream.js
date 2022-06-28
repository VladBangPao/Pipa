//This implements the interface for all lower level Pipa Stream objects
import { PipaPeeper } from "../../PipaPeeper/PipaPeeper.js";
import { PipaOS } from "../PipaOS.js";
export class PipaStream extends PipaOS{
    constructor(){
        this.peeper = PipaPeeper()
    }


}