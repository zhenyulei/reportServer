const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF
//production
//dev
if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'a13472057682',
        port: '3306',
        database: 'myreport',
        useConnectionPooling: true
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: '39.106.194.136',
        user: 'root',
        password: 'Aa13472057682!',
        port: '3306',
        database: 'myreport',
        useConnectionPooling: true
    }
}

module.exports = {
    MYSQL_CONF
}