//An abstract data structure is an interface that all Data Structures
//of a particular type share. For example there are many types of trees. 
//So, an Abstract Tree would have properties and methods they all share.
//PipaAbstractDataStruct is an interface to all data structures
//So what do all datastructures share in common? Data, for one.
//Loading a datastructure is done one at a time, usually from
//a more primitive data structure, like a stack or queue.
//So every data structure should have a stack or queue loader

import { PipaObject } from "../PipaObject/PipaObject";
export class PipaAbstractDataStruct extends PipaObject{
    constructor(){
        //this is a queue or stack
        this.loader=[]
    }
    push(){

    }
    pop(){

    }
}