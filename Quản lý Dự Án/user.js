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

        var resultTask = document.getElementById("resultTask");
        resultTask.innerHTML = ''

        convertObject.forEach(element => {
            resultTask.innerHTML +=
            `
            <tr>
            <td id="idTask">${element.id}</td>
            <td id="name">${element.fullname}</td>
            <td>${element.description}</td>
            <td>${element.expiredat	}</td>
            <td>
                <select id="changeStatus" onchange="changeStatus()">
                    <option>${element.status}</option>
                    <option value="Đang làm">Đang làm</option>
                    <option value="Đã làm">Đã làm</option>
                </select>
            </td>
            <td>${element.user}</td>
            </tr>
            `
        });
        

    }catch(error){
        console.log(error);
    }
}
getTask()
async function changeStatus(){
    try{
        var status = document.getElementById("changeStatus").value;
        var id = document.getElementById("idTask").value;
        
        var data = {status}
        
    }catch(error){
        console.log(error);
    }
}