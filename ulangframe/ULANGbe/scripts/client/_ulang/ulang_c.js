//日志
const log_kg = true;
//行为记录
const log_record_kg = false;

//进入世界介绍UI
const jieshaoui_jinrushijie = false;
//介绍UI使用默认
const jieshaoui_moren = true;
//介绍UI自定义目录（jieshaoui_moren为false才有效，相对于 资源包根目录/experimental_ui 文件夹）
const jieshaoui_mulu = '';

//仿控制台介绍聊天栏消息
const jinrushijie1_kg = true;
//进入世界打开聊天栏提示（聊天栏消息）
const jinrushijie2_kg = true;

//框架版本
const ulang_banben = 'beta V0.1.0';
//框架处于内嵌状态
const ulang_qianzhi = false;
//被内嵌Addon名字（ulang_qianzhi为true才有效）
const neiqian_addon = '';
//被内嵌Addon版本（ulang_qianzhi为true才有效）
const neiqian_banben = '';

/* //日志
const log_kg = true;
//行为记录
const log_record_kg = true;

//进入世界介绍UI
const jieshaoui_jinrushijie = true;
//介绍UI使用默认
const jieshaoui_moren = true;
//介绍UI自定义目录（jieshaoui_moren为tfalse才有效，相对于 资源包根目录/experimental_ui 文件夹）
const jieshaoui_mulu = ''; */

//获取系统 
const byh = client.registerSystem(0, 0);


//初始化
byh.initialize = function () {
    byh.registerEventData("byh:jinrushijie", {});
    byh.registerEventData("byh:log_kg", {});
    byh.registerEventData("byh:log_record_kg", {});
    byh.registerEventData("byh:jinrushijie1_kg", {});
    byh.registerEventData("byh:jinrushijie2_kg", {});
    byh.registerEventData("byh:ulang_banben", {});
    byh.registerEventData("byh:ulang_qianzhi", {});
    byh.registerEventData("byh:neiqian_addon", {neiqian_addon: neiqian_addon});
    byh.registerEventData("byh:neiqian_banben", {neiqian_banben: neiqian_banben});

    byh.registerEventData("byh:chatf", {v: null, n: null, c: null});

    byh.listenForEvent("minecraft:client_entered_world", function (byhevent) {
        //服务端minecraft:client_entered_world事件
        var eventData = byh.createEventData("byh:jinrushijie");
        eventData.data = byhevent.data;
        byh.broadcastEvent("byh:jinrushijie", eventData);
        //配置接口区1
        if (log_kg == true) {
            rizhi();
            var eventData = byh.createEventData("byh:log_kg");
            eventData.data = byhevent.data;
            byh.broadcastEvent("byh:log_kg", eventData);    
        }
        if (jieshaoui_jinrushijie == true) {
            start_jieshaoui();
        }
        if (log_record_kg == true) {
            logrecord.jiaruyouxi();
                        
            var eventData = byh.createEventData("byh:log_record_kg");
            eventData.data = byhevent.data;
            byh.broadcastEvent("byh:log_record_kg", eventData);            
        }
        if (jinrushijie1_kg == true) {
            var eventData = byh.createEventData("byh:jinrushijie1_kg");
            eventData.data = byhevent.data;
            byh.broadcastEvent("byh:jinrushijie1_kg", eventData);    
        }
        if (jinrushijie2_kg == true) {
            var eventData = byh.createEventData("byh:jinrushijie2_kg");
            eventData.data = byhevent.data;
            byh.broadcastEvent("byh:jinrushijie2_kg", eventData);    
        }
        var eventData = byh.createEventData("byh:ulang_banben");
        eventData.data = byhevent.data
        eventData.data.ulang_banben = ulang_banben;
        byh.broadcastEvent("byh:ulang_banben", eventData);

        
        if (ulang_qianzhi == true) {
            var eventData = byh.createEventData("byh:ulang_qianzhi");
            eventData.data = byhevent.data;
            byh.broadcastEvent("byh:ulang_qianzhi", eventData);    
        }
    })

    //UI
    byh.listenForEvent("byh:start_betaui0", start_betaui0);
    byh.listenForEvent("byh:start_wenjuanui", start_wenjuanui);      
    byh.listenForEvent("byh:start_jieshaoui", start_jieshaoui); 
    byh.listenForEvent("minecraft:ui_event", (eventdata) => ui_event(eventdata));

    //其它
}


//API区1
//UIApi Client
var ui = {
    //打开UI
    start_ui: function (a) {
        var eventData = byh.createEventData("minecraft:load_ui");
        eventData.data.path = a;
        byh.broadcastEvent("minecraft:load_ui", eventData);
    },

    //关闭UI
    stop_ui: function (b) {
        var eventData = byh.createEventData("minecraft:unload_ui");
        eventData.data.path = b;
        byh.broadcastEvent("minecraft:unload_ui", eventData);
    }
}



//其它Api Client
//发出消息
function chat (say) {
    var eventData = byh.createEventData("minecraft:display_chat_event");
    eventData.data.message = say;
    byh.broadcastEvent("minecraft:display_chat_event", eventData);
}

//发出消息（高级）
function chatf (v,n,c) {
    var event = byh.createEventData("byh:chatf");
    event.data = {};
    event.data.v = v;
    event.data.n = n;
    event.data.c = c;
    byh.broadcastEvent("byh:chatf", event);
}

// 输出消息至log文件
function log (rizhi) {
    console.log(rizhi);
}

//对象转字符串
function obj (qian) {
    hou = JSON.stringify(qian); 
    return hou;    
}

//log开关
function rizhi () {
    var eventData = byh.createEventData("minecraft:script_logger_config");
    eventData.data.log_information = true;  //脚本常规信息
    eventData.data.log_errors = true;  //脚本错误信息
    eventData.data.log_warnings = true;  //脚本警告信息
    byh.broadcastEvent("minecraft:script_logger_config", eventData);

    var logkg = eventData.data.log_information;
    if (logkg = true) {
        chat('客户端LOG已开启');
        console.log(('客户端LOG已开启'));        
    }else if (logkg = false) {
        chat('客户端LOG未打开');
        console.log('客户端LOG未打开');
    }else {
        chat('客户端LOG错误');
        console.log('客户端LOG错误');
    }
}



//Log record API
//1/5 + ui_event
var logrecord = {
    jiaruyouxi: function () {
        var neirong = 'Client: ' + '有新的玩家加入了游戏';
        chatf(neirong,'Log_record');
        log(neirong);
    }
}


//函数区1
function start_betaui0 () {
    ui.start_ui("ui/betaui0/betaui0.html");
}

function start_wenjuanui () {
    ui.start_ui("ui/wenjuanui/wenjuanui.html");    
}

function start_jieshaoui () {
    if (jieshaoui_moren == true) {
        ui.start_ui("ui/jieshaoui/jieshaoui.html");
    } else {
        ui.start_ui(jieshaoui_mulu);
    }
}

function ui_event (eventdata) {
    var eventData = eventdata.data;
    if (eventData === "wenjuanui_back_wenjuanui") {
        ui.stop_ui("ui/wenjuanui/exit.html");
        ui.start_ui("ui/wenjuanui/wenjuanui.html");
    } else if (eventData === "wenjuanui_start_no1html") {
        ui.stop_ui("ui/wenjuanui/wenjuanui.html");
        ui.start_ui("ui/wenjuanui/NO1.html");
    } else if (eventData === "wenjuanui_start_exithtml") {
        ui.stop_ui("ui/wenjuanui/wenjuanui.html");
        ui.start_ui("ui/wenjuanui/exit.html");   
	} else if (eventData === "wenjuanui_close_wenjuanui") {
        ui.stop_ui("ui/wenjuanui/wenjuanui.html");
    } else if (eventData === "wenjuanui_close_exithtml") {
        ui.stop_ui("ui/wenjuanui/exit.html");
    } else if (eventData === "wenjuanui_close_no1html") {
        ui.stop_ui("ui/wenjuanui/NO1.html");
    } else if (eventData === "wenjuanui_close_no2html") {
        ui.stop_ui("ui/wenjuanui/NO2.html");
    } else if (eventData === "wenjuanui_close_no3html") {
        ui.stop_ui("ui/wenjuanui/NO3.html");
    } else if (eventData === "wenjuanui_close_no4html") {
        ui.stop_ui("ui/wenjuanui/NO4.html");
    } else if (eventData === "wenjuanui_close_no4_1_html") {
        ui.stop_ui("ui/wenjuanui/NO4_1.html");
    } else if (eventData === "wenjuanui_close_wanchenghtml") {
        ui.stop_ui("ui/wenjuanui/wancheng.html");
    } else if (eventData === "wenjuanui_stop_wanchenghtml") {
        ui.stop_ui("ui/wenjuanui/wancheng.html");

    } else if (eventData === "wenjuanui_no1_daan_1") {
        no1_daan = '1题答案：是'
        ui.stop_ui("ui/wenjuanui/NO1.html");
        ui.start_ui("ui/wenjuanui/NO2.html");
    } else if (eventData === "wenjuanui_no1_daan_2") {
        no1_daan = '1题答案：否'
        ui.stop_ui("ui/wenjuanui/NO1.html");
        ui.start_ui("ui/wenjuanui/NO2.html");

    } else if (eventData === "wenjuanui_no2_daan_1") {
        no2_daan = '2题答案：是'
        ui.stop_ui("ui/wenjuanui/NO2.html");
        ui.start_ui("ui/wenjuanui/NO3.html");
    } else if (eventData === "wenjuanui_no2_daan_2") {
        no2_daan = '2题答案：否'
        ui.stop_ui("ui/wenjuanui/NO2.html");
        ui.start_ui("ui/wenjuanui/NO3.html");

    } else if (eventData === "wenjuanui_no3_daan_1") {
        no3_daan = '3题答案：是'
        ui.stop_ui("ui/wenjuanui/NO3.html");
        ui.start_ui("ui/wenjuanui/NO4.html");
    } else if (eventData === "wenjuanui_no3_daan_2") {
        no3_daan = '3题答案：否'
        ui.stop_ui("ui/wenjuanui/NO3.html");
        ui.start_ui("ui/wenjuanui/NO4.html");

    } else if (eventData === "wenjuanui_no4_daan_1") {
        no3_daan = '4题答案：很好'
        ui.stop_ui("ui/wenjuanui/NO4.html");
        ui.start_ui("ui/wenjuanui/wancheng.html");
    } else if (eventData === "wenjuanui_no4_daan_2") {
        no3_daan = '4题答案：好'
        ui.stop_ui("ui/wenjuanui/NO4.html");
        ui.start_ui("ui/wenjuanui/wancheng.html");
    } else if (eventData === "wenjuanui_no4_daan_3") {
        no3_daan = '4题答案：一般'
        ui.stop_ui("ui/wenjuanui/NO4.html");
        ui.start_ui("ui/wenjuanui/NO4_1.html");
    } else if (eventData === "wenjuanui_no4_daan_4") {
        no3_daan = '4题答案：差'
        ui.stop_ui("ui/wenjuanui/NO4.html");
        ui.start_ui("ui/wenjuanui/NO4_1.html");
    } else if (eventData === "wenjuanui_no4_daan_5") {
        no3_daan = '4题答案：很差'
        ui.stop_ui("ui/wenjuanui/NO4.html");
        ui.start_ui("ui/wenjuanui/NO4_1.html");
    } else if (eventData === "wenjuanui_no4_1_daan_1") {
        no3_daan = '4.1题答案：材质/模型/动画太差'
        ui.stop_ui("ui/wenjuanui/NO4_1.html");
        ui.start_ui("ui/wenjuanui/wancheng.html");
    } else if (eventData === "wenjuanui_no4_1_daan_2") {
        no3_daan = '4.1题答案：不耐玩'
        ui.stop_ui("ui/wenjuanui/NO4_1.html");
        ui.start_ui("ui/wenjuanui/wancheng.html");
    } else if (eventData === "wenjuanui_no4_1_daan_3") {
        no3_daan = '4.1题答案：太困难'
        ui.stop_ui("ui/wenjuanui/NO4_1.html");
        ui.start_ui("ui/wenjuanui/wancheng.html");
    } else if (eventData === "wenjuanui_no4_1_daan_4") {
        no3_daan = '4.1题答案：剧情不完整'
        ui.stop_ui("ui/wenjuanui/NO4_1.html");
        ui.start_ui("ui/wenjuanui/wancheng.html");
    } else if (eventData === "wenjuanui_no4_1_daan_5") {
        no3_daan = '4.1题答案：BUG多'
        ui.stop_ui("ui/wenjuanui/NO4_1.html");
        ui.start_ui("ui/wenjuanui/wancheng.html");
    } else if (eventData === "jieshaoui_start_wenjuanui") {
        ui.stop_ui("ui/jieshaoui/jieshaoui.html");   
        ui.start_ui("ui/wenjuanui/wenjuanui.html");
    } else if (eventData === "jieshaoui_start_xieyiui") {
        ui.stop_ui("ui/jieshaoui/jieshaoui.html");   
        ui.start_ui("ui/xieyiui/xieyiui.html");
    } else if (eventData === "jieshaoui_close_jieshaoui") {
        ui.stop_ui("ui/jieshaoui/jieshaoui.html");   

    } else if (eventData === "xieyiui_close_xieyiui") {
        ui.stop_ui("ui/xieyiui/xieyiui.html")
        

    } else if (eventData === "close_betaui0") {
        ui.stop_ui("ui/betaui0/betaui0.html");
    } 
    else {
        // chat("啥都莫得");
    }
}


//函数区3



//更新
byh.update = function() {
    
};



//退出
byh.shutdown = function () {
   /*  if (log_record_kg == true) {
        var eventData = byh.createEventData("byh:log_record_kg");
        eventData.data = byhevent.data;
        byh.broadcastEvent("byh:log_record_kg", eventData);            
        log("客户端行为记录已结束");
    } */
};



//废弃区
// byh.listenForEvent("byh:chat_s", (eventdata) => chat_s_chushi(eventdata))
/* function chat_s_chushi (eventdata) {
    say = eventdata.data;
    var eventData = byh.createEventData("minecraft:display_chat_event");
    eventData.data.message = say;
    byh.broadcastEvent("minecraft:display_chat_event", eventData);
}

function chat_c (say) {
    var eventData = byh.createEventData("byh:chat_c");
    eventData.data = say;
    byh.broadcastEvent("byh:chat_c", eventData);
}

function chat_s (say) {
    var eventData = byh.createEventData("byh:chat_s");
    eventData.data = say;
    byh.broadcastEvent("byh:chat_s", eventData);
} */
