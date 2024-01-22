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
        <toolbar id="toolbar" title="生成blocks行为文件" />
        <tabs id="tabs" />
      </appbar>
      <viewpager id="viewpager">
        <frame>
          <ScrollView>
            <vertical>
              <text textSize="20sp" />
              <text
                text="生成blocks行为文件"
                textColor="yellow"
                textSize="24sp"
              />
              <text textSize="15sp" />

              <text text="文件名字" textColor="black" textSize="20sp" />
              <input id="wj" hint="不用带后缀" />

              <text textSize="10sp" />

              <text text="命名空间:ID" textColor="black" textSize="20sp" />
              <input id="ID" hint="如 byh:abc" />

              <text textSize="5sp" />
              <checkbox id="menu" text="注册到创造物品栏" />

              <text textSize="10sp" />

              <text text="属性" textColor="black" textSize="20sp" />
              <text text="方块挖掘所需时间" textColor="black" textSize="20sp" />
              <input id="destroy_time" hint="浮点数，单位:秒" />

              <text text="阻止光吸收程度" textColor="black" textSize="20sp" />
              <input id="block_light_absorption" hint="浮点数" />

              <text text="阻止光反射程度" textColor="black" textSize="20sp" />
              <input id="block_light_emission" hint="浮点数" />

              <text text="方块在地图上颜色" textColor="black" textSize="20sp" />
              <input id="map_color" hint="十六进制值" />

              <text text="方块抗爆性" textColor="black" textSize="20sp" />
              <input id="explosion_resistance" hint="如 byh:abc" />

              <text text="方块摩擦力" textColor="black" textSize="20sp" />
              <input id="friction" hint="浮点数，值越大越滑 0.0摩擦力最大" />

              <text text="方块可燃性" textColor="black" textSize="20sp" />
              <input id="flammable" hint="百分比0.0~10.0，0.0为不可燃" />

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
  files.create("/sdcard/games/.byh.MCAddonBox/pack/be/blocks/");

  var lujing =
    "/sdcard/games/.byh.MCAddonBox/pack/be/blocks/" + ui.wj.text() + ".json";

  files.ensureDir(lujing);

  var text =
    '{"format_version":"1.16","by":"本包使用MCAddonBox制作","minecraft:block":{"description":{"identifier":"' +
    ui.ID.text() +
    '","register_toeative_menu":' +
    ui.menu.checked +
    ',"is_experimental":false},"components":{"minecraft:destroy_time":' +
    ui.destroy_time.text() +
    ',"minecraft:block_light_absorption":' +
    ui.block_light_absorption.text() +
    ',"minecraft:block_light_emission":' +
    ui.block_light_emission.text() +
    ',"minecraft:map_color":"' +
    ui.map_color.text() +
    '","minecraft:explosion_resistance":' +
    ui.explosion_resistance.text() +
    ',"minecraft:friction":' +
    ui.friction.text() +
    ',"minecraft:flammable":' +
    ui.flammable.text() +
    "}}}";
  var file = open(lujing, "w");

  var jg = file.write(text);

  file.close();

  toast("已保存至" + lujing);
});
