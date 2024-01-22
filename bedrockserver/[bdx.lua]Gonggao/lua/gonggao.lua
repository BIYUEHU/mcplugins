----------NPC打开GUI-------------
function gonggao_npc(name)  
    GUI(name,"gonggao/gonggao_gui")
end
----------NPC打开GUI-------------



---------监听玩家聊天内容--------

function gonggao_liaotian(name,command)
	if command == "gonggao" then
	    GUI(name,"gonggao/gonggao_gui")
	    return -1
    end
end
Listen("onCMD","gonggao_liaotian")

---------监听玩家聊天内容--------



--听说改这个都没🐎
print("[BYH]公告插件已加载成功")
print("[BYH]")