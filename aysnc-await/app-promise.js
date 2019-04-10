const users = [{
    id:1,
    name:'Andrew',
    schoolId: 101
},
{
    id:2,
    name:'Jessica',
    schoolId: 999
}];

const grades = [{
    id:1,
    schoolId: 101,
    grade:87
},
{
    id:2,
    schoolId: 999,
    grade:100
},
{
    id:3,
    schoolId: 101,
    grade:70
}];

const getUser = (id) => {
    return new Promise((resolve, reject)=> {
        const user = users.find((user)=> user.id === id);
        if(user)
            resolve(user);
        else
            reject(`unable to find id: ${id}`);
    });
}

const getGrades = (schoolId) => {
    return new Promise((resolve, reject)=> {
        resolve(grades.filter((grade)=> 
            grade.schoolId === schoolId));
    });
}

const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser)=>{
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades)=> {
        let average = 0;

        if(grades.length>0)
        average = grades.map((grade) => grade.grade).reduce((a,b)=> a+b)/grades.length;

        console.log(average);
        return `${user.name} has a   ${average}%`;
    });
};

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
     //console.log(user, grades);
     let average = 0;

        if(grades.length>0)
        average = grades.map((grade) => grade.grade).reduce((a,b)=> a+b)/grades.length;

        //console.log(average);
        return `${user.name} has a   ${average}%`;
}

getStatusAlt(3).then((status)=>{
    console.log(status);
}).catch((e)=> {
    console.log(e);
})
// getUser(2).then((user)=> {
//     console.log(user);
// }).catch((e)=> {
//     console.log(e);
// })

// getStatus(2).then((status)=> {
//     console.log(status);
// }).catch((e)=> {
//     console.log(e);
// })