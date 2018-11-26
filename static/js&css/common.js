/*检测是否移动设备来访否则跳转*/
if (!browserRedirect()) {
    //location.href = 'http://demo.RWcms.net';
}

function LasyLoad(src, callback) {

    var script = document.createElement('script');
    script.src = src + '?time=' + Math.random();
    document.body.appendChild(script);
    script.onload = function () {
        callback();
    };


};


/*页面加载完毕时运行函数
-----------------------------------------------------*/
/*当窗体加载时缩放内容元素的大小*/
$(document).ready(function () {
    InitObjectWidth($(".entry iframe"));
    InitObjectWidth($(".entry embed"));
    InitObjectWidth($(".entry video"));
    //判断web 是ios 还是安卓
    var bs = navigator.userAgent.toLowerCase();
    if (bs == "android_csf" || bs == "ios_csf") {
        $('.header,#header').hide();

    } else {
        $('.header,#header').show();
    }

});
/*当窗体大小发生改变时缩放内容元素的大小*/
$(window).resize(function () {
    InitObjectWidth($(".entry iframe"));
    InitObjectWidth($(".entry embed"));
    InitObjectWidth($(".entry video"));
});
var syfb = "{b}({d}%) <br/>{c} ";

/*全局函数
-----------------------------------------------------*/
//判断是否是微信浏览器的函数
function isWeiXin() {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
function wxhrefs(url) {
    location.href = url;
}

//判断是否是安卓还是ios
function isAndroid_ios() {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isAndroid == true ? true : false;
}
function getQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
//身份证验证
function testid(id) {
    return true;
    // 1 "验证通过!", 0 //校验不通过
    var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
    //号码规则校验
    if (!format.test(id)) {
        return false;
    }
    //区位码校验
    //出生年月日校验   前正则限制起始年份为1900;
    var year = id.substr(6, 4),//身份证年
		month = id.substr(10, 2),//身份证月
		date = id.substr(12, 2),//身份证日
		time = Date.parse(month + '-' + date + '-' + year),//身份证日期时间戳date
		now_time = Date.parse(new Date()),//当前时间戳
		dates = (new Date(year, month, 0)).getDate();//身份证当月天数
    if (time > now_time || date > dates) {
        return false;
    }
    //校验码判断
    var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   //系数
    var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');  //校验码对照表
    var id_array = id.split("");
    var sum = 0;
    for (var k = 0; k < 17; k++) {
        sum += parseInt(id_array[k]) * parseInt(c[k]);
    }
    if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
        return false;
    }
    return true
}
//给安卓或者ios 发送消息
function send_clien(obj) {
    var bs = navigator.userAgent.toLowerCase();
    if (bs == "android_csf") {
        //检查是否右webviewcall 这个元素对象
        if (window.webviewcall) {
            window.webviewcall.setValue(obj)
        } else {
            alert("webviewcall not found")
        }
    }
    if (bs == "ios_csf") {
        window.webkit.messageHandlers.NativeMethod.postMessage(obj)
    }
}
//判断是app还是wap
function isapp(callback) {
    var bs = navigator.userAgent.toLowerCase();
    if (bs == "android_csf" || bs == "ios_csf") {
        callback(true);
    } else {
        callback(false);
    }
}

//检测是否移动设备来访
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true;
    } else {
        return false;
    }
}
//初始化页面无素的大小
function InitObjectWidth(obj) {
    var maxWidth = $(".entry").width();
    obj.each(function () {
        if ($(this).width() > maxWidth) {
            var wh = $(this).width() / $(this).height();
            var newHeight = maxWidth / wh;
            $(this).width(maxWidth);
            $(this).height(newHeight);
        }
    });
}
//写Cookie
function addCookie(objName, objValue, objHours) {
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}

//读Cookie
function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
    return "";
}
/*页面通用函数
-----------------------------------------------------*/
/*切换验证码*/
function ToggleCode(obj, codeurl) {
    $(obj).children("img").eq(0).attr("src", codeurl + "?time=" + Math.random());
    return false;
}
/*搜索查询*/
function SiteSearch(send_url, divTgs) {
    var str = $.trim($(divTgs).val());
    if (str.length > 0 && str != "输入关健字") {
        window.location.href = send_url + "?keyword=" + encodeURI($(divTgs).val());
    }
    return false;
}
/*下载链接*/
function downLink(point, linkurl) {
    if (point > 0) {
        weui.confirm('下载需扣除' + point + '个积分<br />重复下载不扣积分，需要继续吗？', function () {
            window.location.href = linkurl;
        }, function () { });
    } else {
        window.location.href = linkurl;
    }
    return false;
}
/*弹出窗口*/
function showWindow(obj) {
    var tit = $(obj).attr("title");
    var box = $(obj).html();
    weui.dialog({
        title: tit,
        content: box,
        buttons: [{
            label: '确定',
            type: 'primary',
            onClick: function () { }
        }]
    });
}
/*弹出浮动层*/
function showDialogBox(obj) {
    $(obj).fadeIn(200);
}
function closeDialogBox(obj) {
    $(obj).fadeOut(200);
}

//发送验证邮件
function sendEmail(username, sendurl) {
    if (username == "") {
        weui.alert("对不起，用户名不允许为空！");
        return false;
    }
    //提交
    $.ajax({
        url: sendurl,
        type: "POST",
        timeout: 60000,
        data: { "username": username },
        dataType: "json",
        success: function (data, type) {
            if (data.status == 1) {
                weui.alert(data.msg);
            } else {
                weui.alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}

//发送手机短信验证码
var wait = 0; //计算变量
var code_count = 0; //
/*
typein:内部发送还是外部发送  发送类型
typecode:短信模板id
num:提示的金额数量

*/
function sendSMS(btnObj, valObj, sendUrl, imgobj, typecode, num) {
    if ($(valObj).val() == "") {
        weui.alert('对不起，请填写手机号码后再获取！');
        return false;
    }
    var txtImgCode = imgobj.find("#txtImgCode");
    var imag_a = imgobj.find("a");
    var img_code = txtImgCode.val();



    var newurl = "";
    var ftn = null;
    newurl = sendUrl + "tools/submit_ajax.ashx?action=user_verify_token&img_code=" + img_code;

    var send_times = parseInt(btnObj.attr("data_send_times"));//已发送
    send_times = isNaN(send_times) ? 0 : send_times;
    var times = parseInt(btnObj.attr("data_times"));//额定
    times = isNaN(times) ? 0 : times;
    if (send_times >= times) {
        imgobj.show();
    } else {
        imgobj.hide();
    }

    console.log("额定：" + times);
    console.log("已发送：" + send_times);
    //申请通讯令牌
    $.post(newurl, function (resData) {
        ToggleCode(imag_a, sendUrl + 'tools/verify_code.ashx');
        //记录短信发送次数
        send_times++;
        btnObj.attr("data_send_times", send_times);
        //检查是否成功申请令牌
        if (resData.status == 0) {
            weui.alert(resData.msg);
            //  weui.alert(resData.msg+"----"+img_code);
            return false;
        }
        //执行发送短信AJAX请求
        $.ajax({
            url: sendUrl + "tools/submit_ajax.ashx?action=user_verify_smscode",
            type: "POST",
            timeout: 60000,
            data: { "token": resData.token, "mobile": $(valObj).val(), typecode: typecode, total: num },
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {

                btnObj.unbind("click").removeAttr("onclick"); //移除按钮事件
            },
            success: function (data, type) {
                ToggleCode(imag_a, sendUrl + 'tools/verify_code.ashx');

                if (data.status == 1) {

                    //记录短信发送次数
                    var code_count = getCookie('code_count');

                    if (code_count == "") {
                        code_count = 0;
                    }
                    code_count = (code_count * 1) + 1;
                    addCookie('code_count', code_count);

                    weui.alert(data.msg, function () {
                        wait = data.time * 60; //赋值时间
                        time(); //调用计算器
                    });
                } else {


                    weui.alert(data.msg, function () {
                        btnObj.removeClass("gray").text("获取验证码");

                        btnObj.bind("click", function () {
                            sendSMS(btnObj, valObj, sendUrl, imgobj, typecode, num); //重新绑定事件
                        });

                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                ToggleCode(imag_a, sendUrl + 'tools/verify_code.ashx');
                weui.alert(data.msg, function () {
                    btnObj.removeClass("gray").text("获取验证码");

                    btnObj.bind("click", function () {
                        sendSMS(btnObj, valObj, sendUrl, imgobj, typecode, num); //重新绑定事件
                    });
                });
            }
        });
    }, "json");

    //倒计时计算器
    function time() {
        if (wait == 0) {
            btnObj.removeClass("gray").text("获取验证码");

            btnObj.bind("click", function () {
                sendSMS(btnObj, valObj, sendUrl, imgobj, typecode, num); //重新绑定事件
            });
        } else {

            btnObj.addClass("gray").text("重新发送(" + wait + ")");
            wait--;
            setTimeout(function () {
                time(btnObj);
            }, 1000)
        }
    }
}

function sendSMSByImgCode(btnObj, valObj, imgobj, sendUrl, typein, typecode, numobj) {
    var txtImgCode = imgobj.find("#txtImgCode");
    var imag_a = imgobj.find("a");

    var img_code = txtImgCode.val();
    var num = parseFloat($(numobj).val());
    num = isNaN(num) ? 0 : num;;
    var ftn = null;
    console.log(img_code);

    if ($(valObj).val() == "") {
        weui.alert('对不起，请填写手机号码后再获取！');
        return false;
    }
    var newurl = "";

    if (typein == "in") {
        newurl = sendUrl + "tools/submit_ajax.ashx?action=user_verify_token_times&img_code=" + img_code + "&mobile=" + $(valObj).val();
    }
    else {
        newurl = sendUrl + "tools/submit_ajax.ashx?action=user_verify_token&img_code=" + img_code;
    }

    var send_times = parseInt(btnObj.attr("data_send_times"));//已发送
    send_times = isNaN(send_times) ? 0 : send_times;
    var times = parseInt(btnObj.attr("data_times"));//额定
    times = isNaN(times) ? 0 : times;

    if (send_times >= times) {
        imgobj.show();

    } else {
        imgobj.hide();
    }

    console.log("额定：" + times);
    console.log("已发送：" + send_times);
    //申请通讯令牌
    $.post(newurl, function (resData) {
        ToggleCode(imag_a, sendUrl + 'tools/verify_code.ashx');

        //记录短信发送次数
        send_times++;
        btnObj.attr("data_send_times", send_times);


        //检查是否成功申请令牌
        if (resData.status == 0) {
            weui.alert(resData.msg);
            return false;
        }


        //执行发送短信AJAX请求
        $.ajax({
            url: sendUrl + "tools/submit_ajax.ashx?action=user_verify_smscode",
            type: "POST",
            timeout: 60000,
            data: { "token": resData.token, "mobile": $(valObj).val(), typecode: typecode, total: num },
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                btnObj.text("发送中");
                btnObj.unbind("click").removeAttr("onclick"); //移除按钮事件
            },
            success: function (data, type) {
                ToggleCode(imag_a, sendUrl + 'tools/verify_code.ashx');


                if (data.status == 1) {
                    weui.alert(data.msg, function () {
                        wait = data.time * 60; //赋值时间
                        time(); //调用计算器
                    });
                } else {

                    weui.alert(data.msg, function () {
                        btnObj.removeClass("gray").text("获取验证码");

                        btnObj.bind("click", function () {
                            sendSMSByImgCode(btnObj, valObj, imgobj, sendUrl, typein, typecode, numobj); //重新绑定事件
                        });

                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                ToggleCode(imag_a, sendUrl + 'tools/verify_code.ashx');
                weui.alert(data.msg, function () {
                    btnObj.removeClass("gray").text("获取验证码");

                    btnObj.bind("click", function () {
                        sendSMSByImgCode(btnObj, valObj, imgobj, sendUrl, typein, typecode, numobj); //重新绑定事件
                    });

                });
            }
        });
    }, "json");

    //倒计时计算器
    function time() {
        if (wait == 0) {
            btnObj.removeClass("gray").text("获取验证码");

            btnObj.bind("click", function () {
                sendSMSByImgCode(btnObj, valObj, imgobj, sendUrl, typein, typecode, numobj); //重新绑定事件
            });
        } else {

            btnObj.addClass("gray").text("重新发送(" + wait + ")");
            wait--;
            setTimeout(function () {
                time(btnObj);
            }, 1000)
        }
    }
}

/*不需要计数，不需要图形验证码*/
function sendSMSByImgCodeNotime(btnObj, valObj, imgobj, sendUrl, typein, typecode, numobj) {
    imgobj.hide();
    var txtImgCode = imgobj.find("#txtImgCode");

    var imag_a = imgobj.find("a");

    var img_code = txtImgCode.val();
    var num = parseFloat($(numobj).val());
    num = isNaN(num) ? 0 : num;;
    var ftn = null;
    console.log(img_code);

    if ($(valObj).val() == "") {
        weui.alert('对不起，请填写手机号码后再获取！');
        return false;
    }
    var newurl = "";

    newurl = sendUrl + "tools/submit_ajax.ashx?action=user_verify_token_notimes&img_code=" + img_code;


    var send_times = parseInt(btnObj.attr("data_send_times"));//已发送
    send_times = isNaN(send_times) ? 0 : send_times;
    var times = parseInt(btnObj.attr("data_times"));//额定
    times = isNaN(times) ? 0 : times;



    console.log("额定：" + times);
    console.log("已发送：" + send_times);
    //申请通讯令牌
    $.post(newurl, function (resData) {
        ToggleCode(imag_a, sendUrl + 'tools/verify_code.ashx');

        //检查是否成功申请令牌
        if (resData.status == 0) {
            weui.alert(resData.msg);
            return false;
        }


        //执行发送短信AJAX请求
        $.ajax({
            url: sendUrl + "tools/submit_ajax.ashx?action=user_verify_smscode",
            type: "POST",
            timeout: 60000,
            data: { "token": resData.token, "mobile": $(valObj).val(), typecode: typecode, total: num },
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {

                btnObj.unbind("click").removeAttr("onclick"); //移除按钮事件
            },
            success: function (data, type) {
                ToggleCode(imag_a, sendUrl + 'tools/verify_code.ashx');
                ////记录短信发送次数
                //send_times++;
                //btnObj.attr("data_send_times", send_times);

                if (data.status == 1) {
                    weui.alert(data.msg, function () {
                        wait = data.time * 60; //赋值时间
                        time(); //调用计算器
                    });
                } else {

                    weui.alert(data.msg, function () {
                        btnObj.removeClass("gray").text("获取验证码");

                        btnObj.bind("click", function () {
                            sendSMSByImgCodeNotime(btnObj, valObj, imgobj, sendUrl, typein, typecode, numobj); //重新绑定事件
                        });

                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                ToggleCode(imag_a, sendUrl + 'tools/verify_code.ashx');
                weui.alert(data.msg, function () {
                    btnObj.removeClass("gray").text("获取验证码");

                    btnObj.bind("click", function () {
                        sendSMSByImgCodeNotime(btnObj, valObj, imgobj, sendUrl, typein, typecode, numobj); //重新绑定事件
                    });

                });
            }
        });
    }, "json");

    //倒计时计算器
    function time() {
        if (wait == 0) {
            btnObj.removeClass("gray").text("获取验证码");

            btnObj.bind("click", function () {
                sendSMSByImgCodeNotime(btnObj, valObj, imgobj, sendUrl, typein, typecode, numobj); //重新绑定事件
            });
        } else {

            btnObj.addClass("gray").text("重新发送(" + wait + ")");
            wait--;
            setTimeout(function () {
                time(btnObj);
            }, 1000)
        }
    }
}


//单击执行AJAX请求操作
function clickSubmit(sendUrl) {
    $.ajax({
        type: "POST",
        url: sendUrl,
        dataType: "json",
        timeout: 20000,
        success: function (data, textStatus) {
            if (data.status == 1) {
                weui.alert(data.msg, function () {
                    location.reload();
                });
            } else {
                weui.alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}

/*全选取消按钮函数*/
function checkAll(chkobj) {
    if ($(chkobj).text() == "全选") {
        $(chkobj).text("取消");
        $(".checkall").prop("checked", true);
    } else {
        $(chkobj).text("全选");
        $(".checkall").prop("checked", false);
    }
}

/*执行删除操作*/
function ExecDelete(sendUrl, checkValue, urlId) {
    var urlObj = $(urlId);
    //检查传输的值
    if (!checkValue) {
        weui.alert("对不起，请选中您要操作的记录！");
        return false;
    }
    weui.confirm('删除记录后不可恢复，您确定吗？', function () {
        $.ajax({
            type: "POST",
            url: sendUrl,
            dataType: "json",
            data: {
                "checkId": checkValue
            },
            timeout: 20000,
            success: function (data, textStatus) {
                if (data.status == 1) {
                    weui.alert(data.msg, function () {
                        if (urlObj) {
                            location.href = urlObj.val();
                        } else {
                            location.reload();
                        }
                    });
                } else {
                    weui.alert(data.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
            }
        });
    }, function () { });
}

/*表单AJAX提交封装(包含验证)*/
function AjaxInitForm(formId, btnId, isDialog, urlId) {
    var formObj = $(formId); //表单元素
    var btnObj = $(btnId); //按钮元素
    var urlObj = $(urlId); //隐藏域元素

    formObj.mvalidate({
        type: 1,
        onKeyup: true,
        sendForm: false,
        firstInvalidFocus: true,
        valid: function (event, options) {
            $.ajax({
                type: "post",
                url: formObj.attr("url"),
                data: formObj.serialize(),
                dataType: "json",
                beforeSend: function (formData, jqForm, options) {
                    btnObj.prop("disabled", true);
                    btnObj.val("请稍候...");
                },
                success: function (data, textStatus) {
                    if (data.status == 1) {
                        btnObj.val("提交成功");
                        //是否提示，需配合weui.js使用，默认不提示
                        if (isDialog == 1) {
                            weui.alert(data.msg, function () {
                                if (data.url) {
                                    location.href = data.url;
                                } else if (urlObj.length > 0 && urlObj.val() != "") {

                                    location.href = urlObj.val();
                                } else {
                                    location.reload();
                                }
                            });
                        } else {
                            if (data.url) {
                                location.href = data.url;
                            } else if (urlObj) {

                                location.href = urlObj.val();
                            } else {
                                location.reload();
                            }
                        }
                    } else {
                        weui.alert(data.msg);
                        btnObj.prop("disabled", false);
                        btnObj.val("重新提交");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
                    btnObj.prop("disabled", false);
                    btnObj.val("重新提交");
                }
            });
        }, conditional: {
            confirmpwd: function () {
                return $("#txtPassword").val() == $("#txtPassword1").val();
            }
        }, descriptions: {
            confirmpassword: {
                required: '请再次输入密码',
                conditional: '两次密码不一致'
            }
        }
    });
}

/*AJAX加载评论列表*/
var commentPageIndex = 1; //评论页码全局变量
function CommentAjaxList(btnObj, listDiv, pageSize, pageCount, sendUrl) {
    //计算总页数
    var pageTotal = Math.ceil(pageCount / pageSize);
    if (commentPageIndex > pageTotal) {
        return false;
    }
    //发送AJAX请求
    $.ajax({
        type: "post",
        url: sendUrl + "&page_size=" + pageSize + "&page_index=" + commentPageIndex,
        dataType: "json",
        beforeSend: function () {
            $(btnObj).prop("disabled", true);
            $(btnObj).val('正在加载...');
        },
        success: function (data) {
            var strHtml = '';
            for (var i in data) {
                strHtml += '<li>' +
                '<div class="avatar">';
                if (typeof (data[i].avatar) != "undefined" && data[i].avatar.length > 0) {
                    strHtml += '<img src="' + data[i].avatar + '" />';
                } else {
                    strHtml += '<i class="iconfont icon-user-full"></i>';
                }
                strHtml += '</div>' +

				'<div class="inner">' +
				'<div class="meta">' +
				'<span class="blue">' + data[i].user_name + '</span>\n' +
				'<span class="time">' + data[i].add_time + '</span>' +
				'</div>' +
                '<p>' + unescape(data[i].content) + '</p>' +
				'</div>';
                if (data[i].is_reply == 1) {
                    strHtml += '<div class="answer">' +
					'<div class="meta">' +
					'<span class="time">' + data[i].reply_time + '</span>' +
					'<span class="blue">管理员回复：</span>' +
					'</div>' +
					'<p>' + unescape(data[i].reply_content) + '</p>' +
					'</div>';
                }
                strHtml += '</li>';
            }
            //添加到列表
            if (commentPageIndex == 1) {
                $(listDiv).html(strHtml);
            } else {
                $(listDiv).append(strHtml);
            }
            commentPageIndex++; //当前页码加一
            if (commentPageIndex > pageTotal) {
                $(btnObj).parent().hide();
            }
        },
        complete: function () {
            $(btnObj).prop("disabled", false);
            $(btnObj).val('加载更多评论');
        }
    });
}


