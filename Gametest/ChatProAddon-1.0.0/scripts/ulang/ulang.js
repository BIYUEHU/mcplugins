/* 
ULANG-Alpha0.2.1_Plugin
A little functions on ULANG the ScriptEngine V0.1.0
It's author is @,Copy or Steal and your mother must is dying,Wish person is well.
My github:https://github.com/
My Blog:https://.github.io
My Blog(for China):https://.gitee.io
*/
import { Commands } from "Minecraft";

export const ulang = {
  name: "ulang",
  version: "Alpha0.2.1",
  author: "",
};

export function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

export function sjs(n) {
  var v = Math.floor(Math.random() * n);
  return v;
}

export function cmdf(command) {
  Commands.run(command);
}

export function cmd(command) {
  try {
    Commands.run(command);
  } catch (error) {
    Commands.run(`say [error]${command}`);
  }
}

export function log(message) {
  console.log(message);
}

export function chat(message) {
  Commands.run(`say ${message}`);
}

export function chatf(message, target, name, color) {
  if (color != null) {
    if (color == 0) {
      var color1 = "c";
    } else if (color == 1) {
      var color1 = "e";
    } else if (color == 2) {
      var color1 = "b";
    } else if (color == 3) {
      var color1 = "a";
    }
  }

  if (target == null) {
    var target = "@a";
  }

  if (message != null && name == null && color == null) {
    cmd(
      `tellraw ${target} { \"rawtext\" : [ { \"text\" : \"${message}\" } ] }`
    );
  } else if (message != null && name != null && color == null) {
    cmd(
      `tellraw ${tagrget} { \"rawtext\" : [ { \"text\" : \"<${name}>${message}§r\" } ] }`
    );
  } else if (message != null && name == null && color != null) {
    cmd(
      `tellraw ${tagrget} { \"rawtext\" : [ { \"text\" : \"§${color1}${message}\" } ] }`
    );
  } else if (message != null && name != null && color !== null) {
    cmd(
      `tellraw ${tagrget} { \"rawtext\" : [ { \"text\" : \"<${name}>§${color1}${message}§r\" } ] }`
    );
  }
}

const blacklistJSON = {
  title: "外传黑名单",
  blacklist: [
    {
      wcpt: "苦力怕论坛",
      wczxx:
        "klpbbs:https://klpbbs.com/?15490 MCBBS:XTS2005:https://www.mcbbs.net/?3727196 stonebig:https://www.mcbbs.net/?3831211 :stonebig:https://b23.tv/ot3daH QQ:3515135336",
      wcwj: "外传BEic20.1.1~0.6.0,BEtic1.0.0+3*beta,BEgc4*beta，并在klpbbs,mcbbs,泄露密码,该事件影响不小",
    },
    {
      wcpt: "QQ",
      wczxx: "QQ:3515135336",
      wcwj: "外传BEic2v0.2.0",
    },
    {
      wcpt: "QQ",
      wczxx: "QQ:1656424706 手机号:15650118050 地址:山东 威海",
      wcwj: "外传BETIC1.0.0,且被发现后秒退群",
    },
  ],
  welcome:
    "欢迎检举，发现外传请及时向管理员举报，举报者会根据情况奖励1r~20r,但请勿想以此得利,举报会记录其时间,举报者信息等但不公开",
  lasttime: "2021-07-15",
};

var blacklist_temp1 = blacklistJSON;
var blacklist_temp2 =
  blacklist_temp1.title + "\n外传平台 外传者信息 外传文件\n";
for (var i = 0; i < blacklist_temp1.blacklist.length; i++) {
  if (blacklist_temp1.blacklist != null) {
    var blacklist_temp2 =
      blacklist_temp2 +
      blacklist_temp1.blacklist[i].wcpt +
      " " +
      blacklist_temp1.blacklist[i].wczxx +
      " " +
      blacklist_temp1.blacklist[i].wcwj +
      "\n";
  } else {
    console.log("[HULI][error]Read blacklist file");
  }
}
const blacklist =
  blacklist_temp2 +
  blacklist_temp1.welcome +
  "\n最后更新:" +
  blacklist_temp1.lasttime;

console.log("[HULI]ULANG加载成功 版本:" + ulang.version);
console.log("" + blacklist);
console.log("[HULI]ULANG ");
