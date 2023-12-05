async function loginAdmin(){
    try{
    
    var getAdmin = await getAllAdmin();
    
    var emailAdmin = document.getElementById("emailAdmin").value;
    var passwordAdmin = document.getElementById("passwordAdmin").value;

    if(!emailAdmin || !passwordAdmin){
        alert("vui lòng điền đầy đủ");
        return;
    }

    // dùng hàm find
    var findAdmin = getAdmin.find((element) => element.email === emailAdmin && element.password === passwordAdmin  )
   
    if (findAdmin) {
        window.location = "admin.html";
        var storageKey = 'adminLocalstorage';
        localStorage.setItem(storageKey,JSON.stringify(findAdmin))
        
    } else {
        alert("Email hoặc mật khẩu không đúng.");
    }
   
    
    }catch(error){
        console.log("error",error);
    }
}

async function loginUser(){
    try{
    var getUser = await getAllUser();
    
    var emailUser = document.getElementById("emailUser").value;
    var passwordUser = document.getElementById("passwordUser").value;

    var findUser = getUser.find((element) => element.email === emailUser && element.password === passwordUser)
    if(findUser){
        window.location = "user.html";
        var storageKey = "UserLocalstorage"
        localStorage.setItem(storageKey,JSON.stringify(findUser))
    }
    else{
        alert("email hoặc mk không đúng")
    }

 
    
    }catch(error){
        console.log("error",error);
    }
}