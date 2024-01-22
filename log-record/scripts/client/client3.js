/*
 * ©2020
 * 在GitHub开源
 * 仅供参考
 * 严禁盗版抄袭
 */

let byh = client.registerSystem(0, 0);

byh.initialize = function () {
  byh.listenForEvent("byh:shijian1", betaUi);
  byh.listenForEvent("byh:shijian2", unBetaUi);
  byh.listenForEvent("byh:shijian3", betaUi);
};

function betaUi() {
  let eventData = byh.createEventData("minecraft:load_ui");
  eventData.data.path = "betaGui/betaGui.html";
  eventData.data.options.is_showing_menu = false;
  byh.broadcastEvent("minecraft:load_ui", eventData);
}

function unBetaUi() {
  let eventData = byh.createEventData("minecraft:unload_ui");
  eventData.data.path = "betaGui/betaGui.html";
  byh.broadcastEvent("minecraft:unload_ui", eventData);
}
