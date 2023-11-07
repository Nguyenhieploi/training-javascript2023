// 1. Variable: var, let and const
// var 
var name = "GiaTri"
// let 
let name = "GiaTri"
// const: không được thay đổi
const name = "GiaTri"

// 2. Data types
// Number, boolean, string, null, undefined, bigint
let year = 2023
let correct = true // false
let fullname = "GiaTri", productName = "Cao su"
let name = null
let product = undefined
let amount = BigInt(10000000000000000000000000)

// 3. Object: Đối tượng gồm thuộc tính và giá trị của thuộc tính
let student = {
    fullname: "Nguyen",
    school: "THPT Chu Van An",
    gender: "Nam",
    height: 160,
    weight: 50
}

let iphone = {
    kieu: "iphone x",
    mauSac: "red",
    canNang: "300g",
    chieuCao: "5cm",
    sanXuat: 2017,
    kieuDang: "tai thỏ",
    quocGia: "Hoa Kỳ",
    song4G: true,
    song5G: undefined,
    daySac: "typeC",
    dacDiem: "chống nước",
    khuyenMai: null,
    price: BigInt(4500000)
}

// 4. Array: Mảng chứa 1 hoặc nhiều dữ liệu
// - Dữ liệu gồm các loại Number, boolean, string, null, undefined, bigint, object, array
let listUsers = [
    {
        fullname: "A",
        createdAt: "27/7/2020"
    },
    {
        fullname: "B",
        createdAt: "27/7/2020"
    }
]

let _listNumber = [1,5,6,7,8,9,10, undefined, null]

// Phổ biến: forEach, map, filter, find, sort, reverse, push, pop, join
let Numbers = [6,0,1,2,3,4,5,7,8,9,10];

// 1. forEach: Đi qua các phần tử trong mảng
Numbers.forEach(element => {
    console.log(element+5);
});

// 2. map: Đi qua từng phần tử và trả về giá trị là 1 mảng
// Map
var tong = Number.map(function(e){
    return e*2;
})
console.log(tong);

// 3. filter: hàm lọc sẽ trả về các phần tử thoả mãn điều kiện
var filter = Numbers.filter(element => element > 3);
console.log(filter);

// // 3. find: Tìm các phần tử thoả mãn điều kiện và trả về phần tử thoả mãn đầu tiên
var findResult = Numbers.find((element)=> element > 4 );
console.log(findResult);

// // sort: Sắp xếp tăng dần
let result = Numbers.sort();
console.log(result);

// //reverse: Đảo ngược thứ tự phần tử
console.log(Numbers);
let results = Numbers.reverse();
console.log(results);

// // Push: Thêm phần tử và cuối mảng
Numbers.push(11);
console.log(Numbers);

// // Pop: Loại bỏ phần tử cuối cùng
console.log(Numbers);
Numbers.pop();
console.log(Numbers);

// // shift: Loại bỏ phần tử cuối cùng
console.log(Numbers);
Numbers.shift();
console.log(Numbers);

// 5. Function: Chức năng, chương trình nhỏ
// đơn giản
function register(params){ // params: tham số truyền vào
    // nội dung code...

    return params // return: giá trị trả về
}

// arrow function
const register = (params)=>{

    return params
}


// 6. for, while, if else
// while () // điều kiện
//     // noi dung code
// }

// 7. try, catch: giải quyết vấn đề khi chương trình bị lỗi mà vẫn tiếp tục chạy 
try{
    // nội dung code
}
catch(error){
    console.log(error)
}
