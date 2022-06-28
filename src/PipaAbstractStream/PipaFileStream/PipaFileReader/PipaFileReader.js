//This should contain a throttle that listens for 
//Buffer events
//This is not an abstract object! It is used very concretely by each 
//one of the abstract objects (probably in a slightly different way for each type)
import { PipaPeeper } from "../../../../PipaPeeper/PipaPeeper.js";
import { PipaFileStream } from "../PipaFileStream.js";
export class PipaFileReader extends PipaFileStream{
    constructor(){
        this.peeper = PipaPeeper()

    }
}