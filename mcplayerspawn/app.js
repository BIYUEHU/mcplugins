/***
 * @Author: BIYUEHU biyuehuya@qq.com
 * @Blog: http://hotaru.icu
 * @Date: 2022-10-22 10:44:20
 */
const fs = require("fs");
const readline = require("readline");
const method = require("./src/method.js");

let readline1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline1.question(
  ">> Choose your language\n0 => English\n1 => 中文简体\nOnly input the number\n",
  (language_chose) => {
    /* Language */
    const language_zh_cn = {
      welcome:
        "欢迎使用MCPlayerSpawn，由Biyuehu制作\n我的博客:http://hotaru.icu",
      inputName: "输入包的名字",
      inputDescr: "输入包的描述",
      inputPNum: "输入待处理的图片数量",
      inputRootPath: "输入包的输出位置(跳过则默认跟目录)",
      inputCompress: "是否压缩生成的JSON文件以减少占用(true 或 false)",
      resultSay: "生成完毕！\n失败操作数与成功操作数",
      copyFile: "复制文件",
      rename: "重命名文件",
      writeFile: "写入文件",
      failed: "失败",
      succeed: "成功",
    };

    const language_en = {
      welcome:
        "Welcome to using MCPlayerSpawn,By Biyuehu\nMy Blog:http://hotaru.icu",
      inputRootPath: "Input output path(it is root path if you jumped)",
      inputName: "Input name of pack",
      inputDescr: "Input describe of pack",
      inputPNum: "Input images of numbers",
      inputCompress: "If it compress json files of spawn(true or false)",
      resultSay: "Spawnning finish!\nfail and successful operation number",
      copyFile: "copy file",
      rename: "rename file",
      writeFile: "write file",
      failed: "failed",
      succeed: "succeed",
    };

    language_chose != 1
      ? (language = language_en)
      : (language = language_zh_cn);
    console.warn(language.welcome);

    readline1.question(">> " + language.inputRootPath + "\n", (rootPath) => {
      readline1.question(">> " + language.inputName + "\n", (packName) => {
        readline1.question(">> " + language.inputDescr + "\n", (packDescr) => {
          readline1.question(">> " + language.inputPNum + "\n", (pNum) => {
            readline1.question(
              ">> " + language.inputCompress + "\n",
              (compress) => {
                succeedNum = 0;
                failedNum = 0;
                fs.mkdir(rootPath + "/" + packName + "/", (err) => {
                  if (err) failedNum++;
                });
                const rePath =
                  rootPath + "/" + packName + "/" + packName + "_Re/";
                const bePath =
                  rootPath + "/" + packName + "/" + packName + "_Be/";

                /* Data Spawn */
                fs.mkdir(bePath, (err) => {
                  if (err) failedNum++;
                });
                fs.writeFile(
                  bePath + "manifest.json",
                  method.SpawnManifest(packName, packDescr, "data"),
                  (err) => {
                    if (err) {
                      console.log(
                        language.writeFile +
                          " manifest.json " +
                          language.failed +
                          ":" +
                          err
                      );
                      failedNum++;
                    } else {
                      console.log(
                        language.writeFile +
                          " manifest.json " +
                          language.succeed
                      );
                      succeedNum++;
                    }
                  }
                );
                fs.mkdir(bePath + "functions/", (err) => {
                  if (err) failedNum++;
                });

                fs.writeFile(
                  bePath + "functions/run_tplayer_player.mcfunction",
                  `scoreboard objectives add tplayer dummy tplayer
effect @e[scores={tplayer=-10000..9999}] invisibility 1 1 true
gamerule sendcommandfeedback false
gamerule commandblockoutput false
scoreboard players add @e[scores={tplayer=0..10000}] tplayer 1`,
                  (err) => {
                    if (err) failedNum++;
                  }
                );

                fs.writeFile(
                  bePath + "functions/start_tplayer.mcfunction",
                  `stopsound @a player_bgm 
playsound player_bgm @a
scoreboard players set @e[type=armor_stand] tplayer 0`,
                  (err) => {
                    if (err) failedNum++;
                  }
                );

                fs.writeFile(
                  bePath + "functions/stop_tplayer.mcfunction",
                  `scoreboard players set @e[scores={tplayer=0..10000}] tplayer -1
stopsound @a player_bgm`,
                  (err) => {
                    if (!err) succeedNum++;
                  }
                );

                fs.writeFile(
                  bePath + "functions/i_tplayer.mcfunction",
                  `setblock ~ ~15 ~ barrier
summon ~ ~16 ~ armor_stand
scoreboard players add @e[type=armor_stand] tplayer -1`,
                  (err) => {
                    if (err) failedNum++;
                  }
                );

                fs.writeFile(
                  bePath + "functions/tick.json",
                  `{	
    "values": [
        "run_tplayer",
        "run_tplayer_player"
    ]
}`,
                  (err) => {
                    if (err) failedNum++;
                  }
                );

                /* Resource Spawn */
                fs.mkdir(rePath, (err) => {
                  if (err) succeedNum++;
                });
                fs.mkdir(rePath + "particles/", (err) => {
                  if (err) failedNum++;
                });
                fs.mkdir(rePath + "textures/", (err) => {
                  if (err) failedNum++;
                });
                fs.mkdir(rePath + "textures/particles/", (err) => {
                  if (err) failedNum++;
                });
                fs.mkdir(rePath + "textures/particles/player/", (err) => {
                  if (err) failedNum++;
                });
                fs.mkdir(rePath + "sounds/", (err) => {
                  if (err) failedNum++;
                });

                fs.writeFile(
                  rePath + "manifest.json",
                  method.SpawnManifest(packName, packDescr),
                  (err) => {
                    if (err) {
                      console.log(
                        language.writeFile +
                          " manifest.json " +
                          language.failed +
                          ":" +
                          err
                      );
                      failedNum++;
                    } else {
                      console.log(
                        language.writeFile +
                          " manifest.json " +
                          language.succeed
                      );
                      succeedNum++;
                    }
                  }
                );

                let data_temp = "";
                for (let init = 0; init < pNum; init++) {
                  let init2 = method.AddZero(init);
                  compress == "true" || compress === true
                    ? (data = `{"format_version":"1.16.0","particle_effect":{"description":{"identifier":"p_${init2}","basic_render_parameters":{"material":"particles_alpha","texture":"textures/particles/player/p_${init2}.png"}},"components":{"minecraft:emitter_lifetime_once":{"active_time":0.05},"minecraft:emitter_rate_instant":{"num_particles":1},"minecraft:emitter_shape_point":{"direction":[1,0,0],"offset":[0,0,0]},"minecraft:particle_appearance_billboard":{"facing_camera_mode":"direction_z","size":[16.0,9.0]},"minecraft:particle_lifetime_expression":{"max_lifetime":0.07}}}}`)
                    : (data = `{
    "format_version": "1.10.0",
    "particle_effect": {
        "description": {
            "identifier": "p_${init2}",
            "basic_render_parameters": {
                "material": "particles_alpha",
                "texture": "textures/particles/player/p_${init2}.png"
            }
        },
        "components": {
            "minecraft:emitter_lifetime_once": {
                "active_time": 0.05
            },
            "minecraft:emitter_rate_instant": {
                "num_particles": 1
            },
            "minecraft:emitter_shape_point": {
                "direction": [1,0,0] ,
                "offset": [0,0,0]
            },
            "minecraft:particle_appearance_billboard": {
                "facing_camera_mode": "direction_z" ,
                "size":[16.0 , 9.0]
            },
            "minecraft:particle_lifetime_expression": {
                "max_lifetime": 0.07    
            }
        }
    }
}`);
                  fs.writeFile(
                    rePath + "particles/p_" + init2 + ".json",
                    data,
                    (err) => {
                      if (err) {
                        console.log(
                          language.writeFile +
                            " p_" +
                            init2 +
                            ".json " +
                            language.failed +
                            ":" +
                            err
                        );
                        failedNum++;
                      } else {
                        console.log(
                          language.writeFile +
                            " p_" +
                            init2 +
                            ".json " +
                            language.succeed
                        );
                        succeedNum++;
                      }
                    }
                  );

                  //Data Sapwn
                  data_temp += `execute @e[scores={tplayer=${init2}}] ~~~ particle p_${init2} ~~~\n`;
                }

                fs.writeFile(
                  bePath + "functions/run_tplayer.mcfunction",
                  data_temp,
                  (err) => {
                    if (err) failedNum++;
                  }
                );

                fs.writeFile(
                  rePath + "sounds/sound_definitions.json",
                  `{
    "format_version" : "1.16.0",
    "sound_definitions" : {

    "player_bgm" : {
        "category" : "music",
            "sounds" : [{
                "name": "sounds/player_bgm",
                "volume" : 5
            }]
        }
    }
}`,
                  (err) => {
                    if (err) {
                      console.log(
                        language.writeFile +
                          " sound_definitions.json " +
                          language.failed +
                          ":" +
                          err
                      );
                      failedNum++;
                    } else {
                      console.log(
                        language.writeFile +
                          " sound_definitions.json " +
                          language.succeed
                      );
                      succeedNum++;
                    }

                    console.log(
                      language.resultSay + ": " + failedNum + " / " + succeedNum
                    );
                  }
                );

                /* File */
                if (fs.existsSync("./pack_icon.png", (err) => {})) {
                  fs.copyFile(
                    "./pack_icon.png",
                    bePath + "pack_icon.png",
                    (err) => {
                      if (!err) {
                        console.log(language.copyFile + " pack_icon.png ");
                        succeedNum++;
                      } else {
                        console.log(
                          language.copyFile +
                            " pack_icon.png " +
                            language.failed
                        );
                        failedNum++;
                      }
                    }
                  );

                  fs.copyFile(
                    "./pack_icon.png",
                    rePath + "pack_icon.png",
                    (err) => {
                      if (!err) {
                        console.log(
                          language.copyFile +
                            " pack_icon.png " +
                            language.succeed
                        );
                        succeedNum++;
                      } else {
                        console.log(
                          language.copyFile +
                            " pack_icon.png " +
                            language.failed
                        );
                        failedNum++;
                      }
                    }
                  );
                }

                if (fs.existsSync("./player_bgm.ogg", (err) => {})) {
                  fs.copyFile(
                    "./player_bgm.ogg",
                    rePath + "sounds/player_bgm.ogg",
                    (err) => {
                      if (!err) {
                        console.log(
                          language.copyFile +
                            " player_bgm.ogg " +
                            language.succeed
                        );
                        succeedNum++;
                      } else {
                        console.log(
                          language.copyFile +
                            " player_bgm.ogg " +
                            language.failed
                        );
                        failedNum++;
                      }
                    }
                  );
                }

                if (fs.existsSync("./images", (err) => {})) {
                  const files = fs.readdirSync("./images");
                  let init3 = 0;
                  files.forEach((file, index) => {
                    init4 = method.AddZero(init3);
                    init3++;
                    init2 = method.AddZero(index);
                    fs.copyFile(
                      `./images/${files[index]}`,
                      rePath + `textures/particles/player/p_${init2}.png`,
                      (err) => {
                        if (!err) {
                          console.log(
                            language.copyFile +
                              " p_" +
                              init4 +
                              ".png " +
                              language.succeed
                          );
                          succeedNum++;
                        } else {
                          console.log(
                            language.copyFile +
                              " p_" +
                              init4 +
                              ".png " +
                              language.failed
                          );
                          failedNum++;
                        }
                      }
                    );
                  });
                }
              }
            );
          });
        });
      });
    });
  }
);
