/*
    Đây là function tạo coint, mỗi lần tạo coin sẽ mất thời gian từ 2s đến 10s
    hãy viết chương trình khi người dùng click tạo coin liên tục thì số lượng coin được cộng vào 
    và in ra thông báo 1 cách tuần tự từng lượt cộng
*/
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  let coin = 0
  
  function createCoin(amount) {
    const randomInRange = getRandomNumber(2, 10);
    setTimeout(() => {
      coin += amount
          console.log("Bạn được +",amount," coin")
    }, randomInRange);
  }