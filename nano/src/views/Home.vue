<template>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-img
                    class="white--text"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <span class="headline">오늘의 날씨</span>
                                <v-flex xs6 offset-xs6 id="weather-info">

                                  <h4>현재 온도 : {{temp}}도</h4>
                                  <h4>현재 습도 : {{humidity}}%</h4>
                                  <h4>날씨 : {{weather}}</h4>
                                  <h4>바람 : {{wind}}m/s</h4>
                                  <h4>구름 : {{clouds}}% </h4>
                                </v-flex>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-img>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from "axios";

export default {
    name: "Home",
    created() {
        axios
            .get(
                "https://api.openweathermap.org/data/2.5/weather?q=Seoul&apiKey=f10160350b0089fdc3f2a2fb8c6c8ab8"
            )
            .then(res => {
                let resp = res.data;
                console.log(resp);
                console.log("현재온도 : " + (resp.main.temp - 273.15));
                console.log("현재습도 : " + resp.main.humidity);
                console.log("날씨 : " + resp.weather[0].main);
                console.log("상세날씨설명 : " + resp.weather[0].description);
                console.log("날씨 이미지 : " + resp.weather[0].icon);
                console.log("바람   : " + resp.wind.speed);
                console.log("나라   : " + resp.sys.country);
                console.log("도시이름  : " + resp.name);
                console.log("구름  : " + resp.clouds.all + "%");
                this.temp = Math.round(resp.main.temp - 273.15);
                this.humidity = resp.main.humidity;
                this.weather = resp.weather[0].main;
                this.wind = resp.wind.speed;
                this.clouds = resp.clouds.all;
            });
    },
    data() {
        return {
            temp : 0,
            humidity : 0,
            weather : '',
            wind : 0,
            clouds : 0,
        };
    }
};
</script>

<style>
#weather-info {
  margin-top: 20px;
  padding: 10px 10px 10px 30px;
  color : black;
  background: rgba(255,255,255, 0.5);
}
</style>
