import { World } from "Minecraft";

World.events.beforeChat.subscribe((event) => {
  var message = event.message;

  if (/%location/.test(message) == true) {
    sendlocation(event);
  } else if (/%health/.test(message) == true) {
    sendHealth(event);
  }
});

function sendlocation(event) {
  var message = event.message;

  var x = parseInt(event.sender.location.x);
  var y = parseInt(event.sender.location.y);
  var z = parseInt(event.sender.location.z);

  var locationback = `(§6${x},${y},${z}§r)`;
  //返回坐标格式

  if ("%location" == message) {
    var back = locationback;
  } else {
    var back = `${message}${locationback}`;
  }

  event.message = back;
  return event;
}

function sendHealth(event) {
  var message = event.message;

  const players = event.sender;
  const h = players.getComponent("health").current;

  var healthback = `(§c${h}§r)`;
  //返回血量格式

  if ("%health" == message) {
    var back = healthback;
  } else {
    var back = `${message}${healthback}`;
  }

  event.message = back;
  return event;
}

//听说改这个的都没马噢
const version = "1.0.0";
console.log(`[HULI]QuickSend加载成功 版本:${version}`);
console.log(`[HULI]QuickSend `);
