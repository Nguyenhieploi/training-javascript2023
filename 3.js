// Xử lý bất đồng bộ

// 1. Bất đồng bộ là gì
// Bật đồng bộ là không tuần tự, không đợi dòng code trước đó chạy xong
// console.log("lan 1")
// setTimeout(() => {
//     console.log("lan 2")
// }, 3000);
// console.log("lan 3")

// 2. Đồng bộ là gì
// Đồng bộ là có tuần tự, chạy code từng dòng

// console.log("lan 1")
// console.log("lan 2")
// console.log("lan 3")

// 3. Xử lý bất động như thế nào

// function alert1() {
//   console.log("alert 1");
// }

// // Promise
function alert1() {
  setTimeout(() => {
    console.log("alert 1");
  }, 1000);
}

function alert2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("alert 2");
      resolve(true);
    }, 5000);
  });
}

function alert3() {
  console.log("alert 3");
  return true;
}
function alert4() {
    console.log("alert 4");
      
}
function alert5() {
  console.log("alert 5");
    
}
// async / await
async function run() {
  alert1();
  alert3();
  alert4();
  alert5();
  await alert2();
}

run();
