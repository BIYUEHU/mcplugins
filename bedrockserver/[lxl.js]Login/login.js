const MainPath = "./plugins//login/";
const version = "1.0.0";
const logPath = "./logs//login/";
loading();

var Config = JSON.parse(File.readFrom(MainPath + "config.json"));
var logintime = Config.logintime;
var loginint = Config.loginint;
var defpass = data.toBase64(Config.defpass);

mc.regPlayerCmd(
  "login",
  "/login <password> Login account",
  (pl, args) => login(pl, args),
  0
);
mc.regPlayerCmd(
  "setpass",
  "/setpass <newpassword> <oldpassword> Set login password",
  (pl, args) => setpass(pl, args),
  0
);
mc.regPlayerCmd(
  "quedata",
  "/quedata <playername> Query any data of someplayer",
  (pl, args) => quedata(pl, args),
  1
);

mc.listen("onJoin", (pl) => {
  datais = File.exists(MainPath + "data/" + pl.name + ".json");

  if (datais == true) {
    json = JSON.parse(File.readFrom(MainPath + "data/" + pl.name + ".json"));
    xuid = json.xuid;

    if (pl.xuid == xuid) {
      back = "Xuid" + pl.xuid + " 匹配成功";
      logfile(back);
      pl.tell("<§4Login§r>§g" + back);
    } else {
      if (pl.kick("§c当前Xuid与记录数据不匹配,请勿使用假名!") == true) {
        back =
          "玩家" +
          pl.name +
          " 的Xuid" +
          pl.xuid +
          " 与记录数据不匹配,已自动断开连接";
        logfile(back);
      }
    }
  } else {
    pl.tell("<§4Login§r>§g记录数据中无此Xuid，正在记录");
    var password = defpass;
    var dv = pl.getDevice();
    var ip = dv.ip;
    var os = dv.os;
    var clientId = dv.clientId;

    network.httpGet(
      "https://wanghun.top/api/yh/v2/ipip.php?ip=" + ip.split(":")[0],
      (status, result) => {
        if (status == 200) {
          json = JSON.parse(result);
          code = json.code;
          if (code == 200) {
            var city = json.data.address;
            var location = json.data.location;
          } else {
            var city = null;
            var location = null;
          }
        } else {
          var city = null;
          var location = null;
        }

        var datas = `{"name":"${pl.name}","password":"${password}","realname":"${pl.realName}","xuid":"${pl.xuid}","uuid":"${pl.uuid}","ip":"${ip}","city":"${city}","location":"${location}","os":"${os}","clientId":"${clientId}"}`;
        if (
          File.writeTo(MainPath + "data/" + pl.name + ".json", datas) == true
        ) {
          back = "Xuid" + pl.xuid + " 记录成功";
          logfile(back);
          pl.tell("<§4Login§r>§g" + back);
        } else {
          pl.tell("<§4Login§r>§cXuid记录失败");
        }
      }
    );
  }

  timedis = File.exists(MainPath + "data/time/" + pl.name + ".txt");
  if (timedis == true) {
    tms = File.readFrom(MainPath + "data/time/" + pl.name + ".txt");
    tmss = tms.split(",");

    tmsz =
      parseInt(tmss[4]) +
      parseInt(tmss[3]) * 60 +
      parseInt(tmss[2]) * 24 * 60 +
      parseInt(tmss[1]) * 30 * 24 * 60 +
      parseInt(tmss[0]) * 12 * 30 * 24 * 60;

    tm = system.getTimeObj();
    tmz =
      tm.m +
      tm.h * 60 +
      tm.D * 24 * 60 +
      tm.M * 30 * 24 * 60 +
      tm.Y * 12 * 30 * 24 * 60;

    lastz = tmz - tmsz;

    lastY = parseInt(lastz / 518400);
    if (lastY > 0) {
      lastM = parseInt((lastz - lastY * 518400) / 43200);
    } else {
      lastM = parseInt(lastz / 43200);
    }
    if (lastM > 0) {
      lastD = parseInt((lastz - lastM * 43200) / 1440);
    } else {
      lastD = parseInt(lastz / 1440);
    }
    if (lastD > 0) {
      lasth = parseInt((lastz - lastD * 1440) / 60);
    } else {
      lasth = parseInt(lastz / 60);
    }
    if (lasth > 0) {
      lastm = parseInt(lastz - lasth * 60);
    } else {
      lastm = parseInt(lastz);
    }

    if (lastm <= 3) {
      lastime = "刚刚";
    } else {
      lastime =
        lastY +
        "年" +
        lastM +
        "月" +
        lastD +
        "天" +
        lasth +
        "小时" +
        lastm +
        "分钟前";
    }
    pl.tell("<§4Login§r>§g欢迎,距离你上次进入服务器在§a" + lastime);

    hasTag = pl.hasTag("logined");
    if (lastz >= loginint || hasTag != true) {
      mc.runcmd('tag "' + pl.name + '" remove logined');

      setTimeout(() => {
        json = JSON.parse(
          File.readFrom(MainPath + "data/" + pl.name + ".json")
        );
        password = json.password;

        pl.tell(
          "<§4Login§r>§c登录失效,请输入/login <密码>以登录游戏,否则" +
            logintime +
            "秒后将被踢出游戏"
        );
        mc.runcmd('title "' + pl.name + '" title §c请先登录游戏');
        if (password == defpass) {
          pl.tell(
            "<§4Login§r>§c当前默认密码为" +
              data.fromBase64(defpass) +
              ",请输入/setpass <新密码> <旧密码(此时填默认密码)>以更改密码"
          );
        }
        setTimeout(() => {
          hasTag = pl.hasTag("logined");
          if (hasTag != true) {
            if (pl.kick("§c登录操作超时") == true) {
              back = "登录操作超时,已自动断开连接";
              logfile(back);
            }
          }
        }, logintime * 1000);
      }, 3000);
    }
  } else {
    tm = system.getTimeObj();
    tms = tm.Y + "," + tm.M + "," + tm.D + "," + tm.h + "," + tm.m;
    File.writeTo(MainPath + "data/time/" + pl.name + ".txt", tms);
    pl.tell("<§4Login§r>§g欢迎,这是你§a第一次§g进入服务器~");

    mc.runcmd('tag "' + pl.name + '" remove logined');

    setTimeout(() => {
      json = JSON.parse(File.readFrom(MainPath + "data/" + pl.name + ".json"));
      password = json.password;

      pl.tell(
        "<§4Login§r>§c登录失效,请输入/login <密码>以登录游戏,否则" +
          logintime +
          "秒后将被踢出游戏"
      );
      mc.runcmd('title "' + pl.name + '" title §c请先登录游戏');
      if (password == defpass) {
        pl.tell(
          "<§4Login§r>§c当前默认密码为" +
            data.fromBase64(defpass) +
            ",请输入/setpass <新密码> <旧密码(此时填默认密码)>以更改密码"
        );
      }
      setTimeout(() => {
        hasTag = pl.hasTag("logined");
        if (hasTag != true) {
          if (pl.kick("§c登录操作超时") == true) {
            back = "登录操作超时,已自动断开连接";
            logfile(back);
          }
        }
      }, logintime * 1000);
    }, 8000);
  }
});

mc.listen("onLeft", (pl) => {
  tm = system.getTimeObj();
  tms = tm.Y + "," + tm.M + "," + tm.D + "," + tm.h + "," + tm.m;
  File.writeTo(MainPath + "data/time/" + pl.name + ".txt", tms);
});

function login(pl, args) {
  hasTag = pl.hasTag("logined");
  if (hasTag == false) {
    var back_password = data.toBase64(args[0]);
    json = JSON.parse(File.readFrom(MainPath + "data/" + pl.name + ".json"));
    var password = json.password;

    if (back_password === password) {
      mc.runcmd('tag "' + pl.name + '" add logined');
      back = "登录成功";
      logfile("玩家" + pl.name + " " + back);
      pl.tell("<§4Login§r>§a" + back);
    } else {
      back = "登录失败,密码错误";
      logfile("玩家" + pl.name + " " + back);
      pl.tell("<§4Login§r>§c" + back);
    }
  } else {
    pl.tell("<§4Login§r>§a当前已登录");
  }
}

function setpass(pl, args) {
  json = JSON.parse(File.readFrom(MainPath + "data/" + pl.name + ".json"));
  oldpass = json.password;

  if (args[0] == " " || args[0] == "" || args[0] == null) {
    pl.tell("<§4Login§r>§c请输入密码");
  } else if (args[0].length < 6) {
    pl.tell("<§4Login§r>§c请输入6位以及上的密码");
  } else if (args[0].length >= 6 && data.toBase64(args[1]) == oldpass) {
    var password = data.toBase64(args[0]);
    var dv = pl.getDevice();
    var ip = dv.ip;
    var os = dv.os;
    var clientId = dv.clientId;

    network.httpGet(
      "https://wanghun.top/api/yh/v2/ipip.php?ip=" + ip.split(":")[0],
      (status, result) => {
        if (status == 200) {
          json = JSON.parse(result);
          code = json.code;
          if (code == 200) {
            var city = json.data.address;
            var location = json.data.location;
          } else {
            var city = null;
            var location = null;
          }
        } else {
          var city = null;
          var location = null;
        }

        var datas = `{"name":"${pl.name}","password":"${password}","realname":"${pl.realName}","xuid":"${pl.xuid}","uuid":"${pl.uuid}","ip":"${ip}","city":"${city}","location":"${location}","os":"${os}","clientId":"${clientId}"}`;
        if (
          File.writeTo(MainPath + "data/" + pl.name + ".json", datas) == true
        ) {
          back = "设置成功,若未登录请继续登录";
          logfile("玩家" + pl.name + " 密码" + password + " " + back);
          pl.tell("<§4Login§r>§a" + back);
        }
      }
    );
  } else {
    pl.tell("<§4Login§r>§c旧密码错误");
  }
}

function quedata(pl, args) {
  if (args[0] == " " || args[0] == "" || args[0] == null) {
    pl.tell("<§4Login§r>§g请输入要查询的玩家");
  } else {
    datais = File.exists(MainPath + "data/" + args[0] + ".json");
    if (datais == true) {
      json = JSON.parse(File.readFrom(MainPath + "data/" + args[0] + ".json"));
      password = data.fromBase64(json.password);
      realname = json.realname;
      xuid = json.xuid;
      uuid = json.uuid;
      ip = json.ip;
      os = json.os;
      clientId = json.clientId;
      city = json.city;
      locations = json.location;

      back = `查询结果:\n名字:${args[0]} 密码:${password} 真名:${realname}\nXUID:${xuid} UUID:${uuid}\nIP:${ip} 城市:${city} 位置:${locations} 系统:${os} 设备码:${clientId}`;
      logfile("玩家(OP)" + pl.name + " 查询 " + back);
      pl.tell("<§4Login§r>§g" + back);
    } else {
      pl.tell("<§4Login§r>§g记录数据中无该玩家数据");
    }
  }
}

function chatf(message) {
  mc.runcmd('tellraw @a { "rawtext" : [ { "text" : "' + message + '" } ] }');
}

function logfile(message) {
  tm = system.getTimeObj();
  filename = `${tm.Y}-${tm.M}-${tm.D}.log`;
  text = `[${tm.Y}-${tm.M}-${tm.D} ${tm.h}:${tm.m}:${tm.s}] ${message}`;
  if (File.exists(logPath + filename) != true) {
    File.writeTo(logPath + filename, text);
  } else {
    File.writeLine(logPath + filename, text);
  }
}

function loading() {
  log(`[HULI] login `);
  log(`[HULI] login Version ${version}`);
  File.createDir(logPath);
  var ConfigIs = File.exists(MainPath);
  if (ConfigIs != true) {
    File.createDir(MainPath);
    File.createDir(MainPath + "data/");
    File.writeTo(
      MainPath + "config.json",
      '{"logintime":60,"loginint":180,"defpass":"114514"}'
    );
    log("[HULI] login插件文件夹未创建，已自动创建!");
  }
}
