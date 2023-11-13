var list = [];
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
    results.innerHTML = '';

    list.forEach(element =>{
        results.innerHTML += 
        `
            <li>
                <strong>ID: </strong><span> ${element.id}</span>
                <strong>Content: </strong><span>${element.content}</span>
                <a class="remove" onclick="remove()"><i class="fas fa-trash"></i></a>
            </li>
      
        `
    })
  
}
console.log(list);

function remove(){
    // var index = list.map(e =>{
    //     return e.id;
    // }).indexOf(id)
    // list.splice(index,1)
    var lists = list.filter(e =>{
        return e.id == id;
    })
    console.log(lists);
}
