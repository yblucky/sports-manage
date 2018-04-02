import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


declare var $: any;
declare var layer: any;
declare var Highcharts: any;
var homePage: any;

@Component({
    selector   : 'page-home',
    templateUrl: './home.html',
    styleUrls: ['./home.scss']
})
export class HomePage {
    todayData:any={
      todayBettingAmout:0,
      todayRechgerAmount:0,
      WithdrawCount:0,
      currentProfit:0,
      totayReturnWater:0
    };
    totalData:any={
      totalUserCount:0,
      UserWithdrawCount:0,
      totalProfit:0,
      totalBalance:0
    };
    registerUserCount:any;//用户总数
    orderType:string="10";
    showTime:any = new Date();
    highChartOptions:any={};
    constructor(private router:Router,private httpService:HttpService,private aroute:ActivatedRoute,private utils:Utils) {
        this.aroute.params.subscribe( params  => {
            this.showTime = new Date();
        });
        homePage=this;
        this.orderStatistics();
    }

    orderStatistics(){
      this.httpService.get({
            url:'/home/findAll',
            data:[]
      }).subscribe((data:any)=>{
            if(data.code === "0000"){
                this.todayData.todayBettingAmout=Utils.ifNull(data.data.userSum.bettingAmout,0);
                this.todayData.todayRechgerAmount=Utils.ifNull(data.data.todayData.back_recharge,0);
                this.todayData.WithdrawCount=Utils.ifNull(data.data.todayData.withdrawals,0);
                this.todayData.currentProfit=Utils.ifNull(data.data.userSum.currentProfit,0);
                this.totalData.totalProfit=Utils.ifNull(data.data.userSum.totalProfit,0);
                this.todayData.totayReturnWater=Utils.ifNull(data.data.todayData.return_water,0);
                this.registerUserCount=Utils.ifNull(data.data.registerUserCount,0);
                this.totalData.totalUserCount=Utils.ifNull(data.data.userSum.userCount,0);
                this.totalData.UserWithdrawCount=Utils.ifNull(data.data.totalData.withdrawals,0);
                // this.totalData.totalProfit=data.data.totalData.userCount;
                this.totalData.totalBalance=Utils.ifNull(data.data.userSum.balance,0);
            }
      });

    }

    reportAjax(orderType:string){
      this.httpService.get({
            url:'/homePage/reportStatistics',
            data:{
              orderType:orderType
            }
      }).subscribe((data:any)=>{
            if(data.code === "0000"){
                this.highChartOptions.series=data.data;
                this.report(orderType);
            }
      });
    }

    report(orderType:string){
      var type:string="";
      if(orderType=="10"){
          type="充值/提现";
      }else if(orderType=="20"){
          type="转账/收款";
      }
      this.highChartOptions.chart={};
      this.highChartOptions.chart.type="column";
      this.highChartOptions.title={};
      this.highChartOptions.title.text="最近6个月"+type+"金额";
      this.highChartOptions.xAxis={};
      this.highChartOptions.xAxis.type="category";
      this.highChartOptions.yAxis={};
      this.highChartOptions.yAxis.title={};
      this.highChartOptions.yAxis.title.text=type+"成功金额";
      this.highChartOptions.legend={};
      this.highChartOptions.legend.enabled=false;
      this.highChartOptions.credits={};
      this.highChartOptions.credits.enabled=false;
      this.highChartOptions.plotOptions={};
      this.highChartOptions.plotOptions.series={};
      this.highChartOptions.plotOptions.series.borderWidth=0;
      this.highChartOptions.plotOptions.series.dataLabels={};
      this.highChartOptions.plotOptions.series.dataLabels.enabled=false;
      this.highChartOptions.plotOptions.series.dataLabels.format="{point.y:.1f}";
      this.highChartOptions.tooltip={};
      this.highChartOptions.tooltip.headerFormat="";
      this.highChartOptions.tooltip.pointFormat="<span style='color:{point.color}'>{point.name}月</span>:<b>{point.y:.2f}</b>"+type+"金额<br/>";
      Highcharts.chart("container",homePage.highChartOptions);
    }

    href(type:string){
      var strDate:string=this.utils.formatDate(this.showTime,'yyyy-MM-dd');
      if("1"==type){
          this.router.navigate(['/common/main/transaction/transfer'],{relativeTo: this.aroute,queryParams: { startTime: strDate,endTime:strDate }});
      }
      if("2"==type){
          this.router.navigate(['/common/main/transaction/rechargeOrder'],{relativeTo: this.aroute,queryParams: { state:10 }});
      }
      if("3"==type){
          this.router.navigate(['/common/main/transaction/withdrawOrder'],{relativeTo: this.aroute,queryParams: { state:10 }});
      }
      if("4"==type){
          this.router.navigate(['/common/main/transaction/stbForward'],{relativeTo: this.aroute,queryParams: { startTime: strDate,endTime:strDate }});
      }
      if("5"==type){
          this.router.navigate(['/common/main/transaction/coinCurrencyRecord']);
      }
    }



}
