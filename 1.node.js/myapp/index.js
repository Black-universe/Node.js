// 引入
let express = require('express');
let app = express();

app.get('/',(req,res)=>{res.send('hello word');})
// 端口号
app.listen(10086,()=>{
    console.log('http://localhost:10086');
});
