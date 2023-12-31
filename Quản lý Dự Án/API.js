async function createProject(duAn){
    var response = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(duAn),
        })
       return response;
}

async function getAllProject(){
    var response = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan",{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
   var dataString = await response.text();
   var projectObject = JSON.parse(dataString);
   return projectObject;
}

async function deleteProject(id){
    var response = await fetch(`https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan/${id}`,{
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response;
}

async function getProject(id){
    var response = await fetch(`https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan/${id}`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    var dataString = await response.text();
    var data = JSON.parse(dataString);
    return data;
}

async function editProject(data,id){
    var response = await fetch(`https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan/${id}`,{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response;
}


// ============================= Admin ========================
async function createAdmin(data){
    var response = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
   return response;
}

async function getAllAdmin(){
    var respone = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin",{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    var string = await respone.text();
    var adminObject = JSON.parse(string)
    return adminObject;
}

async function deleteAdmins(id){
    var response = await fetch(`https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin/${id}`,{
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response;
}

async function getAdmin(id){
    var response = await fetch(`https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin/${id}`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    var conversion = await response.text();
    var dataObject = JSON.parse(conversion);
    return dataObject;
}

async function saveEditAdmin(data,id){
    var response = await fetch(`https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin/${id}`,{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response;
}

// ======================================== User ==========================================================
async function createUser(data){
    var response = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    return response;
}
async function getAllUser(){
    var response = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        var getResponse = await response.text();
        var userObject = JSON.parse(getResponse)
        return userObject;
}
async function deleteUser(id){
    var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user/${id}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
    return response;
}
async function getUser(id){
    var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user/${id}`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })

    var getResponse = await response.text();
    var convertObject = JSON.parse(getResponse);
    return convertObject;
}
async function updateUser(data,id){
    var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
    return response;
}

// ========================================== Task ===========================================================
async function createTask(data){
    var response = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response;
}
async function getAllTask(){
    var response = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })

        var getResponse = await response.text();
        var taskObject = JSON.parse(getResponse)
        return taskObject;
}
async function deleteTask(id){
    var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task/${id}`,{
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response;
}
async function getTask(id){
    var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task/${id}`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })

    var getResponse = await response.text();
    var convertObject = JSON.parse(getResponse);
    return convertObject;
}
async function updateTask(data,id){
    var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task/${id}`,{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
    })
    return response;
}