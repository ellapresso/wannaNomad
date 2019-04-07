<template>
    <!-- 자식컴포넌트인 CommonHeader가 부모컴포넌트 App의 데이터를 바꾸려면, -->
    <!-- 이벤트 버스를 통해 데이터를 변경하여야 한다. -->
    <div id="common-header" v-on:click="clickMe">{{headerMsg}}</div>
</template>

<script>
    export default {
        name : 'CommonHeader',
        // 자식컴포넌트는, props를 정의함으로써
        // 부모컴포넌트가 자식컴포넌트 데이터를 변경할 수 있도록 한다.
        props : {
            headerMsg : String,
            content : String,
        },
        methods : {
            clickMe : function() {
                this.$emit('childClicked');
            },
        }
        
    };
</script>

<style>
div#common-header {
    border: 1px solid gray;
}
</style>
