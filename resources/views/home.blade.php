@extends('layouts.app')

@section('content')
<div class="container-fluid my_container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <h1 class="panel-heading">Dashboard</h1>
                <div class="panel-body">
                    <div class="col-md-9">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <h3>Monthly report</h3>
                                <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <div id="monthlyReportChartContainer" class="bg-info">
                                    {{--change home to ALL USER report--}}
                                    <div id="monthlyReport"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="panel-body">
                            <h3>Users</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <div id="userStatus">
                                <user-status></user-status>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ url('js/d3.min.js') }}"></script>
<script type="text/javascript" src="{{ url('js/crossfilter.js') }}"></script>

<script type="text/javascript" src="{{ url('js/dc.js') }}"></script>
<script type="text/javascript" src="{{ url('js/reductio.min.js') }}"></script>


<script src="{{ url('js/user-status.js') }}"></script>
<script src="{{ url('js/record-report-all.js') }}"></script>
@endsection
