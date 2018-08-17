
@extends('emails.email_layout')
@section('content')
<h4 style="margin-bottom: 10px;">Hi {{$member["first_name"]}} {{$member["last_name"]}},</h4>
<p style="text-indent: 50px;">
	You have recently placed an order of <strong>{{ $amount }} LOKAL Tokens</strong> via {{ $method }}. Please pay on or before {{ date("F j, Y",strtotime($record["expiration_date"])) }}. Failing to pay the expected payment on time will result to order expiration. Thank you!
</p>
<small><em>
	To check your transactions details. Go to www.lokalize.io, <strong>Login</strong> your account and in member dashboard click <strong>BTC or ETH Transactions</strong>.
</em></small>
<div style="text-align: center; padding: 15px 0px;">
	<a href="https://lokalize.io/login" target="_blank" style="padding: 12px; border: 1px solid rgba(10,0,39,1); background: rgba(10,0,39,0.8); color: #eee; cursor: pointer; text-decoration: none; font-size: 13px;">Click Here to Login</a>
</div>

@endsection