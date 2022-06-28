import { PipaConnect } from "../PipaConnect.js"
export class PipaServer extends PipaConnect{
    constructor(){
        this.peeper = PipaPeeper()

    }
}