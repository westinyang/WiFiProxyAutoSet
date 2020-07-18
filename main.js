"ui";

init_ui();

function init_ui() {
    ui.layout(
        <vertical padding="16">
            <text textSize="16sp" textColor="black" text="代理IP"/>
            <input id="proxy_ip" text="192.168.1.100"/>
            <text textSize="16sp" textColor="black" text="代理端口"/>
            <input id="proxy_port" text="8080"/>
            <button id="open" text="设置代理"/>
            <button id="close" text="关闭代理"/>
        </vertical>
    );
    
    ui.open.click(function(){
        var proxy_ip = ui.proxy_ip.getText();
        var proxy_port = ui.proxy_port.getText();
        // ...
        threads.start(function(){
            open_proxy(proxy_ip, proxy_port);
        });
    });
    ui.close.click(function(){
        threads.start(function(){
            close_proxy();
        });
    });
}

/**
 * 自动设置代理
 * @param proxy_ip 
 * @param proxy_port 
 */
function open_proxy(proxy_ip, proxy_port) {
    // 检查无障碍
    auto();
    toast("自动设置代理 " + proxy_ip + ":" + proxy_port);

    // 打开设置
    var settingsPackageName = app.getPackageName("设置");
    app.launchPackage(settingsPackageName)
    waitForPackage(settingsPackageName)

    // 滚动到顶部
    scrollUp();

    // 点击 WLAN
    while(!click("WLAN", 0));

    // 长按 第一个已连接的WIFI
    while(!longClick("已连接", 0));

    // 点击 修改网络
    while(!click("修改网络", 0));
    sleep(500);
    back();
    sleep(500);

    // 判断是否已经设置代理
    if (text("手动").exists()) {
        // 点击 代理设置--手动
        while(!click("手动", 0));
        // 点击 代理设置--手动
        while(!click("手动", 0));
    } else {
        // 点击 高级选项
        while(!click("高级选项", 0));
        // 点击 代理设置--无
        while(!click("无", 0));
        // 点击 代理设置--手动
        while(!click("手动", 0));
    }

    // 设置ip、port
    id("proxy_hostname").findOne().setText("" + proxy_ip);
    id("proxy_port").findOne().setText("" + proxy_port);

    // 点击 保存
    while(!click("保存", 0));

    // 返回
    home();
    toast("自动设置代理完毕");
}

/**
 * 自动关闭代理
 */
function close_proxy() {
    // 检查无障碍
    auto();
    toast("自动关闭代理");
    
    // 打开设置
    var settingsPackageName = app.getPackageName("设置");
    app.launchPackage(settingsPackageName)
    waitForPackage(settingsPackageName)

    // 滚动到顶部
    scrollUp();

    // 点击 WLAN
    while(!click("WLAN", 0));

    // 长按 第一个已连接的WIFI
    while(!longClick("已连接", 0));

    // 点击 修改网络
    while(!click("修改网络", 0));
    sleep(500);
    back();
    sleep(500);

    // 判断是否已经设置代理
    if (text("手动").exists()) {
        // 点击 代理设置--手动
        while(!click("手动", 0));

        // 点击 代理设置--无
        while(!click("无", 0));
    }

    // 点击 保存
    while(!click("保存", 0));

    // 返回
    home();
    toast("自动关闭代理完毕");
}