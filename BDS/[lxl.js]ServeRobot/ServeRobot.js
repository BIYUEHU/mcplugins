const MainPath = "./plugins/biyuehu/serverobot/";
const version = "1.0.0";
var _SHOW_ERROR_INFO = true
loading();

var Config = JSON.parse(File.readFrom(MainPath + "config.json"))
var robotmenu = Config.robotmenu + '\nByBIYUEHU';
var robotname = '§r<' + Config.robotname + '§r>';
var textcolor = Config.textcolor;
var giftmode = Config.other.giftmode;
var gift = Config.other.gift.toString();

var AI = Config.function.AI;
var sign = Config.function.sign;
var nowtime = Config.function.nowtime;
var bili = Config.function.bili;
var blackbe = Config.function.blackbe
var motdpe = Config.function.motdpe;
var websider = Config.function.tool.websider;
var texts = Config.function.tool.texts;
var daylong = Config.function.tool.daylong;
var cqb = Config.function.cqb;
var cqbr = Config.function.cqbr;

// mc.regPlayerCmd("rb","Server Robot", (pl,args) => robot(pl,args), 0);
mc.listen("onChat", (pl, args) => robot(pl, args));

function apiget (url) {    
    function backs (status,result) {
            if (status == 200) {
                var back = robotname + textcolor + result;
            } else {
                var back = robotname + textcolor + "API访问失败";
            }
            return back;
    }
    url = url;
    return network.httpGet(url,(status,result) => backs(status,result));
    
}

function chatf (message) {
    mc.runcmd("tellraw @a { \"rawtext\" : [ { \"text\" : \"" + message + "\" } ] }");
}

function robot (pl,args) {    
    try {
        // log("[Chat]"," ","<SR机器人>"," ","");
    }
    catch (exception) {
        if(_SHOW_ERROR_INFO) throw exception;        
    }

    var _GET = args;
    if (_GET.slice(0,1) == "#" && AI == true) {
        network.httpGet("http://82.157.165.201/api/xiaoai.php?msg=" + _GET.slice(1) + "&n=text",(status,result) => {
            if (status == 200) {
                back = robotname + textcolor + result;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })
    } else if (_GET.slice(0,2) == "菜单") {
        back = robotname + textcolor + robotmenu;
        chatf(back);
    } else if (_GET.slice(0,2) == "报时" && nowtime == true) {
        network.httpGet("https://api.iyk0.com/rili/",(status,result) => {
            if (status == 200) {
                NTO = system.getTimeObj();
                NongLi = result;
                back = robotname + textcolor + `北京时间:${NTO.Y}年${NTO.M}月${NTO.D}日 ${NTO.h}时${NTO.m}分${NTO.s}秒\n${NongLi}`;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })        
    } else if (_GET.slice(0,2) == "签到" && sign == true) {
        ToDay = system.getTimeObj();
        hasTag = pl.hasTag(`robot_sign_${ToDay.M}-${ToDay.M}-${ToDay.D}`);
        if (hasTag == false) {
            if (giftmode == 0) {
                mc.runcmd("money add \"" + pl.name + "\" " + gift);
            } else if (giftmode == 1) {
                mc.runcmd("scoreboard players add \"" + pl.name + "\" money " + gift);
            } else {
                pl.tell("ServerRobot 配置文件错误!请告知服务器相关人员");
            }
            mc.runcmd("tag \"" + pl.name + "\" add robot_sign_" + ToDay.M + "-" + ToDay.M + "-" + ToDay.D);
            back = robotname + textcolor + "@" + pl.name + " 签到成功！ +" + gift + "Money 奖励已发放";
        } else {
            back = robotname + textcolor + "今天您已签到，明天再试试吧！";
        }
        chatf(back);
    } else if (_GET.slice(0,2) == "哔哩" && bili == true) {
        var bv = _GET.slice(2);
        
        network.httpGet("https://api.bilibili.com/x/web-interface/view?bvid=" + bv,(status,result) => {
            if (status == 200) {
                json = JSON.parse(result);
                code = json.code;
                if (code == 0) {
                    data = json.data;
                    av = data.aid;
                    fenlei = data.tname;
                    title = data.title;
                    ctime = data.ctime;
                    desc = data.desc;
                    uid = data.owner.mid;
                    upname = data.owner.name;

                    back = robotname + textcolor + `B站视频信息:\nBV号:${bv}\n对应AV号:${av}\n分类:${fenlei}\n时间戳:${ctime}\n标题:${title}\n简介:${desc}\nUP:${upname}\nUID:${uid}`;
                } else {
                    back = robotname + textcolor + `找不到视频`;
                } 
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })
    } 

    else if (_GET.slice(0,2) == "一言") {
        network.httpGet("http://82.157.165.201/api/yan.php",(status,result) => {
            if (status == 200) {
                back = robotname + textcolor + result;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })
    } else if (_GET.slice(0,2) == "黄历") {
        network.httpGet("http://82.157.165.201/api/huang.php",(status,result) => {
            if (status == 200) {
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })
    } else if (_GET.slice(0,2) == "查字") {       
        nei = _GET.slice(2);
        
        network.httpGet("http://82.157.165.201/api/search.php?msg=" + nei,(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })      
    }

    else if (_GET.slice(0,3) == "查云黑" && blackbe == true) {
        id = _GET.slice(3);
        
        network.httpGet("https://api.blackbe.xyz/api/check?v3=true&id=" + id,(status,result) => {
            if (status == 200) {       
                json = JSON.parse(result);
                code = json.message;
                if (code == "存在违规行为") {
                    data = json.data;
                    level = data.level;
                    level = level.toString()
                    qq = data.qq;
                    server = data.server
        
                    back = robotname + textcolor + `玩家存在违规行为\nID:${id}\n云黑等级:${level}\nQQ:${qq}\n违规服务器:${server}`;
                } else {
                    back = robotname + textcolor + `玩家无违规行为`;
                }
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    }     
    else if (_GET.slice(0,3) == "网抑云") {
        network.httpGet("https://api.oddfar.com/yl/q.php?encode=text&c=2010",(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } else if (_GET.slice(0,3) == "毒鸡汤") {
        network.httpGet("https://api.oddfar.com/yl/q.php?encode=text&c=1007",(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } else if (_GET.slice(0,3) == "查天气") {
        nei = _GET.slice(3);
        
        network.httpGet("http://82.157.165.201/api/weather.php?msg=" + nei + "&type=1",(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } else if (_GET.slice(0,3) == "查翻译") {
        nei = _GET.slice(3);
        
        network.httpGet("http://82.157.165.201/api/fanyi2.php?msg=" + nei,(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } else if (_GET.slice(0,3) == "查疫情") {
        nei = _GET.slice(3);
       
        network.httpGet("http://82.157.165.201/api/yq.php?msg=" + nei,(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })
    }
    
    else if (_GET.slice(0,4) == "关于插件") {
        back = robotname + textcolor + `§l§c关于插件:\n插件作者:BIYUEHU(碧月狐DADA)\n插件版本:1.0.0\n关于HttpAPI:\n大部分API来源于作者自己的API站(http://82.157.165.201)\n云黑API来自http://https://blackbe.xyz/\n部分词条系统功能的API来自https://api.oddfar.com/;`;
        chatf(back);
    } else if (_GET.slice(0,4) == "站长工具" && websider == true) {
        back = robotname + textcolor + `站长工具:\nping<URL>\n收录查询<URL>\n网站测速<URL>\nByBIYUEHU`;
        chatf(back);
    } else if (_GET.slice(0,4) == "收录查询") {
        url = _GET.slice(4);
        
        network.httpGet("http://82.157.165.201/api/site.php?url=" + url,(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } else if (_GET.slice(0,4) == "网站测速") {
        url = _GET.slice(4);
        
        network.httpGet("http://82.157.165.201/api/cs.php?url=" + url,(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } else if (_GET.slice(0,4) == "ping") {
        url = _GET.slice(4);
        
        network.httpGet("http://82.157.165.201/api/ping.php?url=" + url,(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } 
    
    else if (_GET.slice(0,4) == "日常工具" && daylong == true) {
        back = robotname + textcolor + `日常工具:\nAI聊天\n黄历\n查字<字>\n查天气<城市>\n查翻译<中/英文>\n查疫情<城市>\n查垃圾分类<内容>\nByBIYUEHU`;
        chatf(back);
    } else if (_GET.slice(0,4) == "AI聊天") {
        back = robotname + textcolor + `#聊天内容 以进行聊天`;
        chatf(back);
    //    
    }else if (_GET.slice(0,4) == "历史今天") {
        network.httpGet("http://82.157.165.201/api/lishi.php",(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } 
    
    else if (_GET.slice(0,4) == "词条系统" && texts == true) {
        back = robotname + textcolor + `词条系统:\n一言\n网抑云\n毒鸡汤\n土味情话\n舔狗日记\n精神语录\n骂人宝典\nByBIYUEHU`;   
        chatf(back);   
    //  
    } else if (_GET.slice(0,4) == "土味情话") {
        network.httpGet("https://api.oddfar.com/yl/q.php?encode=text&c=1002",(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } else if (_GET.slice(0,4) == "舔狗日记") {
        network.httpGet("https://api.oddfar.com/yl/q.php?encode=text&c=1006",(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } else if (_GET.slice(0,4) == "精神语录") {
        network.httpGet("https://api.oddfar.com/yl/q.php?encode=text&c=1002",(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } else if (_GET.slice(0,4) == "骂人宝典") {
        network.httpGet("https://api.oddfar.com/yl/q.php?encode=text&c=1009",(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } 
    
    else if (_GET.slice(0,5) == "查垃圾分类") {
        nei = _GET.slice(5);
        
        network.httpGet("http://82.157.165.201/api/laji.php?msg=" + nei,(status,result) => {
            if (status == 200) {       
                back = robotname + textcolor + result;;
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })     
    } else if (_GET.slice(0,7) == "!motdpe" && motdpe == true) {
        ip_port = (_GET.slice(7)).split(":");
        ip = ip_port[0];
        port = ip_port[1];;

        network.httpGet("http://82.157.165.201/api/motdpe.php?ip=" + ip + "&port=" + port,(status,result) => {
            if (status == 200) {       
                json = JSON.parse(result);
                code = json.code;
                if (code == 200) {
                    motd = json.motd;
                    agreement = json.agreement;
                    mcversion = json.version;
                    online = json.online;
                    max = json.max;
                    gamemode = json.gamemode;
        
                    back = robotname + textcolor + `MCBE服务器信息查询:\nIP/域名:${ip}\n端口:${port}\nMotd:${motd}\n协议版本:${agreement}\n游戏版本:${mcversion}\n在线玩家:${online}/${max}\n游戏模式:${gamemode}`;
                } else {
                    back = robotname + textcolor + `服务器不在线!`;
                }
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        })
    } else if (_GET.slice(0,3) == "查Q绑" && pl.name == cqbr && cqb == "114514") {
        qq = _GET.slice(3);
        
        network.httpGet("https://zy.xywlapi.cc/qqcx?qq=" + qq,(status,result) => {
            if (status == 200) {          
                json = JSON.parse(result);
                code = json.status;
                if (code == 200) {
                    phone = json.phone;
                    phonediqu = json.phonediqu;
                    qqlm = json.lm;
        
                    back = robotname + textcolor + `查询成功\nQQ:${qq}\n电话:${phone}\n地区:${phonediqu}\nQQ老密:${qqlm}`;
                } else if (code == 500) {
                    back = robotname + textcolor + `没有找到`;
                } else {
                    back = robotname + textcolor + `查询失败`;
                }
            } else {
                back = robotname + textcolor + "失败";
            }
            chatf(back);
        }) 
    }
}

function loading () {
    log(`[HULI] ServeRobot By BIYUEHU`);
    log(`[HULI] ServeRobot Version ${version}`);
    var ConfigIs = File.exists(MainPath);
    if (ConfigIs != true) {
        File.createDir(MainPath);
        File.writeTo(MainPath + "config.json", "{\"robotmenu\":\"ServerRobot菜单:\\n签到\\n报时\\n哔哩<BV号>\\n查云黑<XboxID>\\n!motdpe<IP:Port>\\n关于插件\\n\\n子菜单:\\n站长工具\\n词条系统\\n日常工具\",\"robotname\":\"§bSR机器人\",\"textcolor\":\"§d\",\"function\":{\"AI\":true,\"sign\":true,\"nowtime\":true,\"bili\":true,\"blackbe\":true,\"motdpe\":true,\"tool\":{\"websider\":true,\"texts\":true,\"daylong\":true,\"?????????\":false}},\"other\":{\"giftmode\":0,\"gift\":25}}")
        log('[HULI] ServeRobot插件文件夹未创建，已自动创建!');
    }
}
