@extends('layouts.app');

@section('content')
    <div id="device_add">
        <form action="{{ url('device/add') }}" method="POST">
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon">name</span>
                    <input type="text" name="device[name]" class="form-control">
                </div>

                <div class="input-group">
                    <span class="input-group-addon">mac</span>
                    <input type="text" name="device[mac]" class="form-control">
                </div>

                <button class="btn btn-default btn-block">Save</button>
            </div>
        </form>
    </div>
    <script>
        let container = $('#device_add');
        let $select = $('<select>');
        //manipulate by VUE
        //so when something click
        //get out the child VUE to handle
        //rather than BACK $ to get content
        devices.forEach((device)=>{
            let $option = $('<option>');
            let html =`<p>${device.name} ${device.mac} ${device.ip} ${device.manufacturer}</p>`;
            $option.html(html);
            $select.append($option);
        });

        $select.on('click', 'option', ()=>{
            $option = $(this);

        });
        
        container.append($select);
    </script>
@endsection