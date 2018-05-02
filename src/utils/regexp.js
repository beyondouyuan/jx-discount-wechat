/*
* @Author: beyondouyuan
* @Date:   2018-04-27 16:08:57
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-05-02 11:51:46
*/

// QQ号、手机号、Email、是否是数字、去掉前后空格、是否存在中文、邮编、身份证、URL、日期格式、IP
export const RegUtils = {
    // 检查字符串是否为合法QQ号码
    isQQ: function(str) {
        // 1 首位不能是0  ^[1-9]
        // 2 必须是 [5, 11] 位的数字  \d{4, 9}
        const reg = /^[1-9][0-9]{4,9}$/gim;
        if (reg.test(str)) {
            console.log('QQ号码格式输入正确');
            return true;
        } else {
            console.log('请输入正确格式的QQ号码');
            return false;
        }
    },
    // 检查字符串是否为合法手机号码
    isPhone: function(str) {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
        if (reg.test(str)) {
            console.log('is phone');
            return true;
        } else {
            console.log('请输入正确格式的手机号码');
            return false;
        }
    },
    // 检查字符串是否为合法Email地址
    isEmail: function(str) {
        const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        // const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(str)) {
            console.log('Email格式输入正确');
            return true;
        } else {
            console.log('请输入正确格式的Email');
            return false;
        }
    },
    // 检查字符串是否是数字
    isNumber: function(str) {
        const reg = /^\d+$/;
        if (reg.test(str)) {
            console.log(str + 'is number');
            return true;
        } else {
            console.log(str + 'is not a number');
            return false;
        }
    },
    // 去掉前后空格
    trim: function(str) {
        const reg = /^\s+|\s+$/g;
        return str.replace(reg, '');
    },
    // 检查字符串是否存在中文
    isChinese: function(str) {
        const reg = /[\u4e00-\u9fa5]/gm;
        if (reg.test(str)) {
            console.log(str + ' 中存在中文');
            return true;
        } else {
            console.log(str + ' 中不存在中文');
            return false;
        }
    },
    // 检查字符串是否为合法邮政编码
    isPostcode: function(str) {
        // 起始数字不能为0，然后是5个数字  [1-9]\d{5}
        const reg = /^[1-9]\d{5}$/g;
        // const reg = /^[1-9]\d{5}(?!\d)$/;
        if (reg.test(str)) {
            console.log(str + ' 是合法的邮编格式');
            return true;
        } else {
            console.log(str + ' 是不合法的邮编格式');
            return false;
        }
    },
    // 检查字符串是否为合法身份证号码
    isIDcard: function(str) {
        const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (reg.test(str)) {
            console.log(str + ' 是合法的身份证号码');
            return true;
        } else {
            console.log(str + ' 是不合法的身份证号码');
            return false;
        }
    },
    // 检查字符串是否为合法URL
    isURL: function(str) {
        const reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
        if (reg.test(str)) {
            console.log(str + ' 是合法的URL');
            return true;
        } else {
            console.log(str + ' 是不合法的URL');
            return false;
        }
    },
    // 检查字符串是否为合法日期格式 yyyy-mm-dd
    isDate: function(str) {
        const reg = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/;
        if (reg.test(str)) {
            console.log(str + ' 是合法的日期格式');
            return true;
        } else {
            console.log(str + ' 是不合法的日期格式，yyyy-mm-dd');
            return false;
        }
    },
    // 检查字符串是否为合法IP地址
    isIP: function(str) {
        // 1.1.1.1  四段  [0 , 255]
        // 第一段不能为0
        // 每个段不能以0开头
        //
        // 本机IP: 58.50.120.18 湖北省荆州市 电信
        const reg = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/gi;
        if (reg.test(str)) {
            console.log(str + ' 是合法的IP地址');
            return true;
        } else {
            console.log(str + ' 是不合法的IP地址');
            return false;
        }
    },
    /**
     * Determines if cname.
     * @description 检验中文姓名 
     * @description add isCname method by Ou Yuan on date 2017-12-8 
     * @param      {string}   str     字符串
     * @return     {boolean}  True if cname, False otherwise.
     */
    isCname: function(str) {
        const reg = /^[\u4e00-\u9fa5]{0,}$/
        if (reg.test(str)) {
            console.log(str + '是合法的中文名')
            return true
        } else {
            console.log(str + '是不合法的中文名')
            return false
        }
    },
    
    isAmount: function(str) {
        // const reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,8})?)$/
        const reg = /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/
        if (reg.test(str)) {
            console.log(str + 'is amount')
            return true
        } else {
            console.log(str + 'is not amount')
            return false
        }
    }
}