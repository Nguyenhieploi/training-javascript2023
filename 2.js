// API
// Fetch

var myHeaders = new Headers(); // khởi tạo headers
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjQ0YjlkZWM5NThiMTQ5NWY5MTNjNmIwIiwidGltZXN0YW1wIjoxNjkyODgwNzY5MDY5fSwiaWF0IjoxNjkyODgwNzY5LCJleHAiOjE3MjM5ODQ3Njl9.FPVnFdFvAPDMau7c0L2GO_xzjaoLkSZ48xI0ZsiKbwU"
);
myHeaders.append("otp-token-phone", "value");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
};

// fetch(
//   "http://localhost:9002/v1/statistics/chart-users-register",
//   requestOptions
// )
//   .then(async (response) => {
//     let data = await response.text()
//     console.log(data)
//   }) // then là để lấy dữ liệu
//   .catch((error) => {
//     console.log("error", error)
//   }) // catch để bắt lỗi

// async function run() {
//   try {
//     let response = await fetch(
//       "http://localhost:9002/v1/statistics/chart-users-register",
//       requestOptions
//     );
//     console.log(response.status)
//     if (response.status >= 400){
//       console.log("error", await response.text())
//     }
//     else{
//       console.log(await response.text());
//     }
//   } catch (error) {
//     console.log("error", error);
//   }
// }
// run();

// DEMO mockapi.io

// async function createPost({name, view }) {
//   try {
//     let data = { name, view }
//     let response = await fetch(
//       "https://613b9431110e000017a456c5.mockapi.io/api/v1/post",
//       {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       }
//     );
//     console.log("status: ", response.status);
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// createPost({
//   name: "bai post 1",
//   view: 1,
// });

// async function updatePost({id, name, view }) {
//   try {
//     let data = {name, view }
//     let response = await fetch(
//       `https://613b9431110e000017a456c5.mockapi.io/api/v1/post/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       }
//     );
//     console.log("status: ", response.status);
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// updatePost({
//   id: 1,
//   name: "bai post 1",
//   view: 999,
// });

// async function deletePost({id }) {
//   try {
//     let response = await fetch(
//       `https://613b9431110e000017a456c5.mockapi.io/api/v1/post/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     console.log("status: ", response.status);
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// deletePost({
//   id: 1,
// });

// async function getListPost() {
//   try {
//     let response = await fetch(
//       `https://613b9431110e000017a456c5.mockapi.io/api/v1/post`,
//       {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     console.log("status: ", response.status);
//     let dataString = await response.text()
//     let dataArray = JSON.parse(dataString)
//     console.log(dataArray)
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// getListPost();

async function getDetailPost({id}) {
  try {
    let response = await fetch(
      `https://613b9431110e000017a456c5.mockapi.io/api/v1/post/${id}`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("status: ", response.status);
    let dataString = await response.text()
    console.log(dataString)
    let dataObject = JSON.parse(dataString)
    console.log(dataObject)
    console.log(dataObject.name)
  } catch (error) {
    console.log("error", error);
  }
}

getDetailPost({
  id: 2
});
