const fs = require("fs");
const path = require("path");
let projectPath = null;
if(process.env.NODE_ENV == "dev"){
    projectPath = path.resolve(__dirname,"../data/report.json");
}else{
    projectPath = path.resolve(__dirname,"./myReport.json");
}
const projectData = require(projectPath);
const userData = require("../data/userInfo.json");


const getProjectData  = async (currErp)=>{
    if(projectData[currErp]){
        return projectData[currErp];
    }else{
        return []
    }
}
function saveProjectData(newData){
    let erp = newData[0].proErp;
    projectData[erp] = newData;
    fs.writeFile(projectPath,JSON.stringify(projectData),err=>{
        if(err) return {"success":"false"}
        return {
            "success":"true"
        }
    })    
}

const getProjectAllData  = async (currErp)=>{
    try{
        let useInfo = userData.find((item)=>{
            return item.erp == currErp;
        });
        if(useInfo.level>1){
            let resArr = [];
            for(let key in projectData){
                for(let i in projectData[key]){
                    resArr.push(projectData[key][i]);
                }
            }
            return resArr;
        }else{
            return projectData[currErp];
        }
    }catch(e){
        return [];
    }
}
//判断登陆是否正确
const isLogin  = async (useErp,usePassWord)=>{
    return userData.filter((item)=>{
        if(item.erp == useErp && item.password == usePassWord){
            return item;
        }
    });
    
}


module.exports = {
    getProjectData,
    saveProjectData,
    getProjectAllData,
    isLogin
}