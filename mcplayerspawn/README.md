# MCPlayerSpawn

MPS 为半自动化的自定义`视频播放Addon`生成工具，基于**NodeJS**
**NodeJS 推荐版本:**^14.17.0
![](https://pic1.imgdb.cn/item/635401cd16f2c2beb1172f2e.png)
![](https://pic1.imgdb.cn/item/635401cd16f2c2beb1172f2a.png)

之所以是半自动，因为还是需要你去找工具逐帧拆分视频

## 使用方式

方法一:装好 NodeJS，在项目地址栏输入`cmd`回车，输入`node app.js`，然后照着输入
方法二:下载打包好的可执行程序直接打开
可选内容:
如需设置图标与 OGG 音频，请将其分别重命名为`pack_icon.png`、`player_bgm.ogg`与 MPS 程序置于同一目录
逐帧图片则在 MPS 同一目录新建`images`文件夹，将所有图片放入于此，MPS 会自动重命名(但还是推荐自己用工具批量重命名为统一格式，这样弄可能会造成一定程度上的音画不同步)
以上内容均可在生成完后手动加入，因此为可选

在游戏内，分别依次操作
第一步:选个心仪的播放位置输入

```cmd
/function i_tplayer
```

若无效，则在心仪的位置放置一个盔甲架，输入

```cmd
/scoreboard players add @e[type=armor_stand] tplayer -1
```

第二步:开始播放

```cmd
/function start_tplayer
```

停止播放

```cmd
/function stop_tplayer
```

单独播放音乐

```cmd
/playsound player_bgm @p
```

详细内容:[http://hotaru.icu/index.php/archives/213/](http://hotaru.icu/index.php/archives/213/)
