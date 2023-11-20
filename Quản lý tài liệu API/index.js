document.getElementById("editnameCategory").disabled = true;
document.getElementById("updateCategory").disabled = true;

async function addCategory() {
    try {
        var object = {
            id: null,
            fullname: null,
        };

        var add_id = document.getElementById("idCategory").value;
        var add_name = document.getElementById("nameCategory").value;

        object.id = add_id;
        object.fullname = add_name;

        if (!object.fullname) {
            alert("Điền đầy đủ thông tin");
            return;
        }

        var response = await fetch("https://65548cd163cafc694fe69f55.mockapi.io/api/v1/DanhMucSach", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        });

        console.log("status", response.status);
    } catch (error) {
        console.log("error", error);
    }
}

async function getAllCategory(){
    addCategory()
    try{
        var response = await fetch("https://65548cd163cafc694fe69f55.mockapi.io/api/v1/DanhMucSach",
        {
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
            }
        });
        console.log("status", response.status);
        var dataString = await response.text(); // đang là chuỗi
        var dataObject = JSON.parse(dataString); // chuyển sang object
        var results = document.getElementById("results");
       dataObject.forEach(element => {
         results.innerHTML += 
         `
            <td>${element.id}</td>
            <td>${element.fullname}</td>
            <td>
                <a class="remove" onclick="deleteItem('${element.id}')"><i class="fas fa-trash"></i></a>
                <a class="edit" onclick="edit('${element.id}')"><i class="fas fa-edit"></i></a>
            </td>
         </td>
         `
       });

    }catch(error){
        console.log("error",error);
    }
}
getAllCategory()