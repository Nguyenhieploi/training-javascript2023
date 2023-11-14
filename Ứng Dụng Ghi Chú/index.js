var list = [];
window.onload = function(){
    var storageKey = 'listNote';
    // GetItem - Chuyển từ chuỗi JSON sang đối tượng 
    var storageList = localStorage.getItem(storageKey);
   
    if(storageList){
        list = JSON.parse(storageList);
        var FinalID = list[list.length-1]; // lấy giá trị cuối cùng trong mảng
        var Idso = parseInt(FinalID.id); // chuyển từ chuỗi sang số
        document.getElementById('id').value = Idso + 1
    }else{
        list = []
    }
    console.log('Dữ liệu từ localStorage:', list);
    show();
   
}


function add(){
    var note = {
        id:1,
        content: null
    }
    var getId = document.getElementById("id");
    var getContent = document.getElementById("content");

    // gán giá trị vào trong note;
    note.id = getId.value;
    note.content = getContent.value;

    if(note.content === ''){
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
    }

    list.push(note);
    
    // Thêm mới thì làm rỗng
    document.getElementById("content").value = '';

    // chuyển chuỗi thành số để cộng ID lên sau mỗi lần thêm mới
    document.getElementById("id").value = parseInt(note.id)+1
   
    // Gọi hàm show list note đã thêm
   show()

}
function show(){
    var results =  document.getElementById("results");
    results.innerHTML = ''; // làm rông nội dung 

    list.forEach(element =>{
        results.innerHTML += 
        `
            <li>
                <strong>ID: </strong><span> ${element.id}</span>
                <strong>Content: </strong><span>${element.content}</span>
                <a class="remove" onclick="remove('${element.id}')"><i class="fas fa-trash"></i></a>
                <a class="edit" onclick="edit('${element.id}')"><i class="fas fa-edit"></i></a>
            </li>
      
        `
    })
    
    var storageKey = 'listNote';
   // SetItem - Chuyển từ đối tượng sang chuỗi JSON 
   localStorage.setItem(storageKey,JSON.stringify(list))
  
}



function remove(id){
    console.log("id là", id);           
     list = list.filter((element) => element.id !== id);
     // trả về những đối tượng có id khác với id truyền vào
     console.log(list);
    show();
}


function edit(id){
   var editItem = list.find((element) => {
        if(element.id === id){
            return true;
        }
   });
   var editId = document.getElementById("edit-id");
   var editContent = document.getElementById("edit-content");

   // HTML sẽ nhận giá trị từ biến editItem
   editId.value = editItem.id;
   editContent.value = editItem.content
    document.getElementById("edit-main").style.display = "block";
}

function saveEdit(){
    document.getElementById("edit-main").style.display = "none";
    
    var editId = document.getElementById("edit-id");
    var editContent = document.getElementById("edit-content");
    
    // tìm vị trí có id = với id edit
    var ItemEdit = list.find((element) => element.id === editId.value);
   if(ItemEdit){
    // biến ItemEdit sẽ nhận giá trị từ HTML trả về
    ItemEdit.content = editContent.value 
   }
    show();
}
