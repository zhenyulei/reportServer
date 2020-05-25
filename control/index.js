const fs = require("fs");
const path = require("path");
const { exec } = require('../db/mysql');
const WesSocket = require('ws');
var wss = new WesSocket.Server({port:3344})
var mysw = null;
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        mysw = ws;
        console.log('server: received: %s', message);//接受客户端的信息
    });
   
});
/*
数据库信息
表：myproject——用来存放日报数据
"id":"null", //自动增加填写
"proName":"",//需求名称
"proBg":"",//需求背景
"proPlan":"",//计划排期
"proProgress":"",//目前进度
"proProblem":"",//现有问题
"proWork":"",//今日工作
"proPerson":"",//需求研发人，可以修改
"userName":this.userName,    //当前登陆人的名字
"userGroup":'0',            //当前登陆人的分组
"userErp":""     //当前登陆人，不允许修改
"isShow":"1",              //是否删除标志
----------------------------
表：prouser——用来存放用户信息数据
"userErp":"xxx",
"userName":"xxx",
"userPassword":"xxx",
"userGroup":"1"//所属分组
"isLeader":"0"//是否为小组长，可以查看全组数据
*/


//获取数据
const getProjectData  = async (userErp)=>{
    // 选择当前登陆人的data
    let sql = `select * from myproject where userErp='${userErp}' and isShow=1`;
    let projectData = await exec(sql);
    return projectData;
}

//保存数据
const saveProjectData =  async(newData) => {
    mysw.send(newData[0].userName);
    newData.map( async(item)=>{
        let {addFlag,id,userErp,proName,proBg,proPlan,proProgress,proProblem,proWork,proPerson,userName,userGroup} = item;
        try{
            if(addFlag){//说明是新数据
                let sql = `insert into myproject (userErp,proName,proBg,proPlan,proProgress,proProblem,proWork,proPerson,userName,userGroup) values ('${userErp}','${proName}','${proBg}','${proPlan}','${proProgress}','${proProblem}','${proWork}','${proPerson}','${userName}','${userGroup}')`;
                let insertData = await exec(sql);
                return insertData.insertId;//插入的ID是1
            }else{
                let sql = `update myproject set  userErp='${userErp}',proName='${proName}',proBg='${proBg}',proPlan='${proPlan}',proProgress='${proProgress}',proProblem='${proProblem}',proWork='${proWork}',proPerson='${proPerson}',userName='${userName}',userGroup='${userGroup}' where id='${id}'`;
                let updateData = await exec(sql);//更新浏览数据
                return updateData.affectedRows;//影响的数据是1
            }
        }catch(e){
            console.log(e)
            return 0;
        }   
    }) 
}

//删除数据
const deleteProject = async(id)=>{
    try{
        let sql = `update myproject set isshow='0' where id='${id}'`;
        let updateData = await exec(sql);
        if(updateData.affectedRows>0){
            return updateData.affectedRows
        }else{
            return 0;
        }
    }catch(err){
        return 0;
    }
}

//获取用户信息
const getUserInfo  = async (userErp,userPassWord)=>{
    // 选择当前登陆人的data
    let sql = `select * from prouser where userErp='${userErp}' and userPassWord=${userPassWord}`;
    try {
        let projectData = await exec(sql);
        return projectData;
    } catch (error) {
        return [];
    }

}

//查看日报
const lookProjectData  = async (userErp)=>{
    let sql = `select * from prouser where userErp='${userErp}'`
    let userInfo = await exec(sql);
    if(userInfo[0].userErp === "root"){
        let sql0 = `select * from myproject`;
        let lookData = await exec(sql0);
        return lookData;
    }else if(userInfo[0].isLeader == 1){
        let sql1 = `select * from myproject where userGroup='${userInfo[0].userGroup}' and isShow=1`;
        let lookData = await exec(sql1);
        return lookData;
    }else{
        let sql2 = `select * from myproject where userErp='${userInfo[0].userErp}' and isShow=1`;
        let lookData = await exec(sql2);
        return lookData;
    }
}



module.exports = {
    lookProjectData,
    deleteProject,
    getUserInfo,
    getProjectData,
    saveProjectData
}
