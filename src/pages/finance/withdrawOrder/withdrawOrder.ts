import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;
declare var layer: any;
var nowPage: any;

@Component({
    selector   : 'page-withdrawOrder',
    templateUrl: './withdrawOrder.html',
    styleUrls: ['./withdrawOrder.scss']
})
export class WithdrawOrder {
    find:any={
      uid:"",
      mobile:"",
      state:"",
      startTime:"",
      endTime:""
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
        this.loadDataOne();
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
            url:'/finance/findAllWithDraw',
            data:this.find
        });
    }


    confirmPayee(item:any){
        layer.confirm('您确定打款此数据吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            nowPage.httpService.post({
                url:'/finance/successState',
                data:item
            }).subscribe((data:any)=>{
                layer.closeAll();
                if(data.code==='0000'){
                    //删除成功
                   layer.msg(data.message,{
                       icon: '1',
                       time: 2000
                   },function(){
                       nowPage.loadData();
                   });
                }else if(data.code==='9999'){
                    Utils.show(data.message);
                }else{
                    Utils.show("系统异常，请联系管理员");
                }
            });
        });
    }

    errorState(item:any){
        layer.confirm('您确定驳回此数据吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            nowPage.httpService.post({
                url:'/finance/errorState',
                data:item
            }).subscribe((data:any)=>{
                layer.closeAll();
                if(data.code==='0000'){
                    //删除成功
                   layer.msg(data.message,{
                       icon: '1',
                       time: 2000
                   },function(){
                       nowPage.loadData();
                   });
                }else if(data.code==='9999'){
                    Utils.show(data.message);
                }else{
                    Utils.show("系统异常，请联系管理员");
                }
            });
        });
    }

    Goto(item:any){
        this.router.navigate(['/common/main/transaction/rechargeOrder'],{relativeTo: this.aroute,queryParams: { order: item.targetOrder }});
    }
}
