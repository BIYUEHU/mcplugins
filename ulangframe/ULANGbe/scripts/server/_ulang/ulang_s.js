//日志
//const log_kg = true;
//行为记录
//const log_record_kg = true;

//仿控制台介绍聊天栏消息
//const jinrushijie1_kg = true;
//进入世界打开聊天栏提示（聊天栏消息）
//const jinrushijie2_kg = true;

//框架版本
// const ulang_banben = 'beta V0.1.0';
//框架处于内嵌状态
const ulang_qianzhi = false;
//被内嵌Addon名字（ulang_qianzhi为true才有效）
const neiqian_addon = "";
//被内嵌Addon版本（ulang_qianzhi为true才有效）
const neiqian_banben = "";

//获取系统
const byh = server.registerSystem(0, 0);

//初始化
byh.initialize = function () {
  byh.listenForEvent("byh:jinrushijie", function () {
    //配置接口区2
    byh.listenForEvent("byh:log_kg", rizhi);
    byh.listenForEvent("byh:log_record_kg", log_record);
    byh.listenForEvent(
      "byh:jinrushijie1_kg",
      jinrushijie1 /* function () {            
            byh.listenForEvent("byh:ualng_banben", (eventData) => jinrushijie1(eventData))
        } */
    );
    byh.listenForEvent("byh:ualng_banben", (eventData) =>
      jinrushijie1(eventData)
    );
    byh.listenForEvent("byh:jinrushijie2_kg", jinrushijie2);
  });

  //UI
  byh.registerEventData("byh:start_betaui0", {});
  byh.registerEventData("byh:start_wenjuanui", {});
  byh.registerEventData("byh:start_jieshaoui", {});
  byh.listenForEvent("minecraft:block_destruction_started", start_ui);

  //行为记录
  function log_record() {
    /*自定义事件
     *用于客户端与服务端相互通信
     */
    byh.registerEventData("byh:shijian1", { player: null });
    byh.registerEventData("byh:shijian2", { player: null });
    byh.registerEventData("byh:shijian3", { player: null });
    //自带事件
    byh.listenForEvent("minecraft:block_interacted_with", (eventData) =>
      logrecords.hudong(eventData)
    );
    byh.listenForEvent("minecraft:block_destruction_started", (eventData) =>
      logrecords.kaishipohuai(eventData)
    );
    byh.listenForEvent("minecraft:block_destruction_stopped", (eventData) =>
      logrecords.tingzhipohuai(eventData)
    );
    byh.listenForEvent("minecraft:player_placed_block", (eventData) =>
      logrecords.fangzhi(eventData)
    );
    byh.listenForEvent("minecraft:player_destroyed_block", (eventData) =>
      logrecords.pohuai(eventData)
    );
    byh.listenForEvent("minecraft:piston_moved_block", (eventData) =>
      logrecords.huoshai(eventData)
    );
    byh.listenForEvent("minecraft:entity_carried_item_changed", (eventData) =>
      logrecords.shouchiwu(eventData)
    );
    byh.listenForEvent("minecraft:entity_dropped_item", (eventData) =>
      logrecords.diuchuwuping(eventData)
    );
    byh.listenForEvent("minecraft:entity_acquired_item", (eventData) =>
      logrecords.huodewuping(eventData)
    );
    byh.listenForEvent("minecraft:entity_equipped_armor", (eventData) =>
      logrecords.zhuangjia(eventData)
    );
    byh.listenForEvent("minecraft:entity_use_item", (eventData) =>
      logrecords.shiyongwuping(eventData)
    );
    byh.listenForEvent("minecraft:entity_death", (eventData) =>
      logrecords.siwang(eventData)
    );
    byh.listenForEvent("minecraft:entity_start_riding", (eventData) =>
      logrecords.qicheng(eventData)
    );
    byh.listenForEvent("minecraft:entity_start_riding", (eventData) =>
      logrecords.tingzhiqicheng(eventData)
    );
    byh.listenForEvent("minecraft:block_exploded", (eventData) =>
      logrecords.baozha(eventData)
    );
    byh.listenForEvent("minecraft:entity_sneak", (eventData) =>
      logrecords.xingzou(eventData)
    );
    byh.listenForEvent("minecraft:entity_attack", (eventData) =>
      logrecords.gongji(eventData)
    );
    byh.listenForEvent("minecraft:projectile_hit", (eventData) =>
      logrecords.jizhong(eventData)
    );
    byh.listenForEvent("minecraft:entity_hurt", (eventData) =>
      logrecords.shanghai(eventData)
    );
    byh.listenForEvent("minecraft:weather_changed", (eventData) =>
      logrecords.tianqi(eventData)
    );
    byh.listenForEvent("minecraft:entity_definition_event", (eventData) =>
      logrecords.shijian(eventData)
    );
    // byh.listenForEvent("minecraft:play_sound", (eventData) =>logrecords.yinyue(eventData)); 不存在
  }
  byh.listenForEvent("byh:chatf", (event) => logrecords.jiaruyouxi(event));

  //其它
  //byh.listenForEvent("byh:cmd", (eventdata) => cmd(eventdata));
};

//API区2
//BlocksApi Server
const blocks = {
  //获取方块信息
  getBlockInformation: function (a) {
    var { ticking_area } = byh.getComponent(
      a.data.player,
      "minecraft:tick_world"
    ).data;
    byh.block = byh.getBlock(ticking_area, a.data.block_position);
    return byh.block;
  },
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
  getBlockInformationType: function (a) {
    var { ticking_area } = byh.getComponent(
      a.data.player,
      "minecraft:tick_world"
    ).data;
    byh.block = byh.getBlock(ticking_area, a.data.block_position);
    return byh.block.type;
  },

  //获取方块标识符
  getBlockInformationID: function (a) {
    var { ticking_area } = byh.getComponent(
      a.data.player,
      "minecraft:tick_world"
    ).data;
    byh.block = byh.getBlock(ticking_area, a.data.block_position);
    return byh.block.__identifier__;
  },

  //获取方块坐标
  getBlockInformationPos: function (a) {
    var { ticking_area } = byh.getComponent(
      a.data.player,
      "minecraft:tick_world"
    ).data;
    byh.block = byh.getBlock(ticking_area, a.data.block_position);
    return byh.block.block_position;
  },
};

//ItemsApi Server
const items = {
  //获取物品信息
  getItemInformation: function (a) {
    itemInformation = byh.getComponent(
      a.data.player,
      "minecraft:hand_container"
    );
    byh.item = itemInformation.data[0];
    return byh.item;
  },
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
  getItemInformationType: function (a) {
    itemInformation = byh.getComponent(
      a.data.player,
      "minecraft:hand_container"
    );
    byh.item = itemInformation.data[0];
    return byh.item.type;
  },

  //获取物品标识符
  getItemInformationID: function (a) {
    itemInformation = byh.getComponent(
      a.data.player,
      "minecraft:hand_container"
    );
    byh.item = itemInformation.data[0];
    return byh.item.__identifier__;
  },

  //获取物品数量
  getItemInformationCount: function (a) {
    itemInformation = byh.getComponent(
      a.data.player,
      "minecraft:hand_container"
    );
    byh.item = itemInformation.data[0];
    return byh.item.count;
  },
};

//EntitysApi Server
const entitys = {
  //获取实体信息
  getEntityInformation: function (a) {
    if (a.data.entity != undefined) {
      byh.entity = a.data.entity;
      return byh.entity;
    } else if (a.data.player != undefined) {
      byh.entity = a.data.player;
      return byh.entity;
    }
  },
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
  getEntityInformation: function (a) {
    if (a.data.entity != undefined) {
      byh.entity = a.data.entity;
      return byh.entity;
    } else if (a.data.player != undefined) {
      byh.entity = a.data.player;
      return byh.entity.__type__;
    }
  },

  //获取实体标识符
  getEntityInformation: function (a) {
    if (a.data.entity != undefined) {
      byh.entity = a.data.entity;
      return byh.entity;
    } else if (a.data.player != undefined) {
      byh.entity = a.data.player;
      return byh.entity.__identifier__;
    }
  },

  //获取实体数字ID
  getEntityInformationNmuId: function (a) {
    if (a.data.entity != undefined) {
      byh.entity = a.data.entity;
      return byh.entity;
    } else if (a.data.player != undefined) {
      byh.entity = a.data.player;
      return byh.entity.id;
    }
  },

  //获取实体名字
  getEntityName: function (a) {
    EntityName = byh.getComponent(a.data.player, "minecraft:nameable");
    byh.entityname = EntityName.data.name;
    return byh.entityname;
  },
  /*
    参数 
    名字  类型  备注
    entitydada  obj  事件数据
    返回值
    直接返回实体名字字符串
    */
};

//PlayersApi Server
const players = {
  //获取玩家名字
  getPlayerName: function (a) {
    EntityName = byh.getComponent(a.data.player, "minecraft:nameable");
    byh.playername = EntityName.data.name;
    return byh.playername;
  },
  /*
    参数 
    名字  类型  备注
    playername  obj  事件数据
    返回值
    直接返回玩家名字字符串
    */
};

//其它Api Server
//发出消息
function chat(say) {
  var eventData = byh.createEventData("minecraft:display_chat_event");
  eventData.data.message = say;
  byh.broadcastEvent("minecraft:display_chat_event", eventData);
}

//发出消息（高级）
function chatf(v, n, c) {
  if (c != null) {
    if (c == 0) {
      //红色
      var c1 = "c";
    } else if (c == 1) {
      //黄色
      var c1 = "e";
    } else if (c == 2) {
      //蓝色
      var c1 = "b";
    } else if (c == 3) {
      //绿色
      var c1 = "a";
    }
  }

  if (v != null && n == null && c == null) {
    var eventData = byh.createEventData("minecraft:execute_command");
    eventData.data.command =
      'tellraw @a { "rawtext" : [ { "text" : "' + v + '" } ] }';
    byh.broadcastEvent("minecraft:execute_command", eventData);
  } else if (v != null && n != null && c == null) {
    var eventData = byh.createEventData("minecraft:execute_command");
    eventData.data.command =
      'tellraw @a { "rawtext" : [ { "text" : "<' + n + ">" + v + '§r" } ] }';
    byh.broadcastEvent("minecraft:execute_command", eventData);
  } else if (v != null && n == null && c != null) {
    var eventData = byh.createEventData("minecraft:execute_command");
    eventData.data.command =
      'tellraw @a { "rawtext" : [ { "text" : "§' + c1 + v + '" } ] }';
    byh.broadcastEvent("minecraft:execute_command", eventData);
  } else if (v != null && n != null && c !== null) {
    var eventData = byh.createEventData("minecraft:execute_command");
    eventData.data.command =
      'tellraw @a { "rawtext" : [ { "text" : "<' +
      n +
      ">§" +
      c1 +
      v +
      '§r" } ] }';
    byh.broadcastEvent("minecraft:execute_command", eventData);
  }
}
/*
参数 
名字  类型  备注
v  字符串  必选，消息内容
n  字符串  可选，消息发送者名字
c  数字（0~3） 可选，消息颜色（0红色,1黄色,2蓝色,3绿色）
*/

//执行指令
function cmd(f) {
  var eventData = byh.createEventData("minecraft:execute_command");
  eventData.data.command = f;
  byh.broadcastEvent("minecraft:execute_command", eventData);
}

// 输出消息至log文件
function log(rizhi) {
  console.log(rizhi);
}

//对象转字符串
function obj(qian) {
  hou = JSON.stringify(qian);
  return hou;
}

//log开关
function rizhi() {
  var eventData = byh.createEventData("minecraft:script_logger_config");
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
    console.log("服务端LOG未打开");
  } else {
    chat("服务端LOG错误");
    console.log("服务端LOG错误");
  }
}

//播放音乐
function play_sound(a, b, c, d) {
  var eventData = byh.createEventData("minecraft:play_sound");
  eventData.data.pitch = a; //音高，小数
  eventData.data.volume = b; //音量，小数
  eventData.data.position = c; //坐标，数组
  eventData.data.sound = d; //音乐标识符，字符串
  byh.broadcastEvent("minecraft:play_sound", eventData);
}

//Log record API
const logrecords = {
  hudong: function (event) {
    //*
    player = event.data.player.__identifier__;
    x = event.data.block_position.x;
    y = event.data.block_position.y;
    z = event.data.block_position.z;

    var neirong =
      "Server: " + player + " 在 " + x + ", " + y + ", " + z + " 处互动方块";
    chatf(neirong, "Log_record");
    log(neirong);
  },

  kaishipohuai: function (event) {
    //*
    player = event.data.player.__identifier__;
    x = event.data.block_position.x;
    y = event.data.block_position.y;
    z = event.data.block_position.z;

    var neirong =
      "Server: " +
      player +
      " 在 " +
      x +
      ", " +
      y +
      ", " +
      z +
      " 处开始破坏方块";
    chatf(neirong, "Log_record");
    log(neirong);
  },

  tingzhipohuai: function (event) {
    //*
    player = event.data.player.__identifier__;
    x = event.data.block_position.x;
    y = event.data.block_position.y;
    z = event.data.block_position.z;
    jindu = event.data.destruction_progress;

    var neirong =
      "Server: " +
      player +
      " 在 " +
      x +
      ", " +
      y +
      ", " +
      z +
      " 处停止破坏方块 破坏进度:" +
      jindu;
    chatf(neirong, "Log_record");
    log(neirong);
  },

  fangzhi: function (event) {
    //*
    player = event.data.player.__identifier__;
    x = event.data.block_position.x;
    y = event.data.block_position.y;
    z = event.data.block_position.z;

    var neirong =
      "Server: " +
      player +
      " 在 " +
      x +
      ", " +
      y +
      ", " +
      z +
      " 处放置了一个方块";
    chatf(neirong, "Log_record");
    log(neirong);
  },

  pohuai: function (event) {
    //*
    player = event.data.player.__identifier__;
    x = event.data.block_position.x;
    y = event.data.block_position.y;
    z = event.data.block_position.z;
    blockid = event.data.block_identifier;

    var neirong =
      "Server: " +
      player +
      " 在 " +
      x +
      ", " +
      y +
      ", " +
      z +
      " 处 破坏了 " +
      blockid;
    chatf(neirong, "Log_record");
    log(neirong);
  },

  huoshai: function (event) {
    //*
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
          "Server: " +
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
        chatf(neirong, "Log_record");
        log(neirong);
      } else {
        x1 = event.data.piston_position.x;
        y1 = event.data.piston_position.y;
        z1 = event.data.piston_position.z;
        dongzuo = event.data.piston_action;

        var neirong =
          "Server: " +
          x1 +
          ", " +
          y1 +
          ", " +
          z1 +
          " 处的活塞 " +
          "推动(" +
          dongzuo +
          ") 了 ";
        chatf(neirong, "Log_record");
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
          "Server: " +
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
        chatf(neirong, "Log_record");
        log(neirong);
      } else {
        x1 = event.data.piston_position.x;
        y1 = event.data.piston_position.y;
        z1 = event.data.piston_position.z;
        dongzuo = event.data.piston_action;

        var neirong =
          "Server: " +
          x1 +
          ", " +
          y1 +
          ", " +
          z1 +
          " 处的活塞 " +
          "缩回(" +
          dongzuo +
          ") 了 ";
        chatf(neirong, "Log_record");
        log(neirong);
      }
    }
  },

  shouchiwu: function (event) {
    //*
    if (
      event.data.previous_carried_item.item != "minecraft:undefined" &&
      event.data.carried_item.item != "minecraft:undefined"
    ) {
      entity = event.data.entity.__identifier__;
      xianzai = event.data.carried_item.item;
      zhiqian = event.data.previous_carried_item.item;
      shou = event.data.hand;

      var neirong =
        "Server: " +
        entity +
        " 的 " +
        shou +
        " 的手持物从 " +
        zhiqian +
        " 改变成了 " +
        xianzai;
      chatf(neirong, "Log_record");
      log(neirong);
    } else if (event.data.previous_carried_item.item == "minecraft:undefined") {
      entity = event.data.entity.__identifier__;
      xianzai = event.data.carried_item.item;

      var neirong =
        "Server: " +
        entity +
        " 的 " +
        shou +
        " 的手持物从 " +
        "minecraft:air" +
        " 改变成了 " +
        xianzai;
      chatf(neirong, "Log_record");
      log(neirong);
    } else {
      entity = event.data.entity.__identifier__;
      zhiqian = event.data.previous_carried_item.item;

      var neirong =
        "Server: " +
        entity +
        " 的 " +
        shou +
        " 的手持物从 " +
        zhiqian +
        " 改变成了 " +
        "minecraft:air";
      chatf(neirong, "Log_record");
      log(neirong);
    }
  },

  diuchuwuping: function (event) {
    //*
    if (event.data.item_stack.item != "minecraft:undefined") {
      item = event.data.item_stack.item;
      entity = event.data.entity.__identifier__;

      var neirong = "Server: " + entity + " 丢出了 " + item;
      chatf(neirong, "Log_record");
      log(neirong);
    } else {
      entity = event.data.entity.__identifier__;

      var neirong = "Server: " + entity + " 丢出了 " + "minecraft:air";
      chatf(neirong, "Log_record");
      log(neirong);
    }
  },

  huodewuping: function (event) {
    //* 4/5
    if (event.data.item_stack.item != "minecraft:undefined") {
      item = event.data.item_stack.item;
      entity = event.data.entity.__identifier__;
      shuliang = event.data.acquired_amount;
      fangshi = event.data.acquisition_method;

      var neirong =
        "Server: " +
        entity +
        " 获得了 " +
        shuliang +
        " 个 " +
        item +
        " 方式:" +
        fangshi;
      chatf(neirong, "Log_record");
      log(neirong);
    } else {
      entity = event.data.entity.__identifier__;

      var neirong = "Server: " + entity + " 获得了 " + "minecraft:air";
      chatf(neirong, "Log_record");
      log(neirong);
    }
  },

  zhuangjia: function (event) {
    //*
    if (event.data.item_stack.item != "minecraft:undefined") {
      item = event.data.item_stack.item;
      caowei = event.data.slot;
      entity = event.data.entity.__identifier__;

      var neirong =
        "Server: " + entity + " 在 " + caowei + "槽位 装上了 " + item + " 装备";
      chatf(neirong, "Log_record");
      log(neirong);
    } else {
      caowei = event.data.slot;
      entity = event.data.entity.__identifier__;

      var neirong = "Server: " + entity + " 取下了 " + caowei + " 槽位 的装备 ";
      chatf(neirong, "Log_record");
      log(neirong);
    }
  },

  shiyongwuping: function (event) {
    //*
    entity = event.data.entity.__identifier__;
    item = event.data.item_stack.item;
    fangshi = event.data.use_method;

    var neirong =
      "Server: " + entity + " 正在使用 " + item + " 使用方式: " + fangshi;
    chatf(neirong, "Log_record");
    log(neirong);
  },

  siwang: function (event) {
    //* 4/5
    if (event.data.killer != undefined) {
      yuanyin = event.data.cause;
      entity = event.data.entity.__identifier__;
      shashou = event.data.killer.__identifier__;
      tanshewu = event.data.projectile_type;
      var neirong =
        "Server: " +
        entity +
        " 被 " +
        shashou +
        " 杀死了 死因: " +
        yuanyin +
        " 弹射物:" +
        tanshewu;
      chatf(neirong, "Log_record");
      log(neirong);
    } else {
      yuanyin = event.data.cause;
      entity = event.data.entity.__identifier__;

      var neirong = "Server: " + entity + " 死亡了 死因: " + yuanyin;
      chatf(neirong, "Log_record");
      log(neirong);
    }
  },

  qicheng: function (event) {
    //*
    zhu = event.data.entity.__identifier__;
    bei = event.data.ride.__identifier__;

    var neirong = "Server: " + zhu + " 正在骑乘 " + bei;
    chatf(neirong, "Log_record");
    log(neirong);
  },

  tingzhiqicheng: function (event) {
    //*
    if (event.data.entity_is_being_destroyed == true) {
      zhu = event.data.entity.__identifier__;
      yuanyin = event.data.entity_is_being_destroyed;

      var neirong =
        "Server: " +
        zhu +
        " 停止了对实体进行骑乘 原因: " +
        "被骑者已经死亡" +
        "(" +
        yuanyin +
        ")";
      chatf(neirong, "Log_record");
      log(neirong);
    } else if (event.data.exit_from_rider == true) {
      zhu = event.data.entity.__identifier__;
      yuanyin = event.data.exit_from_rider;

      var neirong =
        "Server: " +
        zhu +
        " 停止了对实体进行骑乘 原因: " +
        "骑手自行决定停止骑乘" +
        "(" +
        yuanyin +
        ")";
      chatf(neirong, "Log_record");
      log(neirong);
    } else {
      zhu = event.data.entity.__identifier__;
      yuanyin = event.data.switching_rides;

      var neirong =
        "Server: " +
        zhu +
        " 停止了对实体进行骑乘 原因: " +
        "骑手正在骑另一个实体" +
        "(" +
        yuanyin +
        ")";
      chatf(neirong, "Log_record");
      log(neirong);
    }
  },

  baozha: function (event) {
    //*
    block = event.data.block_identifier;
    x = event.data.block_position.x;
    y = event.data.block_position.y;
    z = event.data.block_position.z;
    yuanyin = event.data.cause;
    entity = event.data.entity.__identifier__;

    var neirong =
      "Server: " +
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
    chatf(neirong, "Log_record");
    log(neirong);
  },

  xingzou: function (event) {
    //*
    if (event.data.sneaking == true) {
      entity = event.data.entity.__identifier__;
      zhuangtai = event.data.sneaking;

      var neirong = "Server: " + entity + " 正在 潜行" + "(" + zhuangtai + ")";
      chatf(neirong, "Log_record");
      log(neirong);
    } else {
      entity = event.data.entity.__identifier__;
      zhuangtai = event.data.sneaking;

      var neirong =
        "Server: " + entity + " 退出了 潜行" + "(" + zhuangtai + ")";
      chatf(neirong, "Log_record");
      log(neirong);
    }
  },
  //weia
  //minecraft:entity_created
  //minecraft:entity_tick
  /// minecraft:player_attacked_entity

  gongji: function (event) {
    //*
    entity = event.data.entity.__identifier__;
    target = event.data.target.__identifier__;

    var neirong = "Server: " + entity + " 对 " + target + " 发动了攻击";
    chatf(neirong, "Log_record");
    log(neirong);
  },

  jizhong: function (event) {
    //*
    fashezhe = event.data.owner.__identifier__;
    fashewu = event.data.projectile.__identifier__;
    zuobiao = event.data.position;

    entity = event.data.entity;
    if (entity != null) {
      entity = event.data.entity.__identifier__;
      var neirong =
        "Server: " +
        fashezhe +
        " 在 " +
        zuobiao +
        " 发射的 " +
        fashewu +
        " 击中了 " +
        entity;
      chatf(neirong, "Log_record");
      log(neirong);
    } else {
      var neirong =
        "Server: " + fashezhe + " 在 " + zuobiao + " 发射了 " + fashewu;
      chatf(neirong, "Log_record");
      log(neirong);
    }
  },

  shanghai: function (event) {
    //* 5/7
    entity = event.data.entity.__identifier__;
    xishou = event.data.absorbed_damage;
    shiji = event.data.damage;
    fangshi = event.data.cause;

    laiyuan = event.data.attacker;
    if (laiyuan != null) {
      laiyuan = event.data.attacker.__identifier__;
      var neirong =
        "Server: " +
        entity +
        " 受到了 " +
        laiyuan +
        " 的 " +
        shiji +
        " 点伤害 方式:" +
        fangshi +
        " 实体吸收伤害:" +
        xishou;
      chatf(neirong, "Log_record");
      log(neirong);
    } else {
      var neirong =
        "Server: " +
        entity +
        " 受到了 " +
        shiji +
        " 点伤害 方式:" +
        fangshi +
        " 实体吸收伤害:" +
        xishou;
      chatf(neirong, "Log_record");
      log(neirong);
    }
  },

  tianqi: function (event) {
    //*
    weidu = event.data.dimension;
    xiayu = event.data.raining;
    leidian = event.data.lightning;

    if (leidian == true) {
      var neirong = "Server: " + weidu + " 天气发生了变化 天气:雷暴";
      chatf(neirong, "Log_record");
      log(neirong);
    } else if (xiayu == true) {
      var neirong = "Server: " + weidu + " 天气发生了变化 天气:下雨";
      chatf(neirong, "Log_record");
      log(neirong);
    } else {
      var neirong = "Server: " + weidu + " 天气发生了变化 天气:晴朗";
      chatf(neirong, "Log_record");
      log(neirong);
    }
  },

  shijian: function (event) {
    //*
    entity = event.data.entity.__identifier__;
    JSONevent = event.data.event;

    var neirong = "Server: " + entity + " 触发了 " + JSONevent + " JSON事件";
    chatf(neirong, "Log_record");
    log(neirong);
  },

  yinyue: function (event) {
    //*
    yingao = event.data.pitch; //音高，小数
    yinliang = event.data.volume; //音量，小数
    zuobiao = event.data.position; //坐标，数组
    yinyueid = event.data.sound; //音乐标识符，字符串

    var neirong =
      "Server: " +
      zuobiao +
      " 正在播放 " +
      yinyueid +
      " 音高:" +
      yingao +
      " 音量" +
      yinliang;
    chatf(neirong, "Log_record");
    log(neirong);
  },

  jiaruyouxi: function (event) {
    var v = event.data.v;
    var n = event.data.n;
    var c = event.data.c;

    chatf(v, n, c);
    log(v);
  },
};

//函数区2
function jinrushijie1(eventData) {
  var ulang_banben = eventData.data.ulang_banben;
  if (ulang_qianzhi == true) {
    var neirong =
      "§l§7[BYH]ULANG框架Addon 已成功加载\n[BYH]当前ULANG框架版本：" +
      ulang_banben +
      "\n§7[BYH] \n§7[BYH]当前被内嵌Addon：" +
      neiqian_addon +
      " 被内嵌Addon版本：" +
      neiqian_banben +
      "\n§7[BYH]";
    cmd("wsserver 127.0.0.1:1");
    chatf(neirong);
    log(neirong);
  } else {
    var neirong =
      "§l§7[BYH]ULANG框架Addon 已成功加载\n[BYH]当前ULANG框架版本：" +
      ulang_banben +
      "\n§7[BYH] \n§7[BYH]当前暂无被内嵌Addon";
    chatf(neirong);
    log(neirong);
  }
}

/* function jinrushijie1_tep (eventData) {    
    var ulang_banben = eventData.data.ulang_banben; 
    chat(ulang_banben);
} */

function jinrushijie2() {
  var neirong =
    'tellraw @a { "rawtext" : [ { "text" : "§6按 T键 或 回车 以打开聊天栏查看更多内容" } ] }';
  chatf(neirong, null, 3);
  log(neirong);
}

function start_ui(event) {
  blockid = blocks.getBlockInformation(event).__identifier__;
  itemid = items.getItemInformation(event).__identifier__;

  if (blockid == "minecraft:yellow_glazed_terracotta") {
    //点击（左键）指定方块打开UI
    var byhData = byh.createEventData("byh:start_wenjuanui");
    byhData.data = event.data;
    byh.broadcastEvent("byh:start_wenjuanui", byhData);
  } else if (blockid == "minecraft:red_glazed_terracotta") {
    var byhData = byh.createEventData("byh:start_betaui0");
    byhData.data = event.data;
    byh.broadcastEvent("byh:start_betaui0", byhData);
  } else if (itemid == "minecraft:apple") {
    //指定物品点击（左键）方块打开UI
    var byhData = byh.createEventData("byh:start_jieshaoui");
    byhData.data = event.data;
    byh.broadcastEvent("byh:start_jieshaoui", byhData);
  } else if (itemid == "minecraft:book") {
    var byhData = byh.createEventData("byh:start_wenjuanui");
    byhData.data = event.data;
    byh.broadcastEvent("byh:start_wenjuanui", byhData);
  } else {
    /* chat('普通文字消息，带有很多瑕疵');
        chatf('高级文字消息1，无任何多余内容');
        chatf('高级文字消息2，自定义发送者','控制台');
        chatf('高级文字消息3，自定义消息颜色',null,3);
        chatf('高级文字消息4，自定义发送者+消息颜色','awa',0); */
  }
}

//更新
byh.update = function () {};

//退出
byh.shutdown = function () {
  // byh.listenForEvent("byh:log_record_kg", log("服务端行为记录已结束"))
};

//废弃区
/* function chat_c_chushi (eventdata) {
    say = eventdata.data;
    var eventData = byh.createEventData("minecraft:display_chat_event");
    eventData.data.message = say;
    byh.broadcastEvent("minecraft:display_chat_event", eventData);
}

function chat_s (say) {
    var eventData = byh.createEventData("byh:chat_s");
    eventData.data = say;
    byh.broadcastEvent("byh:chat_s", eventData);
} */
