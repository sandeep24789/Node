function test(string) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(string);
        }, 1000)
    })
}

function printString1() {
    // test("A").then(res=>{
    //     console.log(res);
    // });

    const arr = ['abc', 'sksks', 'dkjf'];

    // const pArr = arr.map(item => {
    //     return test(item);
    // })

    // Promise.all(pArr).then((res)=> {
    //     console.log(res);
    // })

    const arrOfPromise = arr.map(item => {
        return test(item);
    });

    console.log(arrOfPromise);

    Promise.all(arrOfPromise).then(res =>{
        console.log(res);
    })

    // for(let p=0; p < arr.length; p++){
    //     const str = await test(arr[p]);
    //     console.log(str);
    // }

    // console.log("test");

    // const str = await test("A");
    // console.log(str);
    // console.log("test");
    // test("B");
    // test("c");
};

function printString(string) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(string);
        },Math.floor(Math.random() * 100)+1)
    });
}

// function printAll(){
//     printString("A", () => {
//       printString("B", () => {
//         printString("C", () => {})
//       })
//     })
//   }

//   function printAll(){
//     printString("A").then((str)=>{
//         console.log(str);
//         return printString("B");
//     }).then((str)=>{
//         console.log(str)
//         return printString("c");
//     }).then(str=>{
//         console.log(str);
//     })
//   }

async function printAll(){
    const a = await printString("A");
    console.log(a);
    const b = await printString("B");
    console.log(b);
    const c = await printString("c");
    console.log(c);
}



printAll();

