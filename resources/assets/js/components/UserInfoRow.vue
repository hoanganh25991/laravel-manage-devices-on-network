<template>
    <div class="userInfoRow" @click="showDetail = !showDetail">
        <div class="row">
            <div class="col-md-4">
                <span class="avatar-addon">
                    <img src="https://tinker.press/images/new-user-image-default.png"
                         alt="avatar"
                         class="avatar img-thumbnail">
                </span>
            </div>
            <div class="col-md-6">
                {{ user.name }}
            </div>
            <div class="col-md-2">
                {{ user.status }}
            </div>
        </div>
        <div class="userInfoDetail" v-show="showDetail">
            <p>{{ user.name }}</p>
            <ul>
                <li v-for="device in user.devices">
                    <p class="text-muted">{{ device.name }}</p>
                    <p class="text-muted">{{ device.mac }}</p>
                    <p class="text-muted">{{ device.ip }}</p>
                    <p class="text-muted">{{ device.manufacturer }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
    .userInfoRow :hover{
        background-color: darkgray;
    }
    .userInfoDetail{

    }
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
        }
    }
</script>