插件名字:新手插件
插件作者:

插件平台:BedrockDedicatedServer(BDS)
插件前置:BDX
插件类型:BDXLua

插件介绍:
原本是仅为自己服务器做的，但现在已经跑路了
所以这个也就翻了出来发布
插件使用:
将lua文件夹与gui文件夹复制到BDS根目录下
启动exe

拥有新手向导和新手礼包两GUI功能
新手礼包每个玩家仅可领取一次，重置礼包输入 /tag @a remove xinshou 指令

输入 /xs xd 指令打开新手向导GUI
输入 /xs lb 指令打开新手礼包GUI

供NPC调用函数:
xiangdao_npc() 打开新手向导GUI
libao_npc() 打开新手礼包GUI

新手向导的GUI提示内容请更改 gui/xiangdao_gui 文件中的 content 选项
新手礼包的礼包内容以及触发指令请更改 lua/xinshou.lua 文件中的 libao_gui() 函数