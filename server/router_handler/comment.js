/**
* 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
*/

const db = require('../db/index')



//评论功能的封装
exports.comment = (req, res) => {
    const comment = req.body;

    // 确保请求体存在并包含 userName 属性
    if (!comment || !comment.userName) {
        return res.status(400).json({ message: '缺少 userName 字段' });
    }

    const sql = `SELECT * FROM comment WHERE userName=?`;
    db.query(sql, comment.userName, function (err, results) {
        if (err) {
            console.error('数据库查询错误:', err);
            return res.status(500).json({ message: '服务器内部错误', error: err.message });
        }
        if (results.length > 0) {
            console.log('查询结果:', results);
            return res.json(results);
        } else {
            return res.status(404).json({ message: '没有找到相关评论' });
        }
    });
};