//hello from retail in react
const p1 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve("pr1 resolved")
  }, 5000)
})

const p2 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve("pr1 resolved")
  },0)
})

async function gh(){

   console.log("hello")
   const val1 = await p1
   console.log("first")
   
   const val2 = await p2
   console.log("second")
  
  
  }

  gh()

console.log("what'sup")  


//hello
//first
//second
//what up

// awit 1
// awit 2
