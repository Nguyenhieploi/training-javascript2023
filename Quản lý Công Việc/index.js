var list = [];
document.getElementById("edit_name").disabled = true;
document.getElementById("edit_start_day").disabled = true;
document.getElementById("edit_end_day").disabled = true;

window.onload = function(){
    var localStoreKey = 'localStoreKey';
    
    var getLocalStorage = localStorage.getItem(localStoreKey);
    if(getLocalStorage){
        //Chuyển đổi một chuỗi JSON thành một đối tượng
        list = JSON.parse(getLocalStorage)
        var getId = list[list.length-1]; 
        var convertId = parseInt(getId.id) // chuyển từ string sang number và +1 vào số Id cuối cùng
        document.getElementById("id").value = convertId + 1
    }else{
        list = []
    }
    show()
}
function add(){
   object = {
    id: 1,
    nameJob: null,
    startday: null,
    endday:null,
   }
   
   var add_id = document.getElementById("id").value;
   var add_name = document.getElementById("add_name").value;
   var add_startday = document.getElementById("add_start_day").value;
   var add_endday = document.getElementById("add_end_day").value;

   object.id = add_id;
   object.nameJob = add_name;
   object.startday = add_startday;
   object.endday = add_endday;

  

 
   if(object.nameJob === '' || object.startday === '' || object.endday === ''){
    alert("Vui lòng điền đầy đủ")
    return;
   }
   
    // Chuyển sang date
    var startDay = new Date(add_startday);
    var endDay = new Date(add_endday);
    
   if (startDay > endDay) {
       alert("Ngày kết thúc không được nhỏ hơn ngày bắt đầu");
       return;
   } 


   list.push(object);
   document.getElementById("id").value = parseInt(object.id)+1

   document.getElementById("add_name").value = '';
   document.getElementById("add_start_day").value = ''
   document.getElementById("add_end_day").value = ''
//    console.log(list);
   show()
}
function show(){
    var results = document.getElementById("results");
    results.innerHTML = '';
    list.forEach(item =>{
        results.innerHTML += 
        `
            <tr>
            <td>${item.id}</td>
            <td>${item.nameJob}</td>
            <td >${item.startday}</td>
            <td >${item.endday}</td>
            <td>
                <a class="remove" onclick="deleteItem('${item.id}')"><i class="fas fa-trash"></i></a>
                <a class="edit" onclick="edit('${item.id}')"><i class="fas fa-edit"></i></a>
               
            </td>
            </tr>
        `
    })

    // LocalStorage - chuyển đối tượng thành 1 chuỗi JSON
    var localStoreKey = 'localStoreKey'
    localStorage.setItem(localStoreKey,JSON.stringify(list))
}

function deleteItem(id){
    // console.log("id cần xóa là" + id);
    var filterItem = list.filter((element) => element.id !== id);
    list = filterItem; // Thay thế mảng vừa filter vào mảng list
    console.log(list);
    show();
}
function edit(id){
    // console.log("id cần sửa là " + id);
   
    var findId = list.find((element) => {
        if(element.id === id){
            return true;
        }
    });

    var editId = document.getElementById("edit_id");
    var edit_name = document.getElementById("edit_name");
    var edit_start_day = document.getElementById("edit_start_day");
    var edit_end_day = document.getElementById("edit_end_day");


    editId.value = findId.id;
    edit_name.value = findId.nameJob;
    edit_start_day.value = findId.startday;
    edit_end_day.value = findId.endday;

    document.getElementById("edit_name").disabled = false;
    document.getElementById("edit_start_day").disabled = false;
    document.getElementById("edit_end_day").disabled = false;
}
function save(){
    var editId = document.getElementById("edit_id").value;
   
    if(editId === ''){
        document.getElementById("save_btn").disabled = true;
        
    }else{
        document.getElementById("save_btn").disabled = false;
    }
    
    var edit_name = document.getElementById("edit_name");
    var edit_start_day = document.getElementById("edit_start_day");
    var edit_end_day = document.getElementById("edit_end_day");

    var findId = list.find((element) => {
        if(element.id === editId){
            return true;
        }
    })

    // gán giá trị từ input edit vào trong list
    findId.nameJob = edit_name.value;
    findId.startday = edit_start_day.value;
    findId.endday = edit_end_day.value;

    // Làm rỗng giá trị khi ấn lưu
    document.getElementById("edit_id").value = ''
    document.getElementById("edit_name").value = '';
    document.getElementById("edit_start_day").value = ''
    document.getElementById("edit_end_day").value = ''

    // Sau khi ấn lưu chỉnh sửa thì disabled lại
    document.getElementById("edit_name").disabled = true;
    document.getElementById("edit_start_day").disabled = true;
    document.getElementById("edit_end_day").disabled = true;
    show()
}

setTimeout(function() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var h = date.getHours();
    var m = date.getMinutes();
    
    // vì hàm Date trả về 2/1/2023 8:03 nên phải + 0 phía trước khi bé hơn số 10
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    // console.log(m);
    // Lấy ngày hiện tại theo định dạng yyyy-mm-ddTHH:mm
    var currentDate = yyyy + "-" + mm + "-" + dd + "T" + h + ":" + m;
    // console.log("Ngày hiện tại "+ currentDate);
     
    // Lặp qua mảng list để lấy ID
    list.forEach((item) => {
        var getId = item.id;
     
    // tìm ra 2 ID bằng nhau, dựa vào id để lấy start và namejob
      var findId = list.find((element) => {
        return element.id ===  getId;
      })

      if(findId){
        var timeStart = findId.startday;
        var showNameJob = findId.nameJob
        if(timeStart === currentDate){
           alert("Đến giờ làm bài tập: " + showNameJob);
        }   
      }
    })
    
},3000)