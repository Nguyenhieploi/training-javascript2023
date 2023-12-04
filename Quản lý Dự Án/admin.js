async function resgiterUser(){
    try{
        document.querySelector('.lds-spinner').style.display = 'block';
        var data = {
            fullname:null,
            email: null,
            password:null,
            createat:null,
            updateat:null,
            admin: null,
            // task:null,
        }
        var fullnameUser = document.getElementById("fullNameUser").value;
        var emailUser = document.getElementById("emailUser").value;
        var passwordUser = document.getElementById("passwordUser").value;

          // Gọi admin từ local
          var storageKey = 'adminLocalstorage';
          var storageList = localStorage.getItem(storageKey);
          var adminObject = JSON.parse(storageList);
          var admin = adminObject.id
        
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
        data.admin = admin
        
        //API create user
        var createUsers = await createUser(data)

        await getUser()
        document.getElementById("fullNameUser").value = '';
        document.getElementById("emailUser").value = '';
        document.getElementById("passwordUser").value = '';
        document.querySelector('.lds-spinner').style.display = 'none';
     
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
        var userObject = JSON.parse(getResponse)
        

        var tests = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        var strings = await tests.text();
        var adminAPIs = JSON.parse(strings)
        

        var responseTask = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        var getResponseTask = await responseTask.text();
        var taskObject = JSON.parse(getResponseTask)



          // Gọi admin từ local
          var storageKey = 'adminLocalstorage';
          var storageList = localStorage.getItem(storageKey);
          var adminObject = JSON.parse(storageList);
         var admins = adminObject.id
      
       

        var resultUser = document.getElementById("resultUser");
        resultUser.innerHTML = '';

          userObject.forEach(e => {
            if(e.admin === adminObject.id){
                // Tìm task theo ID user 
                var findTask = taskObject.filter(taskId => taskId.user === e.id)
                // tạo mảng mới chỉ chưa fullname
                var tasksInfo = findTask.map(task => task.fullname).join(', ');
                
                // Tìm admin từ api và local 
                var findAdmins = adminAPIs.filter(idAdmin => idAdmin.id === admins)
                var nameAdmin = findAdmins.map(admin => admin.fullname)
               
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
                    ${tasksInfo}
                </td>
                <td>${nameAdmin}</td>
            </tr>
                `
            }
        
        });


        var getUser = document.getElementById("getUser");
        getUser.innerHTML = `<option>Chọn</option>`;
        userObject.forEach(e =>{
            if(e.admin === adminObject.id){
                getUser.innerHTML += 
                `
                <option value="${e.id}">${e.fullname}</option>
                `
            }
           
        })

        // get user ở chỉnh sửa task
        var editgetUser = document.getElementById("editgetUser");
        editgetUser.innerHTML = '';
        userObject.forEach(e =>{
            if(e.admin === adminObject.id){
                editgetUser.innerHTML += 
                `
                <option value="${e.id}">${e.fullname}</option>
                `
            }
        })

    }catch(error){
        console.log("error",error);
    }
}
getUser()

async function deleteUser(id){
    try{
        document.querySelector('.lds-spinner').style.display = 'block';
        var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user/${id}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        await getUser();
        document.querySelector('.lds-spinner').style.display = 'none';
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
        document.querySelector('.lds-spinner').style.display = 'block';
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

        
        await getUser()
        console.log("status",response.status);
        document.getElementById("edit-user").style.display = "none"
        document.getElementById("app_main").style.display = "block"
        document.querySelector('.lds-spinner').style.display = 'none';
    }catch(error){
        console.log("error",error);
    }
}



// ===================================================================================================================

async function resgiterStask(){
    try{
        document.querySelector('.lds-spinner').style.display = 'block';
        var data = {
            fullname:null,
            description: null,
            expiredat:null,
            createdat:null,
            updatedat:null,
            status:"chưa làm",
            user:null,
        }
        var nameTask = document.getElementById("nameTask").value;
        var description = document.getElementById("description").value;
        var expiredAt = document.getElementById("expiredAt").value;
        var user = document.getElementById("getUser").value;
       

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
       
       

        var response = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

       

        await getTask()
        await getUser();
        document.getElementById("nameTask").value='';
        document.getElementById("description").value='';
        document.getElementById("expiredAt").value='';
        document.getElementById("getUser").value='';
        document.getElementById("getUser").value=''
        document.querySelector('.lds-spinner').style.display = 'none';
        
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
        var taskObject = JSON.parse(getResponse)
      
       var responseUser = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user",{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            },
        })
    var getResponse = await responseUser.text();
    var userObject = JSON.parse(getResponse)
    

    var getAdmin = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin",{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    var string = await getAdmin.text();
    var adminObject = JSON.parse(string)
    
    var storageKey = 'adminLocalstorage';
    var storageList = localStorage.getItem(storageKey);
    var adminObject = JSON.parse(storageList);
    var adminlocal = adminObject.id
    console.log(adminlocal);
    
      // Xu ly task quá hạn thì color màu đỏ
      var resultHtml = '';
      var currentDate = new Date();
      taskObject.forEach(e => {
           var taskDate = new Date(e.expiredat);
           var filterUser = userObject.find(findUser => findUser.id == e.user) // trả về object
            
           console.log(filterUser);
           // so sánh task === với user === admin
         if(adminlocal == filterUser.admin){
            if (taskDate < currentDate) {
                resultHtml += `
                    <tr style="background-color: #ff00007d;">
                    <td>${e.fullname}</td>
                    <td>${e.description}</td>
                    <td>${e.expiredat}</td>
                    <td>${e.createdat}</td>
                    <td>${e.updatedat}</td>
                    <td>${e.status}</td>
                    <td>${filterUser?.fullname || ''}</td>
                <td>_+
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
                    <td>${filterUser?.fullname || ''}</td>
                <td>
                    <a class="remove" onclick="deleteTask('${e.id}')"><i class="fas fa-trash"></i></a>
                    <a class="edit" onclick="editTask('${e.id}')"><i class="fas fa-edit"></i></a>
                </td>
                    </tr>
                `;
            }
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
        document.querySelector('.lds-spinner').style.display = 'block';
        var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task/${id}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        await getTask()
        document.querySelector('.lds-spinner').style.display = 'none';
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
        
        
    }catch(error){
        console.log("error",error);
    }
}

async function saveTask(){
    try{
        document.querySelector('.lds-spinner').style.display = 'block';
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

        await getTask();
        await getUser();
        document.getElementById("edit-task").style.display = "none";
        document.getElementById("app-task").style.display = "block";
        document.querySelector('.lds-spinner').style.display = 'none';
    }catch(error){
        console.log("error",error);
    }
}



async function getAdmins(){
    try{
        var test = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        var string = await test.text();
        var adminAPI = JSON.parse(string)
       


        // API Dự án
        var projects = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/duan",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        var stringProjects = await projects.text();
        var projectAPI = JSON.parse(stringProjects)
        // console.log("project",projectAPI);

         // Gọi admin từ local
         var storageKey = 'adminLocalstorage';
         var storageList = localStorage.getItem(storageKey);
         var adminObject = JSON.parse(storageList);
         var adminlocal = adminObject.id

        var findAdmin = adminAPI.find(idAdmin => idAdmin.id === adminlocal)
        document.getElementById("nameAdmin").innerHTML = findAdmin.fullname
        

        // Trả vể 1 object
        var findProject = projectAPI.find(project => project.id === findAdmin.duan);
        
        document.getElementById("nameProject").innerHTML = findProject.fullname
       
    
    }catch(error){
        console.log(error);
    }
}
getAdmins()