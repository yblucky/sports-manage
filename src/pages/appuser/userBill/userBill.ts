import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;
declare var layer: any;
var stbExchangePage: any;

@Component({
    selector   : 'page-userBill',
    templateUrl: './userBill.html',
    styleUrls: ['./userBill.scss']
})
export class UserBillPage {
    find:any={
      uid:"",
      mobile:"",
      startTime:"",
      busnessType:"",
      currencyType:"",
      endTime:"",
      uuid:"",
      businessNumber:""
    };
    currencyType:any;
    busnessType:any;

    showTime:any = new Date();
    constructor(private router:Router,private httpService:HttpService,private aroute:ActivatedRoute,private utils:Utils) {
        this.aroute.params.subscribe( params  => {
            this.showTime = new Date();
        });
        stbExchangePage=this;
        if(this.aroute.snapshot.queryParams["startTime"]!=undefined){
          this.find.startTime=this.aroute.snapshot.queryParams["startTime"];
          this.httpService.currentPage=1;
        }
        if(this.aroute.snapshot.queryParams["endTime"]!=undefined){
          this.find.endTime=this.aroute.snapshot.queryParams["endTime"];
          this.httpService.currentPage=1;
        }
        if(this.aroute.snapshot.queryParams["businessNumber"]!=undefined){
          this.find.businessNumber=this.aroute.snapshot.queryParams["businessNumber"];
          this.httpService.currentPage=1;
        }
        if(this.aroute.snapshot.queryParams["busnessType"]!=undefined){
          this.find.busnessType=this.aroute.snapshot.queryParams["busnessType"];
          this.httpService.currentPage=1;
        }
        this.loadDataOne();
    }

    /**
    * 搜索默认第一页
    */
    loadDataOne(){

      this.httpService.currentPage=1;
      this.loadData();
      this.loadType();
    }

    /**
    * 加载数据
    */
    loadData(){
        this.httpService.pagination({
            url:'/webBill/findAll',
            data:this.find
        });


    }

     /**
     * 加载过滤参数
     */
     loadType(){

            this.httpService.get({
                url:'/webBill/findBusnessType'
            }).subscribe((data:any)=>{
                if(data.code==='0000'){

                    this.busnessType = data.data;

                }else if(data.code==='9999'){
                    Utils.show(data.message);
                }else{
                    Utils.show("系统异常，请联系管理员");
                }
            });


     }

     Goto(item:any){
         this.router.navigate(['/common/main/finance/betsOrder'],{relativeTo: this.aroute,queryParams: { businessNumber: item.businessNumber }});
     }

}
