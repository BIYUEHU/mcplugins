# Manifests 生成器

## 什么是 Manifest?

**Manifest 是指 manifest.json 文件,在 Minecraft 基岩版中用于定义包的各种信息**例如：包名字、简介、版本、作者等....  
这是一个能够快速生成 manifest.json 文件的工具，不再需要手写，以便节约了许多时间  
在线生成网站:[https://.github.io/manifestgenerator](https://.github.io/manifestgenerator)

## 如何使用?

目前可生成四种类型的包的 manifest：  
Resource packs(资源包)  
Behavior packs(行为包)  
Skin packs(皮肤包)  
World template packs(世界模板包)

\<包名字\>  
包的名字,任意字符串,必要.  
\<包简介\>  
包的描述,任意字符串,必要  
\<主版本号\>  
第一个版本号,0 ~ Max 的数字,必要.  
\<次版本号\>  
第二个版本号,0 ~ Max 的数字,必要  
\<PackRevisedVersion\>  
第三个版本号,1 ~ Max 的数字,必要  
\<包最低支持游戏版本\>  
包能够支持的最低游戏版本号,格式为:x.x.x,非必要  
\<PackAuthors\>  
包作者名字,任何字符串,非必要  
\<PackLicense\>  
包的协议,任何字符串,非必要  
\<PackUrl\>  
包相关的网页链接,任何字符串,非必要

## 关于

**作者:**  
作者博客:[https://.github.com](https://.github.com)
