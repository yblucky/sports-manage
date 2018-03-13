import { Component } from "@angular/core";

import {HttpService} from "../../../providers/HttpService";
import {Utils} from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

declare var $: any;
declare var layer: any;
var nowPage: any;

@Component({
    selector   : 'page-agentInfo',
    templateUrl: './agentInfo.html',
    styleUrls: ['./agentInfo.scss']
})
export class AgentInfoPage {

    datas:any;
    subData:any={};
    roles:any;
    agents:any;
    isEdit:boolean;
    roleType:any;
    rechargeData:any={};
    find:any={
      uid:"",
      mobile:"",
      loginName:"",
      userName:"",
      state:"",
      agentLevelId:"",
      roleType:"20"
    };
    constructor(private router:Router,private httpService:HttpService,private aroute:ActivatedRoute,private utils:Utils) {
        this.httpService.items = null;
        this.httpService.currentPage = 1;
        this.loadData();
        this.loadAgentLevel();
        nowPage = this;
        this.roleType=sessionStorage.getItem('roleType');
    }

    /**
    * 加载数据
    */
    loadData(){
        this.httpService.pagination({
            url:'/sysUser/findAll',
            data:this.find
        });
    }

    /**
    * 加载角色
    */
    loadRoles(){
        this.httpService.get({
            url:'/sysUser/findRoles',
            data:{}
        }).subscribe((data:any)=>{
            if(data.code==='0000'){
                this.roles = data.data;
            }else if(data.code==='9999'){
                Utils.show(data.message);
            }else{
                Utils.show("系统异常，请联系管理员");
            }
        });
    }

    /**
    *
    */
    loadAgentLevel(){
        this.httpService.get({
            url:'/sysUser/loadAgentSetting',
            data:{}
        }).subscribe((data:any)=>{
            if(data.code==='0000'){
                this.agents = data.data;
            }else if(data.code==='9999'){
                Utils.show(data.message);
            }else{
                Utils.show("系统异常，请联系管理员");
            }
        });
    }

    /**
    * 弹出新增面板
    */
    showAddPanel(){
        this.isEdit = false;
        this.subData = {
            userName: '',
            loginName: '',
            password: '1q2w3e',
            mobile: '',
            agentLevelId: '',
            roleName: '',
            state: '10',
            roleType:'20'
        };
        for(let obj in this.agents){
            this.subData.agentId = this.agents[obj].id;
            this.subData.agentName = this.agents[obj].agentName;
            break;
        }
        layer.open({
            title: "新增代理",
            btn: ["保存","退出"],
            type: 1,
            closeBtn: 0,
            shade: 0,
            fixed: true,
            shadeClose: false,
            resize: false,
            area: ['350px','auto'],
            content: $("#editPanel"),
            yes: function(index:number){
                if(nowPage.validator()){
                    nowPage.httpService.post({
                        url:'/sysUser/add',
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
        this.subData.password = "******";
        layer.open({
            title: "修改参数",
            btn: ["保存","退出"],
            type: 1,
            closeBtn: 0,
            shade: 0,
            fixed: true,
            shadeClose: false,
            resize: false,
            area: ['350px','auto'],
            content: $("#editPanel"),
            yes: function(index:number){
                if(nowPage.validator()){
                    nowPage.httpService.post({
                        url:'/sysUser/update',
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
                url:'/sysUser/delete',
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
            nowPage.httpService.post({
                url:'/sysUser/disable',
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
            nowPage.httpService.post({
                url:'/sysUser/enabled',
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

    /**
    * 弹出充值面板
    */
    showRecharge(){
        this.rechargeData = {
              mobile: "",
              balance: 0
        };
        layer.open({
            title: "充值",
            btn: ["保存","退出"],
            type: 1,
            closeBtn: 0,
            shade: 0,
            fixed: true,
            shadeClose: false,
            resize: false,
            area: ['450px','250px'],
            content: $("#rechargePanel"),
            yes: function(index:number){
              if(Utils.isEmpty(nowPage.rechargeData.mobile)){
                  layer.tips('代理手机号不能为空', '#agentMobile',{tips: 1});
                  $("#agentMobile").focus();
                  return false;
              }

              nowPage.httpService.post({
                  url:'/sysUser/recharge',
                  data:nowPage.rechargeData
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
        });
    }

    validator(){
        if(Utils.isEmpty(this.subData.userName)){
            layer.tips('用户名不能为空', '#userName',{tips: 1});
            $("#userName").focus();
            return false;
        }
        if(Utils.isEmpty(this.subData.loginName)){
            layer.tips('登录名不能为空', '#loginName',{tips: 1});
            $("#loginName").focus();
            return false;
        }
        if(Utils.isEmpty(this.subData.password)){
            layer.tips('密码不能为空', '#password',{tips: 1});
            $("#password").focus();
            return false;
        }
        return true;
    }

   Goto(item:any){
       this.router.navigate(['/common/main/appuser/user'],{relativeTo: this.aroute,queryParams: { parentId: item.id}});
   }
}
