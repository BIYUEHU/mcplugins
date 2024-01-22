/***
 * @Author: BIYUEHU biyuehuya@qq.com
 * @Blog: http://hotaru.icu
 * @Date: 2022-10-22 15:28:49
 */

/* Function */
function SpawnManifest(name, descr, type = "resources") {
  return `{
    "format_version": 2,
    "header": {
        "name": "${name}",
        "description": "${descr}\\nby Tool MCSpawnPlayer\\nBlog:http://hotaru.icu",
        "uuid": "${UuidGet()}",
        "version": [0, 0, 1],
        "min_engine_version": [1, 16, 0]
    },    
    "modules": [
        {
            "description": "${descr}\\nby Tool MCSpawnPlayer\\nBlog:http://hotaru.icu",
            "type": "${type}",
            "uuid": "${UuidGet()}",
            "version": [0, 0, 1]
        }
    ]
}`;
}

function UuidGet() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

function AddZero(val, length = 5) {
  val = val.toString();
  zeroNum = length - val.length;
  let str = "";
  while (zeroNum > 0) {
    str += "0";
    zeroNum--;
  }
  return str + val;
}

function CopyDir(src, dest) {
  if (IsFileExist(dest) == false) {
    fs.mkdirSync(dest);
  }
  if (fs.existsSync(src) == false) {
    return false;
  }
  // console.log("src:" + src + ", dest:" + dest);
  // 拷贝新的内容进去
  var dirs = fs.readdirSync(src);
  dirs.forEach(function (item) {
    var item_path = path.join(src, item);
    var temp = fs.statSync(item_path);
    if (temp.isFile()) {
      // 是文件
      // console.log("Item Is File:" + item);
      fs.copyFileSync(item_path, path.join(dest, item));
    } else if (temp.isDirectory()) {
      // 是目录
      // console.log("Item Is Directory:" + item);
      CopyDirectory(item_path, path.join(dest, item));
    }
  });
}

module.exports = {
  UuidGet,
  SpawnManifest,
  AddZero,
  CopyDir,
};
