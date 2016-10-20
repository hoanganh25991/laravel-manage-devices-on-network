<template>
    <div class="userInfoRow row" @click="showDetail = !showDetail">
        <div class="userInfoDetail" v-show="showDetail">
            <div class="panel panel-info">
                <div class="panel-heading">{{ user.name }}</div>
                <div class="panel-body">
                    <div v-for="device in user.devices">
                        <p class="text-muted bg-info">{{ device.name }}</p>
                        <p class="text-muted">{{ device.mac }}</p>
                        <p class="text-muted">{{ device.ip }}</p>
                        <p class="text-muted">{{ device.manufacturer }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <img src="https://tinker.press/images/new-user-image-default.png"
                     alt="avatar"
                     class="avatar img-thumbnail">
            </div>
            <div class="col-md-8">
                <div style="left: -5px;top: 5px; position: absolute;">
                    <span style="display: block;" class="small">{{ user.name }}</span>
                    <span v-show="user.devices.length > 0" class="small">online by {{ user.devices.length }} devices</span>
                </div>
                <!--{{ user.name }}-->
            </div>
            <!--<div class="col-md-2">-->
                <!--{{ user.status }}-->
            <!--</div>-->
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default {
        //props: [user],
        props: {
            user: {
                default: {}
            }
        },
        data(){
            return {
                //user: user,
                showDetail: false

            }
        },

        methods: {
        },

        mounted(){
            let vue = this;
            if(this.user.devices.length > 0){
                let thisRow = $(vue.$el);
                thisRow.addClass('bg-info');
            }
            //console.log(thisRow);
            //console.log('what the heck????');
        }
    }
</script>