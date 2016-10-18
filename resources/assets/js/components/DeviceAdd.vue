<template>
    <div>
        <form action="http://localhost:8000/device/add" method="POST">
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon">name</span>
                    <input type="text" name="device[name]" v-model="formDevice.name" class="form-control">
                </div>

                <div class="input-group">
                    <span class="input-group-addon">mac</span>
                    <input type="text" name="device[mac]" v-model="formDevice.mac" class="form-control">
                </div>

                <div class="input-group">
                    <span class="input-group-addon">ip</span>
                    <input type="text" name="device[ip]" v-model="formDevice.ip" class="form-control">
                </div>

                <div class="input-group">
                    <span class="input-group-addon">manufacturer</span>
                    <input type="text" name="device[manufacturer]" v-model="formDevice.manufacturer" class="form-control">
                </div>

                <button class="btn btn-default btn-block">Save</button>
            </div>
        </form>

        <select v-model='selected'>
            <!--<header-component/>-->
            <!--<div>this is template body</div>-->
            <!--<other-component/>-->
            <option v-for='(device, index) in devices'
                    v-bind:value='device'
            >
                {{ device.name }} {{ device.mac }} {{ device.ip }} {{ device.manufacturer }}</option>
        </select>
        <!--<div>{{ selected }}</div>-->
    </div>
</template>
<style>
</style>
<script>
//    import HeaderComponent from './components/header.vue'
//    import OtherComponent from './components/other.vue'
    let form = {device: {}};

    export default{
        // data: {
        //     formDevice: {},
        //     selected: devices[0],
        //     devices: devices
        // },
        data(){
            return {
                formDevice: {},
                selected: devices[0],
                devices: devices
            }
        },
//        components:{
//            'other-component':OtherComponent,
//            HeaderComponent,
//        },
        // computed:{
        //     formDevice(){
        //         return this.selected;
        //     }
        // },
        methods: {

        },
        watch: {
            selected(newVal, oldVal){
                console.log(newVal);
                let tmp = {
                    name: newVal.name,
                    mac: newVal.mac,
                    ip: newVal.ip,
                    manufacturer: newVal.manufacturer
                };
                this.formDevice = tmp;
            }
        }

    }
</script>
