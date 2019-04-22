<template>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-img
                    class="white--text"
                    height="110px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                    <v-container>
                        <v-layout>
                            <v-flex xs12>
                                <div class="text-xs-center">
                                    <v-chip color="teal" text-color="white">서울</v-chip>
                                    <v-chip color="red" text-color="white">온도 {{temp}}도</v-chip>
                                    <v-chip color="secondary" text-color="white">습도 {{humidity}}%</v-chip>
                                    <v-chip color="primary" text-color="white">날씨 {{weather}}</v-chip>
                                    <v-chip color="green" text-color="white">풍속 {{wind}}m/s</v-chip>
                                    <v-chip color="indigo" text-color="white">구름 {{clouds}}%</v-chip>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-img>
            </v-card>

            <v-divider class="my-3"></v-divider>

            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-list two-line>
                            <v-subheader>
                                <span>{{ header }}</span>
                                <v-dialog v-model="dialog" persistent max-width="600px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon v-on="on">
                                            <v-icon>mdi-pen-plus</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">오늘의 글을 남겨주세요.</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container grid-list-md>
                                                <v-layout wrap>
                                                    <v-flex xs12 sm6 md4>
                                                        <v-text-field
                                                            label="제목*"
                                                            required
                                                            v-model="title"
                                                        ></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md4>
                                                        <v-text-field
                                                            label="내용*"
                                                            hint="오늘 어떤일이 있었는지 모두에게 알려주세요."
                                                            persistent-hint
                                                            required
                                                            v-model="content"
                                                        ></v-text-field>
                                                    </v-flex>
                                                </v-layout>
                                            </v-container>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                color="blue darken-1"
                                                flat
                                                @click="closeDialog();"
                                            >닫기</v-btn>
                                            <v-btn
                                                color="blue darken-1"
                                                flat
                                                @click="submitTodayLog();"
                                            >글쓰기</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-subheader>

                            <div class="text-xs-center">
                                <v-bottom-sheet v-model="sheet">
                                    <v-list>
                                        <v-subheader>무엇을 하시겠어요?</v-subheader>
                                        <v-list-tile
                                            v-for="tile in tiles"
                                            :key="tile.title"
                                            @click="doAction(tile.action)"
                                        >
                                            <v-list-tile-avatar>
                                                <v-avatar size="32px" tile>
                                                    <v-btn icon>
                                                        <v-icon>{{tile.icon}}</v-icon>
                                                    </v-btn>
                                                </v-avatar>
                                            </v-list-tile-avatar>
                                            <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-bottom-sheet>
                            </div>

                            <template v-for="(item, index) in items">
                                <!-- :inset="item.inset" -->
                                <v-divider v-if="item.divider" :key="index"></v-divider>

                                <v-list-tile v-else avatar>
                                    <v-list-tile-avatar>
                                        <img :src="item.avatar">
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action v-if="userInfo.email == item.user_id">
                                          <v-btn icon @click="doSomthing(item)">
                                              <v-icon>mdi-table-of-contents</v-icon>
                                          </v-btn>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>

            <v-divider class="my-3"></v-divider>

            <v-layout row justify-center></v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from "axios";
import firebase from "@/firebase";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("ui/member");

export default {
    name: "Home",
    created() {
        axios
            .get(
                "https://api.openweathermap.org/data/2.5/weather?q=Seoul&apiKey=f10160350b0089fdc3f2a2fb8c6c8ab8"
            )
            .then(res => {
                let resp = res.data;
                this.temp = Math.round(resp.main.temp - 273.15);
                this.humidity = resp.main.humidity;
                this.weather = resp.weather[0].main;
                this.wind = resp.wind.speed;
                this.clouds = resp.clouds.all;
            });

        this.todayRef.on("value", snapshot => {
            const todayList = snapshot.val();

            let tempTodays = [];
            if (todayList) {
                const keys = Object.keys(todayList);
                keys.forEach((key, index) => {
                    const item = todayList[key];

                    console.log(item);

                    const todayItem = {
                        avatar: item.user_profile,
                        title: item.today_title,
                        subtitle: `<span class='text--primary'>${
                            item.today_content
                        }</span> by ${item.user_name}`,
                        user_id: item.user_id,
                        item_key: key,
                    };

                    tempTodays.push(todayItem);
                    if (index < keys.length - 1) {
                        tempTodays.push({ divider: true, inset: true });
                    }
                });
            }

            this.items = tempTodays;
        });
    },
    computed: {
        ...mapGetters({
            userInfo: "getUserInfo"
        }),
        todayRef: {
          get() {
            return firebase
                .database()
                .ref()
                .child("today");
          }
        }
    },
    data() {
        return {
            header: "오늘은 어떤 일이 있었나요?",
            dialog: false,
            title: "",
            content: "",
            temp: 0,
            humidity: 0,
            weather: "",
            wind: 0,
            clouds: 0,
            items: [],
            sheet: false,
            tiles: [
              { icon: 'mdi-pen', title: '수정', action: 'edit'},
              { icon: 'mdi-pencil-off', title: '삭제', action: 'delete'},
              { icon: 'mdi-window-close', title: '닫기', action: 'close'},
            ],
            selectedItem: undefined,
            editMode: 'write',
        };
    },
    methods: {
        doSomthing(item) {
            console.log(item.item_key);
            this.sheet = true;
            this.selectedItem = this.todayRef.child(item.item_key);
        },
        closeDialog() {
            this.dialog = false;
            this.title = "";
            this.content = "";
        },
        submitTodayLog() {
            this.dialog = false;
            const content = this.content;
            const title = this.title;

            this.getCurrentUser()
                .then(user => {
                    if (user) {
                        if(this.editMode == 'write') {
                            const newTodayRef = this.todayRef.push();
                            newTodayRef.set({
                                reg_dtm: new Date().getTime(),
                                replies: {},
                                today_content: content || "내용없음",
                                today_title: title || "제목없음",
                                user_id: user.email,
                                user_name: user.displayName || "익명",
                                user_profile:
                                    "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png"
                            });
                        }else if(this.editMode == 'edit') {
                            const editItem = this.selectedItem;
                            editItem.update({
                                reg_dtm: new Date().getTime(),
                                today_content: content || "내용없음",
                                today_title: title || "제목없음",
                            });

                            this.editMode = 'write';
                        }
                        
                    } else {
                        alert("로그인 세션이 없습니다. 다시 로그인해주세요.");
                        return;
                    }
                })
                .catch(err => {
                    alert("로그인세션 조회 중 오류가 발생했습니다.");
                    return;
                });

            this.title = "";
            this.content = "";
        },
        doAction(action) {
            console.log(action);
            const item = this.selectedItem;
            if(item) {
                if(action == 'delete') {
                    item.set(null);
                }else if(action == 'close') {
                    this.selectedItem = undefined;
                }else if(action == 'edit') {
                    this.dialog = true;
                    this.editMode = 'edit';
                }
            }

            this.sheet = false
        },
        getCurrentUser() {
            let userLoaded = false;
            return new Promise((resolve, reject) => {
                if (userLoaded) {
                    resolve(firebase.auth().currentUser);
                }
                const unsubscribe = firebase.auth().onAuthStateChanged(user => {
                    userLoaded = true;
                    unsubscribe();
                    resolve(user);
                }, reject);
            });
        }
    }
};
</script>

<style>
#weather-info {
    color: black;
    background: rgba(255, 255, 255, 0.5);
}
</style>
