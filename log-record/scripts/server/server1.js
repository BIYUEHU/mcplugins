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
let byh = server.registerSystem(0, 0);

//初始化
byh.initialize = function () {
  /*自定义事件
   *用于客户端与服务端相互通信
   */
  byh.registerEventData("byh:shijian1", { player: null });

  byh.registerEventData("byh:shijian2", { player: null });

  byh.registerEventData("byh:shijian3", { player: null });

  //自带事件
  byh.listenForEvent("minecraft:block_interacted_with", hudong);

  byh.listenForEvent("minecraft:block_destruction_started", kaishipohuai);

  byh.listenForEvent("minecraft:block_destruction_stopped", tingzhipohuai);

  byh.listenForEvent("minecraft:player_placed_block", fangzhi);

  byh.listenForEvent("minecraft:player_destroyed_block", pohuai);

  byh.listenForEvent("minecraft:piston_moved_block", huoshai);

  byh.listenForEvent("minecraft:entity_carried_item_changed", shouchiwu);

  byh.listenForEvent("minecraft:entity_dropped_item", diuchuwuping);

  byh.listenForEvent("minecraft:entity_acquired_item", huodewuping);

  byh.listenForEvent("minecraft:entity_equipped_armor", zhuangjia);

  byh.listenForEvent("minecraft:entity_use_item", shiyongwuping);

  byh.listenForEvent("minecraft:entity_death", siwang);

  byh.listenForEvent("minecraft:entity_start_riding", qicheng);

  byh.listenForEvent("minecraft:entity_start_riding", tingzhiqicheng);

  byh.listenForEvent("minecraft:block_exploded", baozha);

  byh.listenForEvent("minecraft:entity_sneak", xingzou);

  byh.listenForEvent("minecraft:entity_attack", gongji);

  byh.listenForEvent("minecraft:projectile_hit", jizhong);

  byh.listenForEvent("minecraft:entity_hurt", shanghai);

  byh.listenForEvent("minecraft:weather_changed", tianqi);

  byh.listenForEvent("minecraft:entity_definition_event", shijian);

  byh.listenForEvent("minecraft:play_sound", yinyue);

  byh.listenForEvent("byh:jinrushijie", function () {
    rizhi();
    jinrushijie1();
    jinrushijie2();
    jinrushijie3();
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
    chat("服务端LOG已开启");
    console.log("服务端LOG已开启");
  } else if ((logkg = false)) {
    chat("服务端LOG未打开");
    console.log("LOG未打开");
  } else {
    chat("服务端LOG错误");
    console.log("服务端LOG错误");
  }
}

// 输出消息至log文件
function log(rizhi) {
  console.log(rizhi);
}

//执行指令
function cmd(f) {
  let eventData = byh.createEventData("minecraft:execute_command");
  eventData.data.command = f;
  byh.broadcastEvent("minecraft:execute_command", eventData);
}

//对象转字符串
function obj(qian) {
  hou = JSON.stringify(qian);
  return hou;
}

//播放音乐
function play_sound(a, b, c, d) {
  let eventData = byh.createEventData("minecraft:play_sound");
  eventData.data.pitch = a; //音高，小数
  eventData.data.volume = b; //音量，小数
  eventData.data.position = c; //坐标，数组
  eventData.data.sound = d; //音乐标识符，字符串
}
//事件区
function hudong(event) {
  x = event.data.block_position.x;
  y = event.data.block_position.y;
  z = event.data.block_position.z;
  var neirong =
    "minecraft:player 在 " + x + ", " + y + ", " + z + " 处互动方块";

  chat(neirong);
  log(neirong);
}

function kaishipohuai(event) {
  x = event.data.block_position.x;
  y = event.data.block_position.y;
  z = event.data.block_position.z;

  var neirong =
    "minecraft:player 在 " + x + ", " + y + ", " + z + " 处开始破坏方块";
  chat(neirong);
  log(neirong);
}

function tingzhipohuai(event) {
  x = event.data.block_position.x;
  y = event.data.block_position.y;
  z = event.data.block_position.z;

  var neirong =
    "minecraft:player 在 " + x + ", " + y + ", " + z + " 处停止破坏方块";
  chat(neirong);
  chat(neirong);
}

function fangzhi(event) {
  x = event.data.block_position.x;
  y = event.data.block_position.y;
  z = event.data.block_position.z;

  var neirong =
    "minecraft:player 在 " + x + ", " + y + ", " + z + " 处放置了一个方块";
  chat(neirong);
  log(neirong);
}

function pohuai(event) {
  x = event.data.block_position.x;
  y = event.data.block_position.y;
  z = event.data.block_position.z;

  var neirong =
    "minecraft:player 在 " + x + ", " + y + ", " + z + " 处破坏了一个方块";
  chat(neirong);
  log(neirong);
}

function huoshai(event) {
  if (event.data.piston_action == "extended") {
    if (event.data.block_position != undefined) {
      x = event.data.block_position.x;
      y = event.data.block_position.y;
      z = event.data.block_position.z;
      x1 = event.data.piston_position.x;
      y1 = event.data.piston_position.y;
      z1 = event.data.piston_position.z;
      dongzuo = event.data.piston_action;

      var neirong =
        x1 +
        ", " +
        y1 +
        ", " +
        z1 +
        " 处的活塞 " +
        "推动(" +
        dongzuo +
        ") 了 " +
        x +
        ", " +
        y +
        ", " +
        z +
        " 处的方块";
      chat(neirong);
      log(neirong);
    } else {
      x1 = event.data.piston_position.x;
      y1 = event.data.piston_position.y;
      z1 = event.data.piston_position.z;
      dongzuo = event.data.piston_action;

      var neirong =
        x1 + ", " + y1 + ", " + z1 + " 处的活塞 " + "推动(" + dongzuo + ") 了 ";
      chat(neirong);
      log(neirong);
    }
  } else {
    if (event.data.block_position != undefined) {
      x = event.data.block_position.x;
      y = event.data.block_position.y;
      z = event.data.block_position.z;
      x1 = event.data.piston_position.x;
      y1 = event.data.piston_position.y;
      z1 = event.data.piston_position.z;
      dongzuo = event.data.piston_action;

      var neirong =
        x1 +
        ", " +
        y1 +
        ", " +
        z1 +
        " 处的活塞 " +
        "缩回(" +
        dongzuo +
        ") 了 " +
        x +
        ", " +
        y +
        ", " +
        z +
        " 处的方块";
      chat(neirong);
      log(neirong);
    } else {
      x1 = event.data.piston_position.x;
      y1 = event.data.piston_position.y;
      z1 = event.data.piston_position.z;
      dongzuo = event.data.piston_action;

      var neirong =
        x1 + ", " + y1 + ", " + z1 + " 处的活塞 " + "缩回(" + dongzuo + ") 了 ";
      chat(neirong);
      log(neirong);
    }
  }
}

function shouchiwu(event) {
  if (
    event.data.previous_carried_item.item != "minecraft:undefined" &&
    event.data.carried_item.item != "minecraft:undefined"
  ) {
    entity = event.data.entity.__identifier__;
    xianzai = event.data.carried_item.item;
    zhiqian = event.data.previous_carried_item.item;

    var neirong = entity + " 的手持物从 " + zhiqian + " 改变成了 " + xianzai;
    chat(neirong);
    log(neirong);
  } else if (event.data.previous_carried_item.item == "minecraft:undefined") {
    entity = event.data.entity.__identifier__;
    xianzai = event.data.carried_item.item;

    var neirong =
      entity + " 的手持物从 " + "minecraft:air" + " 改变成了 " + xianzai;
    chat(neirong);
    log(neirong);
  } else {
    entity = event.data.entity.__identifier__;
    zhiqian = event.data.previous_carried_item.item;

    var neirong =
      entity + " 的手持物从 " + zhiqian + " 改变成了 " + "minecraft:air";
    chat(neirong);
    log(neirong);
  }
}

function diuchuwuping(event) {
  if (event.data.item_stack.item != "minecraft:undefined") {
    item = event.data.item_stack.item;
    entity = event.data.entity.__identifier__;

    var neirong = entity + " 丢出了 " + item;
    chat(neirong);
    log(neirong);
  } else {
    entity = event.data.entity.__identifier__;

    var neirong = entity + " 丢出了 " + "minecraft:air";
    chat(neirong);
    log(neirong);
  }
}

function huodewuping(event) {
  if (event.data.item_stack.item != "minecraft:undefined") {
    item = event.data.item_stack.item;
    entity = event.data.entity.__identifier__;

    var neirong = entity + " 获得了 " + item;
    chat(neirong);
    log(neirong);
  } else {
    entity = event.data.entity.__identifier__;

    var neirong = entity + " 获得了 " + "minecraft:air";
    chat(neirong);
    log(neirong);
  }
}

function zhuangjia(event) {
  if (event.data.item_stack.item != "minecraft:undefined") {
    item = event.data.item_stack.item;
    caowei = event.data.slot;
    entity = event.data.entity.__identifier__;

    var neirong = entity + " 在 " + caowei + "槽位 装上了 " + item + " 装备";
    chat(neirong);
    log(neirong);
  } else {
    caowei = event.data.slot;
    entity = event.data.entity.__identifier__;

    var neirong = entity + " 取下了 " + caowei + " 槽位 的装备 ";
    chat(neirong);
    log(neirong);
  }
}

function shiyongwuping(event) {
  entity = event.data.entity.__identifier__;
  item = event.data.item_stack.item;
  fangshi = event.data.use_method;

  var neirong = entity + " 正在使用 " + item + " 使用方式: " + fangshi;
  chat(neirong);
  log(neirong);
}

function siwang(event) {
  if (event.data.killer != undefined) {
    yuanyin = event.data.cause;
    entity = event.data.entity.__identifier__;
    shashou = event.data.killer.__identifier__;

    var neirong = entity + " 被 " + shashou + " 杀死了 死因: " + yuanyin;
    chat(neirong);
    log(neirong);
  } else {
    yuanyin = event.data.cause;
    entity = event.data.entity.__identifier__;

    var neirong = entity + " 死亡了 死因: " + yuanyin;
    chat(neirong);
    log(neirong);
  }
}

function qicheng(event) {
  zhu = event.data.entity.__identifier__;
  bei = event.data.ride.__identifier__;

  var neirong = zhu + " 正在骑乘 " + bei;
  chat(neirong);
  log(neirong);
}

function tingzhiqicheng(event) {
  if (event.data.entity_is_being_destroyed == true) {
    zhu = event.data.entity.__identifier__;
    yuanyin = event.data.entity_is_being_destroyed;

    var neirong =
      zhu +
      " 停止了对实体进行骑乘 原因: " +
      "被骑者已经死亡" +
      "(" +
      yuanyin +
      ")";
    chat(neirong);
    log(neirong);
  } else if (event.data.exit_from_rider == true) {
    zhu = event.data.entity.__identifier__;
    yuanyin = event.data.exit_from_rider;

    var neirong =
      zhu +
      " 停止了对实体进行骑乘 原因: " +
      "骑手自行决定停止骑乘" +
      "(" +
      yuanyin +
      ")";
    chat(neirong);
    log(neirong);
  } else {
    zhu = event.data.entity.__identifier__;
    yuanyin = event.data.switching_rides;

    var neirong =
      zhu +
      " 停止了对实体进行骑乘 原因: " +
      "骑手正在骑另一个实体" +
      "(" +
      yuanyin +
      ")";
    chat(neirong);
    log(neirong);
  }
}

function baozha(event) {
  block = event.data.block_identifier;
  x = event.data.block_position.x;
  y = event.data.block_position.y;
  z = event.data.block_position.z;
  yuanyin = event.data.cause;
  entity = event.data.entity.__identifier__;

  var neirong =
    block +
    " 在 " +
    x +
    ", " +
    y +
    ", " +
    z +
    " 处 因为 " +
    yuanyin +
    " 被 " +
    entity +
    "破坏";
  chat(neirong);
  log(neirong);
}

function xingzou(event) {
  if (event.data.sneaking == true) {
    entity = event.data.entity.__identifier__;
    zhuangtai = event.data.sneaking;

    var neirong = entity + " 正在 潜行" + "(" + zhuangtai + ")";
    chat(neirong);
    log(neirong);
  } else {
    entity = event.data.entity.__identifier__;
    zhuangtai = event.data.sneaking;

    var neirong = entity + " 退出了 潜行" + "(" + zhuangtai + ")";
    chat(neirong);
    log(neirong);
  }
}

function gongji(event) {
  entity = event.data.entity.__identifier__;
  target = event.data.target.__identifier__;

  var neirong = entity + " 对 " + target + " 发动了攻击";
  chat(neirong);
  log(neirong);
}

function jizhong(event) {
  entity = event.data.entity.__identifier__;
  fashezhe = event.data.owner.__identifier__;
  fashewu = event.data.projectile.__identifier__;
  zuobiao = event.data.position;

  var neirong =
    fashezhe + " 在 " + zuobiao + " 发射的 " + fashewu + "击中了" + entity;
  chat(neirong);
  log(neirong);
}

function shanghai(event) {
  entity = event.data.entity.__identifier__;
  xishou = event.data.absorbed_damage;
  leixing = event.data.cause;

  var neirong =
    entity + " 受到了 来自 " + leixing + " 的 " + xishou + " 点伤害";
  chat(neirong);
  log(neirong);
}

function tianqi(event) {
  weidu = event.data.dimension;

  var neirong = weidu + " 天气发生了变化";
  chat(neirong);
  log(neirong);
}

function shijian(event) {
  entity = event.data.entity.__identifier__;
  JSONevent = event.data.event;

  var neirong = entity + " 触发了 " + JSONevent + " JSON事件";
  chat(neirong);
  log(neirong);
}

function yinyue(event) {
  yingao = event.data.pitch; //音高，小数
  yinliang = event.data.volume; //音量，小数
  zuobiao = event.data.position; //坐标，数组
  yinyueid = event.data.sound; //音乐标识符，字符串

  var neirong =
    zuobiao + " 正在播放 " + yinyueid + " 音高:" + yingao + " 音量" + yinliang;
  chat(neirong);
  log(neirong);
}

function jinrushijie1() {
  var neirong = "title @a title §l§dScript Engine§2加载成功";
  cmd(neirong);
  log(neirong);
}

function jinrushijie2() {
  var neirong = 'title @a subtitle §6按"T键"或"回车"以打开聊天栏查看更多内容';
  cmd(neirong);
  log(neirong);
}

function jinrushijie3() {
  var neirong =
    'tellraw @a { "rawtext" : [ { "text" : "§l§7[BYH]' +
    mingzi +
    " Addon " +
    banben +
    ' Script Engine脚本引擎系统已加载成功！\n§7[BYH]感谢您下载本Addon\n§7[BYH]" } ] } ';
  cmd(neirong);
  log(neirong);
}

var mingzi = "行为记录";
var banben = "V1.0.0";

//更新
byh.update = function () {};

//退出
byh.shutdown = function () {
  log("服务端行为记录已结束");
};
