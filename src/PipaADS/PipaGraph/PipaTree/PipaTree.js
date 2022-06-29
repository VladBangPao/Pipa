import { PipaGraph } from "../PipaGraph.js";
//
class PipaTree extends PipaGraph{
    constructor(max_width, max_height){
        this.height=0;
        this.width=0;
        this.depth=0;
        this.size=0;
        this.max_width=max_width
        this.max_height=max_height
        this.root=null
    }

    //uses a graph breadth first or depth first search
    search(method){

    }
    //overrides graph add
    add(node){

    }
    //overrides graph remove. Options specifies what to do when there are duplicates
    remove(data, options={}){

    }
    get_height(){

    }
    get_width(){

    }
    get_depth(){

    }
    get_max_width(){

    }
    get_max_height(){

    }

}