const db = require('../db/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // for password hashing

const config = {
    jwtSecretKey: 'xixi',
    expiresIn: '10h'
}

exports.register = async (ctx) => {
    const userinfo = ctx.request.body;

    try {

        // 检查用户名是否已存在
        const sqlStr1 = 'SELECT * FROM userlist WHERE username=?';
        const [rows1] = await db.query(sqlStr1, [userinfo.username]);

        if (rows1.length > 0) {
            ctx.status = 409;
            ctx.body = { message: '用户名已被占用，请更换用户名' };
            return; // 直接返回，避免继续执行
        }

        const sqlStr2 = 'SELECT * FROM userlist WHERE phone=?';
        const [rows2] = await db.query(sqlStr2, [userinfo.phone]);

        if (rows2.length > 0) {
            ctx.status = 408;
            ctx.body = { message: '手机号已经注册过，请更换手机号' };
            return; // 直接返回，避免继续执行
        }
        // 在存储之前哈希密码
        const hashedPassword = await bcrypt.hash(userinfo.password, 10);
        const sql = 'INSERT INTO userlist SET ?';
        const newUser = {
            username: userinfo.username,
            password: hashedPassword,
            confirmpassword: userinfo.confirmpassword,
            phone: userinfo.phone
        };

        const [result] = await db.query(sql, newUser);

        if (result.affectedRows === 1) {
            ctx.status = 200;
            ctx.body = { message: '注册成功' };
        } else {
            ctx.status = 400;
            ctx.body = { message: '注册用户失败，请稍后再试' };
        }
    } catch (err) {
        console.error('数据库操作错误:', err); // 记录错误
        ctx.status = 500; // 设置状态码
        ctx.body = { message: '服务器内部错误', error: err.message }; // 返回错误信息
    }
};


exports.login = async (ctx) => {
    const userinfo = ctx.request.body;

    try {
        // 根据用户名查询用户
        const sqlStr = 'SELECT * FROM userlist WHERE username = ?';
        const [rows] = await db.query(sqlStr, [userinfo.username]);

        if (rows.length === 0) {
            ctx.status = 404;
            ctx.body = { message: '用户不存在' };
            return; // 直接返回，避免继续执行
        }

        const user = rows[0];

        // 比较密码
        const validPassword = await bcrypt.compare(userinfo.password, user.password);
        if (!validPassword) {
            ctx.status = 401;
            ctx.body = { message: '密码错误' };
            return;
        }

        // 生成 JWT token
        const tokenStr = jwt.sign({ id: user.id, username: user.username }, config.jwtSecretKey, { expiresIn: config.expiresIn });

        ctx.status = 200;
        ctx.body = {
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr,
            userid: user.id
        };
    } catch (err) {
        console.error('数据库操作错误:', err); // 记录错误
        ctx.status = 500; // 设置状态码
        ctx.body = { message: '服务器内部错误', error: err.message }; // 返回错误信息
    }
};
