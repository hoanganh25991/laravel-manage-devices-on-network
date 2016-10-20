<template>
    <div>
        <div v-for="device in devices">
            <p class="bg-info">{{ device.name }}</p>
            <p>{{ device.mac }}</p>
            <p>{{ device.ip }}</p>
            <p>{{ device.manufacturer }}</p>
            <hr>
        </div>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return {
                devices: userDevices
            }
        },
        methods: {

        },
    }
</script>
