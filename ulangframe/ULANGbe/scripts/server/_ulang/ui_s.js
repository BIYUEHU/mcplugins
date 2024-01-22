//获取系统
var byh = server.registerSystem(0, 0);

//初始化
    byh.initialize = function () {
}


//函数区
//发出消息
function chat (say) {
    var eventData = byh.createEventData("minecraft:display_chat_event");
    eventData.data.message = say
    byh.broadcastEvent("minecraft:display_chat_event", eventData);
}

// 输出消息至log文件
function log (rizhi) {
    console.log(rizhi);
}

//执行指令
function cmd (f) {
    var eventData = byh.createEventData("minecraft:execute_command");
    eventData.data.command = f;
    byh.broadcastEvent("minecraft:execute_command", eventData);
}

//对象转字符串
function obj (qian) {
    hou = JSON.stringify(qian); 
    return hou;
}


/* 
function startui (event) {
    blockid = getBlockInformation(event).__identifier__;
    itemid = getItemInformation(event).__identifier__;

    if (blockid == 'minecraft:yellow_glazed_terracotta') {
        //点击（左键）方块打开UI
        // var byhData = byh.createEventData("byh:start_betaui0");
        // byhData.data = event.data;
        // byh.broadcastEvent("byh:start_betaui0", byhData); 
    } else if (blockid == 'minecraft:red_glazed_terracotta') {
        // var byhData = byh.createEventData("byh:start_betaui1");
        // byhData.data = event.data;
        // byh.broadcastEvent("byh:start_betaui1", byhData); 
    } else if (itemid == 'minecraft:apple') {
        //物品点击（左键）打开UI
        var byhData = byh.createEventData("byh:start_jieshaoui");
        byhData.data = event.data;
        byh.broadcastEvent("byh:start_jieshaoui", byhData); 
    } else if (itemid == 'minecraft:book') {
        // var byhData = byh.createEventData("byh:start_wenjuanui");
        // byhData.data = event.data;
        // byh.broadcastEvent("byh:start_wenjuanui", byhData); 
    } else {
        // chat('空');
    } 
} */