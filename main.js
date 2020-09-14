"ui";

var _proxy_port = 8080;

init_ui();

function init_ui() {
    ui.layout(
        <vertical>
            <appbar>
                <toolbar title="WiFi代理设置 v1.1"/>
            </appbar>
            <vertical padding="16">
                <vertical>
                    <text>代理IP</text>
                    <input id="proxy_ip" text="192.168.1.100"/>
                    <text>代理端口</text>
                    <radiogroup id="proxy_port" orientation="horizontal">
                        <radio text="8080" id="r1" marginRight="16" checked="true"></radio>
                        <radio text="8888" id="r2" marginRight="16"></radio>
                        <radio text="8866" id="r3" marginRight="16"></radio>
                    </radiogroup>
                </vertical>

                <vertical marginTop="16">
                    <text>[Android 7] 设置 → WLAN → 已连接 → 修改网络 → ...</text>
                    <horizontal>
                        <button id="open_android_7" text="开启代理" marginRight="10" style="Widget.AppCompat.Button.Colored"/>
                        <button id="close_android_7" text="关闭代理"/>
                    </horizontal>
                </vertical>

                <vertical marginTop="16">
                    <text>[Android 9] 设置 → WLAN → WLAN → 已连接 → 修改 → ...</text>
                    <horizontal>
                        <button id="open_android_9" text="开启代理" marginRight="10" style="Widget.AppCompat.Button.Colored"/>
                        <button id="close_android_9" text="关闭代理"/>
                    </horizontal>
                </vertical>
            </vertical>
        </vertical>
    );

    // Port checked
    ui.r1.on("click", (checked)=>{
        _proxy_port = 8080;
    });
    ui.r2.on("click", (checked)=>{
        _proxy_port = 8888;
    });
    ui.r3.on("click", (checked)=>{
        _proxy_port = 8866;
    });
    
    // Android 7
    ui.open_android_7.click(function(){
        auto(); // 检查无障碍
        var proxy_ip = ui.proxy_ip.getText();
        // ...
        threads.start(function(){
            open_android_7_handler(proxy_ip, _proxy_port);
        });
    });
    ui.close_android_7.click(function(){
        auto(); // 检查无障碍
        threads.start(function(){
            close_android_7_handler();
        });
    });

    // Android 9
    ui.open_android_9.click(function(){
        auto(); // 检查无障碍
        var proxy_ip = ui.proxy_ip.getText();
        // ...
        threads.start(function(){
            open_android_9_handler(proxy_ip, _proxy_port);
        });
    });
    ui.close_android_9.click(function(){
        auto(); // 检查无障碍
        threads.start(function(){
            close_android_9_handler();
        });
    });
}

/**
 * 开启代理（Android 7）
 * @param proxy_ip 
 * @param proxy_port 
 */
function open_android_7_handler(proxy_ip, proxy_port) {
    toast("自动开启代理 " + proxy_ip + ":" + proxy_port);

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
    toast("自动开启代理完毕");
}

/**
 * 关闭代理（Android 7）
 */
function close_android_7_handler() {
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

/**
 * 开启代理（Android 9）
 * @param proxy_ip 
 * @param proxy_port 
 */
function open_android_9_handler(proxy_ip, proxy_port) {
    toast("自动开启代理 " + proxy_ip + ":" + proxy_port);

    // 打开设置
    var settingsPackageName = app.getPackageName("设置");
    app.launchPackage(settingsPackageName)
    waitForPackage(settingsPackageName)

    // 滚动到顶部
    scrollUp();

    // 点击 WLAN
    while(!click("WLAN", 0));
    sleep(500);

    // 点击 WLAN
    while(!click("WLAN", 0));

    // 点击 已连接
    while(!click("已连接", 0));

    // 点击 修改
    className("android.widget.TextView").desc("修改").findOne().click();
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
    toast("自动开启代理完毕");
}

/**
 * 关闭代理（Android 9）
 */
function close_android_9_handler() {
    toast("自动关闭代理");
    
    // 打开设置
    var settingsPackageName = app.getPackageName("设置");
    app.launchPackage(settingsPackageName)
    waitForPackage(settingsPackageName)

    // 滚动到顶部
    scrollUp();

    // 点击 WLAN
    while(!click("WLAN", 0));
    sleep(500);

    // 点击 WLAN
    while(!click("WLAN", 0));

    // 点击 已连接
    while(!click("已连接", 0));

    // 点击 修改
    className("android.widget.TextView").desc("修改").findOne().click();
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