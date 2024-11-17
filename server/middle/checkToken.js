// checkToken.js
const jwt = require('jsonwebtoken');

const config = {
  jwtSecretKey: 'xixi',
  expiresIn: '10h'
}

const checkToken = async (ctx, next) => {
  // 跳过不需要验证 token 的路由，如登录或注册
  if (ctx.url === '/user/login' || ctx.url === '/user/register') {
    return next();
  }

  // 获取 Authorization 字段
  const token = ctx.headers['authorization'];

  // 如果没有提供 token
  if (!token) {
    ctx.status = 401; // 未授权
    ctx.body = { message: '登录失败，请重新登录！' };
    return;
  }

  // 去掉 Bearer 前缀，获取真正的 token
  const tokenValue = token.split(' ')[1];

  try {
    // 使用密钥验证 token 的有效性
    const decoded = jwt.verify(tokenValue, config.jwtSecretKey);  // 使用你自己的密钥

    // 如果验证成功，将解码后的用户信息存储到 ctx.state.user 中
    ctx.state.user = decoded;

    // 调用下一个中间件
    await next();
  } catch (err) {
    // 如果 token 验证失败
    ctx.status = 401; // 未授权
    ctx.body = { message: '登陆过期，请重新登录！' };
  }
};

module.exports = checkToken;
