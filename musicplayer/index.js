/*** MusicPlayer音乐播放机
 * By 碧月狐dada
 * WebSocket插件
 * 请一定要装载对应的音乐包(资源包)，否则无效果。音乐包制作方法自己拆包或者google.com
 * 对于不懂的请不要乱动↓代码
 * 新增/删除播放音乐的指令请跳转195行查看
 * 如若对WS感兴趣可以用来研究一下，但请尊重原作者，不要做一些不该做的事！
 * ***/
const WebSocketServer = require('ws').Server;
const readline =require('readline');
const rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
  })
const fs = require('fs');
const chinaTime = function() {return null};


//配置
var config = JSON.parse(fs.readFileSync('./data/config.json').toString());

const port = config.port;
const by = '碧月狐dada'
const banben = '1.0.0';


const wss = new WebSocketServer({port:port});  

console.log(chinaTime('YYYY-MM-DD HH:mm:ss'))
console.log('WS作者：' +  by)
console.log('WS版本：' + banben)
console.log('在游戏内输入 /wsserver 127.0.0.1 即可连接')


//uuid获取
function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");   
	return uuid;
}

rl.on('line', function(line){
    switch(line.trim()) {
        case '-end':
            rl.close();
            break;
    }
});


wss.on('connection', function connection(ws, req){

const ClientIp = '127.0.0.1'

ws.send(JSON.stringify(
{
	"body": {
		"eventName": "PlayerMessage"
	},
	"header": {
		"requestId": uuid(),
		"messagePurpose": "subscribe",
		"version": 1,
		"messageType": "commandRequest"
	}
}
));

function cmd (command){
    ws.send(JSON.stringify(
        { 
            "body": { 
                "origin": { 
                    "type": "player" 
                }, 
                "commandLine": command, 
                "version": 1 
            }, 
            "header": { 
                "requestId": uuid(), 
                "messagePurpose": "commandRequest", 
                "version": 1, 
                "messageType": "commandRequest" 
            } 
        }
    ))	
};

function log (rizhi) {
    console.log(rizhi);
}

function chatf (v,n,c) {
    if (c != null) {
        if (c == 0) {
            var c1 = 'c';
        } else if (c == 1) {
            var c1 = 'e';
        } else if (c == 2) {
            var c1 = 'b';
        } else if (c == 3) {
            var c1 = 'a';
        }
    }

    if (v != null && n == null && c == null) {        
        cmd('tellraw @a { \"rawtext\" : [ { \"text\" : \"' + v + '\" } ] }');
    } else if (v != null && n != null && c == null ) {
        cmd('tellraw @a { \"rawtext\" : [ { \"text\" : \"<' + n + '>' + v + '§r\" } ] }');
    } else if (v != null && n == null && c != null) {
        cmd('tellraw @a { \"rawtext\" : [ { \"text\" : \"§' + c1 + v + '\" } ] }');
    } else if (v != null && n != null && c !== null) {
        cmd('tellraw @a { \"rawtext\" : [ { \"text\" : \"<' + n + '>§' + c1 + v + '§r\" } ] }');
    }          
}


rl.on('line', function(line){
    switch(line.trim()) {
		case '-outwss':
			cmd('wsserver out')
			break
        default:
            cmd(line)
            break;
    }
});


chatf('§e\u6B22\u8FCE\u4F7F\u7528§2MusicPlayer§4WebSocket')
chatf('WS\u4F5C\u8005\uFF1A\u78A7\u6708\u72D0dada', null, 3)
chatf('WS\u7248\u672C\uFF1A1.0.0', null, 3)
chatf('\u60A8\u7684IP\u662F ' + ClientIp, null, 2)
chatf('\u73B0\u5728\u5317\u4EAC\u65F6\u95F4\uFF1A' + chinaTime('YYYY-MM-DD HH:mm:ss'), null, 1)
chatf('\u8F93\u5165 */help \u83B7\u53D6\u66F4\u591A')
log('有新的玩家连接到了WS')

//事件返回
ws.on('message',function (message,wsi){
    if(JSON.parse(message).body.eventName=="PlayerMessage" && JSON.parse(message).body.properties.MessageType=="say") {
		var neirong = '[' + chinaTime('YYYY-MM-DD HH:mm:ss') + ']' + JSON.parse(message).body.properties.Sender + " 运行Say指令: " + JSON.parse(message).body.properties.Message;
		log(neirong)
	}
	if(JSON.parse(message).body.eventName=="PlayerMessage" && JSON.parse(message).body.properties.MessageType=="tell") {			
		var neirong = '[' + chinaTime('YYYY-MM-DD HH:mm:ss') + ']' + JSON.parse(message).body.properties.Sender + " 告诉 " + JSON.parse(message).body.properties.Receiver+  " : " + JSON.parse(message).body.properties.Message;
		log(neirong)
	}	
	if(JSON.parse(message).body.eventName=="PlayerMessage" && JSON.parse(message).body.properties.MessageType=="chat") {			
		var neirong = '[' + chinaTime('YYYY-MM-DD HH:mm:ss') + ']' + JSON.parse(message).body.properties.Sender + " 说: " + JSON.parse(message).body.properties.Message;
		log(neirong)
	}	

	function onSay (n,callack,canshu1,canshu2,canshu3) {	
		if(JSON.parse(message).body.eventName=="PlayerMessage" && JSON.parse(message).body.properties.MessageType=="chat") {		
			var Sender = JSON.parse(message).body.properties.Sender;
			var Message = JSON.parse(message).body.properties.Message;
			if (Message == n && Sender != '外部') {
				callack(canshu1,canshu2,canshu3);
			}
			return Sender, Message;
		}
	}


	function playsound (music) {
		cmd('stopsound @a');
		cmd('playsound ' + music + '@a');
		chatf('[播放机]§e正在为您播放 §5' + music + '§6.ogg §eIng...');
	}

	function stopsound () {
		cmd('stopsound @a')
		chatf('[播放机]§2已为您关闭所有播放中的音乐');
	}

    /* 指令区 */
	onSay('*/help',chatf,'§2--- WebSocket指令帮助页 ---§r\n*/help §7- 显示WebSocket指令帮助页§r\n*/about §7- 关于信息§r\n*/musicplayer §7- 显示关于音乐播放机的信息§r')
	onSay('*/about',chatf,'WS作者：' +  by + '\nWS版本：' + banben + '\n您的IP是 ' + ClientIp)
	onSay('*/musicplayer',chatf,'§2--- MusicPlayer音乐播放机 ---§r\n停止播放 §7- 停止播放所有正在播放的音乐§r\n播放 <歌名>§7- 播放指定音乐§r\n§2小提示:请一定要装载对应的音乐包(资源包)，否则无效果')

	onSay('停止播放',stopsound) /* 停止播放音乐指令 */
	onSay('播放 病名为爱',playsound,'bmwa')
	onSay('播放 打上火花',playsound,'dshh')
	onSay('播放 Alone',playsound,'alone')
	onSay('播放 心做',playsound,'xz')
	onSay('播放 oldmemory',playsound,'oldmemory')
    /* 格式：onSay('游戏内触发消息',playsound,'需要播放的音乐的名字(在音乐包中配置的ID)') */
	
})
});

rl.on('close', function() {
    console.log('bye bye');
    process.exit(0);
});