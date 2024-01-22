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

//获取物品信息
function getItemInformation (a) {
    itemInformation = byh.getComponent(a.data.player, "minecraft:hand_container")
    byh.item = itemInformation.data[0]
    return byh.item;
}
/*
参数
名字  类型  备注
eventdada  obj  事件数据
返回值
名字  类型  默认值  备注
__type__  str  item  类型(方块/物品/实体..)
__identifier__  str    标识符
count  str    数量  
*/

//获取物品类型
function getItemInformationType (a) {
    itemInformation = byh.getComponent(a.data.player, "minecraft:hand_container")
    byh.item = itemInformation.data[0]
    return byh.item.type;
}

//获取物品标识符
function getItemInformationID (a) {
    itemInformation = byh.getComponent(a.data.player, "minecraft:hand_container")
    byh.item = itemInformation.data[0]
    return byh.item.__identifier__;
}

//获取物品数量
function getItemInformationCount (a) {
    itemInformation = byh.getComponent(a.data.player, "minecraft:hand_container")
    byh.item = itemInformation.data[0]
    return byh.item.count;
}