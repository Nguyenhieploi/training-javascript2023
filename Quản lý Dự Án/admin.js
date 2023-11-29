async function resgiterUser(){
    try{
        var data = {
            fullname:null,
            email: null,
            password:null,
            createat:null,
            updateat:null,
        }
        var fullnameUser = document.getElementById("fullNameUser").value;
        var emailUser = document.getElementById("emailUser").value;
        var passwordUser = document.getElementById("passwordUser").value;

        var date = new Date();
        var getDate = date.getDate();
        var getMonth = date.getMonth() + 1;
        var getYears = date.getFullYear();
        var getHour = date.getHours();
        var getMinutes = date.getMinutes()
        var createatUser = getDate + "/" + getMonth +"/" + getYears + " " + getHour + ":" + getMinutes;

        data.fullname = fullnameUser;
        data.email = emailUser;
        data.password = passwordUser;
        data.createat = createatUser;

        var response = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        document.getElementById("fullNameUser").value = '';
        document.getElementById("emailUser").value = '';
        document.getElementById("passwordUser").value = '';

        getUser()
        console.log("status", response.status);
    }catch(error){
        console.log("error", error);
    }
}

async function getUser(){
    try{
        var response = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        var getResponse = await response.text();
        var convertObject = JSON.parse(getResponse)
        
        var resultUser = document.getElementById("resultUser");
        resultUser.innerHTML = '';
        



        convertObject.forEach(e => {
            resultUser.innerHTML += 
            `
            <tr>
            <td>${e.id}</td>
            <td>${e.fullname}</td>
            <td>${e.email}</td>
            <td>${e.password}</td>
            <td>${e.createat}</td>
            <td>${e.updateat}</td>
            <td>
                <a class="remove" onclick="deleteUser('${e.id}')"><i class="fas fa-trash"></i></a>
                <a class="edit" onclick="editUser('${e.id}')"><i class="fas fa-edit"></i></a>
            </td>
            <td id="tasktest">

            </td>
        </tr>
            `
        });


        var getUser = document.getElementById("getUser");
        getUser.innerHTML = '';
        convertObject.forEach(e =>{
            getUser.innerHTML += 
            `
            <option value="${e.id}">${e.fullname}</option>
            `
        })

        // get user ở chỉnh sửa task
        var editgetUser = document.getElementById("editgetUser");
        editgetUser.innerHTML = '';
        convertObject.forEach(e =>{
            editgetUser.innerHTML += 
            `
            <option value="${e.id}">${e.fullname}</option>
            `
        })

    }catch(error){
        console.log("error",error);
    }
}
getUser()

async function deleteUser(id){
    try{
        var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user/${id}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        getUser()
    }catch(error){
        console.log("error",error);
    }
}

async function editUser(id){
    try{
        var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user/${id}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })

        var getResponse = await response.text();
        var convertObject = JSON.parse(getResponse);

        document.getElementById("edit-user").style.display = "block"
        document.getElementById("app_main").style.display = "none"

        var id = document.getElementById("id");
        var fullname = document.getElementById("editfullNameUser");
        var email = document.getElementById("editemailUser");
        var password = document.getElementById('editpasswordUser');

        id.value = convertObject.id
        fullname.value = convertObject.fullname
        email.value = convertObject.email
        password.value = convertObject.password

        console.log("status", response.status);
    }catch(error){
        console.log("error",error);
    }
}
async function saveUser(){
    try{
        var id = document.getElementById("id").value;
        var fullname = document.getElementById("editfullNameUser").value;
        var email = document.getElementById("editemailUser").value;
        var password = document.getElementById('editpasswordUser').value;

        var date = new Date();
        var getDate = date.getDate();
        var getMonth = date.getMonth() + 1;
        var getYears = date.getFullYear();
        var getHour = date.getHours();
        var getMinutes = date.getMinutes()
        var updateat = getDate + "/" + getMonth +"/" + getYears + " " + getHour + ":" + getMinutes;

        var data = {fullname,email,password,updateat}
        var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })

        console.log("status",response.status);
        document.getElementById("edit-user").style.display = "none"
        document.getElementById("app_main").style.display = "block"

        getUser()

    }catch(error){
        console.log("error",error);
    }
}



// ===================================================================================================================

async function resgiterStask(){
    try{
        var data = {
            fullname:null,
            description: null,
            expiredat:null,
            createdat:null,
            updatedat:null,
            status:null,
            user:null,
        }
        var nameTask = document.getElementById("nameTask").value;
        var description = document.getElementById("description").value;
        var expiredAt = document.getElementById("expiredAt").value;
        var user = document.getElementById("getUser").value;
        var status = document.getElementById("status").value

        var date = new Date();
        var getDate = date.getDate();
        var getMonth = date.getMonth() + 1;
        var getYears = date.getFullYear();
        var getHour = date.getHours();
        var getMinutes = date.getMinutes()
        var createdat = getDate + "/" + getMonth +"/" + getYears + " " + getHour + ":" + getMinutes;

        data.fullname = nameTask;
        data.description = description;
        data.expiredat = expiredAt;
        data.createdat = createdat;
        data.user = user;
        data.status = status;
       

        var response = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        document.getElementById("nameTask").value='';
        document.getElementById("description").value='';
        document.getElementById("expiredAt").value='';
        document.getElementById("getUser").value='';
        document.getElementById("getUser").value=''

        getTask()
        console.log("status", response.status);
    }catch(error){
        console.log("error", error);
    }
}

async function getTask(){
    try{
        var response = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })

        var getResponse = await response.text();
        var convertObject = JSON.parse(getResponse)
        

        // Xu ly task quá hạn thì color màu đỏ

       var resultHtml = '';
       var currentDate = new Date();

       convertObject.forEach(e => {
           var taskDate = new Date(e.expiredat);
           if (taskDate < currentDate) {
               resultHtml += `
                   <tr style="background-color: #ff00007d;">
                   <td>${e.fullname}</td>
                   <td>${e.description}</td>
                   <td>${e.expiredat}</td>
                   <td>${e.createdat}</td>
                   <td>${e.updatedat}</td>
                   <td>${e.status}</td>
                   <td>${e.user}</td>
               <td>
                   <a class="remove" onclick="deleteTask('${e.id}')"><i class="fas fa-trash"></i></a>
                   <a class="edit" onclick="editTask('${e.id}')"><i class="fas fa-edit"></i></a>
               </td>
                   </tr>
               `;
           } else {
               resultHtml += `
                   <tr style="background-color: none;">
                   <td>${e.fullname}</td>
                   <td>${e.description}</td>
                   <td>${e.expiredat}</td>
                   <td>${e.createdat}</td>
                   <td>${e.updatedat}</td>
                   <td>${e.status}</td>
                   <td>${e.user}</td>
               <td>
                   <a class="remove" onclick="deleteTask('${e.id}')"><i class="fas fa-trash"></i></a>
                   <a class="edit" onclick="editTask('${e.id}')"><i class="fas fa-edit"></i></a>
               </td>
                   </tr>
               `;
           }
       });
       var resultTask = document.getElementById("resultTask");
       resultTask.innerHTML = resultHtml;

       
    }catch(error){
        console.log("error",error);
    }
}
getTask()

async function deleteTask(id){
    try{
        var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task/${id}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        getTask()
    }catch(error){
        console.log("error",error);
    }
}


async function editTask(id){
    try{
        var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task/${id}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })

        var getResponse = await response.text();
        var convertObject = JSON.parse(getResponse);

        document.getElementById("edit-task").style.display = "block"
        document.getElementById("app-task").style.display = "none"

        var idtask = document.getElementById("idtask");
        var editnameTask = document.getElementById("editnameTask");
        var editdescription = document.getElementById("editdescription");
        var editexpiredAt = document.getElementById('editexpiredAt');
        var editgetUser = document.getElementById('editgetUser');
        var editstatus = document.getElementById('editstatus');


        idtask.value = convertObject.id
        editnameTask.value = convertObject.fullname
        editdescription.value = convertObject.description
        editexpiredAt.value = convertObject.expiredat
        editgetUser.value = convertObject.user
        editstatus.value = convertObject.status
        
        console.log("status", response.status);
    }catch(error){
        console.log("error",error);
    }
}

async function saveTask(){
    try{
        var id = document.getElementById("idtask").value;
        var fullname = document.getElementById("editnameTask").value;
        var description = document.getElementById("editdescription").value;
        var expiredat = document.getElementById('editexpiredAt').value;
        var user = document.getElementById('editgetUser').value;
        var status = document.getElementById('editstatus').value;

        var date = new Date();
        var getDate = date.getDate();
        var getMonth = date.getMonth() + 1;
        var getYears = date.getFullYear();
        var getHour = date.getHours();
        var getMinutes = date.getMinutes()
        var updatedat = getDate + "/" + getMonth +"/" + getYears + " " + getHour + ":" + getMinutes;

        var data = {fullname,description,expiredat,status,user,updatedat}
        var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })

        console.log("status",response.status);
        document.getElementById("edit-task").style.display = "none"
        document.getElementById("app-task").style.display = "block"

        getTask()

    }catch(error){
        console.log("error",error);
    }
}

async function getProject() {
    try {
        var apiProject = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        var dataString = await apiProject.text();
        var projectObject = JSON.parse(dataString);
        console.log("project", projectObject);

        // Lấy dữ liệu từ localStorage
        var storageKey = 'adminLocalstorage';
        var storageList = localStorage.getItem(storageKey);
        var adminObject = JSON.parse(storageList);
        console.log("admin", adminObject);

        // Tìm dự án có id tương ứng
        var selectedProject = projectObject.filter(project => project.id === adminObject.duan);

        console.log(selectedProject);
    } catch (error) {
        console.log(error);
    }
}
getProject()