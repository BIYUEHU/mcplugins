# ULANGFrame

[ULANGFrame 文档](https://iamlolicon.work/doc/ulangdoc)

[ULANGAddon-betaV0.1.0](https://github.com/biyuehu/ulangframe/releases/tag/ulang)

**ULANGFrame**(ULANG 框架)的制作初衷为

> 创造更多方便快捷的接口以及 UI 部分(主要是菜单型 UI)，以弥补官方脚本引擎接口的不足之处。

**ULANG**以**MinecraftBE**Addon(附加包)的 Script Engine(脚本引擎)为基础,在其官方给的已有 API 中进行扩展开发。

[](./ULANGbe/pack_icon.png)

### ScriptEngine

即**脚本引擎**,首次加入在 MinecraftBEbeta1.8.0.3 中。在其刚加入时部分开发者或玩家就已抱有期望；

脚本引擎属于基岩版**Addon(附加包)**的一部分，但与其它的在本质上就有极大不同，脚本引擎是由**JavaScript**语言承载，而不是 JSON 文件编写

这使脚本引擎在其本质上就有较大潜力，可通过监听游戏的各种事件来触发各种内容

### 初期制作

**ULANG**制作最初是来自**Log_record**(行为记录)Addon,开始制作于 2020 年 7 月份，后期也将其 Log_record 的内容作为 Api 加入到 ULANG 内

在目前**ULANG**已有多达 30Alpha 版本，具体内核版本数量更为甚多

### 目前依赖该前置 Addon 列表：

| 中文名字     | 英文名字 | 图标                                                                                               | 作者                              | 依赖版本           | 详细信息                                                                                                |
| ------------ | -------- | -------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------- |
| 基岩版工业 2 | BEic2    | <img src="https://img.imgdb.cn/item/5ffb0ec93ffa7d37b38b5097.png" alt="BEic2" style="zoom:25%;" /> | [@](https://space..com/293767574) | 自 V0.6.0 起       | [BEic2 基岩版工业 2 系列](https://.github.io/post/BEic2%E5%9F%BA%E5%B2%A9%E7%89%88%E5%B7%A5%E4%B8%9A2/) |
| 基岩版星系   | BEgc     | <img src="https://img.imgdb.cn/item/5f8bed041cd1bbb86b5543ff.png" alt="BEgc" style="zoom:25%;" />  | [@](https://space..com/293767574) | 自 beta1231pre1 起 | [BEgc 基岩版星系](https://.github.io/post/BEgc%E5%9F%BA%E5%B2%A9%E7%89%88%E6%98%9F%E7%B3%BB/)           |

**我们欢迎也支持更多创作者使用 ULANG！**

## 关于

本文档由\*\*\*\*编写，严禁转载

目前 ULANG 仍为半成品状态，服务端与客户端 API 已较为完善，但两者的 API 处于并立状态，配置项也仍未完全搬到同一边，强迫症可能会很难受

ULANG 的 H5UI 仅是示例的存在，后端(脚本引擎)的对接接口已具备

Alpha 阶段关闭，将发布第一个 beta 公开版本
