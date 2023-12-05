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

        await allUser()
        document.getElementById("fullNameUser").value = '';
        document.getElementById("emailUser").value = '';
        document.getElementById("passwordUser").value = '';
        document.querySelector('.lds-spinner').style.display = 'none';
        
    }catch(error){
        console.log("error", error);
    }
}


async function allUser(){
    try{
        // Get User
        var getUsers = await getAllUser();

        // Get Admin
        var getAdmins = await getAllAdmin();
        
        var getTask = await getAllTask();

          // Gọi admin từ local
        var storageKey = 'adminLocalstorage';
        var storageList = localStorage.getItem(storageKey);
        var adminObject = JSON.parse(storageList);
         var admins = adminObject.id
      
        var resultUser = document.getElementById("resultUser");
        resultUser.innerHTML = '';

        getUsers.forEach(e => {
            if(e.admin === adminObject.id){
                // Tìm task theo ID user 
                var findTask = getTask.filter(taskId => taskId.user === e.id)
                console.log("find tasak",findTask);
                // tạo mảng mới chỉ chưa fullname
                var tasksInfo = findTask.map(task => task.fullname).join(', ');
                
                // Tìm admin từ api và localstorage
                var findAdmins = getAdmins.filter(idAdmin => idAdmin.id === admins)
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
                    <a class="remove" onclick="removeUser('${e.id}')"><i class="fas fa-trash"></i></a>
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
        getUsers.forEach(e =>{
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
        getUsers.forEach(e =>{
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
allUser()

async function removeUser(id){
    try{
        document.querySelector('.lds-spinner').style.display = 'block';
        
        // Get user theo id
        var deleteUsers = await deleteUser(id);

        await allUser();
        document.querySelector('.lds-spinner').style.display = 'none';
    }catch(error){
        console.log("error",error);
    }
}

async function editUser(id){
    try{
        // get User
        var user = await getUser(id);

        document.getElementById("edit-user").style.display = "block"
        document.getElementById("app_main").style.display = "none"

        var id = document.getElementById("id");
        var fullname = document.getElementById("editfullNameUser");
        var email = document.getElementById("editemailUser");
        var password = document.getElementById('editpasswordUser');

        id.value = user.id
        fullname.value = user.fullname
        email.value = user.email
        password.value = user.password

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
        
        // Update User API
        var upUser = await updateUser(data,id)
        
        await allUser()
       
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
       
        // API create
        var createdTask = await createTask();
        await allTasks()
        await allUser();
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

async function allTasks(){
    try{
        // APi task
        var allTask = await getAllTask();
        
        //API user
        var allUser = await getAllUser();
    
        // API admin
        var allAdmin = await getAllAdmin()
    
    var storageKey = 'adminLocalstorage';
    var storageList = localStorage.getItem(storageKey);
    var adminObject = JSON.parse(storageList);
    var adminlocal = adminObject.id
    
    
      // Xu ly task quá hạn thì color màu đỏ
      var resultHtml = '';
      var currentDate = new Date();
      allTask.forEach(e => {
           var taskDate = new Date(e.expiredat);
           var filterUser = allUser.find(findUser => findUser.id == e.user) // trả về object
            
           // so sánh task === với user === admin
         if(adminlocal == filterUser.admin){
            var backgroundColor = taskDate < currentDate ? '#ff00007d' : 'none';
            resultHtml += `
            <tr style="background-color: ${backgroundColor};">
                <td>${e.fullname}</td>
                <td>${e.description}</td>
                <td>${e.expiredat}</td>
                <td>${e.createdat}</td>
                <td>${e.updatedat}</td>
                <td>${e.status}</td>
                <td>${filterUser?.fullname || ''}</td>
                <td>
                    <a class="remove" onclick="removeTask('${e.id}')"><i class="fas fa-trash"></i></a>
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
allTasks()

async function removeTask(id){
    try{
        document.querySelector('.lds-spinner').style.display = 'block';
        await deleteTask(id)
        await allTasks()
        document.querySelector('.lds-spinner').style.display = 'none';
    }catch(error){
        console.log("error",error);
    }
}


async function editTask(id){
    try{
       //API Get Task
       var task = await getTask(id)

        document.getElementById("edit-task").style.display = "block"
        document.getElementById("app-task").style.display = "none"

        var idtask = document.getElementById("idtask");
        var editnameTask = document.getElementById("editnameTask");
        var editdescription = document.getElementById("editdescription");
        var editexpiredAt = document.getElementById('editexpiredAt');
        var editgetUser = document.getElementById('editgetUser');
        var editstatus = document.getElementById('editstatus');

        idtask.value = task.id
        editnameTask.value = task.fullname
        editdescription.value = task.description
        editexpiredAt.value = task.expiredat
        editgetUser.value = task.user
        editstatus.value = task.status
        
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
        
        await updateTask(data,id)

        await allTasks();
        await allUser();
        document.getElementById("edit-task").style.display = "none";
        document.getElementById("app-task").style.display = "block";
        document.querySelector('.lds-spinner').style.display = 'none';
    }catch(error){
        console.log("error",error);
    }
}



async function getAdmins(){
    try{
        var getAdmin = await getAllAdmin()
       
        // API Dự án
       var getProject = await getAllProject();
        // console.log("project",projectAPI);

         // Gọi admin từ local
         var storageKey = 'adminLocalstorage';
         var storageList = localStorage.getItem(storageKey);
         var adminObject = JSON.parse(storageList);
         var adminlocal = adminObject.id

        var findAdmin = getAdmin.find(idAdmin => idAdmin.id === adminlocal)
        document.getElementById("nameAdmin").innerHTML = findAdmin.fullname
    
        // Trả vể 1 object
        var findProject = getProject.find(project => project.id === findAdmin.duan);
        
        document.getElementById("nameProject").innerHTML = findProject.fullname
       
    }catch(error){
        console.log(error);
    }
}
getAdmins()