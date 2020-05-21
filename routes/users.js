const router = require('koa-router')()
const { getUserInfo } = require("../control/index.js");

router.prefix('/api/users')

router.post('/userLogin', async function (ctx, next) {
  const {userErp,userPassWord} = ctx.request.body;
  let currData = await getUserInfo(userErp,userPassWord);
  if(currData.length>0){
    ctx.body = {
      "userName":currData[0].userName,
      "userErp":currData[0].userErp,
      "userGroup":currData[0].userGroup,
      "success":true
    };
  }else{
    ctx.body = {
      "success":false
    };
  }
})
module.exports = router
