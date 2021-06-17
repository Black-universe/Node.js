var express = require('express');
var router = express.Router();

//引入mongoose 模块
let mongoose = require('mongoose');

//链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/mydata', 
{ useNewUrlParser: true, useUnifiedTopology: true });

//获取连接状态
mongoose.connection.on('error', (err) => {
    if (err) { console.log('数据库连接失败'); 
}
})
mongoose.connection.on('open', () => {
    console.log('数据库连接成功');
})
mongoose.connection.on('disconnected', () => {
    console.log('数据库连接断开');
})

// 定义文档形式（Schema）
let predeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sex: String,
    yw: { type: Number },
    sx: { type: Number },
    yy: { type: Number },
});
// 将Schema映射给某个合集
let predeModel = mongoose.model('prede', predeSchema);




/* GET home page. */
//添加
router.get('/add', function(req, res, next) {
    let { name, sex, yw, sx, yy } = req.query;
    predeModel.create({
        name,
        sex,
        yw,
        sx,
        yy
    }, (err) => {
        if (err) console.log(err)
    })
    res.send(req.query);
});
//查询
router.get('/find', function(req, res, next) {
    let { name } = req.query;
    predeModel.find({ name, }, (err, data) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
    })
});
//查询
router.get('/findAll', function(req, res, next) {
    predeModel.find((err, data) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
    })
});
//修改
router.get('/update', function(req, res, next) {
    let { oname, nname, nsex, nyw, nsx, nyy } = req.query;
    predeModel.update({ name: oname }, { $set: { name: nname, sex: nsex, yw: nyw, sx: nsx, yy: nyy } }, (err) => {
        if (err) throw err;
        res.send(req.query);
    })
});
//删除
router.get('/remove', function(req, res, next) {
    let { name } = req.query;
    predeModel.remove({ name }, (err) => {
        if (err) throw err;
        res.send(req.query);
    })
});


module.exports = router;