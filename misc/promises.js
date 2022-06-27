function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }
  
  async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log("hello")
    console.log("there")
    console.log(result);
    // expected output: "resolved"
  }
  
  asyncCall();


  // notice how this does not print out "hello" or "there", until
  //the promise is resolved

  //The next example shows how we can continue execution
  //regardless of how long it takes for the promise to resolve
  //Remember resolve() just returns whatever you pass
  //like resolve(function somefunction {//whatever is between resolve() is valid and returned})
// function resolveAfter3seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 3000);
//   });
// }

// async function asyncCall2() {
//   console.log('calling');
//   const result = await resolveAfter3seconds().then(console.log("hello")).then(console.log("there"))
//   console.log(result);
//   // expected output: "resolved"
// }
  
// asyncCall2();

  //run the asyncCall() first (commenting out the other asyncCall2())