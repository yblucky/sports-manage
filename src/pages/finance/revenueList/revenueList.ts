import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;
declare var layer: any;
var nowPage: any;

@Component({
    selector   : 'page-revenueList',
    templateUrl: './revenueList.html',
    styleUrls: ['./revenueList.scss']
})
export class RevenueListPage {
    find:any={
      uid:"",
      mobile:"",
      state:"",
      startTime:"",
      endTime:"",
      dateType:""
    };
    judge:any={};
    orderType:string;
    editInfo:any={};
    showTime:any = new Date();
    constructor(private router:Router,private httpService:HttpService,private aroute:ActivatedRoute,private utils:Utils) {
        this.aroute.params.subscribe( params  => {
            this.showTime = new Date();
        });
        if(this.aroute.snapshot.queryParams["order"]!=undefined){
          this.find.orderId=this.aroute.snapshot.queryParams["order"];
          this.httpService.currentPage=1;
        }
        if(this.aroute.snapshot.queryParams["state"]!=undefined){
          this.find.state=this.aroute.snapshot.queryParams["state"];
          this.httpService.currentPage=1;
        }
        nowPage=this;
    }

    /**
    * 搜索默认第一页
    */
    loadDataOne(){
      this.httpService.currentPage=1;
      this.loadData();
    }

    /**
    * 加载数据
    */
    loadData(){
        this.httpService.pagination({
            url:'/finance/revenueList',
            data:this.find
        });
    }


    /**
    * 搜索默认第一页
    */
    showList(dateType:any){
      this.find.dateType=dateType;
      this.loadDataOne();
    }

}
