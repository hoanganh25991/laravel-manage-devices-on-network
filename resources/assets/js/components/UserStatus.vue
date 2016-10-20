<template>
    <div class="usersStatus">
        <user-info-row :user="user" v-for="user in users" ></user-info-row>
        <!--<user-info-row user="users[0]" ></user-info-row>-->
    </div>
</template>
<style>
    #usersStatus{
        position: fixed;
        width: 250px;
        height: 100%;
        right: 0;
    }
</style>
<script>
    import UserInfoRow from './UserInfoRow.vue';
    export default{
        components: {
            UserInfoRow
        },
        data(){
            return {
                users: users
            }
        }
    }
</script>