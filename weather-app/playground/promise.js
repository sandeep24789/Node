var somePromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        //resolve('It worked');
        reject('It worked');
    }, 2500)
    
})

somePromise.then((message)=>{
    console.log('Success',message);
}, (errorMsg) => {
    console.log('Error',errorMsg);
})