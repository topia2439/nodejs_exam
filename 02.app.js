const express = require('express');
const app = express();
const path = require('path');

var sample = '';

/* web server 구현 */
app.listen(3000, function() {
    console.log('http;//127.0.0.1:3000');
    console.log(path.join(__dirname, "./public"));
});

/*정적 Router */
app.use(function(req, res, next) {
    sample = "SAMPLE";
    next()
});
app.use(express.json()); // 모든 req를 순회하면서 json으로 변경해줌(post는 json 타입임)
app.use(express.urlencoded({ extended: false })); //form요소 접근해줌 ,use : 미들웨어 사용 의미
app.use("/", express.static(path.join(__dirname, "./public"))); // 루트 폴더를 public으로 설정함

/* Router 구현 */
app.get("/root", function(req, res, next) {
    res.send('<h1>Hello World' + sample + '</h1>');
})

app.get("/query", function(req, res, next) {
    var name = req.query.name;
    res.send('<h1>Hello World' + name + '</h1>');
})

app.get("/param/:name", function(req, res, next) {
    var name = req.params.name;
    res.send('<h1>Hello World' + name + '</h1>')
})

app.post("/board/save", function(req, res, next) {
    const { title, content } = req.body; //const title = req.body.title; const content = req.body.content; 와 같음
    req.send(title + '<br>' + content);
});