//=================================== Bài 1 ===========================================
// function diemTrungBinh(toan,van,tienganh){
//     var tongDiem = (toan + van + tienganh) / 3;
//     console.log("bài 1 kết quả là: " + tongDiem); 
// }
// diemTrungBinh(7,8,9); 

// =================================== Bài 2 =========================================

// function kiemtra(n){
//     // Bé hơn 2 thì không phải là số nguyên tố
//     if(n < 2){
//         return false;
//     }
//     else{
//         for(var i = 2;i < n-1; i++ ){ //
//            if(n % i == 0){
//             return false;
//            }
//         }
//     }
//     return true;
// }

// var arr = [2,3,4,5,6,7,89,97]
// for(var j = 0; j < arr.length; j++){
//     if(kiemtra(arr[j]) === true){
//         console.log(arr[j] + " là số nguyên tố");
//     }
//     else{
//         console.log(arr[j] + " không là số nguyên tố");
//     }
// }

// ======================================= Bài 3 ======================================
// var danhBa = {
//     ten: "Nguyen Hiep Loi",
//     email: "loi@gmail.com",
//     phone: 3342797979,
// }
// console.log(danhBa);

// ======================================== bài 4 =====================================
// var student =[
//     {
//         fullname: "Nguyen Hiep Loi",
//         diemSo: 9
//     },
//     {
//         fullname: "Nguyen Văn A",
//         diemSo: 8
//     },
//     {
//         fullname: "Nguyen Văn A",
//         diemSo: 3
//     },
//     {
//         fullname: "Nguyen Hiep B",
//         diemSo: 10
//     },
//     {
//         fullname: "Nguyen Hiep C",
//         diemSo: 6
//     },
//     {
//         fullname: "Nguyen Hiep DD",
//         diemSo: 1
//     }
// ]
// function tangDan(a,b){
//     return a.diemSo- b.diemSo;
// }
// console.log(student.sort(tangDan));


//=========================================== Bài 5 =====================================
// function chuyenDoi(c, f) {
//     if (c !== undefined) {
//         var doF = c * 1.8 + 32;
//         console.log("độ C chuyển sang độ F là: " + doF);
//     }
//     if (f !== undefined) {
//         var doC = (f - 32) / 1.8;
//         console.log("độ F chuyển sang độ C là: " + doC);
//     }
// }
// chuyenDoi(100,300)

// ======================================== Bài 6 ======================================
// var numbers = [1,2,3,4,5,1,2,3];

// var filterNumbers = numbers.filter((e,index)=>{
//     return numbers.indexOf(e) === index; // tìm vị trí
// })
// console.log(filterNumbers);

// ======================================== Bài 7 ==================================
// var numbers = [1,2,3,7,10,20,30];
// var sums = 0;
// for(var i = 0; i < numbers.length; i++){
//     if(numbers[i] % 2 === 0){
//         sums += numbers[i];
//         console.log("Số chẵn là " + numbers[i])
//     }
// }
// console.log("Tổng số chẵn là " + sums);

// ====================================== Bài 8 ======================================
// var texts = "racecar";
// for(var i =0; i < texts.length; i++){
//         if( texts[i] === CHƯA BIẾT CODE GÌ ]){
//             console.log("chuỗi đảo ngữ");
//         } 
//     }
  

// ==================================== BÀI 9 ======================================
// for(var i = 2; i <= 9;i++){
//     for(var j = 1; j <= 10; j++){
//         console.log(i + "*" + j +"=" +i*j);
//     }
// }

// ==================================== BÀI 10 ========================================
// function chiSoBMI(chieucao, cannang) {
//     var bmi = cannang / (chieucao * chieucao);
//     var tongso = (bmi * 10000).toFixed(1);
    
//     console.log("Chỉ số BMI là: " + tongso);

//     if(tongso < 16){
//         console.log(" Đánh giá gầy độ III"); 
//     }
//     else if(16 <= tongso && tongso < 17){  // sử dụng dấu && chứ không thể so sánh thẳng 3 số với nhau
//         console.log( "Đánh giá gầy độ II");
//         }
//     else if(17 <= tongso && tongso < 18.5){
//         console.log( "Đánh giá gầy độ I");
//     }
//     else if(18.5 <= tongso  && tongso < 25 ){
//         console.log("Chúc mừng bạn đã Bình thường");
//     }
//     else if(25 <= tongso && tongso <30){
//         console.log("thừa cân");
//     }
//     else if(30 <= tongso && tongso < 35){
//         console.log("béo phì cấp 1");
//     }
//     else if(35 <= tongso & tongso < 40){
//         console.log("Béo phì cấp II");
//     }
//     else if(tongso > 40){
//         console.log("béo phì cấp III");
//     }
// }

// chiSoBMI(170, 70); 

// ============================== BÀI 12 ========================================= 

// var date = new Date();
// var h = date.getHours();
// var m = date.getMinutes();
// var s = date.getSeconds();

// console.log("giờ " + h + " phút " + m +" giây " + s);

// =================================== Bài 11 ===================================


// sd hàm filter 
function fillterFull(diem,tuoi){
    var students = [
        {
            fullname: "Nguyen Hiep Loi",
            diem: 10,
            tuoi: 20
        },
        {
            fullname: "Nguyen Hiep Trung",
            diem: 5,
            tuoi: 20
        },
        {
            fullname: "Nguyen Hiep Nghĩa",
            diem: 5,
            tuoi: 22
        },
        {
            fullname: "Nguyen Hiep Phong",
            diem: 5,
            tuoi: 30
        },
        {
            fullname: "Nguyen Hiep Tài",
            diem: 5,
            tuoi: 30
        }
    ]

    var filterDiem = students.filter(element => element.diem === diem)
    if(filterDiem.length === 0){
        console.log("Không có học sinh nào có điểm");
    }else{
        filterDiem.forEach(element => {
            console.log(element.fullname +" có điểm là:  " + element.diem );
           
        });
    }
   
    var filterTuoi = students.filter(element => element.tuoi < tuoi)
    if(filterTuoi.length === 0 ){
        console.log("Không có học sinh nào có tuổi");
    }else{
        filterTuoi.forEach(element =>{
            console.log(element.fullname +" có tuổi là:  " + element.tuoi );
        })
    }
  
}

var diem = 5;
var tuoi = 30;

fillterFull(diem,tuoi);