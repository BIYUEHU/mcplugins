ByBIYUEHU
Blog:https://biyuehu.github.io
赞助:http://82.157.165.201/tool/data/dashang/

Login-四种强大功能
1.登录密码
/login <password/密码> 登录游戏
/setpass <newpassword/新密码> <oldpassword/旧密码> 设置密码
即进入游戏时玩家必须输入登录密码，默认60s后未登录成功则踢出游戏并记录日志，防止出现XBOX号被盗这种极少可能存在的情况
经过服务器内成员反馈，可自行设置一定时间内进入游戏无需输入登录密码，默认3小时内，超时则需重新登录
第一次进入服务器的玩家为默认密码，默认的默认密码为114514
插件内密码的变量均会先toBase64
2.玩家信息记录
记录文件:BDS\plugins\biyuehu\login\data\
记录玩家名字、真名、UUID、XUID、设备、系统、IP、登录密码，且IP自动调用httpAPI查找并记录物理地址与运营商
HttpAPI:https://wanghun.top/api/yh/v2/ipip.php
/quedata <playername/玩家名字> 查询玩家信息,OP可用
​如果认为涉及玩家隐私可在插件内设置为控制台可用亦或直接删除指令
3.登录时间间隔
进入服务器自动告诉玩家距离上次进入服务器间隔时间，时间差算法自写的，在时间跨度大时会有意想不到的bug
间隔＜3min则显示在刚刚，第一次进入则显示第一次进入服务器
4.XUID验证
第一次进入会记录玩家名字与XUID，用于防止toolbox等其它方式设置假名字
当下次有相同名字玩家进入服务器时，若该玩家XUID与记录的XUID不匹配则踢出游戏并记录日志
5.日志&配置文件
日志路径:BDS\logs\biyuehu\login\
配置文件:BDS\plugins\biyuehu\login\config.json