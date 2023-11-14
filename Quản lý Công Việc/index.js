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
   
   // chuyển chuỗi sang Date
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
   console.log(list);
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
            <td>${item.startday}</td>
            <td>${item.endday}</td>
            <td>
                <a class="remove" onclick="deleteItem('${item.id}')"><i class="fas fa-trash"></i></a>
                <a class="edit"><i class="fas fa-edit"></i></a>
            </td>
            </tr>
        `
    })

    // LocalStorage - chuyển đối tượng thành 1 chuỗi JSON
    var localStoreKey = 'localStoreKey'
    localStorage.setItem(localStoreKey,JSON.stringify(list))
}

function deleteItem(id){
    console.log("id cần xóa là" + id);
    var filterItem = list.filter((element) => element.id !== id);
    list = filterItem; // Thay thế mảng vừa filter vào mảng list
    console.log(list);
    show();
}