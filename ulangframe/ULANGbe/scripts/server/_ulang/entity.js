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

//获取实体信息
function getEntityInformation (a) {
    if (a.data.entity != undefined) {
        byh.entity = a.data.entity;
        return byh.entity;
    } else if (a.data.player != undefined) {
        byh.entity = a.data.player;  
        return byh.entity;
    }
}
/* 
参数 
名字  类型  备注
entitydada  obj  事件数据
返回值
名字  类型  默认值  备注
__type__  str  entity  类型(方块/物品/实体..)
__identifier__  str    标识符
id  num    实体ID 
*/

//获取实体类型
function getEntityInformation (a) {
    if (a.data.entity != undefined) {
        byh.entity = a.data.entity;
        return byh.entity;
    } else if (a.data.player != undefined) {
        byh.entity = a.data.player;  
        return byh.entity.__type__;
    }
}

//获取实体标识符
function getEntityInformation (a) {
    if (a.data.entity != undefined) {
        byh.entity = a.data.entity;
        return byh.entity;
    } else if (a.data.player != undefined) {
        byh.entity = a.data.player;  
        return byh.entity.__identifier__;
    }
}
//获取实体数字ID
function getEntityInformationNmuId (a) {
    if (a.data.entity != undefined) {
        byh.entity = a.data.entity;
        return byh.entity;
    } else if (a.data.player != undefined) {
        byh.entity = a.data.player;  
        return byh.entity.id;
    }
}

//获取实体名字
function getEntityName (a) {
    EntityName = byh.getComponent(a.data.player, "minecraft:nameable")
    byh.entityname = EntityName.data.name;
    return byh.entityname;  
}
/*
参数 
名字  类型  备注
entitydada  obj  事件数据
返回值
直接返回实体名字字符串
*/