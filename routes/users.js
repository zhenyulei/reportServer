const router = require('koa-router')()
const { isLogin } = require("../control/index.js");

router.prefix('/api/users')

router.post('/userLogin', async function (ctx, next) {
  const {useErp,usePassWord} = ctx.request.body;
  let currData = await isLogin(useErp,usePassWord);
  if(currData.length>0){
    ctx.body = {
      "userName":currData[0].userName,
      "userErp":currData[0].erp,
      "success":true
    };
  }else{
    ctx.body = {
      "success":false
    };
  }
  
})


module.exports = router
