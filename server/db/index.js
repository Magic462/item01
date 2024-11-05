// 导入 mysql 模块
const mysql = require('mysql2')

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'project_01',
})

// 测试连接池
pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool:', err);
      return;
    }
    console.log('Connected to MySQL pool successfully');
    // 执行一个简单的查询以验证连接
    connection.query('SELECT 1 + 1 AS solution', (error, results) => {
      // 释放连接
      connection.release();
      if (error) {
        console.error('Error executing query:', error);
        return;
      }
    });
  });

// 向外共享 连接池连接对象
module.exports = pool;