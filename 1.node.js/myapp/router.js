// 引入
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
// get
app.get('/',(req,res)=>{ 
    console.log(req.query)
    res.send('hello word');
});

app.use(bodyParser.urlencoded({
    extended: false 
   }));

   app.use(bodyParser.json());

// 拿到前端提交上来的数据
// 需要使用一个中间件函数  body-parser
app.post('/register',(req,res)=>{ 
 




// 1.安装 body-parser
// 2.引入
// 3.解析数据
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({  extended: false     }))
   

 
 // parse application/json
// app.use(bodyParser.json())

// 4.req.body 获取数据

console.log(req.body);
res.send('post_over');
});

// 端口号
app.listen(10086,()=>{
    console.log('http://localhost:10086');
});


