# 音乐播放机函数列表文档

## 全局函数
适用于全局
### uuid()
返回一条UUID
****

## 局部函数1
适用于 wss.on('connection', function connection(ws, req){} 函数内
### cmd(Command)
执行Minecraft指令
\<Command\> 字符串;指令内容，需要加上'/'

****
### log(Log)
向控制台输出一条日志
\<Log\> 字符串;日志内容

****
### chat(Message)
向玩家发送一条普通消息，带发送者'外部'的前缀
\<Message\> 字符串;消息内容

****
### chatf(Message,Name,Color)
向玩家发送一条高级消息
\<Message\> 字符串;消息内容
\<Name\> 字符串;选填;发送者名字
\<Color\> 数字;选填;文字颜色,<font color="#AA000">0 红色</font>;<font color="#FEFE54">1 黄色</font>;<font color="#54FFFF">2 蓝色</font>;<font color="#54FF54">3 绿色</font>.

****
### playsound(Music)
播放音乐
\<Music\> 字符串;音乐名字(SoundPack中定义的ID)

****
### stopsound()
停止播放所有正在播放的音乐

## 局部函数2
适用于 ws.on('message',function (message,wsi){} 函数内
onSay(Message,Callback,Parameter)
玩家发送指定消息时将会触发
\<Message\> 字符串;触发消息.
\<Callback\> 字符串;回调函数名.
\<Parameter\> 任何;选填;回调函数参数.
