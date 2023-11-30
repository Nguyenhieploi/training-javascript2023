async function getTask(){
    try{
        var response = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/task",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        var getResponse = await response.text();
        var convertObject = JSON.parse(getResponse);

        //API admin
        var admin = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        var getAdmin = await admin.text();
        var adminObject = JSON.parse(getAdmin);
        
        console.log("admin",adminObject);
         // Gọi user từ local
         var storageKey = "UserLocalstorage"
         var storageList = localStorage.getItem(storageKey);
         var userObject = JSON.parse(storageList);
        console.log("user",userObject);

         document.getElementById("getUser").innerHTML = userObject.fullname
         var resultTask = document.getElementById("resultTask");
         resultTask.innerHTML = ''
 
         var userTasks = convertObject.filter(task => task.user === userObject.id);
         userTasks.forEach(task => {
           var findAdmin =  adminObject.find(admin => admin.id === userObject.admin)
         
             resultTask.innerHTML +=
                 `
                 <tr>
                 <td id="idTask">${task.id}</td>
                 <td id="name">${task.fullname}</td>
                 <td>${task.description}</td>
                 <td>${task.expiredat}</td>
                 <td>
                     <select id="changeStatus" onchange="changeStatus()">
                         <option>${task.status}</option>
                         <option value="Đang làm">Đang làm</option>
                         <option value="Đã làm">Đã làm</option>
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

