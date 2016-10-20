@extends('layouts.app')

@section('content')
<div class="container-fluid my_container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <h1 class="panel-heading">Add Device</h1>
                <div class="panel-body">
                    <div id="device_add">
                        <select-device></select-device>
                    </div>
                </div>
            </div>

            <div class="panel panel-default">
                <h1 class="panel-heading">Devices</h1>
                <div class="panel-body">
                    <div id="deviceList">
                        <device-list></device-list>
                    </div>
                </div>
            </div>
        </div>
    <div>
</div>
<script src="{{ url('js/device-add-vue.js') }}"></script>
<script src="{{ url('js/device-list.js') }}"></script>
@endsection