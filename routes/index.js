const router = require('koa-router')();
router.prefix('/api/project');
const { getProjectData , saveProjectData, deleteProject,lookProjectData } = require("../control/index.js");

//获取当前登陆人的数据
router.post('/getPersonData', async (ctx, next) => {
  const {userErp} = ctx.request.body;
  let currData = await getProjectData(userErp);
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

//查看数据
router.post('/lookData', async (ctx, next) => {
  const {userErp} = ctx.request.body;
  let resData = await lookProjectData(userErp);
  ctx.body = resData;
})

//删除数据
router.post('/deleteData', async (ctx, next) => {
  const {id} = ctx.request.body;
  let resData = await deleteProject(id);
  ctx.body = resData;
})

//获取当前版本
router.get('/currVersion', async (ctx, next) => {
  ctx.body = {
    "currVersion":"1.0.1"
  };
})


module.exports = router
