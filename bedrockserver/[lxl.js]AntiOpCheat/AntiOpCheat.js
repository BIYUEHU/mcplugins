const MainPath = "./plugins//antiopcheat/";
const logPath = "./logs//antiopcheat/";
const version = "1.0.0";
loading();

function opver(pl) {
  var OpList = JSON.parse(File.readFrom(MainPath + "oplist.json")).oplist;
  var open = pl.isOP();

  if (open == true) {
    var isOP = 0;
    for (var i = 0; i < OpList.length; i++) {
      if (pl.name == OpList[i]) {
        var isOP = 1;
      }
    }

    if (isOP != 1) {
      if (pl.kick("§cAntiOpCheat:You are not OP!") == true);
      logfile(pl.name + " was not verification of OP passed");
    }
  }
}

mc.listen("onJoin", (pl) => {
  var OpList = JSON.parse(File.readFrom(MainPath + "oplist.json")).oplist;
  var open = pl.isOP();

  if (open == true) {
    var isOP = 0;
    for (var i = 0; i < OpList.length; i++) {
      if (pl.name == OpList[i]) {
        var isOP = 1;
      }
    }

    if (isOP == 1) {
      // pl.tell("<AntiOpCheat>Verification of OP passed");
      logfile(pl.name + " was verification of OP passed");
    } else {
      if (pl.kick("§cAntiOpCheat:You are not OP!") == true);
      logfile(pl.name + " was not verification of OP passed");
    }
  }
});

mc.listen("onTick", (pl) => {
  allone = mc.getOnlinePlayers();
  for (var a = 0; a < allone.length; a++) {
    var open = allone[a].isOP();
    if (open == true) {
      opver(allone[a]);
    }
  }
});

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
  log(`[HULI] AntiOpCheat `);
  log(`[HULI] AntiOpCheat Version ${version}`);
  File.createDir(logPath);
  var ConfigIs = File.exists(MainPath);
  if (ConfigIs != true) {
    File.createDir(MainPath);
    File.writeTo(MainPath + "oplist.json", '{"oplist":[]}');
    log("[HULI] AntiOpCheat插件文件夹未创建，已自动创建!");
  }
}
