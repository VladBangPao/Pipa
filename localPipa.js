class LocalPipa{
constructor(f1, f2){
        this.f1 = this.mkdir(f1)
        this.f2 = this.mkdir(f2)
        this.rstream = fs.createReadStream(this.f1, {flags:'r+', pos:0})
        this.wstream = fs.createWriteStream(this.f2, {flags:'a', start:0})
        this.pstream = this.rstream.pipe(this.wstream, {end:false}, ()=>{})  
        this.counter = 0;
        this.wstream.on('data', (src)=>{
            this.wstream.start+=1
            this.rstream.pos+=1
            this.counter+=1
            //This is where i need to delete the previous char from read file
        })
        this.rstream.on('close', ()=>{
            //clean up read file
            fs.open(this.f1, 'w', (err, fd) => {
                for (var i = 0; i<=this.counter; i+=1){
                    fs.write(fd, "",0, {}, ()=>{
                    })
                }
                fs.close(fd)
                this.counter=0
            });
        })
    }
    mkdir(f){
        if (!fs.existsSync(path.dirname(f))){
            fs.mkdirSync(path.dirname(f));
          }
          fs.writeFileSync(f,"", {flag:'a'})
    }
}
//This would be used to keep the user source file clean and allow us to take our time processing the data
LocalPipa('./tmp/local.bowl', './tmp/local.filter')