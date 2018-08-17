import { Component, OnInit } from '@angular/core';
import { MemberInfoService } 	from '../../member/member-info.service';
import { GlobalConfigService }  from '../../global-config.service';
import { HttpClient, HttpHeaders }     from '@angular/common/http';
import { Router }         from "@angular/router";
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'app-main-func',
  templateUrl: './main-func.component.html',
  styleUrls: ['./main-func.component.scss']
})
export class MainFuncComponent implements OnInit {

  initializing : boolean;

  constructor(public rest: MemberInfoService, private http : HttpClient, private router:Router, public globalConfigService:GlobalConfigService) { 
    
  }
 

  ngOnInit() {
  	var app = this;
    app.initializing = false;
    app.rest.loading = true;
    
  	// if(app.globalConfigService.isLoggedIn())
    // {

    //   app.rest.serverGetBasicInfo().subscribe(response =>
    //   {
    //     app.rest.syncFromServerResponseMember(response);        
    //     app.rest.serverGetOtherInfo().subscribe(response =>
    //     {
    //       app.rest.syncFromServerResponseOther(response);

    //       app.rest.serverGetSaleStage().subscribe(response =>
    //       {
    //         app.rest.syncFromServerGetSaleStage(response);
    //         app.rest.serverGetLiveExchangeRate().subscribe(response=>
    //         {
    //           app.rest.syncFromServerGetLiveExchangeRate(response);
    //           app.rest.serverGetFiles().subscribe(response=>
    //           {
    //             app.rest.syncFromServerGetFiles(response);
    //             app.initializing = false;
    //             app.rest.loading = true;
    //           });
    //         });
    //       });
          
    //     });
    //   },
    //   error =>
    //   {
    //     this.actionLogout();
    //   });
    // }
    // else
    // {
    //    app.rest.serverGetOtherInfo().subscribe(response =>
    //     {
    //       app.rest.syncFromServerResponseOther(response);
    //       app.rest.serverGetSaleStage().subscribe(response =>
    //       {
    //         app.rest.syncFromServerGetSaleStage(response);
    //         app.rest.serverGetLiveExchangeRate().subscribe(response=>
    //         {
    //           app.rest.syncFromServerGetLiveExchangeRate(response);
              
    //           app.rest.serverGetFiles().subscribe(response=>
    //           {
    //             app.rest.syncFromServerGetFiles(response);
    //             app.initializing = false;
    //             app.rest.loading = true;
    //           });

    //         });
    //       });
    //   });
    // }
  }

  actionLogout() : void
	{
	    this.globalConfigService.logout();
	    this.router.navigate(['/']); 
	}

}