
菜鸟第一次做lua插件awa大佬勿喷
前置：BDX
支持游戏版本：1.16.X

----------------------------------------------------分鸽线----------------------------------------------------------------
食用方法：
1.将yinyue.lua复制到 BDS根目录/lua 文件夹内
2.将yinyue复制到 BDS根目录/gui 文件夹内
3.将资源包复制到  BDS根目录/resource_packs 文件夹内与 BDS根目录/worlds/地图名字/resource_packs文件夹内
4.在 BDS根目录/worlds/地图名字 文件夹内新建名为“world_resource_pack_history.json”文件
并复制粘贴以下内容：
{
        {
            "can_be_redownloaded":false,
            "name":"OCS音乐包",
            "uuid":"0905bad1-f0af-43ae-be5f-103e85591733",
            "version":[
                2,
                0,
                0]
        }
} 
5.在 BDS根目录/worlds/地图名字 文件夹内新建名为“world_resource_packs.json”文件
并复制粘贴以下内容：
{
    {
        "pack_id" : "0905bad1-f0af-43ae-be5f-103e85591733",
        "version" : [ 2, 0, 0 ]
    }
}

详细的服务器装载资源包/行为包教程请参考之前我在发的教程视频：
https://www..com/video/BV1B54y1Q7vV

6.开服！


更改菜单方法：
1.首先在yinyue.lua 文件里从40行起为可编辑区域，如要添加音乐则在倒数第三个end的后面(57行)换行添加以下内容：
if index == 5 then  --==后面的数字依次推
   runCmd("playsound yinyue6 "..name)  --播放的音乐 
end

2.在yinyue 文件里添加新的按钮：
text=按钮名字

3.修改 资源包根目录/sounds/sound_definitions.json  文件：
  "yinyue6": {  //使用playsound指令需要输入的内容
    "max_distance": 64.0,
    "sounds": [
      {
        "name": "sounds/oc/6",  //音乐文件路径，注：MC只支持ogg音频格式，不支持MP3
        "stream": true,
        "volume": 0.5
      }
    ]
  },

如果不会JSON请不需要随意修改json文件，否则格式可能会出错！
