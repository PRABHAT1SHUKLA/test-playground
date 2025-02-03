const sleep = (ms) => new Promise((resolve) => setTimeout(resolve("jcnnc"), ms));

async function handle(){
  const gh = help();
  gh.then( async function(df){
    console.log(df)
    const some = "something";

     const f = await sleep(2000);
     console.log(f)
    return some
  
  }).then(async function(kk){
    console.log(kk)
    await sleep(2000)
    console.log('text1')
  })
}

handle()