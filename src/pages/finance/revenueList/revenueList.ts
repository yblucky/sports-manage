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
    sumData:any={
      betScore:0,
      memberRs:0,
      agentProfit:0
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
        this.loadData();
    }

    /**
    * 搜索默认第一页
    */
    loadDataOne(){
      this.httpService.currentPage=1;
      this.loadData();
      let datas = this.httpService.items;
      let betScore=0;
      let memberRs=0;
      let agentProfit=0;
      for (var i=0;i<datas.length;i++)
      {
        betScore=betScore+Utils.ifNull(datas[i].betScore,0);
        memberRs=memberRs+Utils.ifNull(datas[i].memberRs,0);
        agentProfit=agentProfit+Utils.ifNull(datas[i].agentProfit,0);
      }
      this.sumData.betScore=betScore;
      this.sumData.memberRs=memberRs;
      this.sumData.agentProfit=agentProfit;
    }

    /**
    * 加载数据
    */
    loadData(){
        this.httpService.currentPage=1;
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
