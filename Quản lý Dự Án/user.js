async function getTask(){
    try{
        var response = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        var getResponse = await response.text();
        var taskObject = JSON.parse(getResponse);

        //API admin
        var admin = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        var getAdmin = await admin.text();
        var adminObject = JSON.parse(getAdmin);
        
       
         // Gọi user từ local
         var storageKey = "UserLocalstorage"
         var storageList = localStorage.getItem(storageKey);
         var userObject = JSON.parse(storageList);
       

         document.getElementById("getUser").innerHTML = userObject.fullname
         
         // filter ra những task task.user(id của user) và id của user từ local
         var userTasks = taskObject.filter(task => task.user === userObject.id);
         
         var resultTask = document.getElementById("resultTask");
         resultTask.innerHTML = ''
         userTasks.forEach(task => {
           var findAdmin =  adminObject.find(admin => admin.id === userObject.admin)
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
getTask()

async function changeStatus(taskId){
    try{
        document.querySelector('.lds-spinner').style.display = 'block';
        var status = document.getElementById(`changeStatus${taskId}`).value
        var data = {status}
        var response = await fetch(`https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task/${taskId}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
        await getTask();
        document.querySelector('.lds-spinner').style.display = 'none';
    console.log(response.status);
    }catch(error){
        console.log(error);
    }
}

