"ui";

const HtmlView = require("../js/HtmlView.js");
const EasyList = require("../js/EasyList.js");
const Utils = require("../js/Utils.js");

const DATA_CONTAINER = {};
DATA_CONTAINER.page_number = 0;
DATA_CONTAINER.title = "主页";
DATA_CONTAINER.TEKOKI_TEXT_SIZE = 48;
DATA_CONTAINER.addZero = Utils.addZero;
DATA_CONTAINER.tekoki_event = "默认";
DATA_CONTAINER.stringToColor = Utils.stringToColor;
DATA_CONTAINER.ui_color = "#77aaff";
DATA_CONTAINER.main_bg_color = "#ffffff";
DATA_CONTAINER.dis_text_color = "#757575";
DATA_CONTAINER.normal_text_color = "#000000";
DATA_CONTAINER.tekoki_btn_text_color = "#666666";
DATA_CONTAINER.setting_title_text_color = "#77aaff";
DATA_CONTAINER.card_bg_color = "#ffffff";
DATA_CONTAINER.tine_color = "#ffffff";
DATA_CONTAINER.line_color = "#dadada";
DATA_CONTAINER.button_color = "#03A9F4";
DATA_CONTAINER.btn_text_color = "#ffffff";

ui.layout(
    <frame id="write_viar" w="*" h="*">
        <vertical>
            <vertical id="write_viar_tob">
                <text color="{{DATA_CONTAINER.dis_text_color}}" size="10sp" margin="0" text="Tags" />
                <easy-list id="write_viar_tags" source="{{'[2333]'}}" orientation="horizontal">
                    <card bg="{{DATA_CONTAINER.stringToColor(this)}}" h="55px" w="auto" gravity="center" margin="8px" minWidth="100px">
                        <text margin="8px" size="10sp" text="{{this}}" />
                    </card>
                </easy-list>
                <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                <text color="{{DATA_CONTAINER.dis_text_color}}" size="12sp" margin="0" text="meta" ellipsize="end" maxLines="1" />
                <text color="{{DATA_CONTAINER.dis_text_color}}" size="10sp" margin="0" text="xxxx-xx-xx xx:xx:xx" />
                <text color="{{DATA_CONTAINER.normal_text_color}}" size="24sp" margin="0" padding="0" text="title" gravity="center" />
            </vertical>
            <button id="write_viar_tob_hidden_btn" style="Widget.AppCompat.Button.Borderless.Colored" margin="0" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="160px" h="100px" layout_gravity="right" text="收起" />
            <vertical id="cun"><webview id="web" h="{{device.height}}" /></vertical>
        </vertical>
    </frame>
);


ui.web.loadUrl("file://" + files.path("../res/text.html"));

ui.write_viar_tob_hidden_btn.on("click", () => {
    ui.web.jsBridge.callHandler('getText', '', (data) => {
        print(data);
    })
    var date_view = ui.web;
    sele_date = dialogs.build({
        customView: date_view,
        positive: "返回",
        wrapInScrollView: false,
        autoDismiss: false,
        cancelable: false,
        canceledOnTouchOutside: false
    }).on("positive", (dialog) => {
        dialog.dismiss();
        date_view.parent.removeView(date_view);
        ui.cun.addView(date_view);
    }).on("negative", (dialog) => {
        dialog.dismiss();
        date_view.parent.removeView(date_view);
        ui.cun.addView(date_view);
    }).show();
    var dialogWindow = sele_date.getWindow();
    var layoutParams = dialogWindow.getAttributes();
    layoutParams.width = device.width;
    layoutParams.height = device.height;
    layoutParams.horizontalMargin = 0.1;
    layoutParams.verticalMargin = 0.1;
    dialogWindow.setAttributes(layoutParams);
});