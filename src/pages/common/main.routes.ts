import { Routes } from "@angular/router";

import { HomePage } from '../desktop/home/home';

import { ParameterPage } from '../system/parameter/parameter';
import { UserInfoPage } from '../system/userInfo/userInfo';
import { RolePage } from '../system/role/role';
import { UpdatePwPage } from '../system/updatePw/updatePw';
import { UserPage } from '../appuser/user/user';
import { BankCardPage } from '../appuser/bankcard/bankcard';
import { WithdrawOrder } from '../finance/withdrawOrder/withdrawOrder';
import { RechargeOrder } from '../finance/rechargeOrder/rechargeOrder';
import { UserBillPage } from '../appuser/userBill/userBill';
import { IpconnectPage } from '../system/ipconnect/ipconnect';
import { AgentInfoPage } from '../system/agentInfo/agentInfo';
import { AgentLevelPage } from '../system/agentLevel/agentLevel';
import { BetsOrderPage } from '../finance/betsOrder/betsOrder';
import { RevenueListPage } from '../finance/revenueList/revenueList';


export const MainRoutes: Routes = [ // Routes类型的数组
    {
        path     : '',
        component: HomePage
    },{
        path     : 'desktop/home',//首页
        component: HomePage
    },{
        path     : 'system/parameter',//参数管理
        component: ParameterPage
    },{
        path     : 'system/userInfo',//用户管理
        component: UserInfoPage
    },{
        path     : 'system/role',//权限管理
        component: RolePage
    },{
        path     : 'system/updatePw',//修改密码
        component: UpdatePwPage
    },{
        path     : 'appuser/userBill',//用户流水查询
        component: UserBillPage
    },{
        path     : 'appuser/user',//用户管理
        component: UserPage
    },{
        path     : 'appuser/bankcard',//银行卡管理
        component: BankCardPage
    },{
        path     : 'finance/withdrawOrder',//提现订单
        component: WithdrawOrder
    },{
        path     : 'finance/rechargeOrder',//充值订单
        component: RechargeOrder
    },{
        path     : 'system/ipconnect',//访问IP管理
        component: IpconnectPage
    },{
        path     : 'system/agentInfo',//代理列表
        component: AgentInfoPage
    },{
        path     : 'system/agentLevel',//代理等级参数
        component: AgentLevelPage
    },{
        path     : 'finance/betsOrder',//注单列表
        component: BetsOrderPage
    },{
        path     : 'finance/revenueList',//营收列表
        component: RevenueListPage
    },{
        path     : '**',
        component: HomePage
    },
];
