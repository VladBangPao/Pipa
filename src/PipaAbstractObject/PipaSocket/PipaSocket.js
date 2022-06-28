import { PipaPeeper } from "../../PipaPeeper/PipaPeeper.js";
import { PipaAbstractObject } from "../PipaAbstractObject.js";
export class PipaSocket extends PipaAbstractObject{
    constructor(){
        this.peeper = PipaPeeper()

    }
}