# Pipa Specifications
![pipa](https://user-images.githubusercontent.com/107733608/176111658-19ea770d-9459-483e-8147-722a85a07afb.jpg)

## Implementation is not Strictly Necessary!
Please go away... Or appreciate Pipa's wonderful recursive design!

### Possible use cases:
1. nlp pipelines
2. network socket and file stream filtering
3. dynamically changing network traffic based on analysis


## Pipa's Recursive and Event Driven Design
![RecursiveDesign2](https://github.com/ItsZeusBro/Pipa/blob/51b16cb95b2ba0052ab878f22c6730adb4adbea7/Docs/PipaRecursiveDesign2.jpg)


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
      
### Pipa Chaining
      //You could chain pipas
      pipa1.pipe(pipa2).pipe(pipa3)
      //This means pipa1=>pipa2=>pipa3, and would mean that pipa2 would
      //consume the write stream belonging to pipa1 as its own readstream
      //etc.
      
### (Experimental) Add jobs on the fly, while watching the Pipa 
      //pipa.get_status() helps you get the pipa state info, and where 
      //it is in the pipeline. If you wanted to add a processing job 
      //on the fly you could (if you are analyzing your pipa)
      
      while(true){
            if(pipa.get_status()==some_status){
                  //Add a new job to queue position
                  pipa.addJob(2, newJob)
            }
      }
      
      //This adds a lot of flexibility to a dynamic pipeline, but 
      //im not sure at what cost. 
      //You should also be able to change the write and read streams 
      //on the fly
      

### Pipa's Client Server Flow:
![PipaJobFlow](https://user-images.githubusercontent.com/107733608/176127062-3178469f-d0a5-4b41-ad5b-1398787ef68e.jpg)


### Pipa's Piper:
![PipaPiper](https://user-images.githubusercontent.com/107733608/176128446-c67f0e6e-1e16-49fc-abca-ceb729a9d1fb.jpg)


### Pipa Package Diagram:

![PackageDiagram2](https://github.com/ItsZeusBro/Pipa/blob/51b16cb95b2ba0052ab878f22c6730adb4adbea7/Docs/PipaPackageDiagram2.jpg)
