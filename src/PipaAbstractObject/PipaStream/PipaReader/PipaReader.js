//This should contain a throttle that listens for 
//Buffer events
//This is not an abstract object! It is used very concretely by each 
//one of the abstract objects (probably in a slightly different way for each type)
import { PipaPeeper } from "../../../PipaPeeper/PipaPeeper.js";
export class PipaReader {
    constructor(){
        this.peeper = PipaPeeper()

    }
}