const byh = client.registerSystem(0, 0);

byh.initialize = function () {
    byh.listenForEvent("minecraft:client_entered_world", /* start_r18ui3() */ui.start_ui("byh/ui/r18/r18ui1.html"))

    // byh.listenForEvent("byh:start_r18ui1", /* start_r18ui1() */ui.start_ui("byh/ui/r18/r18ui1.html"))
    // byh.listenForEvent("byh:start_r18ui2", /* start_r18ui2() */ui.start_ui("byh/ui/r18/r18ui2.html"))
    byh.listenForEvent("minecraft:ui_event", (eventdata) => ui_event(eventdata));
}


var ui = {
    start_ui: function (a) {
        var eventData = byh.createEventData("minecraft:load_ui");
        eventData.data.path = a;
        byh.broadcastEvent("minecraft:load_ui", eventData);
    },

    stop_ui: function (b) {
        var eventData = byh.createEventData("minecraft:unload_ui");
        eventData.data.path = b;
        byh.broadcastEvent("minecraft:unload_ui", eventData);
    }
}



function start_r18ui1 () {
    
}

function start_r18ui2 () {
    
}

function start_r18ui3 () {
        ui.start_ui("byh/ui/r18/r18ui3.html");
}


function ui_event (eventdata) {
    var eventData = eventdata.data;
    if (eventData === "close_r18ui1") {
        ui.stop_ui("byh/ui/r18/r18ui1.html");
    } else if (eventData === "close_r18ui2") {
        ui.stop_ui("byh/ui/r18/r18ui2.html");
    } else if (eventData === "close_r18ui3") {
        ui.stop_ui("byh/ui/r18/r18ui3.html");
    } else {}
}

byh.update = function() {};
byh.shutdown = function () {};