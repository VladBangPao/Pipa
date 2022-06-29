# Pipa Specifications
![pipa](https://user-images.githubusercontent.com/107733608/176111658-19ea770d-9459-483e-8147-722a85a07afb.jpg)

## What happens when you mix Abstract Data Structures with Abstract IO streams and simplify its interface?
You get a very large number of powerful use cases with very little logic to think about. That's Pipa!

### Everything to do with a pipe, is everything to do with data flow associations: 
- Associations exist between app micro-services running over IPC, or network based components over Sockets
  - Or, sometimes you want to communicate to a file and consume it from another app
- Describing these associations in schema should enable some basic flow functionality between these nodes. 
- If your app is pipa enabled, a subset of the pipa api should be exposed to your app based on those associations to be able to consume and process that data with logic specific to your app and user. You should not have to worry about the generic code that your app needs to communicate between components. 
  - Pipa daemons and your schema that use them are basically doing the rest.



### Possible use cases:
1. nlp pipelines
2. network socket and file stream filtering
3. dynamically changing network traffic based on analysis
4. Virtual Microservice Deployment
5. Network Simulations
6. etc


## Pipa is an arbitrary graph of network nodes with rules for edge associations
![PipaGraph](https://github.com/ItsZeusBro/Pipa/blob/ff1dc36aed84679d8a7e42c58a09a9340b8de219/Docs/PipaGraph.jpg)


### Pipa Node Schema
      pipa = {
             //first node is the root node that consumes the source of data
             oddJob:{
                  //This is how other nodes on the network are able to communicate with this node
                  id:"some Unique Id or Hash here",
                  
                  config{
                    //This tells pipa daemon how the root node is configured
                  },
                  
                  state:{
                    foo: "bar",
                    biz: "bazz",
                    pop: "fizz",
                    im: "bad"
                  },
                  
                  associations:[
                    {
                      anotherJob:"bidirectional"
                    },
                    {
                      oddJob:"noMoreJobs"
                    }
                 ],

                 rules(){
                    //some rules that constrain the flow
                 },
                 
                 filter(){
                    //all filters get run before the rules(), because rules determine flow.
                    //filters are generic in nature for the node in question (for now)
                 },

             },
             anotherJob:{
                  //This is how other nodes on the network are able to communicate with this node
                  id:"some Unique Id or Hash here",
                  
                  config{
                    //This tells pipa how your root node can access "anotherJob" which should have a pipa daemon running
                  },
                  
                  state:{
                    do: "more",
                    hard: "core",
                    gee: "wizz",
                    im: "glad"
                  },
                  
                  associations:[
                    {
                      anotherJob:"noMoreJobs"
                    }
                 ],

                 rules(){
                    //some rules that constrain the flow
                 },

                 filters:[
                   {
                      //all filters get run before any rules(), because rules determine flow.
                      //filters are generic in nature for the node in question (for now)
                   }
                 ]
             },
             noMoreJobs:{
                  //This is how other nodes on the network are able to communicate with this node
                  id:"some Unique Id or Hash here",
                  
                  config{
                    //This tells pipa how your root node can access "anotherJob" which should have a pipa daemon running
                  },
                  
                 //this doesn't have associations that are outbound from itself
                 //it doesn't need rules, as it is a terminal in the graph
                 state:{
                      live:"life",
                      pipa:"pipe",
                      puff:"puff",
                      high:"kite",
                      pass:"psyche"
                 },

                 filter(){
                    //This filter is the last one before writing to the terminating writestream
                 },
                 
                 config{
                    //This tells pipa how to spin up a network enabled container, or IPC between nodes used by your app, etc
                 }
           }
      }

## Pipa can be used to create a large number of network topologies.  This example uses a Recursive Binary Tree Design
![RecursiveDesign2](https://github.com/ItsZeusBro/Pipa/blob/51b16cb95b2ba0052ab878f22c6730adb4adbea7/Docs/PipaRecursiveDesign2.jpg)

                             pipa1  
                           /      \
                          /        \
                     pipa2           pipa3
                    /    \           /    \
                              ...
                  /        \  ...  /        \
                              ...          pipaN   

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
         


### Pipa's Client Server Flow:
![PipaJobFlow](https://user-images.githubusercontent.com/107733608/176127062-3178469f-d0a5-4b41-ad5b-1398787ef68e.jpg)


### Pipa Piper Picked a Node of Pipa Pipers:
![PipaPiperPickedANodeOfPipaPipers](https://github.com/ItsZeusBro/Pipa/blob/a62380b72b0a82a45ea6f820f91104a75881d9f6/Docs/PipaPiperPickedANodeOfPipaPipers.jpg)


### Pipa Package Diagram:
![PipaPackageDiagram](https://github.com/ItsZeusBro/Pipa/blob/1a95298cd1a34688fafa6a4c26562f5520bbc10c/Docs/PipaPackageDiagram3.jpg)

### Pipa is the first implementation of an app that can expose an Abstract Syntax to Hydra. 
Hydra needs code that is written in an abstract way (schema like) in order to help architects do more with less.
Pipa is just an implementation. It's interface is actually supposed to be more powerful and long lasting than the
code underneath it. (Much like an iPhone's interface is abstracted away from the underlying impelmentation.)

### (Experimental) Add jobs on the fly, while watching the Pipa 
You should be able to interact with the pipa bin tree at runtime after analyzing the flow of your tree, for optimizations and security reasons.
Will think about this some more...
      
