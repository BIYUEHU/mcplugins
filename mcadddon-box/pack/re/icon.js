"ui";
var color = "#CF2AB9E8";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar bg="#D300BFFF">
                <toolbar id="toolbar" title="更改pack_icon资源文件"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>   
    <ScrollView>
    <vertical>    
       <text textSize="20sp" />
       <text text="更改pack_icon资源文件" textColor="red" textSize="24sp"/>
       <text textSize="15sp" />
       
       <img id="yl" src="file:///sdcard/games/.byh.MCAddonBox/pack/re/pack_icon.png"  w="100" h="100" borderWidth="2dp" borderColor="#202020" />
       <input id="lj" w="*" text="/sdcard/games/.byh.MCAddonBox/pack/re/pack_icon.png" />
       <button id="genggai_img" w="auto" text="更改图片" />
    </vertical>
    </ScrollView>
                </frame>
            </viewpager>
        </vertical>
    </drawer>
);


ui.genggai_img.on("click", ()=>{
    files.copy(ui.lj.text(), "/sdcard/games/.byh.MCAddonBox/pack/re/pack_icon.png");   
    var yuan = "file://" + ui.lj.text();
    ui.yl.setSource(yuan)
    toast("已更换")
})
