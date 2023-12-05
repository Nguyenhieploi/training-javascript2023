async function allTask(){
    try{
        var taskUSer = await getAllTask()

        //API admin
        var admin = await getAllAdmin()
        
       
         // Gọi user từ local
         var storageKey = "UserLocalstorage"
         var storageList = localStorage.getItem(storageKey);
         var userObject = JSON.parse(storageList);
       

         document.getElementById("getUser").innerHTML = userObject.fullname
         
         // filter ra những task task.user(id của user) và id của user từ local
         var userTasks = taskUSer.filter(task => task.user === userObject.id);
         
         var resultTask = document.getElementById("resultTask");
         resultTask.innerHTML = ''
         userTasks.forEach(task => {
           var findAdmin =  admin.find(admin => admin.id === userObject.admin)
           var options = `<option value="${task.status}" selected>${task.status}</option>`;

            // Thêm các tùy chọn khác nếu chúng không trùng với trạng thái hiện tại
            if (task.status !== "Chưa làm"){
                options += `<option value="Chưa làm">Chưa làm</option>`;
            } 
            if (task.status !== "Đang làm"){
                options += `<option value="Đang làm">Đang làm</option>`;
            }
            if (task.status !== "Đã làm"){
                options += `<option value="Đã làm">Đã làm</option>`;
            }

             resultTask.innerHTML +=
                 `
                 <tr>
                 <td id="idTask">${task.id}</td>
                 <td id="name">${task.fullname}</td>
                 <td>${task.description}</td>
                 <td>${task.expiredat}</td>
                 <td>
                     <select id="changeStatus${task.id}" onchange="changeStatus(${task.id})"> 
                        ${options}
                     </select>
                 </td>
                <td>${findAdmin.fullname}</td>
                 </tr>
                 `;
         });
        

    }catch(error){
        console.log(error);
    }
}
allTask()

async function changeStatus(id){
    try{
        document.querySelector('.lds-spinner').style.display = 'block';
        var status = document.getElementById(`changeStatus${id}`).value
        var data = {status}
        
        await updateTask(data,id)
        await allTask()
        
        document.querySelector('.lds-spinner').style.display = 'none';
    
    }catch(error){
        console.log(error);
    }
}

