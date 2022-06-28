//This implements the interface for all lower level Pipa Stream objects
import { PipaPeeper } from "../../PipaPeeper/PipaPeeper.js";
import { PipaOS } from "../PipaOS.js";
export class PipaFS extends PipaOS{
    constructor(){
        this.peeper = PipaPeeper()
    }


}