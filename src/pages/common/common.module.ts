import { CommonRoutes } from './common.routes';
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { TreeModule } from 'ng2-tree';
import { ImageUploadModule } from 'ng2-imageupload';
//通用
import { LoginPage } from './login/login';
import { MainPage } from './main/main';
//我的桌面
import { HomePage } from '../desktop/home/home';
//系统管理
import { ParameterPage } from '../system/parameter/parameter';
import { UserInfoPage } from '../system/userInfo/userInfo';
import { RolePage } from '../system/role/role';
import { UpdatePwPage } from '../system/updatePw/updatePw';
import { IpconnectPage } from '../system/ipconnect/ipconnect';
//用户管理
import { UserPage } from '../appuser/user/user';
import { BankCardPage } from '../appuser/bankcard/bankcard';
import { UserBillPage } from '../appuser/userBill/userBill';
//交易管理
import { WithdrawOrder } from '../transaction/withdrawOrder/withdrawOrder';
import { RechargeOrder } from '../transaction/rechargeOrder/rechargeOrder';
import { BetsOrderPage } from '../transaction/betsOrder/betsOrder';
import { RevenueListPage } from '../transaction/revenueList/revenueList';
//代理管理
import { AgentInfoPage } from '../system/agentInfo/agentInfo';
import { AgentLevelPage } from '../system/agentLevel/agentLevel';


@NgModule({
    declarations: [
        LoginPage,
        MainPage,
        HomePage,
        ParameterPage,
        UserInfoPage,
        RolePage,
        UpdatePwPage,
        UserPage,
        BankCardPage, 
        WithdrawOrder,
        RechargeOrder,
        UserBillPage,
        IpconnectPage,
        AgentInfoPage,
        AgentLevelPage,
        BetsOrderPage,
        RevenueListPage
    ],
    imports: [
        BrowserModule,
        FormsModule,
        TreeModule,
        ImageUploadModule,
        RouterModule.forRoot(CommonRoutes,{useHash: false}),
    ]
})
export class CommonModule { }
