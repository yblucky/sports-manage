import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;
declare var layer: any;
var userPage: any;

@Component({
    selector   : 'page-user',
    templateUrl: './user.html',
    styleUrls: ['./user.scss']
})
export class UserPage {
    find:any={
      uid:"",
      mobile:"",
      nickName:"",
      name:"",
      state:"",
      parentId:"",
      credit:""
    };
    upUser:any={};
    rechargeData:any={};
    upPwdData:any={};
    upPayPwdData:any={};
    editDate:any={};
    showTime:any = new Date();
    showPage:any = 1;  //1:修改 2:显示等级
    userLower:any;
    userParent:any;
    roleType:any;



    /**
     * 排序条件
     */
    scoreCount:number = 0;
    balanceCount:number = 0;
    shadowScoreCount:number = 0;
    virtualCoinCount:number = 0;


    score:any = {
      score:""
    };   //积分
    balance:any = {
      balance:""
    }; //余额
    shadowScore:any = {
      shadowScore:""
    }; //影子积分
    virtualCoin:any = {
      virtualCoin:""
    }; //数字资产




    constructor(private router:Router,private httpService:HttpService,private aroute:ActivatedRoute,private utils:Utils) {
        this.aroute.params.subscribe( params  => {
            this.showTime = new Date();
        });
        if(this.aroute.snapshot.queryParams["parentId"]!=undefined){
          this.find.parentId=this.aroute.snapshot.queryParams["parentId"];
          this.httpService.currentPage=1;
        }
        userPage=this;
        this.roleType=sessionStorage.getItem('roleType');
        this.loadDataOne();
    }

    /**
    * 搜索默认第一页
    */
    loadDataOne(){
      this.httpService.currentPage=1;
      this.loadData();
    }


    loadbalance(){
        this.balanceCount++;
        if(this.balanceCount % 2 ==1){
            this.balance.balance = "1";
        }else{
            this.balance.balance = "2";
        }

        this.httpService.pagination({
            url:'/webUser/userTab',
            data:this.balance
        });
    }


    /**
    * 加载数据
    */
    loadData(){
        this.httpService.pagination({
            url:'/webUser/userTab',
            data:this.find
        });
    }

    disable(item:any){
      this.upUser.id=item.id;
      if(item.state==10){
        this.upUser.state=20
      }else if(item.state==20){
        this.upUser.state=10
      }else{
        alert("用户状态错误");
        return false;
      }
      this.httpService.post({
          url:'/webUser/upUserState',
          data:this.upUser
      }).subscribe((data:any)=>{
          if(data.code==='0000'){
              //修改成功
             this.loadData();
          }else if(data.code==='9999'){
              Utils.show(data.message);
          }else{
              Utils.show("系统异常，请联系管理员");
          }
      });
    }

    deleteItem(item:any){
      layer.confirm('删除为不可逆操作,您确定要删除此数据吗？', {
          btn: ['确定','取消'] //按钮
      }, function(){
          var upUser:any={};
          upUser.id=item.id;
          if(item.state==10||item.state==20){
            upUser.state=30
          }else{
            alert("用户状态错误");
            return false;
          }
          userPage.httpService.post({
              url:'/webUser/upUserState',
              data:upUser
          }).subscribe((data:any)=>{
              layer.closeAll();
              if(data.code==='0000'){
                  //删除成功
                 layer.msg(data.message,{
                     icon: '1',
                     time: 2000
                 },function(){
                     userPage.loadData();
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
    * 弹出等级面板
    */
    showGrade(item:any){
        this.showPage = 2;
        this.editDate = Utils.copyObject(item);
        this.httpService.get({
            url:'/webUser/loadLower',
            data:{parentId:item.id}
        }).subscribe((data:any)=>{
            if(data.code==='0000'){
              this.userLower = data.data;
            }else if(data.code==='9999'){
                Utils.show(data.message);
            }else{
                Utils.show("系统异常，请联系管理员");
            }
        });

        this.httpService.get({
            url:'/webUser/loadParent',
            data:{id:item.parentId}
        }).subscribe((data:any)=>{
            if(data.code==='0000'){
              this.userParent = data.data;
            }else if(data.code==='9999'){
                Utils.show(data.message);
            }else{
                Utils.show("系统异常，请联系管理员");
            }
        });

        layer.open({
            title: "查看层级",
            btn: ["确认","退出"],
            type: 1,
            closeBtn: 0,
            shade: 0,
            fixed: true,
            shadeClose: false,
            resize: false,
            area: ['550px','400px'],
            content: $("#editPanel"),
            yes: function(index:number){
                   layer.closeAll();
            }
        });


    }

    /**
    * 弹出充值面板
    */
    showRecharge(){
        this.rechargeData = {
              uid: "",
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
              if(Utils.isEmpty(userPage.rechargeData.mobile)){
                  layer.tips('会员UID/手机号不能为空', '#uid',{tips: 1});
                  $("#uid").focus();
                  return false;
              }
              // if(Utils.isMobile(userPage.rechargeData.balance)){
              //     layer.tips('请输入正确的数额', '#balance',{tips: 1});
              //     $("#balance").focus();
              //     return false;
              // }
              userPage.httpService.post({
                  url:'/webUser/recharge',
                  data:userPage.rechargeData
              }).subscribe((data:any)=>{
                  layer.closeAll();
                  if(data.code==='0000'){
                      //修改成功
                      layer.msg(data.message,{
                          icon: '1',
                          time: 2000
                      },function(){
                          userPage.loadData();
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



        /**
        * 弹出修改密码面板
        */
        showUpPwd(){
            this.upPwdData = {
                  uid: "",
                  loginPwd: ""
            };
            layer.open({
                title: "修改登录密码",
                btn: ["保存","退出"],
                type: 1,
                closeBtn: 0,
                shade: 0,
                fixed: true,
                shadeClose: false,
                resize: false,
                area: ['450px','250px'],
                content: $("#upPwdPanel"),
                yes: function(index:number){
                  if(Utils.isEmpty(userPage.upPwdData.mobile)){
                      layer.tips('会员UID/手机号不能为空', '#uid',{tips: 1});
                      $("#uid").focus();
                      return false;
                  }
                  userPage.httpService.post({
                      url:'/webUser/upPwd',
                      data:userPage.upPwdData
                  }).subscribe((data:any)=>{
                      layer.closeAll();
                      if(data.code==='0000'){
                          //修改成功
                          layer.msg(data.message,{
                              icon: '1',
                              time: 2000
                          },function(){
                              userPage.loadData();
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
        /**
        * 弹出修改支付密码面板
        */
      showUpPayPwd(){
        this.upPayPwdData = {
              payUid: "",
              payPwd: ""
        };
        layer.open({
            title: "修改支付密码",
            btn: ["保存","退出"],
            type: 1,
            closeBtn: 0,
            shade: 0,
            fixed: true,
            shadeClose: false,
            resize: false,
            area: ['450px','250px'],
            content: $("#upPayPwdPanel"),
            yes: function(index:number){
              if(Utils.isEmpty(userPage.upPayPwdData.mobile)){
                  layer.tips('会员UID/手机号不能为空', '#payUid',{tips: 1});
                  $("#payUid").focus();
                  return false;
              }
              userPage.httpService.post({
                  url:'/webUser/upPayPwd',
                  data:userPage.upPayPwdData
              }).subscribe((data:any)=>{
                  layer.closeAll();
                  if(data.code==='0000'){
                      //修改成功
                      layer.msg(data.message,{
                          icon: '1',
                          time: 2000
                      },function(){
                          userPage.loadData();
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


    /**
    * 弹出编辑面板
    */
    showEditName(item:any){
        this.showPage = 1;
        this.editDate = Utils.copyObject(item);
        layer.open({
            title: "修改参数",
            btn: ["保存","退出"],
            type: 1,
            closeBtn: 0,
            shade: 0,
            fixed: true,
            shadeClose: false,
            resize: false,
            area: ['350px','170px'],
            content: $("#editPanel"),
            yes: function(index:number){
              if(Utils.isEmpty(userPage.editDate.name)){
                  layer.tips('姓名不能为空', '#name',{tips: 1});
                  $("#name").focus();
                  return false;
              }
              userPage.httpService.post({
                  url:'/webUser/upUserName',
                  data:userPage.editDate
              }).subscribe((data:any)=>{
                  layer.closeAll();
                  if(data.code==='0000'){
                      //修改成功
                      layer.msg(data.message,{
                          icon: '1',
                          time: 2000
                      },function(){
                          userPage.loadData();
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
    bankCard(item:any){
        this.router.navigate(['/common/main/webUser/bankcard'],{relativeTo: this.aroute,queryParams: { uid: item.uid }});
    }
}
