<template>
    <div>
        <form action="http://localhost:8000/device/add" method="POST">
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon">name</span>
                    <input type="text" name="device[name]" v-model="selected.name" class="form-control">
                </div>

                <div class="input-group">
                    <span class="input-group-addon">mac</span>
                    <input type="text" name="device[mac]" v-model="selected.mac" class="form-control">
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
    let $inputDeviceName = $('input[name="device[name]"]');
    let $inputDeviceMac = $('input[name="device[mac]"]');
    export default{
        data(){
            return{
                selected: devices[0],
                devices: devices
            }
        },
//        components:{
//            'other-component':OtherComponent,
//            HeaderComponent,
//        }
        watch:{

        },

        methods: {

        }

    }
</script>
