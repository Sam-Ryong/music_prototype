const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 80;

app.use(express.static("public")); // public 디렉토리에 있는 웹 페이지 파일을 호스팅
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log(req.body.note);
  axios
    .post("localhost:443", {
      note: req.body.note,
    })
    .then((response) => {
      console.log("응답:", response.data);
    })
    .catch((error) => {
      console.error("에러:", error);
    });
  res.send("ok");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
