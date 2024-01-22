//获取系统
var byh = server.registerSystem(0, 0);


//初始化
byh.initialize = function () {    
}


//函数区
//发出消息
function chat (say) {
    var eventData = byh.createEventData("minecraft:display_chat_event");
    eventData.data.message = say;
    byh.broadcastEvent("minecraft:display_chat_event", eventData);
}

// 输出消息至log文件
function log (rizhi) {
    console.log(rizhi);
}

//对象转字符串
function obj (qian) {
    hou = JSON.stringify(qian); 
    return hou;
}

//获取玩家名字
function getPlayerName (a) {
    EntityName = byh.getComponent(a.data.player, "minecraft:nameable")
    byh.playername = EntityName.data.name;
    return byh.playername;  
}
/*
参数 
名字  类型  备注
playername  obj  事件数据
返回值
直接返回玩家名字字符串
*/