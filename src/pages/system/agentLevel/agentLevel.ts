import { Component } from "@angular/core";

import {HttpService} from "../../../providers/HttpService";
import {Utils} from "../../../providers/Utils";

declare var $: any;
declare var layer: any;
var nowPage: any;

@Component({
    selector   : 'page-agentLevel',
    templateUrl: './agentLevel.html',
    styleUrls: ['./agentLevel.scss']
})
export class AgentLevelPage {

    datas:any;
    subData:any={};
    roles:any;
    isEdit:boolean;
    constructor(private httpService:HttpService,private utils:Utils) {
        this.httpService.items = null;
        this.httpService.currentPage = 1;
        this.loadData();

        nowPage = this;
    }

    /**
    * 加载数据
    */
    loadData(){
        this.httpService.pagination({
            url:'/sysUser/loadAgentSetting',
            data:{}
        });
    }



    /**
    * 弹出新增面板
    */
    showAddPanel(){
        this.isEdit = false;
        this.subData = {
              agentName: "",
              deposit: "",
              maxProfitPerDay: "",
              minBetNoPerDigital: "",
              maxBetNoPerDigital: "",
              returnWaterScale: "",
              maxagentLevelPerDay: "",
              maxBetSeats: "",
              maxBetDigitalNoPerSeat:"",
              odds:""
        };

        layer.open({
            title: "添加参数",
            btn: ["保存","退出"],
            type: 1,
            closeBtn: 0,
            shade: 0,
            fixed: true,
            shadeClose: false,
            resize: false,
            area: ['850px','auto'],
            content: $("#editPanel"),
            yes: function(index:number){
                console.log(nowPage.validator());
                if(nowPage.validator()){
                    nowPage.httpService.post({
                        url:'/sysUser/addAgentLevel',
                        data:nowPage.subData
                    }).subscribe((data:any)=>{
                        layer.closeAll();
                        if(data.code==='0000'){
                            //新增成功
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
                }
            }
        });
    }

    /**
    * 弹出编辑面板
    */
    showEditPanel(item:any){
        this.isEdit = true;
        this.subData = Utils.copyObject(item);
        layer.open({
            title: "修改参数",
            btn: ["保存","退出"],
            type: 1,
            closeBtn: 0,
            shade: 0,
            fixed: true,
            shadeClose: false,
            resize: false,
            area: ['850px','auto'],
            content: $("#editPanel"),
            yes: function(index:number){
                if(nowPage.validator()){
                    nowPage.httpService.post({
                        url:'/sysUser/updateAgentLevel',
                        data:nowPage.subData
                    }).subscribe((data:any)=>{
                        layer.closeAll();
                        if(data.code==='0000'){
                            //修改成功
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
                }
            }
        });
    }

    deleteItem(item:any){
        layer.confirm('您确定要删除此数据吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            nowPage.httpService.post({
                url:'/sysUser/deleteAgentLevel',
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

    disableItem(item:any){
        layer.confirm('您确定要禁用此数据吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){

            item.state  = "20";
            nowPage.httpService.post({
                url:'/appUserStar/update',
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

    enabledItem(item:any){
        layer.confirm('您确定要启用此数据吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
             item.state  = "10";
            nowPage.httpService.post({
                url:'/appUserStar/update',
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

    setRole(opt:any){
        this.subData.roleId = opt.id;
        this.subData.roleName = opt.roleName;
    }

    validator(){
         if(Utils.isEmpty(this.subData.agentName)){
             layer.tips('代理级称不能为空', '#agentName',{tips: 1});
             $("#agentName").focus();
             return false;
         }
        if(Utils.isEmpty(this.subData.deposit)){
            layer.tips('押金不能为空', '#deposit',{tips: 1});
            $("#deposit").focus();
            return false;
        }
        if(!Utils.isNumber(this.subData.deposit)){
             layer.tips('请输入正确数额的押金', '#deposit',{tips: 1});
             $("#deposit").focus();
             return false;
         }
        if(Utils.isEmpty(this.subData.maxProfitPerDay)){
            layer.tips('最大盈利额度不能为空', '#maxProfitPerDay',{tips: 1});
            $("#maxProfitPerDay").focus();
            return false;
        }
        if(!Utils.isNumber(this.subData.maxProfitPerDay)){
             layer.tips('请输入正确数额的最大盈利额度', '#maxProfitPerDay',{tips: 1});
             $("#maxProfitPerDay").focus();
             return false;
        }
       if(Utils.isEmpty(this.subData.minBetNoPerDigital)){
           layer.tips('最小下注组数不能为空', '#minBetNoPerDigital',{tips: 1});
           $("#minBetNoPerDigital").focus();
           return false;
       }
       if(!Utils.isNumber(this.subData.minBetNoPerDigital)){
            layer.tips('请输入正确数额的最小下注组数', '#minBetNoPerDigital',{tips: 1});
            $("#minBetNoPerDigital").focus();
            return false;
       }
      if(Utils.isEmpty(this.subData.maxBetNoPerDigital)){
          layer.tips('最多下注组数(一字定)不能为空', '#maxBetNoPerDigital',{tips: 1});
          $("#maxBetNoPerDigital").focus();
          return false;
      }
      if(!Utils.isNumber(this.subData.maxBetNoPerDigital)){
           layer.tips('请输入正确数额的最多下注组数(一字定)', '#maxBetNoPerDigital',{tips: 1});
           $("#maxBetNoPerDigital").focus();
           return false;
      }
         if(Utils.isEmpty(this.subData.maxWithdrawPerDay)){
             layer.tips('最大提现额度不能为空', '#maxWithdrawPerDay',{tips: 1});
             $("#maxWithdrawPerDay").focus();
             return false;
         }
         if(!Utils.isNumber(this.subData.maxWithdrawPerDay)){
              layer.tips('请输入正确数额的最大提现额度', '#maxWithdrawPerDay',{tips: 1});
              $("#maxWithdrawPerDay").focus();
              return false;
         }
        if(Utils.isEmpty(this.subData.returnWaterScale)){
            layer.tips('返水比例不能为空', '#returnWaterScale',{tips: 1});
            $("#returnWaterScale").focus();
            return false;
        }
        if(Utils.isEmpty(this.subData.maxBetSeats)){
            layer.tips('最多下注位数(一字定)不能为空', '#maxBetSeats',{tips: 1});
            $("#maxBetSeats").focus();
            return false;
        }
        if(this.subData.maxBetSeats <1 || this.subData.maxBetSeats >5){
            layer.tips('最多下注位数(一字定)的范围再1-5', '#maxBetSeats',{tips: 1});
            $("#maxBetSeats").focus();
            return false;
        }
        if(Utils.isEmpty(this.subData.maxBetDigitalNoPerSeat)){
            layer.tips('最多下注号码(一字定)不能为空', '#maxBetDigitalNoPerSeat',{tips: 1});
            $("#maxBetDigitalNoPerSeat").focus();
            return false;
        }
        if(this.subData.maxBetDigitalNoPerSeat <1 || this.subData.maxBetDigitalNoPerSeat >10){
            layer.tips('最多下注号码(一字定)的范围再1-10', '#maxBetDigitalNoPerSeat',{tips: 1});
            $("#maxBetDigitalNoPerSeat").focus();
            return false;
        }
        if(Utils.isEmpty(this.subData.timeDoubleMaxBetSeats)){
            layer.tips('最多下注位数(二字定)不能为空', '#timeDoubleMaxBetSeats',{tips: 1});
            $("#timeDoubleMaxBetSeats").focus();
            return false;
        }
        if(this.subData.timeDoubleMaxBetSeats <1 || this.subData.timeDoubleMaxBetSeats >10){
            layer.tips('最多下注位数(二字定)的范围再1-10', '#timeDoubleMaxBetSeats',{tips: 1});
            $("#timeDoubleMaxBetSeats").focus();
            return false;
        }
        if(Utils.isEmpty(this.subData.timeDoubleMaxBetKindPerTwoSeats)){
            layer.tips('最多组合位数(二字定)不能为空', '#timeDoubleMaxBetKindPerTwoSeats',{tips: 1});
            $("#timeDoubleMaxBetKindPerTwoSeats").focus();
            return false;
        }
        if(this.subData.timeDoubleMaxBetKindPerTwoSeats <1 || this.subData.timeDoubleMaxBetKindPerTwoSeats >100){
            layer.tips('最多组合位数(二字定)的范围再1-100', '#timeDoubleMaxBetKindPerTwoSeats',{tips: 1});
            $("#timeDoubleMaxBetKindPerTwoSeats").focus();
            return false;
        }
        return true;

    }
}
