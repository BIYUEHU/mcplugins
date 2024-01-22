"ui";
//uuid获取
function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  //alert(uuid)
  setClip(uuid);
  toast(uuid + "已复制到剪贴板");

  return uuid;
}

function guanyu() {
  alert(
    "中文名字：" +
      name_cn +
      "\n英文名字：" +
      name_en +
      "\n版本：" +
      banben +
      "\n作者：" +
      "\n\n更新日志:\n0.1.4\n实装了熔炼配方文件生成按钮\n改善了导出按钮\n\n0.0.7\n实装了有序合成配方文件生成按钮\n\n0.0.6\n加入了UUID获取工具\n加入新建图标按钮实际作用\n现在新建包将会有默认图标\n更改了剩余UI布局等\n\n0.0.5\n美化了主要操作界面布局与UI等\n改了点细节\n\n\n0.0.4\n加了堆按钮\n实装了资源包manifest文件生成\n实装了行为包manifest文件生成\n实装了item资源文件\n实装了item行为文件生成\n实装了block行为文件生成"
  );
}

function fanhui() {
  ui.finish();
}

var color = "#CF2AB9E8";

ui.layout(
  <drawer id="drawer">
    <vertical>
      <appbar bg="#D300BFFF">
        <toolbar id="toolbar" title="生成manifest资源文件" />
        <tabs id="tabs" />
      </appbar>
      <viewpager id="viewpager">
        <frame>
          <ScrollView>
            <vertical>
              <text textSize="20sp" />
              <text
                text="生成manifest资源文件"
                textColor="yellow"
                textSize="24sp"
              />
              <text textSize="15sp" />

              <text text="包名字" textColor="black" textSize="20sp" />
              <input id="name" hint="不要太长" />

              <text textSize="10sp" />

              <text text="包简介" textColor="black" textSize="20sp" />
              <input id="jieshao" />

              <text textSize="10sp" />

              <text text="作者" textColor="black" textSize="20sp" />
              <input id="by" hint="直接输入作者名字" />

              <text textSize="10sp" />

              <text text="主版本号" textColor="black" textSize="20sp" />
              <input id="v1" hint="正整数" />

              <text textSize="10sp" />

              <text text="次版本号" textColor="black" textSize="20sp" />
              <input id="v2" hint="正整数" />

              <text textSize="10sp" />

              <text text="修正版本号" textColor="black" textSize="20sp" />
              <input id="v3" hint="正整数" />

              <text textSize="10sp" />

              <text textSize="10sp" />

              <button
                id="save"
                text="保存"
                style="Widget.AppCompat.Button.Colored"
              />
              <button
                id="back"
                text="返回"
                style="Widget.AppCompat.Button.Colored"
              />
            </vertical>
          </ScrollView>
        </frame>
      </viewpager>
    </vertical>
  </drawer>
);

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", (menu) => {
  menu.add("返回");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
  switch (item.getTitle()) {
    case "返回":
      fanhui();
      break;
  }
  e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

ui.back.click(() => {
  fanhui();
});

ui.save.click(() => {
  files.create("/sdcard/games/.byh.MCAddonBox/pack/re/");

  var lujing = "/sdcard/games/.byh.MCAddonBox/pack/re/manifest.json";

  files.ensureDir(lujing);

  var text =
    '{"format_version":1,"by":"本包使用MCAddonBox制作","header":{"name":"' +
    ui.name.text() +
    '","description":"' +
    ui.jieshao.text() +
    " 作者 " +
    ui.by.text() +
    ' 本包使用MCAddonBox制作","uuid":"' +
    uuid() +
    '","version":[' +
    ui.v1.text() +
    "," +
    ui.v2.text() +
    "," +
    ui.v3.text() +
    "]}," +
    '"modules":[{"description":"' +
    ui.jieshao.text() +
    '","type":"' +
    "resources" +
    '","uuid":"' +
    uuid() +
    '","version":[' +
    ui.v1.text() +
    "," +
    ui.v2.text() +
    "," +
    ui.v3.text() +
    "]" +
    "}]}";

  var file = open(lujing, "w");

  file.write(text);

  file.close();

  toast("已保存至" + lujing);
});
