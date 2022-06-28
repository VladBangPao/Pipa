import { PipaPeeper } from "../../../PipaPeeper/PipaPeeper.js";
import { PipaFS } from "../PipaFS.js";
export class PipaIPC extends PipaFS{
    constructor(){
        this.peeper = PipaPeeper()

    }
}