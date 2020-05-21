# reportServer
日报系统服务端代码

```js
use myreport;
select * from prouser;
insert into prouser (userErp,userName,userPassword,userGroup,isLeader) values ('yangkaixuan5','杨凯旋','123456','1','0');
SET SQL_SAFE_UPDATES = 0;
delete from prouser where id='1';
```