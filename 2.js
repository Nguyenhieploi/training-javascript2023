// API
// Fetch

var myHeaders = new Headers(); // khởi tạo headers
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjQ0YjlkZWM5NThiMTQ5NWY5MTNjNmIwIiwidGltZXN0YW1wIjoxNjkyODgwNzY5MDY5fSwiaWF0IjoxNjkyODgwNzY5LCJleHAiOjE3MjM5ODQ3Njl9.FPVnFdFvAPDMau7c0L2GO_xzjaoLkSZ48xI0ZsiKbwU",
)
myHeaders.append("otp-token-phone", "value")

var requestOptions = {
  method: "GET",
  headers: myHeaders,
};

fetch(
  "http://localhost:9002/v1/statistics/chart-users-register",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
