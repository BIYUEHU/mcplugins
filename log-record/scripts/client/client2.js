/*
 * ©2020
 * 在GitHub开源
 * 仅供参考
 * 严禁盗版抄袭
 */

/*
 更新日志：
 新增24种监听事件(23种服务端事件,1种客户端事件)
 共计40+种结果
 */

//获取系统
let byh = client.registerSystem(0, 0);

//初始化
byh.initialize = function () {
  //自定义事件
  byh.registerEventData("byh:jinrushijie", { player: null });

  //玩家进入世界时触发
  byh.listenForEvent("minecraft:client_entered_world", function (byhevent) {
    //触发修改并广播自定义事件以与服务端建立通信
    let eventData = byh.createEventData("byh:jinrushijie");
    eventData.data.player = byhevent.data.player;
    byh.broadcastEvent("byh:jinrushijie", eventData);

    //执行其余相关函数
    rizhi();
    jiaruyouxi();
  });
};

//函数区
//发出消息
function chat(say) {
  let eventData = byh.createEventData("minecraft:display_chat_event");
  eventData.data.message = say;
  byh.broadcastEvent("minecraft:display_chat_event", eventData);
}

//log开关
function rizhi() {
  let eventData = byh.createEventData("minecraft:script_logger_config");
  eventData.data.log_information = true; //脚本常规信息
  eventData.data.log_errors = true; //脚本错误信息
  eventData.data.log_warnings = true; //脚本警告信息
  byh.broadcastEvent("minecraft:script_logger_config", eventData);

  var logkg = eventData.data.log_information;
  if ((logkg = true)) {
    chat("客户端LOG已开启");
    console.log("客户端LOG已开启");
  } else if ((logkg = false)) {
    chat("客户端LOG未打开");
    console.log("客户端LOG未打开");
  } else {
    chat("客户端LOG错误");
    console.log("客户端LOG错误");
  }
}

// 输出消息至log文件
function log(rizhi) {
  console.log(rizhi);
}

//事件区
function jiaruyouxi() {
  var neirong = "有新的玩家加入了游戏";
  chat(neirong);
  log(neirong);
}

//更新
byh.update = function () {};

//退出
byh.shutdown = function () {
  log("客户端行为记录已结束");
};
