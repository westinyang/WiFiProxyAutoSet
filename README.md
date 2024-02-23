![运行演示](./icon-128.png)

# WiFiProxyAutoSet

- [Gitee](https://gitee.com/westinyang/WiFiProxyAutoSet) 
- [Gtihub](https://github.com/westinyang/WiFiProxyAutoSet)

## 介绍

基于Auto.js无障碍开发的安卓端一键自动设置WiFi代理的APP，配合Fiddler、Burp、Charles等抓包工具使用，懒人必备！  
设备要求：Android 7.0 +  
最新版本：[WiFi代理设置_v1.1.apk](https://gitee.com/westinyang/WiFiProxyAutoSet/attach_files/477139/download)

## 测试设备

> 目前手上的测试机这有这些，其他机型未测试，不保证都能正常使用。  
> 理论上来说只要设备设置代理过程中都包含以下字样，就没什么问题。  
- [Android 7] 设置 -> WLAN -> 已连接 -> 修改网络 -> ...
- [Android 9] 设置 -> WLAN -> WLAN -> 已连接 -> 修改 -> ...  

| ROM  | Android版本  |
| ------------ | ------------ |
| AOSP  | 7 ~ 10  |
| Mokee  | 7 ~ 10  |
| LineageOS  | 7 ~ 10  |
| EMUI 10  | 10  |

## 运行效果

![运行演示](./screenshot/2.gif)

## 使用说明

1.  下载并安装APP
2.  首次点击“设置代理”，会跳转到系统无障碍设置界面，需要开启“WIFI代理设置”
3.  开启无障碍后，即可使用

## 打包教程

1.  手机端安装 Auto.js + Auto.js打包插件，并启用无障碍
2.  电脑端安装 VSCode + Auto.js插件
3.  Clone项目并用VSCode打开
4.  开启服务 `Auto.js: Start Server`
5.  手机端打开Auto.js，连接电脑
6.  保存项目到手机端 `Auto.js: SaveProject`
7.  手机端打开Auto.js，找到项目，进行打包

## 技术交流

- 关于作者：[I'm westinyang](https://kaihongpai.feishu.cn/wiki/CqWLwJRadibxztkrIWZcogWxnXd)

## 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request