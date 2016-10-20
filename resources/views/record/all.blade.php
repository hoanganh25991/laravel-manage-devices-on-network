@extends('layouts.app')

@section('content')
    <div class="container-fluid my_container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <h1 class="panel-heading">Monthly report</h1>
                    <div class="panel-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                        <div id="monthlyReportChartContainer" class="bg-info">
                            {{--change to for only this user--}}
                            <div id="monthlyReportChart"></div>
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

    <script src="{{ url('js/record-report.js') }}"></script>
@endsection