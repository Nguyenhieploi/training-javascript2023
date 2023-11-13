/*
    Bài 1: Tìm Max và Min: Viết một hàm nhận một mảng số và trả về giá trị lớn nhất và nhỏ nhất trong mảng.
*/
var numbers = [1,2,3,4,5];

console.log("số lớn nhất",Math.max(...numbers)); 
console.log("số nhỏ nhất",Math.min(...numbers));
console.log(...numbers); 

/*
    Bài 2: Định Dạng Tiền Tệ: Viết một hàm nhận một số và định dạng nó thành chuỗi tiền tệ, ví dụ: formatCurrency(5000) trả về "$5,000.00".
*/
// function formatCurrency(price){
//     var formatUSD = new Intl.NumberFormat('en-US',{
//         style: 'currency',
//         currency: 'USD',
//     })
//     console.log(formatUSD.format(price));
// }
// formatCurrency(2500)


/*
    Bài 5 Kiểm Tra Mảng Tăng Dần: Viết một hàm kiểm tra xem một mảng số có được sắp xếp tăng dần không.
*/
// var numbers = [1,2,3,4,5];

// function checkNumber(numbers){
//     for(var i = 0; i < numbers.length; i++){  
//         if(numbers[i] > numbers[i + 1]){ // nếu phần tử hiên tai lớn hơn phần tử tiep theo 
//             return false;
//         }
//     }
//     return true;
// }
// var checkNumber = checkNumber(numbers);
// if(checkNumber === true ){
//     console.log("đây là mảng tăng dần");
// }else{
//     console.log("Khong phải mảng tăng dần");
// }

/*
    Bài 4: Viết một hàm nhận các hệ số a, b, và c của một phương trình bậc hai (ax^2 + bx + c = 0) 
    và trả về nghiệm của phương trình.
*/
// function quadratic(a,b,c){
//     if(a === 0){
//         if(b === 0 ){
//             if(c === 0){
//                 console.log("phương trình vô số nghiệm");
//             }
//             else{
//                 console.log("Phương trình vô nghiệm");
//             }

//         }else{
//             var x = -c/b;
//             console.log("Nghiệm là:" + x);
//         }

//     }else{
//         dt = b*b - 4*a*c;
//         if(dt < 0){
//             console.log("Phương trình vô nghiệm");
//         }else if(dt == 0){
//             var x = -b / (2*a);
//             console.log("Phương trình có nghiệm kép x =" , x);
//         }else{
//             var x1 = (-b + Math.sqrt(dt)) / (2*a);
//             var x2 = (-b - Math.sqrt(dt)) / (2*a);
//             console.log("Phương trình có hai nghiệm phân biệt là x1 =" + x1, "x2 = " +x2);
//         }
//     }
       
// }
    
    
// quadratic(1,-2,1);

/*
    Bài 3:Kiểm Tra Mảng Đối Xứng:** Viết một hàm kiểm tra xem một mảng có phải là mảng đối xứng hay không.
*/

// function symmetryCheck(){
//             // 0  1  2     -2   -1   0   
//     var arr = [66,77,88,99,88,77,66];
//     var sums = 0
//     for(var i = 0 ; i <= 2; i++){
//         // console.log(i); // index 0 1 2 
//         // console.log(arr[i]); // value 66 77 88
//         // console.log(arr[arr.length-i-1]); 
//         if(arr[i] === arr[arr.length-i-1]){
//             sums+= 1
//         }
//     }
    
//     if(sums === 3 ){
//         console.log("mảng đói xứng");
//     }else{
//         console.log("kh đối xứng");
//     }
// }

// symmetryCheck();

