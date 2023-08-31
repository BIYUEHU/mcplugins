const MainPath = "./plugins/biyuehu/email/";
const version = "1.0.0";
loading();

var Config = JSON.parse(File.readFrom(MainPath + "config.json"))
Config.title.push("§2草稿邮件")
Config.title.push("§1垃圾邮件")

var EmailList = Config.title;
function imagesw (array) {
    var image = [];
    for (i = 0;i < array.length;i++) {
        image.push("");
    }
    return image;
}

mc.regPlayerCmd("email", "Open my the email", (pl) => EmailMenu(pl), 0)
mc.regPlayerCmd("emailsend", "Send the email", (pl) => {
    pl.sendForm(EmailSendMenu(),function (pl) {
        pl.tell("<§3邮件§r>§e发送成功");
    });
}, 1)


mc.listen("onJoin", (pl) => {
    if (Config.time.length >= 1) {
        for (i = 0;i < Config.time.length;i++) {
            HasTag = pl.hasTag("email_" + Config.time[i]);
            if (HasTag == false) {
                pl.tell("<§3邮件§r>§e您有新的未读邮件!")
            }
        }
    }
});


function EmailMenu (pl) {    
    pl.sendSimpleForm("§b邮件", "", EmailList, imagesw(EmailList), (pl, id) => EmailBack(pl, id));
}

function EmailBack (pl, id) {    
    if (id != null ) {        
        HasTag = pl.hasTag("email_" + Config.time[id]);
        if (Config.other[id] == null || Config.other[id] == "") {
            if (HasTag != true) {
                buttons = ["§a标为已读"];
            } else {
                buttons = ["§7已读"];
            }
        } else {
            if (HasTag != true) {
                buttons = ["§c领取附件"]; 
            } else {
                buttons = ["§7已领取"];
            }   
        }

        if (id != Config.time.length && id != Config.time.length + 1) {
            var content = `§6标题:§r${Config.title[id]}\n§e发送者:${Config.sender[id]}\n§4发送日期:${Config.time[id]}\n§2正文:${Config.message[id]}\n§b附件:${Config.other[id]}`;
            pl.sendSimpleForm("§3邮件:" + Config.title[id], content, buttons, imagesw(buttons), function (pl, id2) {
                
                if (Config.cmd[id] != null || Config.cmd != "") {
                        HasTag = pl.hasTag("email_" + Config.time[id]);
                        if (HasTag != true) {
                        var CmdList = Config.cmd[id];
                        for (i = 0;i <= CmdList.length;i++) {
                            mc.runcmd("give \"" + pl.name + "\" " + CmdList[i]);
                        }
                    }
                } else {
                    EmailMenu(pl);
                }
                mc.runcmd("tag \"" + pl.name + "\" add email_" + Config.time[id])
            })
        } else if (id == Config.time.length) {
            pl.sendSimpleForm("§2草稿邮件", "暂无", ["返回"], [""], (pl) => EmailMenu(pl))
        } else if (id == Config.time.length + 1) {
            pl.sendSimpleForm("§1垃圾邮件", "暂无", ["返回"], [""], (pl) => EmailMenu(pl))
        }
    }
}


function EmailSendMenu() {
    var fm = mc.newCustomForm();
    fm.setTitle("§b邮件发送");
    fm.addInput("填写发送邮件的内容","这里写下内容");
    return fm;
}


function loading () {
    log(`[HULI] Email By BIYUEHU`);
    log(`[HULI] Email Version ${version}`);
    var ConfigIs = File.exists(MainPath);
    if (ConfigIs != true) {
        File.createDir(MainPath);
        File.writeTo(MainPath + "config.json", "{\"title\":[\"测试标题\",\"一个邮件\"],\"time\":[\"2022-1-21\",\"2022-1-19\"],\"sender\":[\"Server\",\"某位不愿透露姓名的玩家\"],\"message\":[\"这是一个测试的\",\"22222\"],\"other\":[\"minecraft:apple * 2\\nminecraft:iron_sword\",\"\"],\"cmd\":[[\"apple 2\",\"iron_sword 1\"],[]]}")
        log('[HULI] Email插件文件夹未创建，已自动创建!');
    }
}
