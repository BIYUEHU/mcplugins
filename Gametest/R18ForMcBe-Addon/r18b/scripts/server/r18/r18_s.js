const byh = server.registerSystem(0, 0);

byh.initialize = function () {
    function cmd (f) {
        var eventData = byh.createEventData("minecraft:execute_command");
        eventData.data.command = f;
        byh.broadcastEvent("minecraft:execute_command", eventData);
    }

    byh.registerEventData("byh:start_r18ui1", {});
    byh.registerEventData("byh:start_r18ui2", {});

    byh.listenForEvent("minecraft:entity_created", (eventData) => {
        entityid = eventData.data.entity.__identifier__;
        if (entityid == "byh:r18ui1_seed") {
            var byhData = byh.createEventData("byh:start_r18ui1");
            byhData.data = eventData.data;
            byh.broadcastEvent("byh:start_r18ui1", byhData);
        } else if (entityid == "byh:r18ui2_seed") {
            var byhData = byh.createEventData("byh:start_r18ui2");
            byhData.data = eventData.data;
            byh.broadcastEvent("byh:start_r18ui2", byhData);
        }
    })
}

byh.update = function () {};
byh.shutdown = function () {};