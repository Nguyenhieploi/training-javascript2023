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
    
       document.querySelector('.lds-spinner').style.display = 'block';
       
       // Tạo project
       var createdProject =  await createProject(duAn);
        await allProject()

        document.querySelector('.lds-spinner').style.display = 'none';
        
    }catch(error){
        console.log("error",error);
    }
}

async function allProject(){
    try{
    
       var allProject = await getAllProject()

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
    
       allProject.forEach(e => {
            // Tìm admin theo dự án
            var findAdmin = adminObject.filter((element) => element.duan === e.id) // trả về 1 mảng
            var nameAdmin = findAdmin.map(fullname => fullname.fullname).join(', ')
           
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
                ${nameAdmin}
                </td> 
            </tr>
            `
       });



       // MUỐN HIỆN OPTION CHỌN DỰ ÁN, RỒI MỚI HIỆN CÁI OPTION DATA
       // Gọi danh sách dự án vào select admin
       var nameProject = document.getElementById("nameProject")
       nameProject.innerHTML = '<option value="">Chọn</option>'
       allProject.forEach(element=>{
        nameProject.innerHTML += 
        `
        <option value="${element.id}">${element.fullname}</option>
        `
       })


       // Gọi danh sách dự án vào select chỉnh sửa admin
       var editnameProject = document.getElementById("editnameProject")
       editnameProject.innerHTML = ''
       allProject.forEach(element=>{
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
        document.querySelector('.lds-spinner').style.display = 'block';
        var deleteProjects = await deleteProject(id);
        await allProject();
        document.querySelector('.lds-spinner').style.display = 'none';
    }catch(error){
        console.log("error",error);
    }
}

async function edit(id){
    try{
        var getItem = await getProject(id)

        document.getElementById("edit").style.display = "block"
        
        var idProject = document.getElementById("idProject")
        var editProjectName = document.getElementById("editProjectName");

        idProject.value = getItem.id
        editProjectName.value = getItem.fullname

    }catch(error){
        console.log("error",error);
    }
}

async function saveEditProject(){
    try{
        var fullname = document.getElementById("editProjectName").value;
        var id = document.getElementById("idProject").value
        var data = {fullname}
        document.querySelector('.lds-spinner').style.display = 'block';

        var saveProject = await editProject(data,id)
        await allProject();

        document.querySelector('.lds-spinner').style.display = 'none';
        document.getElementById("edit").style.display = "none"
       
    }catch(error){
        console.log("error",error);
    }
}


// //////////////////////////////////// //////////////////////////Admin ///////////////////////////////////////////////////////////////

async function addAdmin(){
    try{
        document.querySelector('.lds-spinner').style.display = 'block';
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

       var createdAdmin = await createAdmin(data)
        
        document.getElementById("nameAdmin").value = '' ;
        document.getElementById("emailAdmin").value = '' ;
        document.getElementById("password").value = '' ;
        document.getElementById("nameProject").value = '' ;
        await allAdmin()
        await allProject()

        document.querySelector('.lds-spinner').style.display = 'none';
    }catch(error){
        console.log("error",error);
    }
}


async function allAdmin(){
    try{

        //get Admin
        var adminObject = await getAllAdmin();

        var resultAdmin = document.getElementById("resultAdmin")
        resultAdmin.innerHTML = ''
        

        // Lấy API dự án 
       var getProject = await getAllProject();

       adminObject.forEach(e=>{

            var findProject = getProject.find((element) => element.id ===  e.duan)
            
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
        document.querySelector('.lds-spinner').style.display = 'block';
        var deleteItem = await deleteAdmins(id)
        await allAdmin();
        document.querySelector('.lds-spinner').style.display = 'none';
        
    }catch(error){
        console.log("error",error);
    }
}

async function editAdmin(id){
    try{
    var editAdmin = await getAdmin(id)

    document.getElementById("app-add").style.display = "none"
    document.getElementById("app-edit").style.display = "block"

    var idAdmin = document.getElementById("id");
    var fullname = document.getElementById("editnameAdmin");
    var email = document.getElementById("editemailAdmin");
    var password = document.getElementById("editpassword")
    var duan = document.getElementById("editnameProject");

    idAdmin.value = editAdmin.id
    fullname.value = editAdmin.fullname
    email.value = editAdmin.email
    password.value = editAdmin.password
    duan.value = editAdmin.duan

    }catch(error){
        console.log("error",error);
    } 
}

async function saveAdmin(){
    try{
        document.querySelector('.lds-spinner').style.display = 'block';
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
        
        //API save editAdmin
        var saveAdmins = await saveEditAdmin(data,id)
       
        await allAdmin();
        await allProject();
        document.getElementById("app-add").style.display = "block"
        document.getElementById("app-edit").style.display = "none"
        document.querySelector('.lds-spinner').style.display = 'none';
        
    }catch(error){
        console.log("error",error);
    }
}
