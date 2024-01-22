
ServeRobot-MC里的聊天机器人

是否也曾想过，在MC里玩QQ里的聊天机器人?确实，自己也曾写过QQ机器人插件，两者从原理上讲是差不多的;所有功能都并非是某些人做的那种关键词回复，QQ机器人的大部分功能都是通过调用HttpApi实现的，而本插件也是如此;但论不同之处，确实有的，QQ机器人调用API后表达出来(也就是发消息)可以通过文字、图片、视频等方式，只不过在MC里现在只能是纯文字了
这个lxl插件也是相当于把自己之前做的QQ机器人插件的功能全部重写了一遍

功能列表:
#<>内包的是参数，所有内容发的时候都不用但空格，“<>”也不用带只带参数，-后面的是功能说明
签到-每日可签到，将奖励一定的money，money类型默认llmoney，配置看下面
​报时
哔哩<BV号>-查询视频信息
查云黑<XboxID>-API来自BlackBe
!motdpe<IP:端口>-查询MCBE服务器状态
关于插件-插件信息和用到的API列表都在这,自己看
子菜单:
站长工具:
ping<URL>
收录查询<URL>
网站测速<URL>
词条系统:
一言、网抑云、毒鸡汤、土味情话、舔狗日记、精神语录、骂人宝典
日常工具:
AI聊天-功能说明而已,只需要发送井号"#"+说的话即可与AI聊天,词库来自小爱
黄历
查字<字>
查天气<城市>-只支持中国的省或市级城市
查翻译<内容>-支持中英互译
查疫情<城市>-只支持中国的省或市级城市
查垃圾分类<内容>

直接在游戏内发出关键词即可
用的人多,评分多,功能会更新更多~

配置文件说明
路径：plugins//serverobot/config.json
[CODE=json]{
    "robotmenu": "ServerRobot菜单:\n签到\n报时\n哔哩<BV号>\n查云黑<XboxID>\n!motdpe<IP:Port>\n关于插件\n\n子菜单:\n站长工具\n词条系统\n日常工具",
        //发送“菜单”后显示的内容
    "robotname": "§bSR机器人",//机器人名字
    "textcolor": "§d",//机器人发的消息文字默认显示
    "function": {//功能开关
        "AI": true,//AI聊天
        "sign": true,//签到
        "nowtime": true,//报时
        "bili": true,//哔哩
        "blackbe": true,//查云黑
        "motdpe": true,//motdpe
        "tool": {
            "websider": true,//站长工具
            "texts": true,//词条系统
            "daylong": true,//日常工具
            "?????????": false
        }
    },
    "other": {
        "giftmode": 0,//每日签到后Money发送的方式，0为llmoney，1为计分板经济
        "gift": 25//Money数量
    }
}[/CODE]
不要直接复制，去掉注释