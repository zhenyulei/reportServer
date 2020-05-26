const router = require('koa-router')()
const { getUserInfo,getUserInfoTime } = require("../control/index.js");

router.prefix('/api/users')

router.post('/userLogin', async function (ctx, next) {
  const {userErp,userPassWord} = ctx.request.body;
  let currData = await getUserInfo(userErp,userPassWord);
  if(currData.length>0){
    ctx.body = {
      "userName":currData[0].userName,
      "userErp":currData[0].userErp,
      "userGroup":currData[0].userGroup,
      "isLeader":currData[0].isLeader,
      "success":true,
      "currTimer":currData[0].currTime
    };
  }else{
    ctx.body = {
      "success":false
    };
  }
})

router.post('/getUserInfoTime', async function (ctx, next) {
  const {userGroup} = ctx.request.body;
  let currData = await getUserInfoTime(userGroup);
  if(currData.length>0){
    ctx.body = currData;
  }else{
    ctx.body = {
      "success":false
    };
  }
})


module.exports = router
