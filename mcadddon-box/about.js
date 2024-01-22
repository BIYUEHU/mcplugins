"ui";

ui.layout(
  <drawer id="drawer">
    <vertical>
      <appbar bg="#D300BFFF">
        <toolbar id="toolbar" title="关于" />
        <tabs id="tabs" />
      </appbar>
      <viewpager id="viewpager">
        <frame>
          <ScrollView>
            <vertical padding="16">
              <text textSize="25" textStyle="bold" textColor="black">
                中文名字:MCAddon工具箱
              </text>
              <text textSize="25" textStyle="bold" textColor="black">
                英文名字:MCAddonBox
              </text>
              <text textSize="25" textStyle="bold" textColor="black">
                版本:0.3.3
              </text>
              <text textSize="25" textStyle="bold" textColor="black">
                作者:
              </text>
              <text textSize="25" textStyle="bold" textColor="black">
                作者博客:https://.github.io
              </text>
              <text textSize="25" textStyle="bold" textColor="#FF0000">
                声明:
              </text>
              <text textSize="18" textColor="#FF0000">
                禁止使用本软件以及本软件所制作内容进行商业使用，小心作者找你喝茶
              </text>
              <text textSize="25sp"></text>
              <text textSize="20" textColor="#00ff00">
                更新日志:
              </text>
              <text textSize="23" textColor="#00ff00">
                0.3.3
              </text>
              <text textSize="20" textColor="#00ff00">
                弃坑了弃坑了,不出意外是最后一个版本
              </text>
              <text textSize="20" textColor="#00ff00">
                更改了UI布局
              </text>
              <text textSize="20" textColor="#00ff00">
                新增生成合成文件可视化界面
              </text>
              <text textSize="20" textColor="#00ff00">
                新增生成合成文件切石机,制图台,酿造台功能
              </text>
              <text textSize="20" textColor="#00ff00">
                新增三种导出功能
              </text>
              <text textSize="20" textColor="#00ff00">
                新增关于界面
              </text>
              <text textSize="20" textColor="#00ff00">
                更改了图标
              </text>
              <text textSize="20" textColor="#00ff00">
                新增编辑blocks.json文件功能
              </text>
              <text textSize="20" textColor="#00ff00">
                新增编辑terrain_texture.json文件功能
              </text>
              <text textSize="20" textColor="#00ff00">
                新增编辑item_texture.json文件功能
              </text>
              <text textSize="20" textColor="#00ff00"></text>
              <text textSize="23" textColor="#00ff00">
                0.2.9
              </text>
              <text textSize="20" textColor="#00ff00">
                加了几个可视化界面
              </text>
              <text textSize="20" textColor="#00ff00">
                加了些东西
              </text>
              <text textSize="20" textColor="#00ff00">
                实装了一些功能
              </text>
              <text textSize="20" textColor="#00ff00">
                优化了一些功能
              </text>
              <text textSize="20" textColor="#00ff00"></text>
              <text textSize="23" textColor="#00ff00">
                0.1.4
              </text>
              <text textSize="20" textColor="#00ff00">
                实装了熔炼配方文件生成按钮
              </text>
              <text textSize="20" textColor="#00ff00">
                改善了导出按钮
              </text>
              <text textSize="20" textColor="#00ff00"></text>
              <text textSize="23" textColor="#00ff00">
                0.0.7
              </text>
              <text textSize="20" textColor="#00ff00">
                实装了有序合成配方文件生成按钮
              </text>
              <text textSize="20" textColor="#00ff00"></text>
              <text textSize="23" textColor="#00ff00">
                0.0.6
              </text>
              <text textSize="20" textColor="#00ff00">
                加入了UUID获取工具
              </text>
              <text textSize="20" textColor="#00ff00">
                加入新建图标按钮实际作用
              </text>
              <text textSize="20" textColor="#00ff00">
                现在新建包将会有默认图标
              </text>
              <text textSize="20" textColor="#00ff00">
                更改了剩余UI布局等
              </text>
              <text textSize="20" textColor="#00ff00"></text>
              <text textSize="23" textColor="#00ff00">
                0.0.4
              </text>
              <text textSize="20" textColor="#00ff00">
                加了堆按钮
              </text>
              <text textSize="20" textColor="#00ff00">
                实装了资源包manifest文件生成
              </text>
              <text textSize="20" textColor="#00ff00">
                实装了行为包manifest文件生成
              </text>
              <text textSize="20" textColor="#00ff00">
                实装了item资源文件
              </text>
              <text textSize="20" textColor="#00ff00">
                实装了item行为文件生成
              </text>
              <text textSize="20" textColor="#00ff00">
                实装了block行为文件生成
              </text>
              <text textSize="20" textColor="#00ff00"></text>
              <button
                id="fanhui"
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

ui.fanhui.click(() => {
  ui.finish();
});
