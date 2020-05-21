const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')
const logger = require('koa-logger')

// 开始链接
function handleConnect(){
    const con = mysql.createConnection(MYSQL_CONF)
    //连接断开，重新连接
    con.on('error',function(err){
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            //logger.error('db error 执行重新连接：'+err.message);
            handleConnect();
        }else{
            throw err;
        }
    })
    
    con.connect(function(err){
        if(err){// 连接错误2s后重试
            setTimeout(handleConnect,2000)
        }
    });
    return con;
}

// 统一执行 sql 的函数
function exec(sql) {
    const connect = handleConnect();
    const promise = new Promise((resolve, reject) => {
        connect.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec
}