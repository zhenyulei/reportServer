const router = require('koa-router')()
const { getProjectData , saveProjectData, getProjectAllData,getAllProData,getAllUserData } = require("../control/index.js");

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


router.get('/getAllProData', async (ctx, next) => {
  let resData = await getAllProData();
  ctx.body = resData;
})

router.get('/getAllUserData', async (ctx, next) => {
  let resData = await getAllUserData();
  ctx.body = resData;
})


router.get('/currVersion', async (ctx, next) => {
  ctx.body = {
    "currVersion":"1.0.0"
  };
})

module.exports = router
