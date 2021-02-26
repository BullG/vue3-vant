/*
 *           佛曰:  
 *                   写字楼里写字间，写字间里程序员；  
 *                   程序人员写程序，又拿程序换酒钱。  
 *                   酒醒只在网上坐，酒醉还来网下眠；  
 *                   酒醉酒醒日复日，网上网下年复年。  
 *                   但愿老死电脑间，不愿鞠躬老板前；  
 *                   奔驰宝马贵者趣，公交自行程序员。  
 *                   别人笑我忒疯癫，我笑自己命太贱；  
 *                   不见满街漂亮妹，哪个归得程序员？
 * 
 * @Author: 酋小怪
 * @Date: 2020-12-28 09:47:02
 * @LastEditTime: 2021-01-08 15:07:03
 * @LastEditors: 酋小怪
 * @Description: 选择项配置
 * @FilePath: \loan-apply-cli-ts\src\utils\dataUtil.ts
 */

export const GENDER_COLUMNS =
    [{
        text: '男',
        value: 1
    }, {
        text: '女',
        value: 2
    }]
export const GED_COLUMNS = [
    {
        text: '小学',
        value: 1
    }, {
        text: '初中',
        value: 2
    },
    {
        text: '高中',
        value: 3
    }, {
        text: '技术学校',
        value: 4
    },
    {
        text: '中专或中等技术学校',
        value: 5
    }, {
        text: '大专',
        value: 6
    },
    {
        text: '本科',
        value: 7
    }, {
        text: '研究生或以上',
        value: 8
    }, {
        text: '文盲或半文盲',
        value: 9
    }
]
export const HOUSING_COLUMNS = [
    {
        text: '自购有贷款',
        value: 1
    },
    {
        text: '自购无贷款',
        value: 2
    }
    , {
        text: '单位宿舍',
        value: 3
    }, {
        text: '亲属产权房',
        value: 4
    }, {
        text: '租房',
        value: 5
    }, {
        text: '其他',
        value: 6
    }
]

export const MATRIMONY_COLUMNS = [
    {
        text: '未婚',
        value: 1
    },
    {
        text: '已婚',
        value: 2
    },
    {
        text: '丧偶',
        value: 3
    },
    {
        text: '离异',
        value: 4
    }
]
export const INDUSTRY_COLUMNS = [
    {
        text: '猪的饲养',
        value: 0
    },
    {
        text: '养殖行业',
        value: 1
    },
    {
        text: '批发零售',
        value: 2
    },
]

export const NB_AREA_LIST = {

    province_list: { 330000: '浙江省', },
    city_list: { 330200: '宁波市', },
    county_list: {
        330203: '海曙区',
        330205: '江北区',
        330206: '北仑区',
        330211: '镇海区',
        330212: '鄞州区',
        330213: '奉化区',
        330225: '象山县',
        330226: '宁海县',
        330281: '余姚市',
        330282: '慈溪市',
    },
}

export const LOAN_USE_COLUMNS = [
    {
        text: '测试',
        value: '1'
    },
]
export const LOAN_TERM_COLUMNS=[
    {
        text: '6个月',
        value: '0'
    },
    {
        text: '12个月',
        value: '1'
    },
    {
        text: '18个月',
        value: '2'
    },
    {
        text: '24个月',
        value: '3'
    },
   
]

export const  REPAY_METHOD_COLUMNS=[
    {
        text: '一次性还本付息',
        value: '0'
    },
    {
        text: '按月付息，到期一次性还本',
        value: '1'
    },
    {
        text: '按月等额本息还款',
        value: '2'
    },
]