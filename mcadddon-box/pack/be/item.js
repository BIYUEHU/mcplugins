"ui";

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
        <toolbar id="toolbar" title="生成items行为文件" />
        <tabs id="tabs" />
      </appbar>
      <viewpager id="viewpager">
        <frame>
          <ScrollView>
            <vertical>
              <text textSize="20sp" />
              <text
                text="生成items行为文件"
                textColor="yellow"
                textSize="24sp"
              />
              <text textSize="15sp" />

              <text text="文件名字" textColor="black" textSize="20sp" />
              <input id="wj" hint="不用带后缀" />

              <text textSize="10sp" />

              <text text="命名空间:ID" textColor="black" textSize="20sp" />
              <input id="ID" hint="如 byh:abc" />

              <text textSize="10sp" />

              <text text="属性" textColor="black" textSize="20sp" />
              <text textSize="5sp" />
              <checkbox id="hand_equipped" text="为手持装备" />

              <text textSize="5sp" />
              <checkbox id="stacked_by_data" checked="true" text="可堆叠" />

              <text textSize="5sp" />
              <checkbox id="foil" text="带附魔光泽" />

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
  files.create("/sdcard/games/.byh.MCAddonBox/pack/be/");
  files.create("/sdcard/games/.byh.MCAddonBox/pack/be/items/");

  var lujing =
    "/sdcard/games/.byh.MCAddonBox/pack/be/items/" + ui.wj.text() + ".json";

  files.ensureDir(lujing);

  var text =
    '{"format_version":"1.16","by":"本包使用MCAddonBox制作","minecraft:item":{"description":{"identifier":"' +
    ui.ID.text() +
    '"},"components":{"minecraft:hand_equipped":' +
    ui.hand_equipped.checked +
    ',"minecraft:stacked_by_data":' +
    ui.stacked_by_data.checked +
    ',"minecraft:foil":' +
    ui.foil.checked +
    "}}}";
  var file = open(lujing, "w");

  var jg = file.write(text);

  file.close();

  toast("已保存至" + lujing);
});
