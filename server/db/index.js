// 导入 mysql 模块
const mysql = require('mysql2/promise');


//创建连接池
// const db = mysql.createPool({
//   host: '192.168.1.163',
//   user: 'skkka',
//   password: '689689',
//   database: 'item_01',
// })
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'item_01',
});
// 测试连接池
async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Connected to MySQL pool successfully');

    // 执行一个简单的查询以验证连接
    const [results] = await connection.query('SELECT 1 + 1 AS solution');

    console.log('Query result:', results);

    // 释放连接
    connection.release();
  } catch (err) {
    console.error('Error getting connection from pool or executing query:', err);
  }
}

// 调用测试连接的函数
testConnection();

// 向外共享连接池连接对象
module.exports = db;
