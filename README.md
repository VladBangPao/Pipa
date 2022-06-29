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

                             pipa1  
                           /      \
                          /        \
                     pip12           pipa3
                    /    \           /    \
                              ...
                  /        \  ...  /        \
                              ...          pipaN   


### Pipa Job Syntax
      ws = fs.createWriteStream(/*whatever*/)
      rs = fs.createReadStream(/*whatever*/)
      pipa = {
            state:{
                  //add to pipa's root (inherited) state here
                  foo: "baz",
                  snap: "crackle"
            }
            //This is the root read stream
            rs: rs,
            
            pipa_bin:{
                  //Create a pipa binary tree using javascript objects 
                  oddJob:{
                        state:{
                        },
                        left(chunk){
                              //this is evaluated first
                        },
                        right(chunk){
                              //then this
                        },
                        config:{},
                        pipa_bin:{
                          //next level
                        }
                        
                  },
                  anotherJob:{
                        state:{
                        },
                        left(chunk){
                              //this is evaluated first
                        },
                        right(chunk){
                              //then this
                        },
                        config:{},
                        pipa_bin:{
                          //next level
                        }
                  },
            }
           
     }
      
      
### Create Pipa
      var pipa = new Pipa(pipa)
      pipa.start()
      

### Pipa Events (you can put these anywhere in Node's runtime so long as it makes sense:
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
            }
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
         
### (Experimental) Add jobs on the fly, while watching the Pipa 
      //design coming soon
      

### Pipa's Client Server Flow:
![PipaJobFlow](https://user-images.githubusercontent.com/107733608/176127062-3178469f-d0a5-4b41-ad5b-1398787ef68e.jpg)


### Pipa's Piper:
      //Sometimes the buffer gets too big for the heap and things are stored on the disk temporarily. In that case:
![PipaPiper](https://user-images.githubusercontent.com/107733608/176128446-c67f0e6e-1e16-49fc-abca-ceb729a9d1fb.jpg)


### Pipa Package Diagram:

![PackageDiagram2](https://github.com/ItsZeusBro/Pipa/blob/51b16cb95b2ba0052ab878f22c6730adb4adbea7/Docs/PipaPackageDiagram2.jpg)
