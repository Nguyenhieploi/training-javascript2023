async function addProject(){
    try{
        var duAn = {
            fullname:null,
            admin:null
        }
        var fullname = document.getElementById("projectName").value
     
        if(!fullname){
            alert("vui lòng điền đầy đủ");
            return
        }
        duAn.fullname = fullname;
    

        var response = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(duAn),
        })
        document.getElementById("projectName").value = ''

        allProject()

        console.log(response.status);
    }catch(error){
        console.log("error",error);
    }
}

async function allProject(){
    try{
        var response = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
            
        })
       
       var dataString = await response.text();
       var projectObject = JSON.parse(dataString)
       
        // // getadmin từ api
        var getAdmin = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        var string = await getAdmin.text();
        var adminObject = JSON.parse(string)


       var result = document.getElementById("resultProject")
       result.innerHTML = ''
    
       projectObject.forEach(e => {
        var findAdmin = adminObject.find((element) => element.duan === e.id)
      
            result.innerHTML += 
            `
            <tr>
                <td>${e.id}</td>
                <td>${e.fullname}</td>
                <td>
                    <a class="remove" onclick="deleteItem('${e.id}')"><i class="fas fa-trash"></i></a>
                    <a class="edit" onclick="edit('${e.id}')"><i class="fas fa-edit"></i></a>
                </td>
                <td>
                ${findAdmin?.fullname|| ''}
                </td> 
            </tr>
            `
       });



       // MUỐN HIỆN OPTION CHỌN DỰ ÁN, RỒI MỚI HIỆN CÁI OPTION DATA
       // Gọi danh sách dự án vào select admin
       var nameProject = document.getElementById("nameProject")
       nameProject.innerHTML = '<option value="">Chọn</option>'
       projectObject.forEach(element=>{
        nameProject.innerHTML += 
        `
        <option value="${element.id}">${element.fullname}</option>
        `
       })


       // Gọi danh sách dự án vào select chỉnh sửa admin
       var editnameProject = document.getElementById("editnameProject")
       editnameProject.innerHTML = ''
       projectObject.forEach(element=>{
        editnameProject.innerHTML += 
        `
        <option value="${element.id}">${element.fullname}</option>
        `
       })
    }catch(error){
        console.log("error",error);
    }
}
allProject()

async function deleteItem(id){
    try{
        var response = await fetch(`https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan/${id}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(response.status);
        allProject()
    }catch(error){
        console.log("error",error);
    }
}

async function edit(id){
    try{
       
        var response = await fetch(`https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan/${id}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log("status",response.status);
        var dataString = await response.text();
        var data = JSON.parse(dataString);

        document.getElementById("edit").style.display = "block"
        
        var idProject = document.getElementById("idProject")
        var editProjectName = document.getElementById("editProjectName");
        idProject.value = data.id
        editProjectName.value = data.fullname

    }catch(error){
        console.log("error",error);
    }
}

async function saveEditProject(){
    try{
        var fullname = document.getElementById("editProjectName").value;
        var id = document.getElementById("idProject").value
        var data = {fullname}
        var response = await fetch(`https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        allProject();
        document.getElementById("edit").style.display = "none"
        console.log("status", response.status);
    }catch(error){
        console.log("error",error);
    }
}

// //////////////////////////////////// Admin ///////////////////////////
// function setCreateAt(){
//     var create = document.getElementById("CreateAt")
//     var date = new Date();
//     var getDate = date.getDate();
//     var getMonth = date.getMonth() + 1;
//     var getYears = date.getFullYear();

//     var StringTime = getDate + "/" + getMonth +"/" + getYears;
//     create.value = StringTime;
// }
// setCreateAt()

async function addAdmin(){
    try{
        var data = {
            fullname:null,
            email:null,
            password:null,
            createAt:null,
            updateAt:null,
            duan:null
            
        }
        var getName = document.getElementById("nameAdmin").value;
        var getEmail = document.getElementById("emailAdmin").value;
        var getPassword = document.getElementById("password").value;
        var getDuan = document.getElementById("nameProject").value
        if(!getName || !getEmail || !getPassword || !getDuan ){
            alert("Vui lòng điền đầy đủ");
            return;
        }

        // Date
        var date = new Date();
        var getDate = date.getDate();
        var getMonth = date.getMonth() + 1;
        var getYears = date.getFullYear();
        var getHour = date.getHours();
        var getMinutes = date.getMinutes()
        var StringTime = getDate + "/" + getMonth +"/" + getYears + " " + getHour + ":" + getMinutes;
        
        
        data.fullname = getName;
        data.email = getEmail;
        data.password = getPassword;
        data.createAt = StringTime;
        data.duan = getDuan;

        var response = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        document.getElementById("nameAdmin").value = '' ;
        document.getElementById("emailAdmin").value = '' ;
        document.getElementById("password").value = '' ;
        document.getElementById("nameProject").value = '' ;
        allAdmin()
        allProject()
        console.log("status", response.status);


    }catch(error){
        console.log("error",error);
    }
}


async function allAdmin(){
    try{
        var respone = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        var string = await respone.text();
        var adminObject = JSON.parse(string)
        
        var resultAdmin = document.getElementById("resultAdmin")
        resultAdmin.innerHTML = ''
        

        // Lấy API dự án 
        var apiProject = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            }, 
        })
       var dataProject = await apiProject.text();
       var projectObject = JSON.parse(dataProject)

       adminObject.forEach(e=>{

            var findProject = projectObject.find((element) => element.id ===  e.duan)
            console.log(findProject);
            resultAdmin.innerHTML += 
            `
            <tr>
                <td>${e.id}</td>
                <td>${e.fullname}</td>
                <td>${e.email}</td>
                <td>${e.password}</td>
                <td>${e.createAt}</td>
                <td>${e.updateAt}</td>
                <td>${findProject?.fullname || ''}</td>
                <td>
                    <a class="remove" onclick="deleteAdmin('${e.id}')"><i class="fas fa-trash"></i></a>
                    <a class="edit" onclick="editAdmin('${e.id}')"><i class="fas fa-edit"></i></a>
                </td>
            </tr>
        `
        })

    }catch(error){
        console.log("error",error);
    }
}
allAdmin()

async function deleteAdmin(id){
    try{
        var response = await fetch(`https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin/${id}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        allAdmin()
        console.log("status",response.status);
    }catch(error){
        console.log("error",error);
    }
}

async function editAdmin(id){
    try{
    var response = await fetch(`https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin/${id}`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    var conversion = await response.text();
    var dataObject = JSON.parse(conversion);

    document.getElementById("app-add").style.display = "none"
    document.getElementById("app-edit").style.display = "block"

    var id = document.getElementById("id");
    var fullname = document.getElementById("editnameAdmin");
    var email = document.getElementById("editemailAdmin");
    var password = document.getElementById("editpassword")
    var duan = document.getElementById("editnameProject");

    id.value = dataObject.id
    fullname.value = dataObject.fullname
    email.value = dataObject.email
    password.value = dataObject.password
    duan.value = dataObject.duan

    }catch(error){
        console.log("error",error);
    } 
}

async function saveAdmin(){
    try{
        var id = document.getElementById("id").value;
        var fullname = document.getElementById("editnameAdmin").value;
        var email = document.getElementById("editemailAdmin").value;
        var password = document.getElementById("editpassword").value
        var duan = document.getElementById("editnameProject").value;

        var date = new Date();
        var getDate = date.getDate();
        var getMonth = date.getMonth() + 1;
        var getYears = date.getFullYear();
        var getHour = date.getHours();
        var getMinutes = date.getMinutes()
        var updateAt = getDate + "/" + getMonth +"/" + getYears + " " + getHour + ":" + getMinutes;

        var data = {fullname,email,password,updateAt,duan}
        var response = await fetch(`https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        document.getElementById("app-add").style.display = "block"
        document.getElementById("app-edit").style.display = "none"
        allAdmin();
        allProject()
        console.log("status", response.status);
    }catch(error){
        console.log("error",error);
    }
}
