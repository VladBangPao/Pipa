import * as fs from "node:fs";
import * as path from "node:path";

export class LocalPipa{

    //This can be batch jobbed if you make promisory
    //and it can do a single job with a single read/write stream pipe
    pipa(f1, f2, callback){
        this.mkdir(f1);
        this.mkdir(f2);
        var counter = 0;
        var rstream = fs.createReadStream(f1, {flags:'r+'});
        var wstream = fs.createWriteStream(f2, {flags:'a'});
        rstream.on('close', ()=>{
            //clean up read file
            console.log(rstream.bytesRead, "bytes read through stream")
            console.log("cleaning ", rstream.bytesRead, " bytes from ", f1)
            //use these values if you find a better way to erase
            // var f1Size = fs.stat(f1).size
            // var f1NewSize = f1Size-rstream.bytesRead
            //do not use w flag as it truncates the file
            fs.open(f1, 'r+', (err, fd) => {
                for (var i = 0; i<=rstream.bytesRead; i+=1){
                    fs.write(fd, "",0, {}, ()=>{});
                }
                fs.close(fd);
            });
            callback();
        });
        rstream.pipe(wstream, {end:false}, ()=>{})  
    }

    mkdir(f){
        if (!fs.existsSync(path.dirname(f))){
            fs.mkdirSync(path.dirname(f));
          }
          fs.writeFileSync(f,"", {flag:'a'})

    }
}
//This would be used to keep the user source file clean and allow us to take our time processing the data
var lp = new LocalPipa()
lp.pipa('./tmp/new.bowl', './tmp/new.filter', ()=>{})
