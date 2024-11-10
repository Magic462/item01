// const db = require('../db/index')
// // const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')//导入jsonwebtoken包
// const config = {
//     jwtSecretKey: 'xixi', // 用于加密的密钥
//     expiresIn: '10h' // Token 过期时间
// };

// //根据用户名重复还是电话重复？
// //要做bcrypt加密
// //注册
// exports.register = (req, res) => {
//     const userinfo = req.body
//     console.log(req.body);

//     //注册用户
//     const sqlStr = 'select * from userlist where username=?'
//     db.query(sqlStr, userinfo.username, (err, results) => {
//         if (err) {
//             console.error('数据库查询错误:', err);
//             return res.status(500).json({ message: '服务器内部错误', error: err.message });
//         }
//         if (results.length > 0) {
//             console.log('用户名已被占用，请更换用户名');
//             return res.status(409).send('用户名已被占用，请更换用户名')
//         }

//         //增加数据
//         const sql = 'insert into userlist set ?'
//         db.query(sql, { username: userinfo.username, password: userinfo.password,confirmpassword:userinfo.confirmpassword,phone:userinfo.phone }, (err, results) => {
//             if (err) {
//                 return res.status(500).json({message: err.message })
//             }
//             if (results.affectedRows !== 1) { return res.status(400).json({ message: '注册用户失败，请稍后再试' }) }
//             // 注册成功，返回状态 200（成功）
//             return res.status(200).json({ message: '注册成功' });
//         })
//         })
// }



// //使用bcrypt加密后重新修改密码的比较
// //登录
// exports.login = (req, res) => {
//     const userinfo = req.body;

//     // 查询数据库以获取用户信息
//     const sqlStr = 'SELECT * FROM userlist WHERE username = ?';
//     db.query(sqlStr, userinfo.username, (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: '服务器内部错误', error: err.message });
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ message: '用户不存在' });
//         }

//         // 直接比较明文密码
//         if (userinfo.password === results[0].password) {
//             // 密码匹配，生成用户对象
//             const user = {
//                 id: results[0].id, // 从查询结果中获取用户 ID
//                 username: results[0].username // 从查询结果中获取用户名
//             };

//             // 生成 JWT
//             const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn });

//             // 返回成功响应
//             return res.status(200).json({
//                 status: 0,
//                 message: '登录成功！',
//                 token: 'Bearer ' + tokenStr,
//             });
//         } else {
//             // 密码不匹配
//             return res.status(401).json({ message: '密码错误' });
//         }
//     });
// }

const db = require('../db/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // for password hashing
const config = {
    jwtSecretKey: 'xixi',
    expiresIn: '10h'
};

// Register function
// exports.register = async (ctx) => {
//     const userinfo = ctx.request.body;

//     // Check for existing username
//     const sqlStr = 'SELECT * FROM userlist WHERE username=?';
//     const [rows] = await db.query(sqlStr, [userinfo.username]).catch((err) => {
//         console.error('数据库查询错误:', err);
//         ctx.status = 500;
//         ctx.body = { message: '服务器内部错误', error: err.message };
//         return [];
//     });
//     if (rows.length > 0) {
//         ctx.status = 409;
//         ctx.body = { message: '用户名已被占用，请更换用户名' };
//         return;
//     }

//     // Hash password before storing
//     const hashedPassword = await bcrypt.hash(userinfo.password, 10);
//     const sql = 'INSERT INTO userlist SET ?';
//     const newUser = {
//         username: userinfo.username,
//         password: hashedPassword,
//         confirmpassword: userinfo.confirmpassword,
//         phone: userinfo.phone
//     };

//     const [result] = await db.query(sql, newUser).catch((err) => {
//         ctx.status = 500;
//         ctx.body = { message: err.message };
//     });
//     if (result.affectedRows === 1) {
//         ctx.status = 200;
//         ctx.body = { message: '注册成功' };
//     } else {
//         ctx.status = 400;
//         ctx.body = { message: '注册用户失败，请稍后再试' };
//     }
// };

exports.register = async (ctx) => {
    const userinfo = ctx.request.body;

    try {
        // 检查用户名是否已存在
        const sqlStr = 'SELECT * FROM userlist WHERE username=?';
        const [rows] = await db.query(sqlStr, [userinfo.username]);

        if (rows.length > 0) {
            ctx.status = 409;
            ctx.body = { message: '用户名已被占用，请更换用户名' };
            return; // 直接返回，避免继续执行
        }

        // 在存储之前哈希密码
        const hashedPassword = await bcrypt.hash(userinfo.password, 10);
        const sql = 'INSERT INTO userlist SET ?';
        const newUser = {
            username: userinfo.username,
            password: hashedPassword,
            // confirmpassword: userinfo.confirmpassword,
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


// Login function
// exports.login = async (ctx) => {
//     const userinfo = ctx.request.body;

//     // Query user by username
//     const sqlStr = 'SELECT * FROM userlist WHERE username = ?';
//     const [rows] = await db.query(sqlStr, [userinfo.username]).catch((err) => {
//         ctx.status = 500;
//         ctx.body = { message: '服务器内部错误', error: err.message };
//         return [];
//     });
//     if (rows.length === 0) {
//         ctx.status = 404;
//         ctx.body = { message: '用户不存在' };
//         return;
//     }

//     const user = rows[0];

//     // Compare password
//     const validPassword = await bcrypt.compare(userinfo.password, user.password);
//     if (!validPassword) {
//         ctx.status = 401;
//         ctx.body = { message: '密码错误' };
//         return;
//     }

//     // Generate JWT token
//     const tokenStr = jwt.sign({ id: user.id, username: user.username }, config.jwtSecretKey, { expiresIn: config.expiresIn });

//     ctx.status = 200;
//     ctx.body = {
//         status: 0,
//         message: '登录成功！',
//         token: 'Bearer ' + tokenStr,
//     };
// };


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
        };
    } catch (err) {
        console.error('数据库操作错误:', err); // 记录错误
        ctx.status = 500; // 设置状态码
        ctx.body = { message: '服务器内部错误', error: err.message }; // 返回错误信息
    }
};
