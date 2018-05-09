import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;
declare var layer: any;
var nowPage: any;

@Component({
    selector   : 'page-betsOrder',
    templateUrl: './betsOrder.html',
    styleUrls: ['./betsOrder.scss']
})
export class BetsOrderPage {
    find:any={
      uid:"",
      issueNo:"",
      mobile:"",
      state:"",
      startTime:"",
      endTime:"",
      businessNumber:""
    };
    judge:any={};
    orderType:string;
    editInfo:any={};
    showTime:any = new Date();
    constructor(private router:Router,private httpService:HttpService,private aroute:ActivatedRoute,private utils:Utils) {
        this.aroute.params.subscribe( params  => {
            this.showTime = new Date();
        });
        if(this.aroute.snapshot.queryParams["businessNumber"]!=undefined){
          this.find.businessNumber=this.aroute.snapshot.queryParams["businessNumber"];
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
            url:'/finance/findAll',
            data:this.find
        });
    }


    confirmPayee(item:any){
        layer.confirm('您确定打款此数据吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            nowPage.httpService.post({
                url:'/webWithDraw/successState',
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
                url:'/webWithDraw/errorState',
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
         this.router.navigate(['/common/main/appuser/userBill'],{relativeTo: this.aroute,queryParams: { businessNumber: item.businessNumber,busnessType:(item.state === '30' ?'23':'21') }});
     }

}
