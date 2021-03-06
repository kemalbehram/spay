
@extends('emails.email_layout')
@section('content')
<h4 style="margin-bottom: 10px;">Hi {{$member["first_name"]}} {{$member["last_name"]}},</h4>
<p style="text-indent: 50px;">
	Your token order #{{$record["automatic_cash_in_id"]}} has been accepted. You have received a total of <strong>{{$amount}} XS Tokens</strong>. Thank you!
</p>
<small><em>
	To check your transactions details. Go to www.successpay.io, <strong>Login</strong> your account and in member dashboard click <strong>BTC or ETH Transactions</strong>.
</em></small>
<div style="text-align: center; padding: 15px 0px;">
	<a href="http://successpay.io/login" target="_blank" style="padding: 12px; border: 1px solid #005d12; background: #005d12; color: #eee; cursor: pointer; text-decoration: none; font-size: 13px;">Click Here to Login</a>
</div>

@endsection