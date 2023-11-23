document.getElementById("editnameCategory").disabled = true;
document.getElementById("updateCategory").disabled = true;

document.getElementById("editnameDo").disabled = true
document.getElementById("editUrlDo").disabled = true
document.getElementById("editselectFormatDo").disabled = true
document.getElementById("editViewDo").disabled = true
document.getElementById("editselectCatDo").disabled = true
document.getElementById("updateDo").disabled = true
// Thông báo
function closeSuccessNotification() {
    var notificationWrapper = document.getElementById('notificationWrapper');
    var notifiDelete = document.getElementById("notifiDelete");
    var notifiUpdate = document.getElementById("notifiUpdate");
    notificationWrapper.style.top = '-100px';
    notifiDelete.style.top = '-100px';
    notifiUpdate.style.top = '-100px';
}

async function addCategory() {
    try {
        var object = {
            fullname: null,
        };

        var add_name = document.getElementById("nameCategory").value;

        object.fullname = add_name;

        if (!object.fullname) {
            alert("Điền đầy đủ thông tin");
            return;
        }

        var response = await fetch("https://65548cd163cafc694fe69f55.mockapi.io/api/v1/danhmucsach", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        });

        // Clear input
        document.getElementById("nameCategory").value = '';

        //Thông báo
        if(response = true){
        var notificationWrapper = document.getElementById('notificationWrapper');
        notificationWrapper.style.top = '20px';
        setTimeout(function () {
            closeSuccessNotification();
        }, 2000);

        // gọi hàm getAll
        getAllCategory();
        }
    } catch (error) {
        console.log("error", error);
    }
}



async function getAllCategory(){
    try{
        var response = await fetch("https://65548cd163cafc694fe69f55.mockapi.io/api/v1/danhmucsach",
        {
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
            }
        });
       
        var dataString = await response.text(); // đang là chuỗi
        var dataObject = JSON.parse(dataString); // chuyển sang object


        var results = document.getElementById("results");
        results.innerHTML = ''
       dataObject.forEach(element => {
         results.innerHTML += 
         `
            <td>${element.id}</td>
            <td>${element.fullname}</td>
            
            <td>
                <a class="remove" onclick="deleteItem('${element.id}')"><i class="fas fa-trash"></i></a>
                <a class="edit" onclick="edit('${element.id}')"><i class="fas fa-edit"></i></a>
            </td>
         
         `
       });

       // gọi category vào phần select thêm tài liệu
       var getCate = document.getElementById("selectCatDocument");
       getCate.innerHTML = '';
       dataObject.forEach(element =>{
        getCate.innerHTML += 
        `
            <option value="${element.fullname}">${element.fullname}</option>
        `
       })

       // Gọi category vào phần select edit tài liệu
       var getCate = document.getElementById("editselectCatDo");
       getCate.innerHTML = '';
       dataObject.forEach(element =>{
        getCate.innerHTML += 
        `
            <option value="${element.fullname}">${element.fullname}</option>
        `
       })
    }catch(error){
        console.log("error",error);
    }
}
getAllCategory();


async function deleteItem(id){
    try{
        var response = await fetch(`https://65548cd163cafc694fe69f55.mockapi.io/api/v1/danhmucsach/${id}`,
        {
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json',
            },
        })
        console.log("status", response.status);
        var notificationWrapper = document.getElementById('notifiDelete');
        notificationWrapper.style.top = '20px';
        setTimeout(function () {
            closeSuccessNotification();
        }, 2000);
        getAllCategory();

    }catch(error){
        console.log("error",error);
    }
}

async function edit(id){
    try{
      
        var response = await fetch(`https://65548cd163cafc694fe69f55.mockapi.io/api/v1/danhmucsach/${id}`,
        {
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
            },

        })
        console.log("status", response.status);

        var dataString = await response.text();
        var dataObject = JSON.parse(dataString); // khi lấy ra thì phải chuyển JSON thanh 1 object

        var getIdEdit = document.getElementById("idCategory");
        var getNameEdit = document.getElementById("editnameCategory");

        getIdEdit.value = dataObject.id;
        getNameEdit.value = dataObject.fullname; 


        document.getElementById("editnameCategory").disabled = false;
        document.getElementById("updateCategory").disabled = false;


    }
    catch(error){
        console.log("error",error);
    }
}
async function updateCategory(){
   try{
    var getEditId = document.getElementById("idCategory").value;
    var fullname = document.getElementById("editnameCategory").value
    var dataIncludes = {fullname}

    var response = await fetch(`https://65548cd163cafc694fe69f55.mockapi.io/api/v1/danhmucsach/${getEditId}`,
    {
        method:"PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataIncludes), // khi đưa data vào API phải chuyển từ object sang chuỗi json
    })
    console.log("status", response.status);
    
    //Thông báo
    var notifiUpdate = document.getElementById('notifiUpdate');
    notifiUpdate.style.top = '20px';
        setTimeout(function () {
            closeSuccessNotification();
        }, 2000);
    
    // reset input
    document.getElementById("idCategory").value = '';
    document.getElementById("editnameCategory").value = ''
    
    //clear
    document.getElementById("editnameCategory").disabled = true;
    document.getElementById("updateCategory").disabled = true;

    getAllCategory()

   }
   catch(error){
    console.log("error",error);
   }

}


// Xử lý trang tài liệu
async function addDocument(){
    try{
        var listDocument = {
            fullname: null,
            url: null,
            typefile: null,
            view:null,
            category: null
        }
        var nameDocument = document.getElementById("nameDocument").value;
        var urlDocument = document.getElementById("urlDocument").value;
        var typeFileDocument = document.getElementById("selectFormatDocument").value
        var viewDocument = document.getElementById("viewDocument").value;
        var catDocument = document.getElementById("selectCatDocument").value
        console.log(catDocument);

        listDocument.fullname = nameDocument;
        listDocument.url = urlDocument;
        listDocument.typefile = typeFileDocument;
        listDocument.view = viewDocument
        listDocument.category = catDocument
        // if(!listDocument.fullname || !urlDocument || !typeFileDocument || !viewDocument || !catDocument){
        //     alert("vui lòng điền đầy đủ");
        //     return;
        // }
        var response = await fetch("https://65548cd163cafc694fe69f55.mockapi.io/api/v1/book",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(listDocument) // chuyển object thành chuỗi
        })

        document.getElementById("nameDocument").value = ''
        document.getElementById("urlDocument").value = ''
        document.getElementById("selectFormatDocument").value = ''
        document.getElementById("viewDocument").value = ''
        document.getElementById("selectCatDocument").value = ''

        // Thông báo
        var notificationWrapper = document.getElementById('notificationWrapper');
        notificationWrapper.style.top = '20px';
        setTimeout(function () {
            closeSuccessNotification();
        }, 2000);

        // Gọi hàm getAll sau khi add
        getAllDocument()

    }catch(error){
        console.log("error",error);
    }
}



async function getAllDocument(){
    try{
        var response = await fetch("https://65548cd163cafc694fe69f55.mockapi.io/api/v1/book",
    {
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
        },
    })
 
    var dataString = await response.text(); // đang là chuỗi
    var dataObject = JSON.parse(dataString); // chuyển sang object

    var getDocuments = document.getElementById("resultDocument");
    getDocuments.innerHTML = ''
    dataObject.forEach(element => {
        getDocuments.innerHTML += 
        `
            <td>${element.id}</td>
            <td>${element.fullname}</td>
            <td>https://tailieure.net/${element.url}</td>
            <td>${element.typefile}</td>
            <td>${element.view}</td>
            <td>${element.category}</td>
            <td>
                <a class="remove" onclick="deleteDo('${element.id}')"><i class="fas fa-trash"></i></a>
                <a class="edit" onclick="editDo('${element.id}')"><i class="fas fa-edit"></i></a>
            </td>
        `

        // Gọi số lượng tài liệu ra trang chủ
        var count = 0
        dataObject.forEach(element  =>{
            count++
        })
        document.getElementById("count").innerHTML = count ;
        
    })
    }catch(error){
        console.log("error",error);
    }
}
getAllDocument();


async function deleteDo(id){
    try{

        var response = await fetch(`https://65548cd163cafc694fe69f55.mockapi.io/api/v1/book/${id}`,
        {
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json',
            },

        })

        // Thông báo
        var notificationWrapper = document.getElementById('notifiDelete');
        notificationWrapper.style.top = '20px';
        setTimeout(function () {
            closeSuccessNotification();
        }, 2000);

        getAllDocument();
      

    }catch(error){
        console.log("error",error);
    }
}

async function editDo(id){
    try{
        var response = await fetch(`https://65548cd163cafc694fe69f55.mockapi.io/api/v1/book/${id}`,
        {
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
            },

        })

        var dataString = await response.text();
        var dataObject = JSON.parse(dataString); // khi lấy ra thì phải chuyển JSON thanh 1 object

        var editId = document.getElementById("idDo");
        var editnameDo = document.getElementById("editnameDo");
        var editUrlDo = document.getElementById("editUrlDo");
        var editselectFormatDo = document.getElementById("editselectFormatDo");
        var editViewDo = document.getElementById("editViewDo");
        var editselectCatDo = document.getElementById("editselectCatDo");

        editId.value = dataObject.id
        editnameDo.value = dataObject.fullname
        editUrlDo.value = dataObject.url
        editselectFormatDo.value = dataObject.typefile
        editViewDo.value = dataObject.view
        editselectCatDo.value = dataObject.category

        document.getElementById("editnameDo").disabled = false
        document.getElementById("editUrlDo").disabled = false
        document.getElementById("editselectFormatDo").disabled = false
        document.getElementById("editViewDo").disabled = false
        document.getElementById("editselectCatDo").disabled = false
        document.getElementById("updateDo").disabled = false


       
    }catch(error){
        console.log("error", error);
    }
}
async function updateDo(){
    try{
        var editId = document.getElementById("idDo").value;
        var fullname = document.getElementById("editnameDo").value;
        var url = document.getElementById("editUrlDo").value;
        var typefile = document.getElementById("editselectFormatDo").value;
        var view = document.getElementById("editViewDo").value;
        var category = document.getElementById("editselectCatDo").value;

        var object = {
            fullname,
            url,
            typefile,
            view,
            category
        }
        var response = await fetch(`https://65548cd163cafc694fe69f55.mockapi.io/api/v1/book/${editId}`,
        {
            method:"PUT",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)

        })
         //Thông báo
        var notifiUpdate = document.getElementById('notifiUpdate');
        notifiUpdate.style.top = '20px';
            setTimeout(function () {
                closeSuccessNotification();
            }, 2000);
        // Disable
        document.getElementById("editnameDo").disabled = true
        document.getElementById("editUrlDo").disabled = true
        document.getElementById("editselectFormatDo").disabled = true
        document.getElementById("editViewDo").disabled = true
        document.getElementById("editselectCatDo").disabled = true
        document.getElementById("updateDo").disabled = true

        // Clear
        document.getElementById("idDo").value = ''
        document.getElementById("editnameDo").value = ''
        document.getElementById("editUrlDo").value = ''
        document.getElementById("editselectFormatDo").value = ''
        document.getElementById("editViewDo").value = ''
        document.getElementById("editselectCatDo").value = ''
        
        getAllDocument()
    }
    catch(error){
        console.log("error",error);
    }
}
