const MainPath = "./plugins/biyuehu/lover/";
const version = "1.0.0";
loading();

var Config = JSON.parse(File.readFrom(MainPath + "config.json"))
var openmoney = Config.openMoney;
var mingiftmoney = Config.minGiftMoney;
var moneyname = Config.money.name;
var moneytype = Config.money.type;
var scores = Config.money.scores;


function imagesw (array) {
    var image = [];
    for (i = 0;i < array.length;i++) {
        image.push("");
    }
    return image;
}

function nowtime () {
    tm = system.getTimeObj();
    time = [tm.Y];
    time.push(tm.M);
    time.push(tm.D);
    return time;
}

function chatf (message, target) {
    target == null ? target == "@a" : target == target;
    mc.runcmd("tellraw " + target + " { \"rawtext\" : [ { \"text\" : \"" + message + "\" } ] }");
}

function addFavor(player, value) {
    var player = mc.getPlayer(player);
    if (player != null && player != {} && player != undefined) {
        if (File.exists(MainPath + "loverfavor/" + player.name + ".value") == true) {
            File.writeTo(MainPath + "loverfavor/" + player.name + ".value", parseInt(File.readFrom(MainPath + "loverfavor/" + player.name + ".value")) + value);
        } else {
            File.writeTo(MainPath + "loverfavor/" + player.name + ".value", value);
        }
        pl.tell(`<§l§cLoverAdmin§r>对玩家§b${pl.name}§r添加了 §5${value}好感值`);
    } else { 
        pl.tell("§c无法获取玩家信息或不在线");
    }
}

function delFavor(player, value) {
    var player = mc.getPlayer(player);
    if (player != null && player != {} && player != undefined) {
        if (File.exists(MainPath + "loverfavor/" + player.name + ".value") == true) {
            temp = parseInt(File.readFrom(MainPath + "loverfavor/" - player.name + ".value") - value);
            if (temp < 0) {temp = 0;}
            File.writeTo(MainPath + "loverfavor/" + player.name + ".value", temp);
        }
        pl.tell(`<§l§cLoverAdmin§r>对玩家§b${pl.name}§r删除了 §5${value}好感值`);
    } else { 
        pl.tell("§c无法获取玩家信息或不在线");
    }
}

function setFavor(player, value) {
    var player = mc.getPlayer(player);
    if (player != null && player != {} && player != undefined) {
        if (parseInt(value) < 0) {value = 0;}
        File.writeTo(MainPath + "loverfavor/" + player.name + ".value", value);
        pl.tell(`<§l§cLoverAdmin§r>对玩家§b${pl.name}§r设置为 §5${value}好感值`);
    } else { 
        pl.tell("§c无法获取玩家信息或不在线");
    }
}

function favorFavor(player) {
    var player = mc.getPlayer(player);
    if (File.exists(MainPath + "loverfavor/" + player.name + ".value") == true) {
        temp = File.readFrom(MainPath + "loverfavor/" + player.name + ".value");
    } else {temp = 0;}
    pl.tell(`<§l§cLoverAdmin§r>玩家§b${pl.name}§r的§5${value}好感值§r为${temp}`);
}

function restFavor(player) {
    var player = mc.getPlayer(player);
    if (player != null && player != {} && player != undefined) {
        File.delete(MainPath + "loverfavor/" + player.name + ".value");
        pl.tell(`<§l§cLoverAdmin§r>对玩家§b${pl.name}§r重置了 好感值`);
    } else { 
        pl.tell("§c无法获取玩家信息或不在线");
    }
}


mc.regPlayerCmd("lover", "/lover <Many parameters> About lover or spouse", (pl, args) => lover(pl, args), 0)
mc.regPlayerCmd("loveradmin", "/loveradmin <query|list|favor|add|del|rest|set> <playername> (<favorvalue>)", (pl, args) => loveradmin(pl, args), 1)


function lover (pl, args) {
    if (true) {
        if (args[0] == "con") {//1.一级参数匹配
            if (args[1] != "" && args[1] != null && args[1] != undefined) {//2.一级参数con时，二级参数不能为空
                if (File.readFrom(MainPath + "lover/" + args[1]) == null) {//3.读取对方的lover/文件以检测对方状态
                    if (args[1] != pl.name) {//4.检测告白玩家是否为自己
                        var player = mc.getPlayer(args[1]);
                        if (player != null && player != {} && player != undefined) {
                            File.writeTo(MainPath + "lover/" + pl.name, `{"state": "confess","other": "${player.name}","lovetime": ${JSON.stringify(nowtime())}}`)
                            File.writeTo(MainPath + "lover/" + player.name, `{"state": "forconfess","other": "${pl.name}","lovetime": ${JSON.stringify(nowtime())}}`)
                            if (args[2] == "open") {
                                chatf(`<§cLover§r>§l§e玩家${pl.name}§r大声的对§b${player.name}§r说:${args[2]}`);
                                player.tell(`<§cLover§r>玩家§b${pl.name}§r大声的对你说:${args[2]}`);
                            } else {
                                pl.tell(`<§cLover§r>你悄悄的对§b${player.name}§r说:${args[2]}`);
                                player.tell(`<§cLover§r>玩家§b${pl.name}§r悄悄的对你说:${args[2]}`);
                            }
                            player.tell("<§cLover§r>使用/lover accept 接受或/lover refuse 拒绝");  
                        } else {
                            pl.tell("§c无法获取玩家信息或不在线");
                        }
                    } else {
                        pl.tell("<§cLover§r>不能向自己表白!");
                    }
                } else {
                    pl.tell("<§cLover§r>§a对方或自己已有对象或处于表白、被表白中");
                }
            } else {
                pl.tell("§c操作失败");
            }
        } else if (args[0] == "accept") {
            json = File.readFrom(MainPath + "lover/" + pl.name);
            if (json != null && json != undefined) {
                json = JSON.parse(json);
                state = json.state;
                if (state == "forconfess") {
                    File.writeTo(MainPath + "lover/" + pl.name, `{"state": "lover","other": "${json.other}","lovetime": ${JSON.stringify(nowtime())}}`)
                    File.writeTo(MainPath + "lover/" + player.name, `{"state": "lover","other": "${pl.name}","lovetime": ${JSON.stringify(nowtime())}}`)

                    pl.tell(`<§cLover§r>现在你与玩家§b${json.other}§r已成为情侣`);
                    var player = mc.getPlayer(json.other);
                    if (player != null && player != {} && player != undefined) {
                        player.tell(`<§cLover§r>你的表白已被接受,现在你与玩家§b${pl.name}§r已成为情侣`);
                    }
                } else {
                    pl.tell("§c抛出异常")
                }
            } else {
                pl.tell("<§cLover§r>无人向你表白");
            }
        } else if (args[0] == "refuse") {            
            json = File.readFrom(MainPath + "lover/" + pl.name);
            if (json != null && json != undefined) {
                json = JSON.parse(json);
                state = json.state;
                if (state == "forconfess") {
                    File.delete(MainPath + "lover/" + pl.name)
                    File.delete(MainPath + "lover/" + player.name)

                    pl.tell(`<§cLover§r>你拒绝了玩家§b${json.other}§r的表白`);
                    var player = mc.getPlayer(json.other);
                    if (player != null && player != {} && player != undefined) {
                        player.tell(`<§cLover§r>你的表白遭到玩家§b${pl.name}§r拒绝`);
                    }
                } else {
                    pl.tell("§c抛出异常")
                }
            } else {
                pl.tell("<§cLover§r>无人向你表白");
            }
        } else if (args[0] == "pro") {
            if (args[1] != "" && args[1] != null && args[1] != undefined) {
                json = File.readFrom(MainPath + "lover/" + pl.name);
                if (json != null && json != undefined) {
                    json = JSON.parse(json);
                    state = json.state;
                    if (state == "lover") {
                        var player = mc.getPlayer(args[1]);
                        if (player != null && player != {} && player != undefined) {
                            lovetime = json.lovetime;
                            File.writeTo(MainPath + "lover/" + pl.name, `{"state": "propose","other": "${json.other}","protime": ${JSON.stringify(nowtime())},"lovetime":${JSON.stringify(lovetime)}}`)
                            File.writeTo(MainPath + "lover/" + player.name, `{"state": "forpropose","other": "${pl.name}","protime"1: ${JSON.stringify(nowtime())},"lovetime":${JSON.stringify(lovetime)}}`)

                            chatf(`<§cLover§r>§l§e玩家${pl.name}§r大声的向§b${player.name}§r求婚`);
                            player.tell(`<§cLover§r>玩家§b${pl.name}§r大声的向你求婚`);
                            player.tell("<§cLover§r>使用/lover accept2 接受或/lover refuse2 拒绝");  
                        } else {
                            pl.tell("§c无法获取玩家信息或不在线");
                        }
                    }
                } else {
                    pl.tell("<§cLover§r>§6你没有对象");
                }
            } else {
                pl.tell("§c操作失败");
            }
        } else if (args[0] == "accept2") {
            json = File.readFrom(MainPath + "lover/" + pl.name);
            if (json != null && json != undefined) {
                json = JSON.parse(json);
                state = json.state;
                if (state == "forpropose") {
                    lovetime = json.lovetime;
                    File.writeTo(MainPath + "lover/" + pl.name, `{"state": "spouse","other": "${json.other}","protime": ${JSON.stringify(nowtime())},"lovetime":${JSON.stringify(lovetime)}}`)
                    File.writeTo(MainPath + "lover/" + player.name, `{"state": "spouse","other": "${pl.name}","protime"1: ${JSON.stringify(nowtime())},"lovetime":${JSON.stringify(lovetime)}}`)

                    pl.tell(`<§cLover§r>现在你与玩家§b${json.other}§r已结为夫妻`);
                    var player = mc.getPlayer(json.other);
                    if (player != null && player != {} && player != undefined) {
                        player.tell(`<§cLover§r>恭喜~现在你与玩家§b${pl.name}§r已结为夫妻`);
                    }
                } else {
                    pl.tell("§c抛出异常")
                }
            } else {
                pl.tell("<§cLover§r>无人向你表白");
            }
        } else if (args[0] == "refuse2") {            
            json = File.readFrom(MainPath + "lover/" + pl.name);
            if (json != null && json != undefined) {
                json = JSON.parse(json);
                state = json.state;
                if (state == "forpropose") {
                    File.delete(MainPath + "lover/" + pl.name)
                    File.delete(MainPath + "lover/" + player.name)

                    pl.tell(`<§cLover§r>你拒绝了玩家§b${json.other}§r的求婚,关系破裂`);
                    var player = mc.getPlayer(json.other);
                    if (player != null && player != {} && player != undefined) {
                        player.tell(`<§cLover§r>很遗憾,你的求婚遭到玩家§b${pl.name}§r的拒绝,关系破裂`);
                    }
                } else {
                    pl.tell("§c抛出异常")
                }
            } else {
                pl.tell("<§cLover§r>无人向你表白");
            }
        } else if (args[0] == "gift") {
            json = File.readFrom(MainPath + "lover/" + pl.name);
            if (json != null && json != undefined) {//1.读取lover/文件 检测是否有关系
                json = JSON.parse(json);
                state = json.state;
                if (state == "lover" || state == "spouse" || state == "propose" || state == "forpropose") {//2.检测关系是否正确
                    var player = mc.getPlayer(json.other);
                    if (player != null && player != {} && player != undefined) {//3.检测对象玩家是否在线
                        gift == pl.getHand();
                        //根据经济类型获取玩家经济  
                        moneytype == "llmoney" ? havemoney = function () {return moeny.get(pl.xuid)} : havemoney = function() {return pl.getScore(moneyname)};
                        var back1 = function () {
                            if (type == "item") {
                                pl.tell(`<§cLover§r>已向玩家§b${player.name}§r送出了 §3${gift.name}(${gift.id})`);
                                player.tell(`<§cLover§r>玩家§e${pl.name}对你送出了 §3${gift.name}(${gift.id})`);
                            } else {
                                pl.tell(`<§cLover§r>已向玩家§b${player.name}§r送出了§g${args[4]}${moneyname}`);
                                player.tell(`<§cLover§r>玩家§e${pl.name}对你送出了 §g${args[4]}${moneyname}`);
                            }
                        }
                        var back2 = function (type) {
                            if (type == "item") {
                                pl.clearItem(gift.type);
                                player.giveItem(gift);
                            } else {                    
                                moneytype == "llmoney" ? money.reduce(pl.xuid, parseInt(args[3])) && money.add(player.xuid, parseInt(args[3])) : 
                                pl.reduceScore(scores, parseInt(args[3])) && player.addScore(scores, parseInt(args[3])) ;
                            }
                        }
                        var back3 = function (type) {
                            if (type == "item") {
                                mc.runcmd(`title @a title 玩家§b${player.name}§r收到了§e${pl.name}的礼物}`);
                                chatf(`§l<§cLover§r>@a 玩家§e${pl.name}对他/她的§c另一半 §b${player.xuid}§r送出了 §3${gift.name}(${gift.id})`);
                            } else {
                                mc.runcmd(`title @a title 玩家§b${player.name}§r收到了§e${pl.name}的礼物}`);
                                chatf(`§l<§cLover§r>@a 玩家§e${pl.name}对他/她的§c另一半 §b${player.xuid}§r送出了 §g${args[4]}${moneyname}`);
                            }
                        }
                        //重复内容预设置
    
                        if (args[2] == "item") {//4.礼物类型 物品    
                            if (gift != "" && gift != null && gift != undefined && gift != "minecraft:air") {//5.检测物品是否为空
                                if (args[1] == "open") {//6.送礼是否公开 是则减公开送礼手续费
                                    if (openmoney <= havemoney) {
                                        moneytype == "llmoney" ? money.reduce(pl.xuid, openmoney) : pl.reduceScore(moneyname);
                                        pl.tell("<§cLover§r>公开送礼手续费 金额-" + openmoney);
                                        back1("item");
                                        back2("item");
                                        back3("item");
                                    } else {
                                        pl.tell(`<§cLover§r>余额不足无法缴纳公开送你手续费§g${openmoney} `);
                                    }
                                } else {
                                    back1("item");
                                    back2("item");
                                }
                            } else {
                                pl.tell("<§cLover§r>礼物不能为空");
                            }
                        } else if (args[2] == "money") {//4.礼物类型 经济
                            if (args[1] == "open") {//6.送礼是否公开 是则减公开送礼手续费
                                if (parseInt(args[3]) >= mingiftmoney && parseInt(args[3]) + openmoney <= havemoney) {
                                    moneytype == "llmoney" ? money.reduce(pl.xuid, openmoney) : pl.reduceScore(moneyname);
                                    pl.tell("<§cLover§r>公开送礼手续费 金额-" + openmoney);
                                    back1;
                                    back2;
                                    back3;
                                } else {
                                    pl.tell(`<§cLover§r>你出的礼物金额低于服务器标准§g${mingiftmoney}${moneyname}§r或余额不足`);
                                }
                            } else {
                                if (parseInt(args[3]) >= mingiftmoney && parseInt(args[3]) <= havemoney) {
                                    back1;
                                    back2;
                                } else {
                                    pl.tell(`<§cLover§r>你出的礼物金额低于服务器标准§g${mingiftmoney}${moneyname}§r或余额不足`);
                                }
                            }
                        } else {
                            pl.tell("§c未知的参数,输入/lover help获取帮助");
                        }
                    } else { 
                        pl.tell("§c无法获取玩家信息或不在线");
                    }
                }
            } else {
                pl.tell("<§cLover§r>§6你没有对象");
            }
        } else if (args[0] == "end") {
            json = File.readFrom(MainPath + "lover/" + pl.name);
            if (json != null && json != undefined) {
                json = JSON.parse(json);
                state = json.state;
                if (state == "lover" || state == "spouse" || state == "propose" || state == "forpropose" || state == "confess" || state == "forconfess") {
                    File.delete(MainPath + "lover/" + pl.name)
                    File.delete(MainPath + "lover/" + player.name)
    
                    pl.tell(`<§cLover§r>已解除你与玩家§b${json.other}§r的任何关系`);
                    var player = mc.getPlayer(json.other);
                    if (player != null && player != {} && player != undefined && (json.other == "lover" || json.other == "spouse")) {
                        pl.tell(`<§cLover§r>很遗憾,玩家§b${pl.name}§r对你提出了分手或离婚`);
                    }
                } else {
                    pl.tell("§c抛出异常")
                }
            } else {
                pl.tell("<§cLover§r>§6你没有对象");
            }
        } else if (args[0] == "tp") {
            json = File.readFrom(MainPath + "lover/" + pl.name);
            if (json != null && json != undefined) {
                json = JSON.parse(json);
                state = json.state;
                if (state == "lover" || state == "spouse" || state == "propose" || state == "forpropose") {
                    var player = mc.getPlayer(json.other);
                    player != null && player != {} && player != undefined ? mc.runcmd(`tp ${pl.name} ${player.name}`) : pl.tell("§c无法获取玩家信息或不在线");
                }
            } else {
                pl.tell("<§cLover§r>§6你没有对象");
            }
        } else if (args[0] == "info") {
            json = File.readFrom(MainPath + "lover/" + pl.name);
            if (json != null && json != undefined) {
                json = JSON.parse(json);
                state = json.state;
                if (state == "lover") {state = "情侣"}
                if (state == "spouse") {state = "夫妻"}
                if (state == "confess") {state = "表白中"}
                if (state == "forconfess") {state = "被表白"}
                if (state == "propose") {state = "求婚中"}
                if (state == "forpropose") {state = "被求婚"}
                other = json.other;
                lovetime = json.lovetime[0] + '-' + json.lovetime[1] + '-' + json.lovetime[2];
                protime = json.time;
                if (protime != null && protime != undefined) {
                    protime = json.protime[0] + '-' + json.protime[1] + '-' + json.protime[2];
                } else {
                    protime = "NULL"
                }
                pl.tell(`<§cLover§r>查询信息:\n§3状态:§6${state}\n§3对象:§4${other}\n§3爱恋时间:§r${lovetime}\n§3结婚时间:§r${protime}`);
            } else {
                pl.tell("<§cLover§r>查询信息:\n§3你没有任何关系");
            }
        } else if (args[0] == "help" || args[0] == "?") {
            pl.tell(`§a---Lover帮助页---\n/lover con <playername玩家名字> <open|unopen表白是否公开(默认否)> 对指定玩家表白(需在线)\n/lover pro <playername玩家名字> 对指定玩家求婚(需在线且已是情侣状态),求婚全服公开\n/lover accept(2)|refuse(2) 接受或拒绝玩家的表白(求婚),拒绝则清除之间所有关系\n/lover gift <open|unopen表白是否公开(默认否)> <item|money礼物类型> (参数2为money时<金额数量(需>=最小礼物金额,公开额外扣除一定经济)>) 对指定玩家送出物品(当前手持)或经济(需在线且已是情侣或夫妻状态)\n/lover end 结束关系(适用于分手或离婚或表白求婚未果,双向)\n/lover tp 直接传送至对象所在位置(需在线且已是情侣或夫妻状态)\n/lover info 查询自己关系信息\n/lover help|? 获取lover插件帮助\nlover By BIYUEHU\nlover Version ${version}`);
        } else if (args[0] == "gui") {
            arrayList = ["我的关系", "我的好感值","好感值排行", "情侣传送"]
            pl.sendSimpleForm("§cLOVER§6菜单", "", arrayList, imagesw(arrayList), (pl, id) => MusicBack(pl, id));
        } else {
            pl.tell("§c未知的参数,输入/lover help获取lover插件帮助");
        }
    }
}


function loveradmin (pl, args) {
    if (args[0] == "query") {//1.一级参数匹配
        if (args[1] == "" && args[1] != null && args[1] != undefined) {player == args[1]} else {player == pl.name} //2.二级参数
        json = File.readFrom(MainPath + "lover/" + player);
        if (json != null && json != undefined) {
            json = JSON.parse(json);
            state = json.state;
            if (state == "lover") {state = "情侣"}
            if (state == "spouse") {state = "夫妻"}
            if (state == "confess") {state = "表白中"}
            if (state == "forconfess") {state = "被表白"}
            if (state == "propose") {state = "求婚中"}
            if (state == "forpropose") {state = "被求婚"}
            other = json.other;
            lovetime = json.lovetime[0] + '-' + json.lovetime[1] + '-' + json.lovetime[2];
            protime = json.time;
            if (protime != null && protime != undefined) {
                protime = json.protime[0] + '-' + json.protime[1] + '-' + json.protime[2];
            } else {
                protime = "NULL"
            }
            pl.tell(`<§l§cLoverAdmin§r>查询信息:\n§3状态:§6${state}\n§3对象:§4${other}\n§3爱恋时间:§r${lovetime}\n§3结婚时间:§r${protime}`);
        } else {
            pl.tell("<§l§cLoverAdmin§r>查询信息:\n§3对方没有任何关系");
        }
    } else if (args[0] == "list") {//1.一级参数匹配
        temp = File.getFilesList(MainPath + "lover/");
        var loverlist;
        for (i = 0;i < temp.length;i++) {
            if (loverlist == null || loverlist == null || loverlist == "") {
                loverlist = temp[i];
            } else {
                loverlist = loverlist + "," + temp[i];
            }
        }
        pl.tell(`<§l§cLoverAdmin§r>存在关系玩家列表:${loverlist}`);
    } else if (args[0] == "add") {//1.一级参数匹配
        if (args[1] == "" && args[1] != null && args[1] != undefined) {player == args[1]} else {player == pl.name} //2.二级参数
        if (args[2] == "" && args[2] != null && args[2] != undefined) {//3.三级参数
            addFavor(player, args[2]);
        } else {
            pl.tell("§c抛出异常");
        }
    } else if (args[0] == "del") {
        if (args[1] == "" && args[1] != null && args[1] != undefined) {player == args[1]} else {player == pl.name}
        if (args[2] == "" && args[2] != null && args[2] != undefined) {
            delFavor(player, args[2]);
        } else {
            pl.tell("§c抛出异常");
        }
    } else if (args[0] == "set") {
        if (args[1] == "" && args[1] != null && args[1] != undefined) {player == args[1]} else {player == pl.name}
        if (args[2] == "" && args[2] != null && args[2] != undefined) {
            setFavor(player, args[2]);
        } else {
            pl.tell("§c抛出异常");
        }
    } else if (args[0] == "favor") {
        if (args[1] == "" && args[1] != null && args[1] != undefined) {player == args[1]} else {player == pl.name}
        if (args[2] == "" && args[2] != null && args[2] != undefined) {
            favorFavor(player, args[2]);
        } else {
            pl.tell("§c抛出异常");
        }
    } else if (args[0] == "rest") {
        if (args[1] == "" && args[1] != null && args[1] != undefined) {player == args[1]} else {player == pl.name}
        if (args[2] == "" && args[2] != null && args[2] != undefined) {
            restFavor(player, args[2]);
        } else {
            pl.tell("§c抛出异常");
        }
    } else {
        pl.tell("§c未知的参数,输入/lover help获取lover插件帮助");
    }
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
    log(`[HULI] lover By BIYUEHU`);
    log(`[HULI] lover Version ${version}`);
    log(`[HULI] 当我发布并且你看到这个插件时，说明我已经弃坑了噢~本插件代码最后更新:2022-3-5`)
    var ConfigIs = File.exists(MainPath);
    if (ConfigIs != true) {
        File.createDir(MainPath);
        File.createDir(MainPath + "lover/");
        File.createDir(MainPath + "loverfavor/");
        File.writeTo(MainPath + "config.json", "{\"a\":\"aa\"}")
        log('[HULI] lover插件文件夹未创建，已自动创建!');
    }
}
