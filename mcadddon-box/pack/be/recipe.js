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
        <toolbar id="toolbar" title="生成recipes行为文件" />
        <tabs id="tabs" />
      </appbar>
      <viewpager id="viewpager">
        <frame>
          <ScrollView>
            <vertical>
              <text textSize="20sp" />
              <text
                text="生成recipes行为文件"
                textColor="yellow"
                textSize="24sp"
              />
              <text textSize="15sp" />

              <text text="配方类型" textColor="black" textSize="20sp" />
              <button
                id="hecheng_1"
                text="有序合成"
                style="Widget.AppCompat.Button.Colored"
              />
              <button
                id="hecheng_2"
                text="无序合成"
                style="Widget.AppCompat.Button.Colored"
              />
              <button
                id="hecheng_3"
                text="熔炼"
                style="Widget.AppCompat.Button.Colored"
              />
              <button
                id="hecheng_4"
                text="酿造"
                style="Widget.AppCompat.Button.Colored"
              />
              <button
                id="hecheng_5"
                text="切石机"
                style="Widget.AppCompat.Button.Colored"
              />
              <button
                id="hecheng_6"
                text="制图台"
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

ui.hecheng_1.click(() => {
  //engines.execScriptFile("recipe_1.js");
  engines.execScriptFile("./pack/be/recipe_1.js");
});

ui.hecheng_2.click(() => {
  //engines.execScriptFile("recipe_2.js")
  engines.execScriptFile("./pack/be/recipe_2.js");
});

ui.hecheng_3.click(() => {
  //engines.execScriptFile("recipe_3.js")
  engines.execScriptFile("./pack/be/recipe_3.js");
});

ui.hecheng_4.click(() => {
  //engines.execScriptFile("recipe_4.js")
  engines.execScriptFile("./pack/be/recipe_4.js");
});

ui.hecheng_5.click(() => {
  engines.execScriptFile("./pack/be/recipe_5.js");
});

ui.hecheng_6.click(() => {
  //engines.execScriptFile("recipe_6.js")
  engines.execScriptFile("./pack/be/recipe_6.js");
});
