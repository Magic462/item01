/**
* 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
*/

const db = require('../db/index')

// 封装数据库查询函数
function queryDatabase(sql, params, callback) {
    db.query(sql, params, function (err, results) {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
}


//评论功能的封装
exports.comment = (req, res) => {
    console.log(req.body);
}