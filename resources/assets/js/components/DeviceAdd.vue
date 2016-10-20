<template>
    <div>
        <h4>Find your device on network</h4>
        <select v-model='selected' class="form-group">
            <option v-for='(device, index) in devices'
                    v-bind:value='device'
                    class="form-control"
            >
                {{ device.name }} {{ device.mac }} {{ device.ip }} {{ device.manufacturer }}</option>
        </select>

        <form action="http://localhost:8000/device/add" method="POST">
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon">name</span>
                    <input type="text" name="device[name]" v-model="formDevice.name" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon">mac</span>
                    <input type="text" name="device[mac]" v-model="formDevice.mac" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon">ip</span>
                    <input type="text" name="device[ip]" v-model="formDevice.ip" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon">manufacturer</span>
                    <input type="text" name="device[manufacturer]" v-model="formDevice.manufacturer" class="form-control">
                </div>
            </div>

            <div class="form-group pull-right">
                <button class="btn btn-info">Save</button>
            </div>
        </form>
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
