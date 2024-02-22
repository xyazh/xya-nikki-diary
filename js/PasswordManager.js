const PasswordManager = function (app) {
    this.app = app
    this.password = "";
    this.has_password = PasswordManager.hasPassword();

    this.inputPassword = function (loadFuc) {
        if(!PasswordManager.hasPassword()){
            loadFuc();
            return;
        }
        dialogs.rawInput("输入密码", "", (str) => {
            var str = String(str);
            var f = open("./data/ccpw.cc");
            var mpw = f.read();
            f.close();
            if ($crypto.digest(str, "SHA-256") == mpw) {
                this.password = $crypto.digest(str, "MD5");
                loadFuc();
                toast("密码正确");
            } else {
                toast("密码错误");
                setTimeout(function () {
                    ui.finish();
                }, 500);
            }
        })
    };

    this.deletePassword = function () {
        files.remove("./data/ccpw.cc")
        this.password = "";
        this.has_password = false;
        this.app.data_manager.save();
        this.app.page.changeMenuPW();
    };

    this.setPassword = function (str) {
        if (!this.has_password) {
            return true;
        }
        if (this.cheakPassword()) {
            this.password = str;
            return true;
        }
        return false;
    };

    this.getCcpw = function () {
        var str = String(str);
        if (!this.has_password) {
            return str;
        }
        var f = open("./js/data/ccpw.cc");
        var ccpw = f.read();
        f.close();
        return ccpw;
    };

    this.cheakPassword = function () {
        var ccpw = PasswordManager.getCcpw();
        return $crypto.digest(str, "SHA-256") == ccpw;
    };

    this.create = function () {
        dialogs.confirm("注意", "请牢记你的密码，忘记密码无任何手段恢复数据", (cheak) => {
            if (!cheak) {
                return;
            }
            var input_view = ui.inflate(
                <vertical>
                    <appbar bg="{{DATA_CONTAINER.ui_color}}">
                        <toolbar title="创建密码" />
                    </appbar>
                    <text size="12sp" margin="4 0 4 3" text="" />
                    <input hint="密码" id="p" password="true" />
                    <input hint="确认密码" id="cp" password="true" />
                </vertical>
            );
            dialogs.build({
                customView: input_view,
                positive: "确定",
                negative: "取消",
                // view高度超过对话框时是否可滑动
                wrapInScrollView: false,
                // 按下按钮时是否自动结束对话框
                autoDismiss: false
            }).on("positive", (dialog) => {
                var pw = String(input_view.p.getText());
                var cpw = String(input_view.cp.getText());
                if (pw != cpw) {
                    input_view.cp.setError("密码不一致");
                    return;
                }
                files.write("./data/ccpw.cc", $crypto.digest(pw, "SHA-256"), [encoding = "utf-8"]);
                this.password = $crypto.digest(pw, "MD5");
                this.has_password = true;
                this.app.data_manager.save();
                toast("创建成功");
                this.app.page.changeMenuPW();
                dialog.dismiss();
            }).on("negative", (dialog) => {
                dialog.dismiss();
            }).show();
        });
    }

    this.reCreate = function () {
        dialogs.confirm("注意", "请牢记你的密码，忘记密码无任何手段恢复数据", (cheak) => {
            if (!cheak) {
                return;
            }
            var input_view = ui.inflate(
                <vertical>
                    <appbar bg="{{DATA_CONTAINER.ui_color}}">
                        <toolbar title="修改密码" />
                    </appbar>
                    <text size="12sp" margin="4 0 4 3" text="" />
                    <input hint="密码" id="p" password="true" />
                    <input hint="确认密码" id="cp" password="true" />
                </vertical>
            );
            dialogs.build({
                customView: input_view,
                positive: "确定",
                negative: "取消",
                // view高度超过对话框时是否可滑动
                wrapInScrollView: false,
                // 按下按钮时是否自动结束对话框
                autoDismiss: false
            }).on("positive", (dialog) => {
                var pw = String(input_view.p.getText());
                var cpw = String(input_view.cp.getText());
                if (pw != cpw) {
                    input_view.cp.setError("密码不一致");
                    return;
                }
                files.write("./data/ccpw.cc", $crypto.digest(pw, "SHA-256"), [encoding = "utf-8"]);
                this.password = $crypto.digest(pw, "MD5");
                this.has_password = true;
                this.app.data_manager.save();
                toast("修改成功");
                this.app.page.changeMenuPW();
                dialog.dismiss();
            }).on("negative", (dialog) => {
                dialog.dismiss();
            }).show();
        });
    }
};

PasswordManager.hasPassword = function () {
    return files.exists("./data/ccpw.cc");
};



module.exports = PasswordManager;