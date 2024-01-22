//获取系统 
var byh = client.registerSystem(0, 0);

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


//打开UI
function start_ui (a) {
    var eventData = byh.createEventData("minecraft:load_ui");
    eventData.data.path = a;
    byh.broadcastEvent("minecraft:load_ui", eventData);
}

//关闭UI
function stop_ui (b) {
    var eventData = byh.createEventData("minecraft:unload_ui");
    eventData.data.path = b;
    byh.broadcastEvent("minecraft:unload_ui", eventData);
}