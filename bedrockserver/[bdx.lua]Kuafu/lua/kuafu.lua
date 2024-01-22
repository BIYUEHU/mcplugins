


----------NPC打开GUI-------------
function kuafu_npc(name)  
    GUI(name,"kuafu_gui")
end
----------NPC打开GUI-------------



---------监听玩家聊天内容--------

function kuafu_liaotian(name,command)
	if command == "kuafu" then
	GUI(name,"kuafu_gui")
	return -1
	end
end
Listen("onCMD","kuafu_liaotian")

---------监听玩家聊天内容--------



--------------GUI----------------


-----------主页面GUI-------------
function kuafu_gui(name,index,text)
    if index == 0 then
		GUI(name,"kuafu_gui_1")
	end
	if index == 1 then
		GUI(name,"kuafu_gui_2")	
	end
end
-----------主页面GUI-------------



-----------子页面GUI1------------
function kuafu_gui_1(name,index,text)
	if index == 0 then
		runCmd("transfer "..name.." 服务器IP ".."端口")
	end
	if index == 1 then  --退出GUI，不需要写任何参数
	
	end
end
-----------子页面GUI1------------


-----------子页面GUI2------------
function kuafu_gui_2(name,index,text)
	if index ==  0 then
		runCmd("transfer "..name.." 服务器IP ".."端口")
	end
	if index == 1 then --同上

	end
end	
-----------子页面GUI2------------


-----------子页面GUI3------------
function kuafu_gui_3(name,index,text)
	if index ==  0 then
		runCmd("")
	end
	if index == 1 then --同上

	end
end	
-----------子页面GUI3------------
--依次这样套即可，但注意空格以及数字！！！这些都会有一个对应的GUI文件


--------------GUI----------------



--听说改这个都没🐎
print("[BYH]跨服传送插件已加载成功")
print("[BYH]")
