import { Component, OnInit } from '@angular/core';
import { MemberInfoService }    	from '../../member/member-info.service';
import { HttpClient, HttpHeaders } 	from '@angular/common/http';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-bank-transactions',
  templateUrl: './admin-bank-transactions.component.html',
  styleUrls: ['./admin-bank-transactions.component.scss']
})
export class AdminBankTransactionsComponent implements OnInit {

  _param: any = {};
	_table: any;
	page : any;
	pending_transactions : any = 0;
	table_loader: boolean;
	modal_ref : any;
	data_focus : any;

	table_url: string;
	pending_transactions_url: string;

	//parameters
	account_name : string;
	transaction_status : string;
	transaction_date_from : any;
	transaction_date_to : any;
	bank_name : any;

	bank_methods : any;
	bank_focus : any;
	bankevent : any;
	bank_new : any = {};
	adding = false;
	updating = false;
	fetching_methods = false;

	expected_payment : any = 0;
	
	processing : boolean = false;

	constructor(public rest : MemberInfoService, private http : HttpClient, private modalService: NgbModal) { }

	ngOnInit() 
	{

		/*login token*/
		this._param["login_token"] = this.rest.login_token;

		this.transaction_status = "all";
		this.account_name = null;
		this.transaction_date_from = "";
		this.transaction_date_to = "";

		this.table_url = this.rest.api_url + "/api/admin/btc_transactions";
		this.pending_transactions_url = this.rest.api_url + "/api/admin/btc_pending_transactions";
		this.bank_name = "all";
		this.countPending();
		this.loadTable();
		this.get_bank_methods();
	}

	get_bank_methods()
	{
		this.fetching_methods = true;
		this.http.post(this.rest.api_url + "/api/admin/get_bank_methods", 
		{
		login_token : this.rest.login_token
		}).subscribe(response=>
		{
			this.bank_methods = response;
			this.bank_new = {};
			this.bank_new.cash_in_method_header = "SAVINGS";
			this.fetching_methods = false;
		})
	}

	loadTable()
	{
		this.table_loader = true;
		this._param["account_name"] = this.account_name; 
		this._param["transaction_status"] = this.transaction_status; 
		this._param["transaction_date_from"] = this.transaction_date_from; 
		this._param["transaction_date_to"] = this.transaction_date_to;
		this._param["cash_in_method_id"] = this.bank_name;
		this._param["log_method"] = "Bank";
		this._param["log_method_accepted"] = "Bank Total";

		this.http.post(this.table_url, this._param).subscribe(response =>
		{
			this.countPending();
			this._table = response;
			this.table_loader = false;
			console.log(this._table);
		},
			error=>
			{
				console.log(error);
			});
	}

	countPending()
	{
		this._param["method"] = "Bank";
		this.http.post(this.pending_transactions_url, this._param).subscribe(response=>
		{
			this.pending_transactions = response;
		},
			error=>
			{
				console.log(error);
			});
	}

	open(content)
	{
		this.modal_ref = this.modalService.open(content);
	}

	openLg(content)
	{
		this.modal_ref = this.modalService.open(content, {'size': 'lg'});
	}

	viewTransactionDetails(id, selector )
	{
		this.data_focus = this.rest.findObjectByKey(this._table, 'automatic_cash_in_id', id);
		this.openLg(selector);
	}

	openBankConfig(selector)
	{
		this.openLg(selector);
	}

	processTransaction(status)
	{
		this.processing = true
		this.http.post(this.rest.api_url + "/api/admin/update_transaction",
		{
			login_token : this.rest.login_token,
			action : status,
			payment : "bank",
			member_id : this.data_focus.id,
			member_log_id : this.data_focus.member_log_id,
			amount : this.data_focus.php_amount,
			cash_in_date : this.data_focus.log_time
		}).subscribe(response=>
		{
			this.loadTable();
			this.modal_ref.close();
			this.processing = false
		})
	}

	bankEvent(event, id = null)
	{
		this.bankevent = event;
		if(event == 'edit')
		{
			this.bank_focus = {};
			this.bank_focus = this.rest.findObjectByKey(this.bank_methods, 'cash_in_method_id', id);
		}
		// else if(event == 'add')
		// {

		// }
	}

	addMethod()
	{
		this.adding = true;
		this.bank_new.login_token = this.rest.login_token;
		this.http.post(this.rest.api_url + "/api/admin/add_new_method", this.bank_new).subscribe(response=>
		{
			this.get_bank_methods();
			this.bankevent = null;
			this.bank_new  = null;
			this.adding = false;
		})
	}

	archiveMethod(id, status)
	{
		this.updating = true;
		this.http.post(this.rest.api_url + "/api/admin/archive_method", 
		{
			login_token : this.rest.login_token,
			cash_in_method_id : id,
			status : status
		}).subscribe(response=>
		{
			this.get_bank_methods();
			this.bankevent = null;
			this.bank_focus = null;
			this.updating = false;
		})
	}

	updateMethod(id)
	{
		this.updating = true;
		this.bank_focus.login_token = this.rest.login_token;
		this.http.post(this.rest.api_url + "/api/admin/update_method", this.bank_focus).subscribe(response=>
		{
			this.get_bank_methods();
			this.updating = false;
		})
	}
}
