# Pipa (This is only a design, implementation coming)

### The idea for Pipa is to help you filter and analyze your stream and socket data through Pipa Jobs

![Pipa](https://user-images.githubusercontent.com/107733608/176090657-2232998e-67d9-47bc-afdd-0328bfb43868.jpg)

### Possible use cases:
1. nlp pipelines
2. network socket and file stream filtering
3. etc.

### Event Driven Design
![PipaDesign](https://user-images.githubusercontent.com/107733608/176090627-ea11de3a-524f-4c9b-85c9-3948500495d6.jpg)
### Create Pipa
      ws = fs.createWriteStream(/*whatever*/)
      rs = fs.createReadStream(/*whatever*/)
      jobs = [{/*job schema here*/},{/*job schema here*/},{/*job schema here*/}]
      config = {/*pipa configurations go here*/}
      
      
      var pipa = new Pipa(rs, ws, jobs, config)

      pipa.start(rs, ws) //read and write stream
      //For another syntax see Pipa job syntax below
      
### Pipa Job Syntax
      job = {
            state:{
                  /*    create state variables here and manipulate them on the inside of your job code
                        these are like class properties, and jobs are like the methods that use them
                        consider them to have a this. prefix, so they are exposed to the all the 
                        subjobs in the hidden job class the job class constructor will have a 
                        this.queue that holds the functions and runs them in order make sure all 
                        methods on the rs are syncronous in your sub_jobs or general job
                  */
            },
            //all sub_jobs on the job queue have a rs (readstream) and ws (writestream) 
            //exposed, so just use them in your code blocks
            jobs:[
                  {/*place your syncronous stream manipulation here*/},
                  {/*place your syncronous stream manipulation here*/},
                  {/*place your syncronous stream manipulation here*/},
            ]
      }
      
      //OR:
      job = {
            state: {},
            job:{
                  /*
                        just assume you have your rs and ws node streamables 
                        exposed to you here and manipulate your rstream and 
                        send it to wstream
                  */
            }
      }

### Pipa Events:
      pipa.on('job', (job, state)=>{
        job.on('start', (state)=>{})
        job.on('pending', (state)=>{})
        job.on('end', (state)=>{})
        job.on('error', (state)=>{})
      })
      pipa.on('state', (event)=>{
            console.log(event)
      })

      pipa.on('start',(state)=>{})
      pipa.on('pending',(state)=>{})
      pipa.on('end',(state)=>{})
      pipa.on('error',(state)=>{})

### Pipa Configs
    config:{/*pipa configurations go here*/}
