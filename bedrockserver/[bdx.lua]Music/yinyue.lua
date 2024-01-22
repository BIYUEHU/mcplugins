--一个原理十分简单的插件
--第一次做lua插件awa大佬勿喷


--------这些内容不要乱改！-------

print("[BYH]点歌插件已加载成功")
print("[BYH]")



----------NPC打开GUI-------------
function yinyue_npc(name)  
    GUI(name,"yinyue")
end
----------NPC打开GUI-------------



---------监听玩家聊天内容--------

function yinyue_liaotian(name,command)
	if command == "yinyue" then
	GUI(name,"yinyue")
	return -1
	end
end
Listen("onCMD","yinyue_liaotian")

---------监听玩家聊天内容--------

--------这些内容不要乱改！-------




--vvv下面才是需要你改的地方
--------------GUI----------------
function yinyue(name,index,text)
    if index == 0 then
	   runCmd("playsound yinyue1 "..name) 
	end
	if index == 1 then
	   runCmd("playsound yinyue2 "..name) 
	end
	if index == 2 then
	   runCmd("playsound yinyue3 "..name)
	end
	if index == 3 then
       runCmd("playsound yinyue4 "..name) 
	end	
	if index == 4 then
       runCmd("playsound yinyue5 "..name) 
	end	
	if index == 5 then  --==后面的数字依次推
	   runCmd("playsound yinyue6 "..name)  --播放的音乐 
	end
	if index == 6 then 
       runCmd("stopsound "..name) 
	end	
end
--------------GUI----------------


