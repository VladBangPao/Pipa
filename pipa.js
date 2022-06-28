import * as fs from "node:fs";
import * as path from "node:path";

export class Pipa{
    pipa(f1, f2,  callback){
        
    }
    mkdir(f){
        if (!fs.existsSync(path.dirname(f))){
            fs.mkdirSync(path.dirname(f));
          }
          fs.writeFileSync(f,"", {flag:'a'})
    }
}
//This would be used to keep the user source file clean and allow us to take our time processing the data
var lp = new Pipa()
lp.pipa('./tmp/new.bowl', './tmp/new.filter', ()=>{})
