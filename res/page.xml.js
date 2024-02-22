const PAGE = (
    <drawer id="drawer" bg="{{DATA_CONTAINER.main_bg_color}}">
        <vertical>
            <appbar bg="{{DATA_CONTAINER.ui_color}}">
                <toolbar color="{{DATA_CONTAINER.nomral_text_color}}" id="toolbar" title="{{DATA_CONTAINER.title}}" />
            </appbar>
            <frame id="fh" h="*" w="*">
                <frame id="main_page">
                    <text color="{{DATA_CONTAINER.dis_text_color}}" margin="45px" gravity="center" text="这是主页" />
                </frame>
                <frame id="nikki">
                    <vertical>
                        <vertical>
                            <text color="{{DATA_CONTAINER.dis_text_color}}" id="tj" margin="25px" gravity="center_horizontal" text="共{{DATA_CONTAINER.page_number}}篇" />
                        </vertical>
                        <vertical>
                            <list id="texts_list">
                                <card  bg="{{DATA_CONTAINER.card_bg_color}}" id="msg_card" clickable="true" foreground="?selectableItemBackground" w="*" margin="10 5">
                                    <vertical>
                                        <horizontal>
                                            <vertical>
                                                <text color="{{DATA_CONTAINER.dis_text_color}}" size="30sp" gravity="center_horizontal" margin="4 3 4 0" text="{{this.day}}" />
                                                <text color="{{DATA_CONTAINER.dis_text_color}}" size="12sp" gravity="center_horizontal" margin="4 3 4 0" text="{{this.month +'月 ' + this.week}}" />
                                            </vertical>
                                            <horizontal w="*" gravity="left">
                                                <vertical>
                                                    <text color="{{DATA_CONTAINER.dis_text_color}}" size="12sp" margin="4 0 4 3" text="{{this.year==DATA_CONTAINER.year?'':this.year}}" />
                                                    <text color="{{DATA_CONTAINER.normal_text_color}}" size="17sp" margin="4 0 4 3" ellipsize="end" text="{{this.text}}" maxLines="10" />
                                                    <text color="{{DATA_CONTAINER.dis_text_color}}" size="12sp" margin="4 0 4 3" text="{{DATA_CONTAINER.addZero(this.hours) + ':' +DATA_CONTAINER.addZero(this.minu)}}" />
                                                </vertical>
                                            </horizontal>
                                        </horizontal>
                                    </vertical>
                                </card>
                            </list>
                        </vertical>
                    </vertical>
                    <card clickable="true" foreground="?selectableItemBackground" id="nikki_but" layout_gravity="right|bottom" margin="100px" w="172px" h="172px" bg="{{DATA_CONTAINER.ui_color}}">
                        <img w="170px" h="170px" gravity="center" src="@drawable/ic_playlist_add_black_48dp" tint="{{DATA_CONTAINER.tine_color}}"/>
                    </card>
                </frame>
                <frame id="look_nikki">
                    <scroll>
                        <vertical>
                            <card bg="{{DATA_CONTAINER.card_bg_color}}" id="msg_card" clickable="true" foreground="?selectableItemBackground" w="*" margin="10 5">
                                <vertical>
                                    <horizontal>
                                        <vertical>
                                            <text color="{{DATA_CONTAINER.dis_text_color}}" id="look_nikki_day" size="30sp" gravity="center_horizontal" margin="4 3 4 0" text="xx" />
                                            <text color="{{DATA_CONTAINER.dis_text_color}}" id="look_nikki_m_and_w" size="12sp" gravity="center_horizontal" margin="4 3 4 0" text="x月 周x" />
                                        </vertical>
                                        <horizontal w="*" gravity="left">
                                            <vertical>
                                                <text color="{{DATA_CONTAINER.dis_text_color}}" id="look_nikki_year" size="12sp" margin="4 0 4 3" text="xxxx" />
                                                <text color="{{DATA_CONTAINER.normal_text_color}}" id="look_nikki_text" size="17sp" margin="4 0 4 3" text="xxxx" />
                                                <text color="{{DATA_CONTAINER.dis_text_color}}" id="look_nikki_time" size="12sp" margin="4 0 4 3" text="xx:xx" />
                                            </vertical>
                                        </horizontal>
                                    </horizontal>
                                </vertical>
                            </card>
                        </vertical>
                    </scroll>
                    <card clickable="true" foreground="?selectableItemBackground" id="look_nikki_but" layout_gravity="right|bottom" margin="100px" w="172px" h="172px" bg="{{DATA_CONTAINER.ui_color}}">
                        <img w="170px" h="170px" gravity="center" src="@drawable/ic_create_black_48dp" tint="{{DATA_CONTAINER.tine_color}}" />
                    </card>
                </frame>
                <frame id="write_nikki">
                    <vertical>
                        <input id="inp" hint="写些什么罢" gravity="left" lines="10" />
                        <horizontal>
                            <button backgroundTint="{{DATA_CONTAINER.button_color}}" color="{{DATA_CONTAINER.btn_text_color}}" id="Tset" text="xxxx-xx-xx" style="Widget.AppCompat.Button.Colored" w="auto" />
                            <button backgroundTint="{{DATA_CONTAINER.button_color}}" color="{{DATA_CONTAINER.btn_text_color}}" id="tset" text="xx:xx" style="Widget.AppCompat.Button.Colored" w="auto" />
                        </horizontal>
                    </vertical>
                    <card clickable="true" foreground="?selectableItemBackground" id="write_nikki_but" layout_gravity="right|bottom" margin="100px" w="172px" h="172px" bg="{{DATA_CONTAINER.ui_color}}">
                        <img w="170px" h="170px" gravity="center" src="@drawable/ic_check_black_48dp" tint="{{DATA_CONTAINER.tine_color}}" />
                    </card>
                </frame>
                <frame id="tekoki">
                    <vertical gravity="center_horizontal" w="*">
                        <horizontal gravity="center_horizontal" w="*">
                            <button id="tekoki_last_year" textColor="{{this.DATA_CONTAINER.tekoki_btn_text_color}}" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE*1.5}}px" text="＜" style="Widget.AppCompat.Button.Borderless" w="120px" />
                            <button id="tekoki_year" textColor="{{this.DATA_CONTAINER.tekoki_btn_text_color}}" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE}}px" text="{{DATA_CONTAINER.year}}年" style="Widget.AppCompat.Button.Borderless" w="240px" />
                            <button id="tekoki_next_year" textColor="{{this.DATA_CONTAINER.tekoki_btn_text_color}}" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE*1.5}}px" text="＞" style="Widget.AppCompat.Button.Borderless" w="120px" />
                            <button id="tekoki_last_month" textColor="{{this.DATA_CONTAINER.tekoki_btn_text_color}}" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE*1.5}}px" text="＜" style="Widget.AppCompat.Button.Borderless" w="120px" />
                            <button id="tekoki_month" textColor="{{this.DATA_CONTAINER.tekoki_btn_text_color}}" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE}}px" text="{{DATA_CONTAINER.month}}月" style="Widget.AppCompat.Button.Borderless" w="180px" />
                            <button id="tekoki_next_month" textColor="{{this.DATA_CONTAINER.tekoki_btn_text_color}}" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE*1.5}}px" text="＞" style="Widget.AppCompat.Button.Borderless" w="120px" />
                        </horizontal>
                        <horizontal gravity="center_horizontal" w="*">
                            <text color="{{DATA_CONTAINER.dis_text_color}}" id="tekoki_month_all" margin="0 0 0 10" text="本月共x天 x次" />
                        </horizontal>
                        <horizontal>
                            <vertical h="*" w="{{(device.width/8-DATA_CONTAINER.TEKOKI_TEXT_SIZE>=0)?(device.width/8-DATA_CONTAINER.TEKOKI_TEXT_SIZE):0}}px"></vertical>
                            <vertical w="*">
                                <grid margin="0 0 0 20" id="tekoki_week" spanCount="7">
                                    <frame w="64px" h="64px">
                                        <text color="{{DATA_CONTAINER.dis_text_color}}" layout_gravity="center" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE}}px" text="{{this}}" w="auto" h="auto" />
                                    </frame>
                                </grid>
                                <grid id="tekoki_day" spanCount="7">
                                    <frame margin="0 5" w="64px" h="64px">
                                        <frame w="*" h="*" bg="{{DATA_CONTAINER.ui_color}}"></frame>
                                        <frame w="*" h="{{parseInt((1-this.p)*64)}}px" bg="{{DATA_CONTAINER.main_bg_color}}"></frame>
                                        <text color="{{DATA_CONTAINER.dis_text_color}}"  layout_gravity="center" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE}}px" text="{{this.day}}" w="auto" h="auto" />
                                    </frame>
                                </grid>
                                <button backgroundTint="{{DATA_CONTAINER.button_color}}" color="{{DATA_CONTAINER.btn_text_color}}"  id="tekoki_event_set" text="{{DATA_CONTAINER.tekoki_event}}" style="Widget.AppCompat.Button.Colored" w="auto" />
                            </vertical>
                        </horizontal>
                    </vertical>
                </frame>
                <frame id="setting" w="*" h="*">
                    <ScrollView>
                        <vertical w="*" >
                            <text text="常规" color="{{DATA_CONTAINER.setting_title_text_color}}" textSize="12sp" margin="8" textStyle="bold"></text>
                            <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="theme" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="使用深色主题"></button>
                            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                            <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="cheak_nikki_time" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="校验日记时间错误"></button>
                            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                            <text text="导出" color="{{DATA_CONTAINER.setting_title_text_color}}" textSize="12sp" margin="8" textStyle="bold"></text>
                            <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="export_nikki_plain" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="导出为明文"></button>
                            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                            <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="export_one_day" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="导出为Day one日记文件"></button>
                            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                            <text text="安全" color="{{DATA_CONTAINER.setting_title_text_color}}" textSize="12sp" margin="8" textStyle="bold"></text>
                            <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="delete_password" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="删除密码"></button>
                            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                            <text text="其他" color="{{DATA_CONTAINER.setting_title_text_color}}" textSize="12sp" margin="8" textStyle="bold"></text>
                            <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="git" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="仓库地址"></button>
                            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                            <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="about" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="关于"></button>
                            <vertical w="*" h="*">
                                <text color="{{DATA_CONTAINER.dis_text_color}}" gravity="center|bottom" textSize="9sp" text="xya日记"></text>
                                <text color="{{DATA_CONTAINER.dis_text_color}}" gravity="center|bottom" textSize="9sp" text="Made by xyazh since 2021.5.5"></text>
                            </vertical>
                        </vertical>
                    </ScrollView>
                </frame>
            </frame>
        </vertical>
        <vertical layout_gravity="left" bg="{{DATA_CONTAINER.main_bg_color}}" w="260">
            <card w="280" h="200" scaleType="fitXY" bg="{{DATA_CONTAINER.ui_color}}"></card>
            <list id="menu">
                <horizontal w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{DATA_CONTAINER.ui_color}}" />
                    <text color="{{DATA_CONTAINER.normal_text_color}}" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
                </horizontal>
            </list>
        </vertical>
    </drawer>
);

module.exports = PAGE;