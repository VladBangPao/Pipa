# Pipa Specifications
![pipa](https://user-images.githubusercontent.com/107733608/176111658-19ea770d-9459-483e-8147-722a85a07afb.jpg)

## What happens when you mix Abstract Data Structures with Abstract IO streams and simplify its interface?
You get a very large number of powerful use cases with very little logic to think about. That's Pipa!


### Possible use cases:
1. nlp pipelines
2. network socket and file stream filtering
3. dynamically changing network traffic based on analysis
4. Virtual Microservice Deployment
5. Network Simulations
6. etc


## Pipa piping can use an arbitrary graph with rules for the edges
![PipaGraph](https://github.com/ItsZeusBro/Pipa/blob/ff1dc36aed84679d8a7e42c58a09a9340b8de219/Docs/PipaGraph.jpg)



## Pipa can use a Recursive Binary Tree Design
![RecursiveDesign2](https://github.com/ItsZeusBro/Pipa/blob/51b16cb95b2ba0052ab878f22c6730adb4adbea7/Docs/PipaRecursiveDesign2.jpg)

                             pipa1  
                           /      \
                          /        \
                     pipa2           pipa3
                    /    \           /    \
                              ...
                  /        \  ...  /        \
                              ...          pipaN   


### Pipa Job Tree Schema
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
      //say some event fires and the call back passes you the state
      //for the node of your tree.
      //this is something similar to what you would see:
      State:{
            height:2,
            depth:1,
            width:0,
            foo: "baz",
            snap: "crackle"
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
      //You should be able to interact with the pipa bin tree at runtime
      //after analyzing the flow of your tree, for optimizations and security reasons.
      //Will think about this some more...
      

### Pipa's Client Server Flow:
![PipaJobFlow](https://user-images.githubusercontent.com/107733608/176127062-3178469f-d0a5-4b41-ad5b-1398787ef68e.jpg)


### Pipa Piper Picked a Node of Pipa Pipers:
![PipaPiperPickedANodeOfPipaPipers](https://github.com/ItsZeusBro/Pipa/blob/a62380b72b0a82a45ea6f820f91104a75881d9f6/Docs/PipaPiperPickedANodeOfPipaPipers.jpg)


### Pipa Package Diagram:
![PipaPackageDiagram](https://github.com/ItsZeusBro/Pipa/blob/1a95298cd1a34688fafa6a4c26562f5520bbc10c/Docs/PipaPackageDiagram3.jpg)
