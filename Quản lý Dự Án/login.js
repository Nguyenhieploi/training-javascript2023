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


   converObject.forEach(element => {
    if(emailAdmin === element.email && passwordAdmin === element.password ){    
        window.location = "admin.html";
        return true;
    }
   });
   // Cần hỏi: Vì sử dụng vòng lặp foreach thì nó se chạy qua tất cả object để tìm đối tượng thõa điều kiện 
// và chuyển hướng trang nếu thành công. Nếu sai thì sao, vì nếu đặt else ở trong forEach nó sẽ hiện thông tin sai
   // Nhưng ở trong api có bao nhiêu object sai thì nó sẽ hiện alert cho đến khi tìm thấy đối tượng thõa đikien
    
    }catch(error){
        console.log("error",error);
    }
}