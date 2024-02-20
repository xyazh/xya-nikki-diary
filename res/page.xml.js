const PAGE = (
    <drawer id="drawer" bg="#ffffff">
        <vertical>
            <appbar bg="{{DATA_CONTAINER.ui_color}}">
                <toolbar id="toolbar" title="{{DATA_CONTAINER.title}}" />
            </appbar>
            <frame id="fh" h="*" w="*">
                <frame id="main_page">
                    <text margin="45px" gravity="center" text="这是主页" />
                </frame>
                <frame id="nikki">
                    <vertical>
                        <vertical>
                            <text id="tj" margin="25px" gravity="center_horizontal" text="共{{DATA_CONTAINER.page_number}}篇" />
                        </vertical>
                        <vertical>
                            <list id="texts_list">
                                <card id="msg_card" clickable="true" foreground="?selectableItemBackground" w="*" margin="10 5">
                                    <vertical>
                                        <horizontal>
                                            <vertical>
                                                <text size="30sp" gravity="center_horizontal" margin="4 3 4 0" text="{{this.day}}" />
                                                <text size="12sp" gravity="center_horizontal" margin="4 3 4 0" text="{{this.month +'月 ' + this.week}}" />
                                            </vertical>
                                            <horizontal w="*" gravity="left">
                                                <vertical>
                                                    <text size="12sp" margin="4 0 4 3" text="{{this.year==DATA_CONTAINER.year?'':this.year}}" />
                                                    <text color="#000000" size="17sp" margin="4 0 4 3" ellipsize="end" text="{{this.text}}" maxLines="10" />
                                                    <text size="12sp" margin="4 0 4 3" text="{{DATA_CONTAINER.addZero(this.hours) + ':' +DATA_CONTAINER.addZero(this.minu)}}" />
                                                </vertical>
                                            </horizontal>
                                        </horizontal>
                                    </vertical>
                                </card>
                            </list>
                        </vertical>
                    </vertical>
                    <card clickable="true" foreground="?selectableItemBackground" id="nikki_but" layout_gravity="right|bottom" margin="100px" w="172px" h="172px" bg="{{DATA_CONTAINER.ui_color}}">
                        <img w="170px" h="170px" gravity="center" src="@drawable/ic_playlist_add_black_48dp" tint="#FFFFFF" />
                    </card>
                </frame>
                <frame id="look_nikki">
                    <scroll>
                        <vertical>
                            <card id="msg_card" clickable="true" foreground="?selectableItemBackground" w="*" margin="10 5">
                                <vertical>
                                    <horizontal>
                                        <vertical>
                                            <text id="look_nikki_day" size="30sp" gravity="center_horizontal" margin="4 3 4 0" text="xx" />
                                            <text id="look_nikki_m_and_w" size="12sp" gravity="center_horizontal" margin="4 3 4 0" text="x月 周x" />
                                        </vertical>
                                        <horizontal w="*" gravity="left">
                                            <vertical>
                                                <text id="look_nikki_year" size="12sp" margin="4 0 4 3" text="xxxx" />
                                                <text id="look_nikki_text" color="#000000" size="17sp" margin="4 0 4 3" text="xxxx" />
                                                <text id="look_nikki_time" size="12sp" margin="4 0 4 3" text="xx:xx" />
                                            </vertical>
                                        </horizontal>
                                    </horizontal>
                                </vertical>
                            </card>
                        </vertical>
                    </scroll>
                    <card clickable="true" foreground="?selectableItemBackground" id="look_nikki_but" layout_gravity="right|bottom" margin="100px" w="172px" h="172px" bg="{{DATA_CONTAINER.ui_color}}">
                        <img w="170px" h="170px" gravity="center" src="@drawable/ic_create_black_48dp" tint="#FFFFFF" />
                    </card>
                </frame>
                <frame id="write_nikki">
                    <vertical>
                        <input id="inp" hint="写些什么罢" gravity="left" lines="10" />
                        <horizontal>
                            <button id="Tset" text="xxxx-xx-xx" style="Widget.AppCompat.Button.Colored" w="auto" />
                            <button id="tset" text="xx:xx" style="Widget.AppCompat.Button.Colored" w="auto" />
                        </horizontal>
                    </vertical>
                    <card clickable="true" foreground="?selectableItemBackground" id="write_nikki_but" layout_gravity="right|bottom" margin="100px" w="172px" h="172px" bg="{{DATA_CONTAINER.ui_color}}">
                        <img w="170px" h="170px" gravity="center" src="@drawable/ic_check_black_48dp" tint="#FFFFFF" />
                    </card>
                </frame>
                <frame id="tekoki">
                    <vertical gravity="center_horizontal" w="*">
                        <horizontal gravity="center_horizontal" w="*">
                            <button id="tekoki_last_year" textColor="#666666" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE*1.5}}px" text="＜" style="Widget.AppCompat.Button.Borderless" w="120px" />
                            <button id="tekoki_year" textColor="#666666" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE}}px" text="{{DATA_CONTAINER.year}}年" style="Widget.AppCompat.Button.Borderless" w="240px" />
                            <button id="tekoki_next_year" textColor="#666666" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE*1.5}}px" text="＞" style="Widget.AppCompat.Button.Borderless" w="120px" />
                            <button id="tekoki_last_month" textColor="#666666" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE*1.5}}px" text="＜" style="Widget.AppCompat.Button.Borderless" w="120px" />
                            <button id="tekoki_month" textColor="#666666" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE}}px" text="{{DATA_CONTAINER.month}}月" style="Widget.AppCompat.Button.Borderless" w="180px" />
                            <button id="tekoki_next_month" textColor="#666666" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE*1.5}}px" text="＞" style="Widget.AppCompat.Button.Borderless" w="120px" />
                        </horizontal>
                        <horizontal gravity="center_horizontal" w="*">
                            <text id="tekoki_month_all" margin="0 0 0 10" text="本月共x天 x次" />
                        </horizontal>
                        <horizontal>
                            <vertical h="*" w="{{(device.width/8-DATA_CONTAINER.TEKOKI_TEXT_SIZE>=0)?(device.width/8-DATA_CONTAINER.TEKOKI_TEXT_SIZE):0}}px"></vertical>
                            <vertical w="*">
                                <grid margin="0 0 0 20" id="tekoki_week" spanCount="7">
                                    <frame w="64px" h="64px">
                                        <text layout_gravity="center" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE}}px" text="{{this}}" w="auto" h="auto" />
                                    </frame>
                                </grid>
                                <grid id="tekoki_day" spanCount="7">
                                    <frame margin="0 5" w="64px" h="64px">
                                        <frame w="*" h="*" bg="{{DATA_CONTAINER.ui_color}}"></frame>
                                        <frame w="*" h="{{parseInt((1-this.p)*64)}}px" bg="#ffffff"></frame>
                                        <text layout_gravity="center" textSize="{{DATA_CONTAINER.TEKOKI_TEXT_SIZE}}px" text="{{this.day}}" w="auto" h="auto" />
                                    </frame>
                                </grid>
                                <button id="tekoki_event_set" text="{{DATA_CONTAINER.tekoki_event}}" style="Widget.AppCompat.Button.Colored" w="auto" />
                            </vertical>
                        </horizontal>
                    </vertical>
                </frame>
            </frame>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <card w="280" h="200" scaleType="fitXY" bg="{{DATA_CONTAINER.ui_color}}"></card>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{DATA_CONTAINER.ui_color}}" />
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
                </horizontal>
            </list>
        </vertical>
    </drawer>
);

module.exports = PAGE;