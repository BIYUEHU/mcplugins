"ui";
savewj();

ui.layout(
    <vertical padding="16">
        <horizontal>
            <text textColor="purple" textSize="18sp" layout_weight="1">编辑lang文件</text>
            <button id="save" text="保存" w="auto" style="Widget.AppCompat.Button.Borderless.Colored"/>
        </horizontal>
        <input id="content" h="*" gravity="top"/>
    </vertical>
);
var storage = storages.create("zh_CN.lang");
var content = storage.get("content");
if(content != null){
    ui.content.setText(content);
}
ui.save.click(()=>{
    storage.put("content", ui.content.text());


files.create("/sdcard/games/.byh.MCAddonBox/pack/re/texts/");

var lujing = "/sdcard/games/.byh.MCAddonBox/pack/re/texts/zh_CN.lang";

files.ensureDir(lujing);

var text = content;

var file = open(lujing, "w");

var jg = file.write(content);

file.close();

    toast("已保存至" + lujing);
    savewj();
});

function savewj () {
    
files.create("/sdcard/games/.byh.MCAddonBox/pack/re/texts/");

var lujing = "/sdcard/games/.byh.MCAddonBox/pack/re/texts/zh_CN.lang";

files.ensureDir(lujing);

var text = content;

var file = open(lujing, "w");

var jg = file.write(content);

file.close();

    toast("已保存至" + lujing);
}