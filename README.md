# Pipa (This is only a design, implementation coming)

### The idea for Pipa is to help you filter and analyze your stream and socket data through Pipa Jobs

![Pipa](https://user-images.githubusercontent.com/107733608/176090657-2232998e-67d9-47bc-afdd-0328bfb43868.jpg)

### Possible use cases:
1. nlp pipelines
2. network socket and file stream filtering
3. etc.

### Event Driven Design
![PipaDesign](https://user-images.githubusercontent.com/107733608/176090627-ea11de3a-524f-4c9b-85c9-3948500495d6.jpg)
### Pipa Job Syntax
      ws = fs.createWriteStream(/*whatever*/)
      rs = fs.createReadStream(/*whatever*/)
      pipa = {
            state:{
                  //add to pipa's global state here
                  foo: "baz",
                  snap: "crackle"

            }
            rs: rs,
            ws: ws,
            oddJob:{
                  state:{
                        pop: "fizz"
                  },
                  jobName(){
                        //do something to this.rs
                        //write it to this.ws
                  },
                  jobName2(){
                        //do something to this.rs
                        //write it to this.ws
                  },
                  jobName3(){
                        //do something to this.rs
                        //write it to this.ws
                  },
                  job_queue:[jobName, jobName2, jobName3]
            },
            //OR:
            anotherJob: {
                  state: {
                        gee:"wizz"
                  },
                  job(){

                  }
            },
            //AND:
            statelessJob: {
                  job(){

                  }
            },
            
            pipa_queue:[oddJob, anotherJob, statelessJob],
            
            config:{
                  /*pipa configurations go here*/
            }
     }
      
      
### Create Pipa
      var pipa = new Pipa(pipa)
      pipa.start()
      

### Pipa Events:
      pipa.on('oddJob', (job)=>{
        job.on('start', (state)=>{})
        job.on('pending', (state)=>{})
        job.on('end', (state)=>{})
        job.on('error', (state)=>{})
        job.on('state', (event)=>{console.log(event)})
      })

      pipa.on('state',(change)=>{})
      pipa.on('start',(state)=>{})
      pipa.on('pending',(state)=>{})
      pipa.on('end',(state)=>{})
      pipa.on('error',(msg)=>{})

### Pipa Configs
    config:{/*pipa configurations go here*/}
    
### Pipa Internal State and Event Loop
      //say some event fires and the call back passes you the state, 
      //this is something similar to what you would see
      State:{
            foo: "baz",
            snap: "crackle",
            oddJob:{
                  pop:"fizz"
            },
            anotherJob:{
                  gee:"wizz"
            },
      }
      
      //The event loop keeps a watchful eye on state changes to help
      //fire to the proper event api callbacks when these values change
      //so you can log them or whatever
      
      //There are also native Pipa Events that fire based on what's 
      happeing in the pipeline (start, pending, end, error). These
      //events also fire for your jobs. When your job starts, it 
      //would fire to pipa.on('oddJob', (job)=>{
            //which would have its own start, pending, end, and error
            //events
      })
