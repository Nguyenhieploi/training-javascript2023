var list = [];


function add(){
    // Tạo key localstorage 
    var storageKey = 'listNote';

    // GetItem - Chuyển từ chuỗi JSON sang đối tượng 
    var storageList = localStorage.getItem(storageKey);
    if(storageList){
        list = JSON.parse(storageList);
    }
    else{
        list = []
    }

    var note = {
        id:null,
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
    alert("đã thêm thành công")
    list.push(note);
    
    // Thêm mới thì làm rỗng
    document.getElementById("content").value = '';

    // chuyển chuỗi thành số để cộng ID lên sau mỗi lần thêm mới
    document.getElementById("id").value = parseInt(note.id)+1
   
    // Gọi hàm show list note đã thêm
   show()

   // SetItem - Chuyển từ đối tượng sang chuỗi JSON 
   localStorage.setItem(storageKey,JSON.stringify(list))
}
function show(){
    var results =  document.getElementById("results");
    results.innerHTML = '';

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
  
}
console.log("danh sách hiện tại là:",list);

function remove(id){
    console.log("id là", id);
     list = list.filter((element) => element.id !== id);
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

   editId.value = editItem.id;
   editContent.value = editItem.content
    document.getElementById("edit-main").style.display = "block";
}

function saveEdit(){
    document.getElementById("edit-main").style.display = "none";
    
    var editId = document.getElementById("edit-id");
    var editContent = document.getElementById("edit-content");
    
    // tìm vị trí có id = với id edit
    var editedItemIndex = list.findIndex((element) => element.id === editId.value);
    console.log(editedItemIndex);
    list[editedItemIndex].content = editContent.value;
    show();
}
