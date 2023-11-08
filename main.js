const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static("public")); // public 디렉토리에 있는 웹 페이지 파일을 호스팅
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log(req.body.note);
  io.emit("note", req.body.note);
  res.send("ok");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("클라이언트와 소켓 연결이 성공했습니다.");

  // 클라이언트로부터 메시지를 받으면 다른 클라이언트에게 전달
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  // 클라이언트와의 소켓 연결 해제
  socket.on("disconnect", () => {
    console.log("클라이언트와의 소켓 연결이 해제되었습니다.");
  });
});

server.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
