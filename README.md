# Pipa

### The idea for Pipa is to help you filter and analyze your stream and socket data through Pipa Jobs

![Pipa](https://user-images.githubusercontent.com/107733608/176090657-2232998e-67d9-47bc-afdd-0328bfb43868.jpg)


### Event Driven Design
![PipaDesign](https://user-images.githubusercontent.com/107733608/176090627-ea11de3a-524f-4c9b-85c9-3948500495d6.jpg)


### High-level Interface Design
      {
        PipaJobs:[{/*job schema here*/},{/*job schema here*/},{/*job schema here*/}],
        config:{/*pipa configurations go here*/}
      }
      
### Basic Pipa Events:
      pipa.on('job', (job, readableState)=>{
        job.on('start', (state)=>{})
        job.on('pending', (state)=>{})
        job.on('end', (state)=>{})
        job.on('error', (state)=>{})
      })

      pipa.on('start',(state)=>{})
      pipa.on('pending',(state)=>{})
      pipa.on('end',(state)=>{})
      pipa.on('error',(state)=>{})

### Pipa Job Syntax
    coming soon


### Pipa Configs
    coming soon
