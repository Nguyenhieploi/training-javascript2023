async function loginAdmin(){
    try{
    var response = await fetch("https://655ee6ae879575426b441e32.mockapi.io/api/v1/admin",{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })  
    var getData = await response.text();
    var converObject = JSON.parse(getData);
    
    var emailAdmin = document.getElementById("emailAdmin").value;
    var passwordAdmin = document.getElementById("passwordAdmin").value;

    if(!emailAdmin || !passwordAdmin){
        alert("vui lòng điền đầy đủ");
        return;
    }

    // dùng hàm find
    var findAdmin = converObject.find((element) => element.email === emailAdmin && element.password === passwordAdmin  )
   
    if (findAdmin) {
        // Nếu là admin, chuyển đến trang "admin.html"
        window.location = "admin.html";
    } else {
        alert("Email hoặc mật khẩu không đúng.");
    }
    var storageKey = 'adminLocalstorage';
    // SetItem - Chuyển từ đối tượng sang chuỗi JSON 
    localStorage.setItem(storageKey,JSON.stringify(converObject))
    
    }catch(error){
        console.log("error",error);
    }
}

async function loginUser(){
    try{
    var response = await fetch("https://6560478e83aba11d99d085b1.mockapi.io/api/v1/user",{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })  
    var getData = await response.text();
    var converObject = JSON.parse(getData);
    
    var emailUser = document.getElementById("emailUser").value;
    var passwordUser = document.getElementById("passwordUser").value;

    if(!emailUser || !passwordUser){
        alert("vui lòng điền đầy đủ");
        return;
    }


//    converObject.forEach(element => {
//     if(emailUser === element.email && passwordUser === element.password ){    
//         window.location = "user.html";
//         return true;
//     }
//    });
 
    
    }catch(error){
        console.log("error",error);
    }
}