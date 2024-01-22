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

//获取方块信息
function getBlockInformation (a) {
    var {ticking_area} = byh.getComponent(a.data.player, "minecraft:tick_world").data;
    byh.block = byh.getBlock(ticking_area, a.data.block_position);
    return byh.block;
}
/*
参数 
名字  类型  备注
entitydada  obj  事件数据
返回值
名字  类型  默认值  备注
__type__  str  block  类型(方块/物品/实体..)
__identifier__  str    标识符
block_position  obj    坐标
  x  str    X轴坐标
  Y  str    Y轴坐标
  Z  str    Z轴坐标
ticking_area  obj  用于常加载区块对象获取此方块
*/

//获取方块类型
function getBlockInformationType (a) {
    var {ticking_area} = byh.getComponent(a.data.player, "minecraft:tick_world").data;
    byh.block = byh.getBlock(ticking_area, a.data.block_position);
    return byh.block.type;
}

//获取方块标识符
function getBlockInformationID (a) {
    var {ticking_area} = byh.getComponent(a.data.player, "minecraft:tick_world").data;
    byh.block = byh.getBlock(ticking_area, a.data.block_position);
    return byh.block.__identifier__;
}

//获取方块坐标
function getBlockInformationPos (a) {
    var {ticking_area} = byh.getComponent(a.data.player, "minecraft:tick_world").data;
    byh.block = byh.getBlock(ticking_area, a.data.block_position);
    return byh.block.block_position;
}