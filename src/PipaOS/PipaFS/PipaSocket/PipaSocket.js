import { PipaPeeper } from "../../../PipaPeeper/PipaPeeper.js";
import { PipaFS } from "../PipaFS.js";
export class PipaSocket extends PipaFS{
    constructor(){
        this.peeper = PipaPeeper()

    }
}