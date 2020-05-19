const router = require('koa-router')()
const { getProjectData , saveProjectData, getProjectAllData } = require("../control/index.js");

router.prefix('/api/project');

//获取当前登陆人的数据
router.post('/getPersonData', async (ctx, next) => {
  const {currErp} = ctx.request.body;
  let currData = await getProjectData(currErp);
  ctx.body = currData;
})

//保存当前登陆人的数据
router.post('/submitData', async (ctx, next) => {
  const {currData} = ctx.request.body;
  let resData = await saveProjectData(currData);
  ctx.body = {
    "success":true
  };
})

//保存当前登陆人的数据
router.post('/lookData', async (ctx, next) => {
  const {currErp} = ctx.request.body;
  let resData = await getProjectAllData(currErp);
  ctx.body = resData;
})

module.exports = router
