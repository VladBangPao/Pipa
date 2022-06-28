import { PipaPeeper } from "../../PipaPeeper/PipaPeeper.js";
import { PipaAbstractObject } from "../PipaAbstractObject.js";
export class PipaFile extends PipaAbstractObject{
    constructor(){
        this.peeper = PipaPeeper()

    }
}