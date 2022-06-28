# Pipa (This is only a design, implementation coming)

### The idea for Pipa is to help you filter and analyze your stream and socket data through Pipa Jobs

![Pipa](https://user-images.githubusercontent.com/107733608/176090657-2232998e-67d9-47bc-afdd-0328bfb43868.jpg)


### Event Driven Design
![PipaDesign](https://user-images.githubusercontent.com/107733608/176090627-ea11de3a-524f-4c9b-85c9-3948500495d6.jpg)


### High-level Interface Design
      var pipa = new Pipa({
        PipaJobs:[{/*job schema here*/},{/*job schema here*/},{/*job schema here*/}],
        config:{/*pipa configurations go here*/}
      })
      pipa.start(rs, ws) //read and write stream
      //For another syntax see Pipa job syntax below
      
      
      
### Basic Pipa Events:
      pipa.on('job', (job, readableState)=>{
        job.on('start', (state)=>{})
        job.on('pending', (state)=>{})
        job.on('end', (state)=>{})
        job.on('error', (state)=>{})
      })
      //You can put watchers on a portion of your job state to see if there are changes, and get updates
      //For example:
      job.watch(state.substate)
      job.state.on('substate', (event)=>{
            console.log(event)
      })

      pipa.on('start',(state)=>{})
      pipa.on('pending',(state)=>{})
      pipa.on('end',(state)=>{})
      pipa.on('error',(state)=>{})

### Pipa Job Syntax
      initial_state={
            /* create state variables here and manipulate them on the inside of your job code*/
      }

      job = {
            //all sub_jobs on the job queue have a rs (readstream) and ws (writestream) exposed, so just use them in your code blocks
            sub_jobs:[
                  {/*place your stream manipulation here*/},
                  {/*place your stream manipulation here*/},
                  {/*place your stream manipulation here*/},
            ]
      }
      
      //OR:
      job = {
            /*just assume you have your rs and ws node streamables exposed to you here and manipulate your rstream and send it to wstream*/
      
      }
      
      //You can add these jobs by:
      pipa.push(job, initial_state)
      pipa.config({/*some high level pipa config options*/})
      
      //Start your pipa with a read and write stream:
      pipa.start(rs, ws)


### Pipa Configs
    coming soon
