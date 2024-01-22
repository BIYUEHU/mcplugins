"ui";

var banben = "0.3.3";

//uuid获取
function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  0;
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  //alert(uuid)
  setClip(uuid);
  toast(uuid + "已复制到剪贴板");

  return uuid;
}

//随机数获取
function suijishu() {
  for (let i = 0; i < 1; i++) {
    var r;
    do {
      r = random(1000000, 9999999);
    } while (exists[r]);
    //alert(r);
    sleep(400);
  }
  return r;
}

//是否安装游戏检测
var no_1 = "错误:未安装Minecraft国际基岩版或版本太老!";
var mc = "/sdcard/games/";
var mc_panduan = files.exists(mc);

if (mc_panduan == false) {
  alert(no_1);
  toast(no_1);
}

//开始包判断
var lujing = "/sdcard/games/.byh.MCAddonBox/pack/";
var pack_panduan = files.exists(lujing);

if (pack_panduan == false) {
  ui_1();
} else if (pack_panduan == true) {
  ui_2();
}

//新版本第一次进入日志弹出判断
files.create("/sdcard/Android/data/com.byh.mcaddonbox/");
files.create("/sdcard/Android/data/com.byh.mcaddonbox/v/");

var logyc = "/sdcard/Android/data/com.byh.mcaddonbox/v/" + banben;
var logyc_panduan = files.exists(logyc);

if (logyc_panduan == false) {
  files.create("/sdcard/Android/data/com.byh.mcaddonbox/v/" + banben);
  guanyu();
}

//触发事件
function guanyu() {
  engines.execScriptFile("./about.js");
}

function fanhui() {
  ui.finish();
}

function Byqq() {
  app.startActivity({
    action: "android.intent.action.VIEW",
    data:
      "mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=" + 2142124427,
    packageName: "com.tencent.mobileqq",
  });
}

function byb() {
  alert(":@");
}
function blog() {
  app.openUrl("https://.github.io");
}

function addonwiki() {
  app.openUrl("https://addonwiki.gitee.io");
}

//UI部分
var color = "#CF2AB9E8";

function ui_1() {
  ui.layout(
    <drawer id="drawer">
      <vertical>
        <appbar bg="#D300BFFF">
          <toolbar id="toolbar" title="包列表" />
          <tabs id="tabs" />
        </appbar>
        <viewpager id="viewpager">
          <frame>
            <ScrollView>
              <vertical>
                <text text="" textSize="230SP" />
                <text
                  text="新建一个包吧"
                  gravity="center"
                  color="green"
                  textSize="23SP"
                />
                <text
                  text="这里啥都莫得~(*+﹏+*)~"
                  gravity="center"
                  textSize="19SP"
                />
                <text text="" textSize="30SP" />
                <button
                  id="xinjian_bao"
                  text="新建包"
                  w="190SP"
                  layout_gravity="center"
                  style="Widget.AppCompat.Button.Colored"
                />
              </vertical>
            </ScrollView>
          </frame>
        </viewpager>
      </vertical>
    </drawer>
  );

  ui.xinjian_bao.click(() => {
    var info = rawInput("为这个包命个名字吧");

    files.create("/sdcard/games/.byh.MCAddonBox/pack/");
    files.create("/sdcard/games/.byh.MCAddonBox/pack/be/");
    files.create("/sdcard/games/.byh.MCAddonBox/pack/re/");
    files.create("/sdcard/games/.byh.MCAddonBox/pack/re/ui/");
    files.copy(
      "./res/pack_icon.png",
      "/sdcard/games/.byh.MCAddonBox/pack/be/pack_icon.png"
    );
    files.copy(
      "./res/pack_icon.png",
      "/sdcard/games/.byh.MCAddonBox/pack/re/pack_icon.png"
    );
    files.copy(
      "./res/pack_icon.png",
      "/sdcard/games/.byh.MCAddonBox/pack/be/mcaddonbox.png"
    );
    files.copy(
      "./res/pack_icon.png",
      "/sdcard/games/.byh.MCAddonBox/pack/re/mcaddonbox.png"
    );

    files.create("/sdcard/games/.byh.MCAddonBox/pack/info.ini");

    var lujing = "/sdcard/games/.byh.MCAddonBox/pack/info.ini";
    files.ensureDir(lujing);

    var file = open(lujing, "w");

    var jg = file.write(info);

    file.close();

    files.create("/sdcard/games/.byh.MCAddonBox/pack/re/ui/debug_screen.json");

    var lujing = "/sdcard/games/.byh.MCAddonBox/pack/re/ui/debug_screen.json";
    files.ensureDir(lujing);

    var file = open(lujing, "w");

    file.close();

    files.create("/sdcard/games/.byh.MCAddonBox/pack/re/loading_messages.json");

    var lujing = "/sdcard/games/.byh.MCAddonBox/pack/re/loading_messages.json";
    files.ensureDir(lujing);

    var file = open(lujing, "w");

    var jg = file.write(
      '{"\\u006c\\u006f\\u0061\\u0064\\u0069\\u006e\\u0067_\\u006d\\u0065\\u0073\\u0073\\u0061\\u0067\\u0065\\u0073":["§4本A\\u0064\\u0064\\u006f\\u006e使用 §2MCA\\u0064\\u0064\\u006f\\u006eB\\u006f\\u0078 §4制作 不可用于商业用途"]}'
    );

    file.close();

    files.create("/sdcard/games/.byh.MCAddonBox/pack/re/splashes.json");

    var lujing = "/sdcard/games/.byh.MCAddonBox/pack/re/splashes.json";
    files.ensureDir(lujing);

    var file = open(lujing, "w");

    file.close();
    ui_2();
  });
}

function ui_2() {
  ui.layout(
    <drawer id="drawer">
      <vertical>
        <appbar bg="#D300BFFF">
          <toolbar id="toolbar" title="MCAddon_Box" />
          <tabs id="tabs" />
        </appbar>
        <viewpager id="viewpager">
          <frame>
            <ScrollView>
              <vertical>
                <text text="" textSize="15SP" />
                <text text="基础操作" color="black" textSize="20SP" />
                <text text="重命名" color="black" textSize="17SP" />
                <input id="cmm" hint="为包重命名" />
                <button
                  id="cmmb"
                  text="重命名"
                  color="black"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="shanchu_bao"
                  text="删除包"
                  color="red"
                  style="Widget.AppCompat.Button.Colored"
                />
              </vertical>
            </ScrollView>
          </frame>
          <frame>
            <ScrollView>
              <vertical>
                <text text="" textSize="15SP" />
                <text text="资源包" color="black" textSize="20SP" />
                <button
                  id="sc_re_manifest"
                  text="生成manifest.json资源文件"
                  color="yellow"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="sc_re_item"
                  text="生成items资源文件"
                  color="yellow"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="blocks"
                  text="编辑blocks.json文件"
                  color="purple"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="terrain_texture"
                  text="编辑terrain_texture.json文件"
                  color="purple"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="item_texture"
                  text="编辑item_texture.json文件"
                  color="purple"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="lang"
                  text="编辑lang文件"
                  color="purple"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="re_icon"
                  text="更改pack_icon图标文件"
                  color="red"
                  style="Widget.AppCompat.Button.Colored"
                />
              </vertical>
            </ScrollView>
          </frame>
          <frame>
            <ScrollView>
              <vertical>
                <text text="" textSize="15SP" />
                <text text="行为包" color="black" textSize="20SP" />
                <button
                  id="sc_be_manifest"
                  text="生成manifest.json行为文件"
                  color="yellow"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="sc_be_item"
                  text="生成items行为文件"
                  color="yellow"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="sc_be_block"
                  text="生成blocks行为文件"
                  color="yellow"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="sc_be_recipe"
                  text="生成recipes行为文件"
                  color="yellow"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id=""
                  text="管理function文件"
                  color="green"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="be_icon"
                  text="更改pack_icon图标文件"
                  color="red"
                  style="Widget.AppCompat.Button.Colored"
                />
              </vertical>
            </ScrollView>
          </frame>
          <frame>
            <ScrollView>
              <vertical>
                <text text="" textSize="15SP" />
                <text text="导出" color="black" textSize="20SP" />
                <button
                  id="daochu_1"
                  text="导入到游戏新地图内并开始测试"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="daochu_2"
                  text="导入到游戏文件夹"
                  style="Widget.AppCompat.Button.Colored"
                />
                <button
                  id="daochu_3"
                  text="压缩成.zip文件"
                  style="Widget.AppCompat.Button.Colored"
                />
                <text text="" textSize="10SP" />
                <text text="其它" color="black" textSize="20SP" />
                <button
                  id="guanyu_an"
                  text="关于"
                  style="Widget.AppCompat.Button.Colored"
                />
              </vertical>
            </ScrollView>
          </frame>
        </viewpager>
      </vertical>
      <vertical layout_gravity="left" bg="#FF74FFA8" w="220">
        <list id="menu">
          <horizontal bg="?selectableItemBackground" w="*">
            <img w="50" h="50" padding="16" src="{{this.icon}}" />{" "}
            <text
              textColor="black"
              textSize="15sp"
              text="{{this.title}}"
              layout_gravity="center"
            />
          </horizontal>
        </list>
      </vertical>
    </drawer>
  );

  //创建选项菜单(右上角)
  ui.emitter.on("create_options_menu", (menu) => {
    menu.add("包信息");
    menu.add("关于");
  });
  //监听选项菜单点击
  ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
      case "包信息":
        var info = files.read("/sdcard/games/.byh.MCAddonBox/pack/info.ini");

        alert("包信息", "包名字:" + info);
        break;
      case "关于":
        guanyu();
        break;
    }
    e.consumed = true;
  });
  activity.setSupportActionBar(ui.toolbar);

  //设置滑动页面的标题
  ui.viewpager.setTitles(["基础操作", "资源包", "行为包", "其它"]);
  //让滑动页面和标签栏联动
  ui.tabs.setupWithViewPager(ui.viewpager);

  //让工具栏左上角可以打开侧拉菜单
  ui.toolbar.setupWithDrawer(ui.drawer);

  ui.menu.setDataSource([
    {
      title: "UUID生成",
      icon: "@drawable/ic_date_range_black_48dp",
    },
    {
      title: "联系作者",
      icon: "@drawable/ic_account_box_black_48dp",
    },
    {
      title: "作者博客",
      icon: "@drawable/ic_loyalty_black_48dp",
    },
    {
      title: "关注作者",
      icon: "@drawable/ic_thumb_up_black_48dp",
    },
    {
      title: "附加包维基",
      icon: "@drawable/ic_drafts_black_48dp",
    },
    {
      title: "退出",
      icon: "@drawable/ic_exit_to_app_black_48dp",
    },
    {
      title: "关于",
      icon: "@drawable/ic_report_black_48dp",
    },
  ]);

  ui.menu.on("item_click", (item) => {
    switch (item.title) {
      case "UUID生成":
        uuid();
        break;
      case "联系作者":
        Byqq();
        break;
      case "关于":
        guanyu();
        break;
      case "作者博客":
        blog();
        break;
      case "关注作者":
        byb();
        break;
      case "附加包维基":
        addonwiki();
        break;
      case "退出":
        fanhui();
        break;
    }
  });

  ui.shanchu_bao.click(() => {
    files.removeDir(lujing);
    ui_1();
  });

  ui.sc_re_manifest.click(() => {
    engines.execScriptFile("./pack/re/manifest.js");
  });

  ui.sc_be_manifest.click(() => {
    engines.execScriptFile("./pack/be/manifest.js");
  });

  ui.sc_be_item.click(() => {
    engines.execScriptFile("./pack/be/item.js");
  });

  ui.sc_re_item.click(() => {
    engines.execScriptFile("./pack/re/item.js");
  });

  ui.sc_be_block.click(() => {
    engines.execScriptFile("./pack/be/block.js");
  });

  ui.sc_be_recipe.click(() => {
    engines.execScriptFile("./pack/be/recipe.js");
  });

  ui.blocks.click(() => {
    engines.execScriptFile("./pack/re/blocks.json.js");
  });

  ui.terrain_texture.click(() => {
    engines.execScriptFile("./pack/re/terrain_texture.json.js");
  });

  ui.item_texture.click(() => {
    engines.execScriptFile("./pack/re/item_texture.json.js");
  });

  ui.lang.click(() => {
    engines.execScriptFile("./pack/re/lang.js");
  });

  ui.guanyu_an.click(() => {
    guanyu();
  });

  ui.cmmb.click(() => {
    files.create("/sdcard/games/.byh.MCAddonBox/pack/info.ini");

    var lujing = "/sdcard/games/.byh.MCAddonBox/pack/info.ini";
    files.ensureDir(lujing);
    //var text = "{\n\b\"pack_name\":\"" + info + "\",\n\b\"time\":\"" + uuid() + "\"\n\b}";

    var file = open(lujing, "w");

    var jg = file.write(ui.cmm.text());

    file.close();
  });

  ui.re_icon.click(() => {
    engines.execScriptFile("./pack/re/icon.js");
  });

  ui.be_icon.click(() => {
    engines.execScriptFile("./pack/be/icon.js");
  });

  ui.daochu_1.click(() => {
    engines.execScriptFile("./tool/ceshi.js");

    toast(launchApp("Minecraft"));
    toast("正在打开游戏ing...");
  });

  ui.daochu_2.click(() => {
    uuidf = uuid();
    files.copy(
      "/sdcard/games/.byh.MCAddonBox/pack/re/",
      "/sdcard/games/com.mojang/development_resource_packs/pack_" + uuidf + "/"
    );
    files.copy(
      "/sdcard/games/.byh.MCAddonBox/pack/be/",
      "/sdcard/games/com.mojang/development_behavior_packs/pack_" + uuidf + "/"
    );
    toast(
      "导入成功\n资源包:/sdcard/games/com.mojang/development_resource_packs/pack_" +
        uuidf +
        "/\n行为包:/sdcard/games/com.mojang/development_behavior_packs_packs/pack_" +
        uuidf +
        "/"
    );
  });

  ui.daochu_3.click(() => {
    // 1. 压缩文件夹
    // 要压缩的文件夹路径
    let dir = "/sdcard/games/.byh.MCAddonBox/pack/";
    // 压缩后的文件路径
    let zipFile = "/sdcard/games/pack_" + uuid() + ".zip";
    $files.remove(zipFile);
    $zip.zipDir(dir, zipFile);
    toast("成功保存至" + zipFile);
  });
}
