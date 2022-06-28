//This is not an abstract object! It is used very concretely by each 
//one of the abstract objects (probably in a slightly different way for each type)
import { PipaPeeper } from "../../../PipaPeeper/PipaPeeper.js";
export class PipaWriter {
    constructor(){
        this.peeper = PipaPeeper()

    }
}