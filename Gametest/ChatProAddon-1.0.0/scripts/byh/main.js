import { World } from "Minecraft";
import { chatf, log } from "../ulang/ulang.js";
import * as config from "./config.js";

const worldsname = config.config.worldsname;
const nottext = config.config.nottext;
const cname = config.config.cname;
const cname2 = config.config.cname2;

const dlang = config.config.default_language;
const lang = dlang.lang;
const wmyy = lang.byh_chat_nottext_name;
const shut = lang.byh_chat_shut_name;
const shutun = lang.byh_chat_shutun_name;
const shut_cmd = lang.byh_chat_shut_cmd_name;
const shutun_cmd = lang.byh_chat_shutun_cmd_name;

var shutlist = "air";

World.events.beforeChat.subscribe((event) => {
  var message = event.message;
  if (message.startsWith("*/shut ") == true) {
    shutlist = onshut(event);
  } else if (message.startsWith("*/shutun ") == true) {
    shutlist = "air";
    onshutun(event);
  } else {
    onChat(event);
  }
});

function onChat(event) {
  event.canceled = true;

  var playername = event.sender.name;
  var message = event.message;
  var back = `[ChatPro] <${playername}> ${message}`;

  if (playername == shutlist) {
    chatf(shut, playername);
  } else {
    var x = parseInt(event.sender.location.x);
    var y = parseInt(event.sender.location.y);
    var z = parseInt(event.sender.location.z);

    var id = event.sender.id;
    var qianxing = event.sender.isSneaking;
    var weiducode = 0;
    var weidu = worldsname[weiducode];
    var health = 20;
    if (qianxing == null || qianxing == undefined) {
      var qianxing = false;
      var qianxing = "否";
    }

    for (var i = 0; i < cname.length; i++) {
      var playername2 = cname[i];

      if (playername == playername2) {
        var playercname = `[${cname2[i]}§r]`;
      } else {
        var playercname = ``;
      }
    }

    for (var a = 0; a < nottext.length; a++) {
      if (nottext[a].test(message) == true) {
        var message = "***";
        chatf(wmyy, "@p");
      }
    }

    var chat = `[${weidu}§r] [§l§6${x},${y},${z}§r] [§l§c血量:${health}§r] [§l§3潜行:${qianxing}§r] [§l§5${id}§r] ${playercname} ${playername} >> ${message}`;
    // var chat = `${message} <<< ${playername} 在 §6${x},${y},${z}§r ${weidu}§r 说话;`
    // var chat = `${playername} 曰 「 ${message} 」 `
  }

  chatf(chat);
  log(back);
  return event;
}

function onshut(event) {
  event.canceled = true;

  var playername = event.sender.name;
  var message = event.message;

  var target = message.substring(7);
  chatf(shut_cmd, playername);
  chatf(shut, target);

  var back = `[ChatPro] <${playername}> CMD ${message}`;
  log(back);

  return target;
}

function onshutun(event) {
  event.canceled = true;

  var playername = event.sender.name;
  var message = event.message;

  var target = message.substring(9);
  chatf(shutun_cmd, playername);
  chatf(shutun, target);
  shutlist = air;

  var back = `[ChatPro] <${playername}> CMD ${message}`;
  log(back);

  return shutlist;
}

//听说改这个的都没马噢
const version = "1.0.0";
console.log(`[HULI]ChatPro加载成功 版本:${version}`);
console.log(`[HULI]ChatPro `);

/* World.events.beforeexplosion.subscribe((event) => {
  var id = event.source.id;
  var x = parseInt(event.source.id.location.y);
  var y = parseInt(event.source.id.location.y);
  var z = parseInt(event.source.id.location.z);
  var x1 = parseInt(event.impactedBlocks.location.x);
  var y1 = parseInt(event.impactedBlocks.location.y);
  var z1 = parseInt(event.impactedBlocks.location.z);

  var back = `[LogRecord]${x1},${y1},${z1}处的方块受到了在${x},${y},${z}的${id}发生的爆炸`;
  chatf(back);
  log(back);
})

World.events.beforeActivatePiston.subscribe((event) => {
  var x = parseInt(event.piston.location.x)
  var y = parseInt(event.piston.location.y)
  var z = parseInt(event.piston.location.z)
  var code = event.isExpanding;
  if (code == true) {
    var back = `[LogRecord]${x},${y},${z}处的活塞正在扩展`;
  } else {
    var back = `[LogRecord]${x},${y},${z}处的活塞正在收缩`;
  }
  chatf(back);
  log(back);
})

World.events.changeWeather.subscribe((event) => {
  var weidu = event.dimension;
  var lightning = event.lightning;
  var raining = event.raining;
  if (lightning == true) {
    var back = `[LogRecord]${weidu}的天气变成了雷雨天`;
  } else if (raining == true) {
    var back = `[LogRecord]${weidu}的天气变成了雨天`;
  } else {
    var back = `[LogRecord]${weidu}的天气变成了晴天`;
  }
})
 */
