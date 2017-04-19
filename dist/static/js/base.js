var API_HOST = 'https://www.baicaiyun.cn/api';
//var API_HOST = 'http://api.dfjc.dev';
var API_LOGIN = API_HOST + '/shopsystem/manage/v1/auth/login';
var API_STAFF_LOGIN = '/shopsystem/manage/v1/staff/login';
var API_SIGN_CODE = API_HOST + '/shopsystem/manage/v1/auth/code/signup';
var API_SIGN = API_HOST + '/shopsystem/manage/v1/auth/signup';
var API_FIND_PASSWORD = API_HOST + '/shopsystem/manage/v1/auth/code/passwd';
var API_NEW_PASSWORD = API_HOST + '/shopsystem/manage/v1/auth/passwd';
var API_REGIONID = API_HOST + '/commonservice/client/v1/regions?q='
var API_WECHAT_CODE = API_HOST + '/shopsystem/manage/v1/auth/code/wechatBind'
var API_WECHAT_BIND = API_HOST + '/shopsystem/manage/v1/auth/wechat/bind'
var API_IMGCODE = API_HOST + '/commonservice/admin/v1/captcha/'

$(function() {
    $.ajaxSetup({
        headers: {
            "content-type": "application/json",
        },
        error: function(data) {
            if (data && data.responseJSON && data.responseJSON.message) {
                showError('错误:' + data.responseJSON.message)

            }
        },
        statusCode: {
            404: function() {
                showError('错误:找不到域名')
            }
        },
        complete: function() {
            hideLoading()
        }
    })
})

function showError(msg) {
    $('.error').css('color', 'red')
    $('.error').text(msg)
    $('.error').show()
    shake()
}

function showCorrect(msg) {
    $('.error').css('color', 'green')
    $('.error').text(msg)
    $('.error').show()
}

function hideError() {
    $('.error').hide()
}

var oldmsg

function showLoading(msg) {
    oldmsg = $('.submit').html()
    $('.submit').addClass('disabled')
    $('.submit').html("<i class='fa fa-spinner fa-pulse fa-2x fa-fw'></i>" + msg + "")
}

function hideLoading() {
    $('.submit').removeClass('disabled')
    $('.submit').html(oldmsg)
}

function gohtml(html) {
    window.location.href = html;
}
/************************ajax********************/
function http(method, url, param, funcsuccess, funcerror, value) {
    var data = {
        url: url,
        type: method,
    }
    if (param) {
        data.data = JSON.stringify(param)
    }
    if (funcsuccess) {
        data.success = funcsuccess
    }
    if (funcerror) {
        data.error = funcerror
    }
    if (value) {
        data.async = value
    }
    $.ajax(data)
}
/****************获取URL参数*********************/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
/****************验证码倒计时*******************************/
var wait = 60;
var isCounting = false;

function setTimer(val) {
    if (wait == 0) {
        /*val.removeAttribute('disabled')*/
        $(val).css("color", 'white');
        $(val).css("background", '#15aed7');
        $(val).text("获取验证码");
        wait = 60;
        isCounting = false;
    } else {
        /* val.setAttribute('disabled',true)*/
        isCounting = true;
        $(val).css("color", 'gray');
        $(val).css("background", 'transparent');
        $(val).text(wait + "秒后重发 ");
        wait--;
        setTimeout(function() {
            setTimer(val);
        }, 1000);
    }
}
/****************验证电话号码***************************************/
function testPhone(phone) {
    var rexp = /^(13[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/
    return rexp.test(phone)
}

function testCode(code) {
    var rexp = /^\d{6}$/
    return rexp.test(code)
}

function testName(name) {
    var rexp = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
    return rexp.test(name)
}
/****************提示信息抖动********************************************/
function shake() {
    var timer;

    function shakeA() {
        $('.error').addClass('r1')
        $('.error').removeClass('r2')
        timer = setTimeout(shakeB, 70)
    }

    function shakeB() {
        $('.error').addClass('r2')
        $('.error').removeClass('r1')
        timer = setTimeout(shakeA, 70)
    }
    shakeA()

    function stop() {
        clearTimeout(timer)
    }
    setTimeout(stop, 1000)
}


function changeHttps(add) {
    var tmpTag = 'https:' == document.location.protocol ? true : false;
    if (tmpTag) {
        window.location = 'http://baicaiyun.com/' + add
    }
}
