----------NPC打开GUI-------------
function xiangdao_npc(name)  
    GUI(name,"xinshou/xiangdao_gui")
end
function libao_npc(name)  
    GUI(name,"xinshou/libao_gui")
end
----------NPC打开GUI-------------



---------监听玩家聊天内容--------

function xinshou_liaotian(name,command)
	if command == "xs xd" then
	    GUI(name,"xinshou/xiangdao_gui")
	    return -1
    end
    if command == "xs lb" then
        GUI(name,"xinshou/libao_gui")
        return -1
    end
end
Listen("onCMD","xinshou_liaotian")

---------监听玩家聊天内容--------



---------新手向导UGUI-----------
function xiangdao_gui(name,index,text)
    if index == 0 then
		GUI(name,"xinshou/libao_gui")
	end
end
---------新手向导UGUI-----------



---------新手礼包UGUI-----------
function libao_gui(name,index,text)
    if index == 0 then
        runCmd('give @p[tag=!xinshou] stone_sword 1')
        runCmd('give @p[tag=!xinshou] iron_pickaxe 1')
        runCmd('give @p[tag=!xinshou] stone_axe 1')
        runCmd('give @p[tag=!xinshou] stone_shovel 1')
        runCmd('give @p[tag=!xinshou] snowball 16')
        runCmd('give @p[tag=!xinshou] apple 32')
        runCmd('give @p[tag=!xinshou] log 32')
        runCmd('title @p[tag=!xinshou] title §2领取成功')
        runCmd('title @p[tag=xinshou] title §4您已领取过！')
        runCmd('tag @p add xinshou')
	end
end
---------新手礼包UGUI-----------



--听说改这个都没🐎
print("[BYH]新手插件已加载成功")
print("[BYH]")