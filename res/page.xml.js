const PAGE = (
    <frame w="*" h="*">
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
                            <vertical id="nikki_tob">
                                <vertical id="nikki_sub_tob" visibility="gone">
                                    <text color="{{DATA_CONTAINER.dis_text_color}}" size="10sp" margin="4 0 0 0" text="搜索条件" />
                                    <input id="nikki_srh_kw" hint="无" color="{{DATA_CONTAINER.normal_text_color}}" size="12sp" margin="4 0 0 0" />
                                </vertical>
                                <horizontal w="*" gravity="right">
                                    <button id="nikki_srh" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="搜索" visibility="gone" />
                                    <button id="nikki_reset" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="重置" visibility="gone" />
                                    <button id="nikki_updown" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="展开" />
                                </horizontal>
                                <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                            </vertical>
                            <vertical>
                                <text color="{{DATA_CONTAINER.dis_text_color}}" id="tj" margin="25px" gravity="center_horizontal" text="共{{DATA_CONTAINER.page_number}}篇" />
                            </vertical>
                            <vertical>
                                <list id="texts_list">
                                    <card bg="{{DATA_CONTAINER.card_bg_color}}" id="msg_card" clickable="true" foreground="?selectableItemBackground" w="*" margin="10 5">
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
                                <list id="texts_srh_list" visibility="gone">
                                    <card bg="{{DATA_CONTAINER.card_bg_color}}" id="msg_card" clickable="true" foreground="?selectableItemBackground" w="*" margin="10 5">
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
                            <img w="170px" h="170px" gravity="center" src="@drawable/ic_playlist_add_black_48dp" tint="{{DATA_CONTAINER.tine_color}}" />
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
                                            <text color="{{DATA_CONTAINER.dis_text_color}}" layout_gravity="center" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE}}px" text="{{this.day}}" w="auto" h="auto" />
                                        </frame>
                                    </grid>
                                    <button backgroundTint="{{DATA_CONTAINER.button_color}}" color="{{DATA_CONTAINER.btn_text_color}}" id="tekoki_event_set" text="{{DATA_CONTAINER.tekoki_event}}" style="Widget.AppCompat.Button.Colored" w="auto" />
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

                                <text text="导出" color="{{DATA_CONTAINER.setting_title_text_color}}" textSize="12sp" margin="8" textStyle="bold"></text>
                                <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="export_nikki_plain" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="导出为明文"></button>
                                <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                                <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="export_one_day" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="导出为Day one日记文件"></button>
                                <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>

                                <text text="日记" color="{{DATA_CONTAINER.setting_title_text_color}}" textSize="12sp" margin="8" textStyle="bold"></text>
                                <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="cheak_nikki_time" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="校验日记时间错误"></button>
                                <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>

                                <text text="记录" color="{{DATA_CONTAINER.setting_title_text_color}}" textSize="12sp" margin="8" textStyle="bold"></text>
                                <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="re_create_events_btn" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="清理事件"></button>
                                <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>

                                <text text="故事集" color="{{DATA_CONTAINER.setting_title_text_color}}" textSize="12sp" margin="8" textStyle="bold"></text>
                                <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="re_create_tags_btn" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="清理Tag"></button>
                                <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                                <button textColor="{{DATA_CONTAINER.normal_text_color}}" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="检查重建上下关系"></button>
                                <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                                <button textColor="{{DATA_CONTAINER.normal_text_color}}" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="检查重建链接"></button>
                                <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>

                                <text text="安全" color="{{DATA_CONTAINER.setting_title_text_color}}" textSize="12sp" margin="8" textStyle="bold"></text>
                                <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="delete_password" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="删除密码"></button>
                                <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                                <button textColor="{{DATA_CONTAINER.normal_text_color}}" id="clear_all" style="Widget.AppCompat.Button.Borderless" gravity="left|center_vertical" text="清除数据"></button>
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
                    <frame id="viar" w="*" h="*">
                        <vertical>
                            <vertical id="viar_tob" visibility="gone">
                                <text color="{{DATA_CONTAINER.dis_text_color}}" size="10sp" margin="4 0 0 0" text="搜索条件" />
                                <input id="viar_srh_kw" hint="无" color="{{DATA_CONTAINER.normal_text_color}}" size="12sp" margin="4 0 0 0" />
                                <text color="{{DATA_CONTAINER.dis_text_color}}" size="10sp" margin="4 0 0 0" text="Tags" />
                                <horizontal>
                                    <input id="srh_tag_inp_main" size="10sp" w="{{device.width-60}}px" hint="搜索" lines="1" />
                                    <img id="srh_tag_btn_main" clickable="true" layout_gravity="center" foreground="?selectableItemBackground" w="60px" h="60px" gravity="center" src="@drawable/ic_search_black_48dp" tint="{{DATA_CONTAINER.dis_text_color}}" />
                                </horizontal>
                                <list id="viar_tags" orientation="horizontal">
                                    <card bg="{{DATA_CONTAINER.stringToColor(this)}}" h="55px" w="auto" gravity="center" margin="8px" minWidth="100px">
                                        <text margin="8px" size="10sp" text="{{this}}" />
                                    </card>
                                </list>
                                <list id="viar_srh_tags" orientation="horizontal">
                                    <card bg="{{DATA_CONTAINER.stringToColor(this)}}" h="55px" w="auto" gravity="center" margin="8px" minWidth="100px">
                                        <text margin="8px" size="10sp" text="{{this}}" />
                                    </card>
                                </list>
                            </vertical>
                            <horizontal w="*" gravity="right">
                                <button id="viar_reset" visibility="gone" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="重置" />
                                <button id="viar_tob_hidden_btn" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="160px" h="100px" layout_gravity="right" text="展开" />
                            </horizontal>
                            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                            <list id="viar_list">
                                <card id="viar_card" clickable="true" foreground="?selectableItemBackground" w="*" h="auto" margin="10 5">
                                    <vertical>
                                        <text color="{{DATA_CONTAINER.dis_text_color}}" size="10sp" margin="4 0 0 0" text="{{this.time}}" />
                                        <text color="{{DATA_CONTAINER.normal_text_color}}" size="24sp" margin="4 0 0 0" text="{{this.title}}" ellipsize="end" maxLines="2" />
                                        <text color="{{DATA_CONTAINER.dis_text_color}}" size="12sp" margin="4 0 0 0" text="{{this.meta}}" ellipsize="end" maxLines="1" />
                                        <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                                        <text color="{{DATA_CONTAINER.dis_text_color}}" size="10sp" margin="4 0 0 0" text="Tag" />
                                        <card bg="{{DATA_CONTAINER.stringToColor(this.main_tag)}}" h="55px" w="auto" gravity="center" margin="8px" minWidth="100px">
                                            <text margin="8px" size="10sp" text="{{this.main_tag}}" />
                                        </card>
                                    </vertical>
                                </card>
                            </list>
                        </vertical>
                        <card clickable="true" foreground="?selectableItemBackground" id="viar_but" layout_gravity="right|bottom" margin="100px 0px 100px 100px" w="172px" h="172px" bg="{{DATA_CONTAINER.ui_color}}">
                            <img w="170px" h="170px" gravity="center" src="@drawable/ic_list_black_48dp" tint="{{DATA_CONTAINER.tine_color}}" />
                        </card>
                        <card clickable="true" visibility="gone" foreground="?selectableItemBackground" id="viar_srh" layout_gravity="right|bottom" margin="100px 0px 100px 292px" w="152px" h="152px" bg="{{DATA_CONTAINER.ui_color}}">
                            <img w="150px" h="150px" gravity="center" src="@drawable/ic_search_black_48dp" tint="{{DATA_CONTAINER.tine_color}}" />
                        </card>
                        <card clickable="true" visibility="gone" foreground="?selectableItemBackground" id="viar_add" layout_gravity="right|bottom" margin="100px 0px 100px 464px" w="152px" h="152px" bg="{{DATA_CONTAINER.ui_color}}">
                            <img w="150px" h="150px" gravity="center" src="@drawable/ic_playlist_add_black_48dp" tint="{{DATA_CONTAINER.tine_color}}" />
                        </card>
                    </frame>
                    <frame id="look_viar" w="*" h="*">
                        <vertical h="*">
                            <vertical id="look_viar_tob">
                                <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                                <text id="look_viar_id" color="{{DATA_CONTAINER.dis_text_color}}" size="8sp" margin="0" text="id" ellipsize="end" maxLines="1" />
                                <text id="look_viar_time" color="{{DATA_CONTAINER.dis_text_color}}" size="8sp" margin="0" text="xxxx-xx-xx xx:xx:xx" />
                                <list id="look_viar_tags" orientation="horizontal">
                                    <card bg="{{DATA_CONTAINER.stringToColor(this)}}" h="55px" w="auto" gravity="center" margin="8px" minWidth="100px">
                                        <text margin="8px" size="10sp" text="{{this}}" />
                                    </card>
                                </list>
                                <text id="look_viar_title" color="{{DATA_CONTAINER.normal_text_color}}" size="24sp" margin="0" padding="0" text="title" gravity="center" />
                            </vertical>
                            <horizontal w="*" gravity="right">
                                <button id="link_node_but" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="链接" />
                                <button id="last_node_but" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="上级" />
                                <button id="next_node_but" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="下级" />
                                <button id="look_viar_tob_hidden_btn" style="Widget.AppCompat.Button.Borderless.Colored" margin="0" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="收起" />
                            </horizontal>
                            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                            <html-view id="look_viar_html" w="*" h="*" html="2333" />
                        </vertical>
                        <card clickable="true" foreground="?selectableItemBackground" id="look_viar_but" layout_gravity="right|bottom" margin="100px" w="172px" h="172px" bg="{{DATA_CONTAINER.ui_color}}">
                            <img w="170px" h="170px" gravity="center" src="@drawable/ic_create_black_48dp" tint="{{DATA_CONTAINER.tine_color}}" />
                        </card>
                    </frame>
                    <frame id="write_viar" w="*" h="*">
                        <ScrollView>
                            <vertical>
                                <vertical>
                                    <input id="viar_inp_tit" size="24sp" hint="标题" gravity="left" lines="1" />
                                    <vertical id="viar_inp_c">
                                        <input id="viar_inp" hint="编辑html" visibility="gone" h="700px" gravity="left" lines="10" margin-bottom="0" />
                                    </vertical>
                                    <vertical id="viar_inp_web_c">
                                        <webview id="viar_inp_web" h="700px" w="*" />
                                    </vertical>
                                    <vertical id="viar_inp_web_line" h="4px" w="*" bg="#848484" margin="4 0 4 0"></vertical>
                                    <horizontal w="*" gravity="right">
                                        <button id="viar_inp_sec" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="切换" />
                                        <button id="viar_inp_full" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="全屏" />
                                    </horizontal>
                                </vertical>
                                <text color="{{DATA_CONTAINER.dis_text_color}}" size="10sp" margin="0" text="Tags" />
                                <horizontal>
                                    <input id="srh_tag_inp" size="10sp" w="{{device.width-60}}px" hint="搜索或创建" lines="1" />
                                    <img clickable="true" layout_gravity="center" foreground="?selectableItemBackground" id="srh_tag_but" w="60px" h="60px" gravity="center" src="@drawable/ic_search_black_48dp" tint="{{DATA_CONTAINER.dis_text_color}}" />
                                </horizontal>
                                <list id="srh_tag_li" orientation="horizontal">
                                    <card bg="{{DATA_CONTAINER.stringToColor(this)}}" h="55px" w="auto" gravity="center" margin="8px" minWidth="100px">
                                        <text margin="8px" size="10sp" text="{{this}}" />
                                    </card>
                                </list>
                                <list id="write_viar_li" orientation="horizontal">
                                    <card bg="{{DATA_CONTAINER.stringToColor(this)}}" h="55px" w="auto" gravity="center" margin="8px" minWidth="100px">
                                        <text margin="8px" size="10sp" text="{{this}}" />
                                    </card>
                                </list>
                                <vertical h="4px" w="*" bg="#848484" margin="4 0 4 0"></vertical>
                                <text id="write_parent_tx" text="" gravity="center" size="12sp" />
                                <button id="viar_slc_last" style="Widget.AppCompat.Button.Borderless.Colored" margin="0" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="*" h="100px" text="选择父节点" />
                                <vertical h="4px" w="*" bg="#848484" margin="4 0 4 0"></vertical>
                                <list id="viar_inp_links">
                                    <text text="{{this}}" w="*" gravity="center" size="12sp" />
                                </list>
                                <button id="viar_inp_add_links" style="Widget.AppCompat.Button.Borderless.Colored" margin="0" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="*" h="100px" text="链接" />
                                <vertical h="4px" w="*" bg="#848484" margin="4 0 4 0"></vertical>
                                <input id="viar_inp_meta" size="10sp" hint="编辑meta" gravity="left" lines="1" />
                            </vertical>
                        </ScrollView>
                        <card clickable="true" foreground="?selectableItemBackground" id="write_viar_but" layout_gravity="right|bottom" margin="100px" w="172px" h="172px" bg="{{DATA_CONTAINER.ui_color}}">
                            <img w="170px" h="170px" gravity="center" src="@drawable/ic_check_black_48dp" tint="{{DATA_CONTAINER.tine_color}}" />
                        </card>
                    </frame>
                    <frame id="password_book" w="*" h="*">
                        <vertical>
                            <vertical id="pb_tob">
                                <text color="{{DATA_CONTAINER.dis_text_color}}" size="10sp" margin="4 0 0 0" text="搜索条件" />
                                <input id="pb_srh_kw" hint="无" color="{{DATA_CONTAINER.normal_text_color}}" size="12sp" margin="4 0 0 0" />
                                <horizontal w="*" gravity="right">
                                    <button id="pb_add" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="添加" />
                                    <button id="pb_srh" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="搜索" />
                                    <button id="pb_reset" style="Widget.AppCompat.Button.Borderless.Colored" color="{{DATA_CONTAINER.button_color}}" size="10sp" w="140px" h="100px" layout_gravity="right" text="重置" />
                                </horizontal>
                            </vertical>
                            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                            <list id="pb_li">
                                <card id="pb_card" clickable="true" foreground="?selectableItemBackground" w="*" h="auto" margin="10 5">
                                    <vertical>
                                        <vertical bg="{{DATA_CONTAINER.stringToColorLight(this.meta)}}" w="*">
                                            <text color="{{DATA_CONTAINER.normal_text_color}}" size="10sp" margin="4 0 0 0" text="{{this.meta}}" />
                                        </vertical>
                                        <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
                                        <text color="{{DATA_CONTAINER.normal_text_color}}" size="20sp" margin="4 0 0 0" text="{{this.name}}" ellipsize="end" maxLines="1" />
                                        <text color="{{DATA_CONTAINER.normal_text_color}}" size="18sp" margin="4 0 0 0" text="{{this.email}}" ellipsize="end" maxLines="1" />
                                        <text color="{{DATA_CONTAINER.dis_text_color}}" size="16sp" margin="4 4 0 0" text="{{this.pw}}" ellipsize="end" />
                                    </vertical>
                                </card>
                            </list>
                        </vertical>
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
        <frame id="first_page" w="*" h="*" bg="#ffffff">
            <vertical h="auto" align="center" margin="0 50">
                <linear>
                    <text w="56" gravity="center" color="#111111" size="16">密码</text>
                    <input id="password_inp" w="*" h="40" password="true" />
                </linear>
                <linear gravity="center">
                    <button id="password_ok" text="确定" />
                </linear>
            </vertical>
        </frame>
    </frame>
);

module.exports = PAGE;