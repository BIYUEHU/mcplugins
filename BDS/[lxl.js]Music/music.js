const MainPath = "./plugins/biyuehu/music/";
const version = "1.0.0";
loading();

var Config = JSON.parse(File.readFrom(MainPath + "config.json"))

var MusicList = Config.name
MusicList.push("§4停止播放");
var MusicId = Config.id;

function imagesw (array) {
    var image = [];
    for (i = 0;i < array.length;i++) {
        image.push("");
    }
    return image;
}

mc.regPlayerCmd("musicg", "Choose a music", (pl) => Music(pl), 0)


function Music (pl) {    
    pl.sendSimpleForm("§c点歌", "§c音乐的力量! §6点一首吧", MusicList, imagesw(MusicList), (pl, id) => MusicBack(pl, id));
}

function MusicBack (pl, id) {    
    if (id != null && id != MusicList.length - 1) {
        mc.runcmd("playsound \"" + MusicId[id] + "\" \"" + pl.name + "\"")
        pl.tell("<点歌>正在播放" + MusicList[id] + "(" + MusicId[id] +  ")...");
    } else if (id == MusicList.length - 1) {
        mc.runcmd("stopsound \"" + pl.name + "\"")
        pl.tell("<点歌>§4已停止播放所有音乐");
    }
}



function loading () {
    log(`[HULI] music By BIYUEHU`);
    log(`[HULI] music Version ${version}`);
    var ConfigIs = File.exists(MainPath);
    if (ConfigIs != true) {
        File.createDir(MainPath);
        File.createDir(MainPath + "data/");
        File.writeTo(MainPath + "config.json", "{\"name\":[\"みかん箱 - 雲流れ\",\"uBio高尾和树 - Secret Base\",\"riya - 小さなてのひら\",\"Candy_Wind - 和煦的糖果风\",\"羽肿 - 花火が瞬く夜に\",\"米津玄師 - 打上花火\"],\"id\":[\"ny_1\",\"ny_2\",\"ny_3\",\"ny_4\",\"ny_5\",\"ny_6\"]}  ")
        log('[HULI] music插件文件夹未创建，已自动创建!');
    }
}
