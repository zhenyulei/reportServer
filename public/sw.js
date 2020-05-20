var cacheName = 'helloPwa1'; //缓存的名称                
self.addEventListener('install', event => { //安装
  //确保 Service Worker 不会在 waitUntil() 里代码执行完毕之前安装完成。
  event.waitUntil( 
    
  );
});
