<template>
    <div id="common-footer">{{footerMsg}}</div>
</template>

<script>
    export default {
        name : 'CommonFooter',
        props : {
            footerMsg : String,
            content : String,
        },
        data : function() {
            return {

            }
        },
        methods : {

        },
    };
</script>

<style>
div#common-footer {
    border: 1px solid gray;
}
</style>
