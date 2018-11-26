$(function () {

    //js扩展方法截取 指定长度 的小数位，不用四舍五入
    Number.prototype.GetCutPoint = function (len) {
        var num = 0;
        if (this == 0) return num.toFixed(len);
        len++;
        var str = this.toString();
        var point = str.indexOf('.');
        if (point > -1) {
            str = str.substring(point);
            if (str.length > len) {
                str = str.substring(0, len);
            }
        } else {

            str = num.toFixed(len - 1).substring(1);

        }


        return Math.floor(this) + str;
    };





    //页面css调整
    (function () {
        var bs = navigator.userAgent.toLowerCase();
        if (bs == "android_csf" || bs == "ios_csf") {
            $(" .icontrade .weui-tab .weui-navbar").css({
                top: 0
            });
            $(" .userc2c_box .weui-tab .weui-navbar").css({
                top: 0
            });

        } else {
            //网页
            $(" .icontrade .weui-tab .weui-navbar").css({
                top: 40
            });
            $(" .userc2c_box .weui-tab .weui-navbar").css({
                top: 40
            });
            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();

                if (scrollTop > 40) {

                    $(" .icontrade .weui-tab .weui-navbar").css({
                        top: 0
                    });
                    $(" .userc2c_box .weui-tab .weui-navbar").css({
                        top: 0
                    });

                } else {
                    $(" .icontrade .weui-tab .weui-navbar").css({
                        top: 40
                    });
                    $(" .userc2c_box .weui-tab .weui-navbar").css({
                        top: 40
                    });
                }
            });




        }


    })();




    //传递参数
    function send_clien_new_file(obj) {

        var bs = navigator.userAgent.toLowerCase();
        if (bs == "android_csf") {
            //检查是否右webviewcall 这个元素对象
            if (window.webviewcall) {
                window.webviewcall.setValue(obj);
            } else {
                alert("webviewcall not found");
            }
        }
        if (bs == "ios_csf") {
            window.webkit.messageHandlers.NativeMethod.postMessage(obj);
        }
    }
    //格式化用户名
    function GetStartformString(str) {
        if (!str)
            return str;
        if (Validate.IsEmail(str)) {
            str = str.substr(0, str.indexOf("@"));
            if (str.length > 3) {
                str = str.substr(0, 3) + "*@qq.com";
            }
            else {
                str = str + "*@qq.com";
            }
        } else if (Validate.Isphone(str)) {

            str = str.substr(0, 3) + "****" + str.substr(7);

        } else {
            if (str.length > 3) {
                str = str.substr(0, 3) + "****";
            }
            else {
                str = str + "****";
            }
        }

        return str;
    }


    //字段检查变化
    function commonValidate(obj, validateFunc) {
        obj.blur(function () {
            var $this = $(this);
            var value = $this.val();
            var resoult = validateFunc(value);
            var parent = $this.parent();

            if (!resoult) {
                parent.css({
                    border: "1px red solid"
                });
            } else {
                parent.css({
                    border: "1px #fff solid"
                });
            }
        });

    };


    //字段检查变化
    function commonValidate_ico(obj, validateFunc) {
        obj.blur(function () {
            var $this = $(this);
            var value = $this.val();
            var resoult = validateFunc(value);
            var parent = $this.parent().parent().parent().parent().parent();

            if (!resoult) {
                parent.css({
                    border: "1px red solid"
                });
            } else {
                parent.css({
                    border: "1px #fff solid"
                });
            }
        });

    };

    function getQueryString(name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }



    function valueCheck(obj, ftn) {
        obj.blur(function () {
            var _this = $(this);
            var _num = parseFloat(_this.val());
            _num = isNaN(_num) || _num < 0 ? 0 : _num;
            _this.val(_num);

            if (ftn) {
                ftn(_num);

            }
        })

    }
    function valueCheck1(obj, ftn) {

        obj.bind('input propertychange', function () {
            var _this = $(this);
            var _num = parseFloat(_this.val());
            _num = isNaN(_num) || _num < 0 ? 0 : _num;
            _this.val(_num);

            if (ftn) {
                ftn(_num);

            }
        })

    }

    function postUp(obj, state, msg) {
        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=UpdateDealC2CState";
        var pamers = { infoid: "", state: "" };
        obj.click(function () {

            var $this = $(this);
            weui.confirm(msg, function () {
                pamers.infoid = $this.attr("data_infoid");
                pamers.state = state;

                $.post(url, pamers, function (data) {

                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {
                        weui.alert(jsondata["msg"]);
                    } else {
                        weui.alert(jsondata["msg"], function () {
                            location.reload();
                        });
                    }


                });


            }, function () {

            });



        });

    }

    var wait = 0; //计算变量
    /*发送邮箱验证码*/
    function SendEmalCode(btnObj, phoneobj, imgobj) {
        var check = Validate.IsEmail(phoneobj.val());
        if (!check) {
            weui.alert("手机不正确！");
            return;
        }
        var txtImgCode = imgobj.find("#txtImgCode");
        var imag_a = imgobj.find("a");
        var img_code = txtImgCode.val();
        var send_times = parseInt(btnObj.attr("data_send_times"));//已发送
        send_times = isNaN(send_times) ? 0 : send_times;
        var times = parseInt(btnObj.attr("data_times"));//额定

        if (send_times >= times) {
            imgobj.show();
        } else {
            imgobj.hide();
        }
        console.log("img_code：" + img_code);
        console.log("额定：" + times);
        console.log("已发送：" + send_times);

        var sendurl = "http://" + window.location.host;

        btnObj.addClass("gray").text("发送中...");
        $.ajax({
            url: sendurl + "/tools/submit_ajax.ashx?action=user_code_email&img_code=" + img_code,
            type: "POST",
            timeout: 60000,
            data: { username: phoneobj.val() },
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {

                btnObj.unbind("click").removeAttr("onclick"); //移除按钮事件
            },
            success: function (data, type) {
                ToggleCode(imag_a, sendurl + '/tools/verify_code.ashx');
                //记录短信发送次数
                send_times++;
                btnObj.attr("data_send_times", send_times);
                if (data.status == 1) {

                    weui.alert(data.msg, function () {
                        wait = data.time * 60; //赋值时间
                        time(); //调用计算器
                    });
                } else {
                    weui.alert(data.msg, function () {
                        btnObj.removeClass("gray").text("获取验证码");

                        btnObj.bind("click", function () {
                            SendEmalCode(btnObj, phoneobj, imgobj); //重新绑定事件
                        });

                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                ToggleCode(imag_a, sendurl + '/tools/verify_code.ashx');
                weui.alert(data.msg, function () {
                    btnObj.removeClass("gray").text("获取验证码");

                    btnObj.bind("click", function () {
                        SendEmalCode(btnObj, phoneobj, imgobj); //重新绑定事件
                    });
                });
            }
        });


        //倒计时计算器
        function time() {
            if (wait == 0) {
                btnObj.removeClass("gray").text("获取验证码");

                btnObj.bind("click", function () {
                    SendEmalCode(btnObj, phoneobj, imgobj); //重新绑定事件
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


    /*当窗体加载时缩放内容元素的大小*/

    //判断web 是ios 还是安卓
    function checkNavigator() {
        var bs = navigator.userAgent.toLowerCase();
        if (bs == "android_csf" || bs == "ios_csf") {

            $('.header').hide();
            $("#header").hide();

        } else {

            $('.header').show();
            $("#header").show();

        }
    }

    setInterval(checkNavigator, 1000);
    //发送通知信息
    function send_msg_log() {
        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=Send_mobile_msg"
        $.get(url, function () {
            console.log("send_ok");
        });
    }

    /*公告的滚动js*/

    (function () {

        var gg_list = $(".gonggao_part .td_r .gg_list_box");
        var height = $(".gonggao_part .td_r .gg_list_box .gg_list").height();
        if (gg_list.length <= 0) {

            return;
        }

        var h = 35;
        var speed = 3000;

        function moveLi() {

            var scroll = gg_list.scrollTop();
            scroll += h;
            //  console.log("scrollTop:" + scroll + "---height:" + height);
            if (scroll >= height) {
                gg_list.scrollTop(0);

            } else {
                gg_list.animate({
                    "scrollTop": scroll
                }, 1000);
            }
        }

        var handle = setInterval(moveLi, speed);
        gg_list.hover(function () {
            clearInterval(handle);

        }, function () {
            handle = setInterval(moveLi, speed);
        });


    })();


    /*新闻teb 切换*/

    (function () {

        var handle = $(".new_part .n_title .wenzi a");
        var item = $(".new_part .new_body .item");
        var moveLine = $(".new_part .n_title .moveLine");
        var changeStr = "on",
            itemChangeStr = "item1";
        var w = moveLine.width();
        handle.click(function (e) {

            var $this = $(this);
            $this.addClass(changeStr).siblings().removeClass(changeStr);
            var index = $this.index();
            item.eq(index).addClass(itemChangeStr).siblings().removeClass(itemChangeStr);
            moveLine.css("marginLeft", (w * index) + "px");

        })


    })();


    /*******注册页面js*************************/

    (function () {

        var reg_info = $(".register11 .reg_info");//form体
        var reg_info_btn = $(".register11  .reg_info .reg_info_btn button");//提交
        var send_mobile_msg = $(".register11  .reg_info .validate_code .button");//短信发送按钮

        var inviter = $(".register11  .reg_info .input_item .inputbox .inviter");//邀请人
        var phone = $(".register11  .reg_info .input_item .inputbox .phone");//用户手机号码

        var password = $(".register11  .reg_info .input_item .inputbox .password");//用户手机号码
        var twopassword = $(".register11  .reg_info .input_item .inputbox .twopassword");//二次密码
        var validate_item = $(".register11  .reg_info .input_item  .validate_item");//验证码

        var txtImgCode = $(".register11  .reg_info .input_item  .img_box");//图形验证码

        var process_li = $(".register11  .reg_info .process_li");//强弱
        var js_progress = process_li.find(".js_progress");
        var wenzi = process_li.find(".weui-progress__opr span");
        var username = phone.val();
        password.blur(function () {
            var $this = $(this);
            var v = $this.val();

            if (v.length < 6 || v.length > 20) {
                weui.alert("请输入6~20位密码<br>（可以用英文、数字、符号组合）");
                return;
            }

        });
        password.bind("input propertychange", function () {
            var $this = $(this);
            var v = $this.val();

            //if (!Validate.EnNum(v)) {
            //    weui.alert("请输入6~20位英文+数字！");
            //    return;
            //}


            if (Validate.WeekPassword(v) || !v) {
                js_progress.width("15%"); wenzi.text("弱");

            }

            if (Validate.MiddlePassword(v)) {
                js_progress.width("50%");
                wenzi.text("中");


            }
            if (Validate.StrongPassword(v)) {
                js_progress.width("100%");
                wenzi.text("强");

            }




        });


        phone.blur(function () {
            var $this = $(this);
            var parent = $this.parent();
            var username = $this.val();
            if (!username) {
                $this.next().text("×").addClass("nouseful").removeClass("useful2");
                parent.css({
                    border: "1px red solid"
                });

                weui.alert("请输入正确的手机或邮箱格式。");
                return;
            }




            if (!Validate.Isphone(username) && !Validate.IsEmail(username)) {

                $this.next().text("×").addClass("nouseful").removeClass("useful2");
                parent.css({
                    border: "1px red solid"
                });
                weui.alert("请输入正确的手机或邮箱格式。");
                return;
            }

            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=CheckUsername"
            $.post(url, { username: username }, function (data) {
                var jsondata = JSON.parse(data);
                if (jsondata["status"] == 0) {

                    //不可用
                    $this.next().text("×").addClass("nouseful").removeClass("useful2");;
                    parent.css({
                        border: "1px red solid"
                    });


                    if (jsondata["msg"].indexOf("用户名已存在") > -1) {
                        weui.confirm("该手机号/邮箱已被注册，请直接登录。", function () {
                            location.href = "login.aspx";

                        }, function () {
                            //点击取消后的回调函数
                        });
                    }
                    else {

                        weui.alert(jsondata["msg"]);


                    }

                } else {
                    $this.next().text("✓").addClass("useful2").removeClass("nouseful");

                }


            });

            parent.css({
                border: "1px #fff solid"
            });


        });


        var tjr = getQueryString("tjr");

        if (tjr != null) {
            inviter.val(tjr);
            inviter.attr("disabled", "disabled");
        }

        function CheckFieds() {
            //昵称验证
            //commonValidate(inviter, Validate.Isphone);


            //是否是密码
            commonValidate(password, Validate.IsPassword);
            commonValidate(twopassword, Validate.IsPassword);


        }
        CheckFieds();

        //两次密码一致
        twopassword.blur(function () {
            var $this = $(this);
            var value = $this.val();
            var resoult = password.val() == twopassword.val();
            var parent = $this.parent();

            if (!resoult) {
                parent.css({
                    border: "1px red solid"
                });
            } else {
                parent.css({
                    border: "1px #fff solid"
                });
            }

        });

        //发送短信验证码
        send_mobile_msg.click(function () {

            username = phone.val();

            if (!Validate.Isphone(username) && !Validate.IsEmail(username)) {
                weui.alert("请输入正确的手机或邮箱格式！");
                return;
            }
            if (Validate.Isphone(username)) {
                var sendurl = "http://" + window.location.host + "/";
                sendSMS(send_mobile_msg, phone, sendurl, txtImgCode, "base_sms_code");

                //  sendSMSByImgCode($(this), phone, txtImgCode, sendurl, "in", "register_code");
            } else {

                SendEmalCode($(this), phone, txtImgCode);
            }
        })

        reg_info_btn.click(function () {

            var $this = $(this);
            $this.text("提交中...");

            //验证
            var inviter_v = inviter.val();
            var phone_v = phone.val();
            var password_v = password.val();
            var twopassword_v = twopassword.val();
            //验证码
            var validate_item_v = validate_item.val();

            //ajax 请求
            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=user_register"
            if (username != phone_v) {
                weui.alert("验证手机或者邮箱改变，请重新获取验证码！");
                $this.text("注册");
                return;
            }
            if (!Validate.Isphone(phone_v) && !Validate.IsEmail(phone_v)) {
                weui.alert("请输入正确的手机或邮箱格式！");
                $this.text("注册");
                return;
            }

            if (!Validate.IsPassword(password_v)) {
                weui.alert("密码不正确！");
                $this.text("注册");
                return;
            }
            if (!Validate.IsPassword(twopassword_v)) {
                weui.alert("密码不正确！");
                $this.text("注册");
                return;
            }
            if (!validate_item_v) {
                weui.alert("验证码不正确！");
                $this.text("注册");
                return;
            }
            if (password_v != twopassword_v) {
                weui.alert("两次密码输入不一致！");
                $this.text("注册");
                return;
            }

            $.ajax({
                url: url,
                type: "post",
                data: { inviter: inviter_v, phone: phone_v, password: password_v, yzcode: validate_item_v },
                success: function (data) {
                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {
                        weui.alert(jsondata["msg"]);
                        $this.text("注册");
                    } else {
                        if (inviter_v) {
                            weui.alert("易云链邀您下载APP！", function () {
                                location.href = "./index.aspx?action=app_download";
                            });
                        } else {
                            weui.alert(jsondata["msg"], function () {
                                location.href = "/usercenter.aspx?action=exit";

                            });
                        }
                    }
                },
                error: function () {
                    weui.alert("提交失败，请稍后重试！");
                    $this.text("注册");
                }
            })



        });


    })();

    /*******注册页面js*************************/


    /********登录js*****************/


    (function () {

        var userlogin_btn = $(".userlogin .escc button");
        var userlogin_btn_yuanda = $(".userlogin .yuanda button");

        var yuandapay = $(".userlogin .yuandapay button");


        var username = $(".userlogin .reg_info .username");
        var password = $(".userlogin .reg_info .password");
        var reg_info = $(".userlogin .reg_info");
        var siteid = reg_info.attr("data_site_id");
        function CheckFieds() {

            commonValidate_ico(password, Validate.IsPassword);
        }
        CheckFieds();

        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=user_login&site_id=" + siteid + ""

        userlogin_btn.click(function () {

            var $this = $(this);
            $this.text("提交中....");
            //验证
            var username_v = username.val();
            var password_v = password.val();
            //ajax 请求

            if (!Validate.Isphone(username_v) && !Validate.IsEmail(username_v)) {
                weui.alert("手机或者邮箱不正确！");
                $this.text("ESCC登录");
                return;
            }
            //if (!Validate.IsPassword(password_v)) {
            //    weui.alert("密码不正确！");
            //    $this.text("ESCC登录");
            //    return;
            //}


            $.ajax({
                url: url,
                type: "post",
                data: { textusername: username_v, textpassword: password_v },
                success: function (data) {
                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {
                        weui.alert(jsondata["msg"]);
                    } else {
                        weui.alert(jsondata["msg"], function () {
                            location.href = "http://" + window.location.host + "/usercenter.aspx?action=index";
                        });
                    }
                },
                error: function () {
                    weui.alert("提交失败，请稍后重试！");

                }
            })
            $this.text("ESCC登录");







        });


        userlogin_btn_yuanda.click(function () {
            url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=user_login_yd&site_id=" + siteid + ""
            var $this = $(this);
            $this.text("提交中....");
            //验证
            var username_v = username.val();
            var password_v = password.val();
            //ajax 请求
            if (!username_v) {

                weui.alert("账号不能为空！");
                $this.text("远大会员登录");
                return;

            }
            if (!Validate.IsPassword(password_v)) {

                weui.alert("密码错误！");
                $this.text("远大会员登录");
                return;

            }


            $.ajax({
                url: url,
                type: "post",
                data: { txtUserName: username_v, txtPassword: password_v },
                success: function (data) {

                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {
                        weui.alert(jsondata["msg"]);
                        $this.text("远大会员登录");
                    } else {
                        weui.alert(jsondata["msg"], function () {
                            location.href = "http://" + window.location.host + "/usercenter.aspx?action=index";
                        });
                    }
                },
                error: function () {
                    weui.alert("提交失败，请稍后重试！");
                    $this.text("远大会员登录");
                }
            })







        });



        yuandapay.click(function () {
            url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=user_pay_login&site_id=" + siteid + ""
            var $this = $(this);
            $this.text("提交中....");
            //验证
            var username_v = username.val();
            var password_v = password.val();
            //ajax 请求

            if (!Validate.Isphone(username_v) && !Validate.IsEmail(username_v)) {
                weui.alert("手机或者邮箱不正确！");
                $this.text("ESCC登录");
                return;
            }
            //if (!Validate.IsPassword(password_v)) {
            //    weui.alert("密码不正确！");
            //    $this.text("ESCC登录");
            //    return;
            //}


            $.ajax({
                url: url,
                type: "post",
                data: { textusername: username_v, textpassword: password_v },
                success: function (data) {
                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {
                        weui.alert(jsondata["msg"]);
                    } else {
                        weui.alert(jsondata["msg"], function () {
                            location.href = "http://" + window.location.host + "/yuandapay/ydorders.aspx";
                        });
                    }
                },
                error: function () {
                    weui.alert("提交失败，请稍后重试！");

                }
            })
            $this.text("ESCC登录");







        });




    })();


    /********登录js*****************/




    /********商家c2c切换********************/

    (function () {

        var shopc2c = $(".shopc2c");
        var alink = $(".shopc2c .itemheader a");
        var tradetype = parseInt(getQueryString("tradetype"));
        tradetype = isNaN(tradetype) || tradetype == 0 ? 0 : 1;
        alink.eq(tradetype).addClass("on").siblings().removeClass("on");

    })();



    /********商家c2c切换********************/

    /****商家俱乐部 申请*************/

    (function () {

        var upload_box_btn = $(".tj_btn .usergrowup");
        userGrowup(upload_box_btn, 2, "您正在申请成为商户，请确认！");//成为商家
        upload_box_btn = $(".link_btns .td1 a");
        userGrowup(upload_box_btn, 2, "您正在申请成为商户，请确认！");//成为商家
        upload_box_btn = $(".conter_mian .usergrowup");
        userGrowup(upload_box_btn, 3, "您正在申请成为俱乐部，请确认！");//俱乐部

        function userGrowup(obj, target, msg) {
            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=user_bussions_apply";

            obj.click(function () {

                $.post(url, { targetType: target }, function (data) {

                    var jsondata = JSON.parse(data);
                    weui.alert(jsondata.msg, function () {

                        if (jsondata.url) {
                            location.href = jsondata.url;
                        } else {
                            location.reload();

                        }


                    });

                });
                //weui.confirm(msg, function () {

                //}, function () {
                //    //点击取消后的回调函数
                //});










                return false;

            });

        };



    })();


    /****商家俱乐部 申请*************/

    /*****币币交易提交****************************/

    (function () {

        var span_box = $(".icon_trade .show_box .total");
        var _url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=EsccToUsd&num=1000";
        $.get(_url, function (data) {
            span_box.text(data);
        });



        var trateForm = $(".icon_trade .trateForm");
        var box = $(".icon_trade .box");

        trateForm.each(function (i, e) {
            var $that = $(this);

            var trate_btn = $that.find(".submit");
            var num = $that.find(".num");
            var price = $that.find(".price");
            var pay_password = $that.find(".pay_password");
            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=GetIconC2C";
            var getnum = $that.find(".getnum");
            var yzcode = $that.find(".validate_code .item_input");
            var yzbtn = $that.find(".validate_code button");
            var phone = $that.find(".phone");

            var imgobj = $that.find(".img_box");
            var _price = 0;
            var _num = 0;
            var outtrade = 6.5;
            var intrade = 6.5;


            //发送短信
            yzbtn.click(function () {

                _price = parseFloat(price.val());
                _price = isNaN(_price) || _price < 0 ? 0 : _price;
                _num = parseInt(num.val());
                _num = isNaN(_num) || _num < 0 ? 0 : _num;
                if (_price <= 0 || _num <= 0) {
                    weui.alert("价格或者数量不能小于等于零！");
                    return;
                }
                var sendurl = "http://" + window.location.host + "/";
                var typecode = "";
                var total = _num * _price;
                if (i == 0) {
                    typecode = "escc_payout";//卖出escc

                } else {
                    typecode = "usd_payout";//买入escc 支付usd

                }
                // sendSMS($(this), phone, sendurl, undefined, typecode, _num * _price);


                sendSMSByImgCode($(this), phone, imgobj, sendurl, "in", typecode, getnum);



            });

            //卖出
            price.blur(function () {

                var $this = $(this);
                var value = parseFloat($this.val());
                value = isNaN(value) || value < 0 ? 0 : value;
                _num = parseInt(num.val());
                _num = isNaN(_num) || _num < 0 ? 0 : _num;
                var total = _num * value;
                if (i == 0) {


                } else {

                    total = total / intrade;
                }


                getnum.val(total.GetCutPoint(2));



            });
            num.blur(function () {
                var $this = $(this);
                var value = parseInt($this.val());
                value = isNaN(value) || value < 0 ? 0 : value;
                _price = parseFloat(price.val());
                _price = isNaN(_price) || _price < 0 ? 0 : _price;
                var total = _price * value;
                if (i == 0) {

                } else {

                    total = total / intrade;
                }
                getnum.val(total.GetCutPoint(2));

            });

            trate_btn.click(function () {
                var ch_price = 0;
                var ch_num = 0;
                var _outorin = i;
                var _MoneyTypeId = 1;
                ch_price = parseFloat(price.val());
                ch_price = isNaN(ch_price) || ch_price < 0 ? 0 : ch_price;
                ch_num = parseInt(num.val());
                ch_num = isNaN(ch_num) || ch_num < 0 ? 0 : ch_num;
                var _spassword = pay_password.val();
                //手机短信
                var code = yzcode.val();
                if (!code) {
                    weui.alert("请填写手机验证码！");
                    return;
                }

                if (ch_num != _num || ch_price != _price) {
                    weui.alert("数据已修改，请重新发送手机验证码！");
                    return;
                }


                if (!_spassword) {
                    weui.alert("请填写支付密码！");
                    return;
                }
                if (_price <= 0 || _num <= 0) {
                    weui.alert("价格或者数量不能小于等于零！");
                    return;
                }

                var alertTelmplate = "";

                alertTelmplate += "<div class='alert_template'>";
                alertTelmplate += "<ul>";
                alertTelmplate += "<li class='title'>{title}</li>";
                alertTelmplate += "<li><span class='name'>单价:</span><span class='text'>{price}</span></li>";
                alertTelmplate += "<li><span class='name'>数量:</span><span class='text'>{num}</span></li>";
                alertTelmplate += "<li><span class='name'>合计:</span><span class='text'>{total}</span></li>";
                alertTelmplate += "</ul>";
                alertTelmplate += "</div>";

                var postdata = { outorin: _outorin, MoneyTypeId: _MoneyTypeId, price: _price, num: _num, spassword: _spassword, yzcode: code };
                var alertTelmplate_box = "";
                if (postdata.outorin == 0) {
                    alertTelmplate_box = alertTelmplate.replace("{title}", "卖出");
                } else {
                    alertTelmplate_box = alertTelmplate.replace("{title}", "买入");
                }
                alertTelmplate_box = alertTelmplate_box.replace("{price}", postdata.price)
                                               .replace("{num}", postdata.num)
                                               .replace("{total}", getnum.val());



                weui.confirm(alertTelmplate_box, function () {
                    //点击确认后的回调函数

                    $.post(url, postdata, function (data) {

                        var jsondata = JSON.parse(data);
                        if (jsondata["status"] == 0) {
                            weui.alert(jsondata["msg"]);
                        } else {
                            weui.alert(jsondata["msg"], function () {
                                location.reload();
                            });
                        }



                    });


                },
                function () {
                    //点击取消后的回调函数
                });




            });


        });
        box.each(function (i, em) {

            var $this = $(this);
            var num = $this.find(".trateForm .num");
            var price = $this.find(".trateForm .price");
            var li = $this.find(".td2 ul li");
            var _price_v = 0, _num_v = 0;

            li.click(function () {
                var $that = $(this);
                var _price = $that.find(".child_td2 span");
                var _num = $that.find(".child_td3 span");
                _price_v = parseFloat(_price.text());
                _price_v = isNaN(_price_v) ? 0 : _price_v;
                _num_v = parseFloat(_num.text());
                _num_v = isNaN(_num_v) ? 0 : _num_v;

                num.val(_num_v);
                price.val(_price_v);

                $that.find("td").css({
                    background: "#eee"
                });
                $that.siblings().find("td").css({
                    background: "none"
                });
            });



        });



    })();


    /*****icon详情*******************/


    (function () {

        var btn = $(".icondetail .weui-form-preview__ft button");
        btn.click(function () {
            var $this = $(this);
            var id = parseInt($this.attr("data_id"));
            if (isNaN(id)) {
                weui.alert("参数不正确！");
                return;
            }
            var url = url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=UpdateIconState";
            $.post(url, { state: "2", orderid: id }, function (data) {
                var jsondata = JSON.parse(data);
                if (jsondata["status"] == 0) {
                    weui.alert(jsondata["msg"]);
                } else {
                    weui.alert(jsondata["msg"], function () {
                        location.href = "./usercenter.aspx?action=index";
                    });
                }


            })



        });




    })();


    /*****icon详情*******************/


    /*****币币交易提交****************************/

    /*****币币交易2018.8.20 修改**************/

    //提交
    (function () {





        var trateForm = $(".icontrade .icontrade_box .icon_box");

        var action = getQueryString("action");
        if (!action && action != null) {
            action = action.toLowerCase();
        }
        var showtotal = $(".icontrade .icontrade_box .showtotal");

        trateForm.each(function (i, e) {
            var $that = $(this);

            var usdtotal = $that.find(".usdtotal");
            var trate_btn = $that.find(".escc_submit");
            var num = $that.find(".num");
            var price = $that.find(".price");
            var getnum = $that.find(".total");
            var qujian = $that.find(".qujian");


            var _price = 0;
            var _num = 0;
            var outtrade = 6.5;
            var intrade = 6.5;
            var tipsjson = { usd: 0.01, escc: 0.1 };
            var usd_tips = parseFloat($that.attr("data_usd_tips"));
            usd_tips = isNaN(usd_tips) ? 0 : usd_tips;
            var escc_tips = parseFloat($that.attr("data_escc_tips"));
            escc_tips = isNaN(escc_tips) ? 0 : escc_tips;
            tipsjson.usd = usd_tips;
            tipsjson.escc = escc_tips;
            var currentprice = parseFloat(price.attr("data_currentprice"));
            currentprice = isNaN(currentprice) ? 0 : currentprice;
            var up30 = currentprice * (1 + 0.03) - 0.00001;
            var down30 = currentprice * (1 - 0.03) + 0.00001;
            qujian.text("范围:" + down30.toFixed(5) + "~" + up30.toFixed(5) + "");

            if (action == "icontrade_out") {
                //卖出
                var esccful = showtotal.find(".esccuseful span");
                var getusd = showtotal.find(".getescc span");
                var lock = showtotal.find(".lock span");
                var heji = showtotal.find(".total span");



            } else {
                //买入
                var usdful = showtotal.find(".useful span");
                var getescc = showtotal.find(".getusd span");
                var heji = showtotal.find(".total span");
                var _heji = parseFloat(heji.text());
                _heji = isNaN(_heji) ? 0 : _heji;
                usdful.text(_heji.toFixed(5));



            }



            //卖出
            price.blur(function () {

                var $this = $(this);
                var value = parseFloat($this.val());
                value = isNaN(value) || value < 0 ? 0 : value;
                _num = parseFloat(num.val());
                _num = isNaN(_num) || _num < 0 ? 0 : _num;
                _price = value;
                $this.val(_price.toFixed(5));
                if (_price > up30 || _price < down30) {
                    weui.alert("委托价格不能超过市场价格的3%，请填写" + down30.toFixed(5) + "~" + up30.toFixed(5) + "之间的数值。");
                }

                var total = _num * _price;
                if (action == "icontrade_out") {
                    total = total / outtrade;

                    getnum.val((_num * (1 + tipsjson.escc)).toFixed(5));
                    usdtotal.val(total.toFixed(5));

                } else {

                    total = total / intrade;
                    getnum.val((total * (1 + tipsjson.usd)).toFixed(5));
                }

                //提示能够购买的数量
                if (action == "icontrade_out") {

                    //卖出
                    var esccful = showtotal.find(".esccuseful span");
                    var getusd = showtotal.find(".getescc span");
                    var lock = showtotal.find(".lock span");
                    var heji = showtotal.find(".total span");
                    var _heji = parseFloat(heji.text());
                    _heji = isNaN(_heji) ? 0 : _heji;
                    var _lock = parseFloat(lock.text());
                    _lock = isNaN(_lock) ? 0 : _lock;
                    var _vv = _heji - _lock;//余额
                    _vv = _vv / (1 + tipsjson.escc);
                    // esccful.text(_vv.toFixed(3));
                    getusd.text((_price * _vv / outtrade).toFixed(5));


                } else {

                    //买入
                    var usdful = showtotal.find(".useful span");
                    var getescc = showtotal.find(".getusd span");
                    var heji = showtotal.find(".total span");
                    var _heji = parseFloat(heji.text());
                    _heji = isNaN(_heji) ? 0 : _heji;
                    var _vv = _heji / (1 + tipsjson.usd);
                    // usdful.text(_vv.toFixed(3));
                    // 单价 * 数量 / 6.5=usd
                    if (_price > 0) {
                        _vv = _vv * intrade / _price;
                    } else {
                        _vv = 0;
                    }
                    getescc.text(_vv.toFixed(5));

                }






            });

            num.bind('input propertychange', function () {

                var $this = $(this);
                var value = parseFloat($this.val());
                value = isNaN(value) || value < 0 ? 0 : value;
                _price = parseFloat(price.val());
                _price = isNaN(_price) || _price < 0 ? 0 : _price;
                _num = value;
                if (_num.toString().substring().length > 4) {
                    _num = _num.GetCutPoint(3);
                    $this.val(_num);
                }

                var total = _price * _num;
                if (action == "icontrade_out") {
                    total = total / outtrade;
                    getnum.val((_num * (1 + tipsjson.escc)).toFixed(5));
                    usdtotal.val(total.toFixed(5));


                } else {

                    total = total / intrade;
                    getnum.val((total * (1 + tipsjson.usd)).toFixed(5));
                }
                var getescc = "";
                //数量超过提醒
                if (action == "icontrade_out") {
                    getescc = showtotal.find(".esccuseful span");

                } else {

                    getescc = showtotal.find(".getusd span");

                }
                var _getescc = parseFloat(getescc.text().trim());
                _getescc = isNaN(_getescc) ? 0 : _getescc;
                if (_num > _getescc) {

                    if (action == "icontrade_out") {
                        weui.alert("每日卖出数量不超过昨日余额的30%，请参考可卖ESCC数量填写。");
                    } else {
                        weui.alert("需支付的金额超过USD余额，请重新填写委托数量。");
                    }



                }




            });

            trate_btn.click(function () {

                var $this = $(this);
                var isclick = $this.attr("isclick");
                if (isclick == "1") {
                    weui.alert("请不要重复点击！");

                    return;
                }
                $this.attr("isclick", 1);
                setTimeout(function () { $this.attr("isclick", 0); }, 1000);
                var usdt = parseFloat($this.attr("data_usdt"));
                usdt = isNaN(usdt) ? 0 : usdt;

                var Isspassword = $this.attr("data_spassword");
                if (Isspassword == "1") {
                    weui.alert("请先完善您的个人信息！", function () {
                        location.href = "usercenter.aspx?action=userinfo";
                    });
                    return;
                }
                var ch_price = 0;
                var ch_num = 0;
                var _outorin = 0;
                if (action == "icontrade_out") {
                    _outorin = 0;
                } else {
                    _outorin = 1;


                }


                var _MoneyTypeId = 1;
                ch_price = parseFloat(price.val());
                ch_price = isNaN(ch_price) || ch_price < 0 ? 0 : ch_price;
                ch_num = parseInt(num.val());
                ch_num = isNaN(ch_num) || ch_num < 0 ? 0 : ch_num;



                if (_price <= 0) {
                    weui.alert("价格不能小于等于零！");
                    return;
                } if (_num < 1) {
                    weui.alert("数量不能小于1！");
                    return;
                }

                var postdata = { outorin: _outorin, MoneyTypeId: _MoneyTypeId, price: _price, num: _num, spassword: "", yzcode: "", usdt: "" };
                var paydialog = new PayDialog();
                var typecode = "";
                if (action == "icontrade_out") {
                    typecode = "base_sold_escc";//卖出escc

                } else {
                    typecode = "base_buy_escc";//买入escc 支付usd

                }
                if (action != "icontrade_out") {



                    //判断余额是否充足
                    var _total_usdt = (_num * _price) / intrade;
                    _total_usdt = _total_usdt * (1 + tipsjson.usd);
                    if (_total_usdt <= usdt) {
                        /*
                        weui.dialog({
                            title: "选择币种",
                            content: "是否选择使用USDT支付，<br/>余额：<span style='color:red'>" + usdt.toFixed(5) + "</span>！",
                            buttons: [{
                                label: '取消',
                                type: 'default',
                                onClick: function () {

                                    paydialog.ftnIcon(postdata, typecode, getnum, tipsjson);
                                }
                            }, {
                                label: '确定',
                                type: 'primary',
                                onClick: function () {
                                    postdata.usdt = "usdt";

                                    paydialog.ftnIcon(postdata, typecode, getnum, tipsjson);

                                }
                            }]
                        });
                        */

                        //paydialog.ftnIcon(postdata, typecode, getnum, tipsjson);
                        var $iosActionsheet = $('#iosActionsheet');
                        var $iosMask = $('#iosMask');
                        var $iosActionsheetCancel = $('#iosActionsheetCancel');

                        function hideActionSheet() {

                            $iosActionsheet.removeClass('weui-actionsheet_toggle');
                            $iosActionsheet.hide();
                            $iosMask.fadeOut(200);
                        }

                        $iosMask.on('click', hideActionSheet);
                        $iosActionsheetCancel.on('click', hideActionSheet);
                        /*内容填充和绑定事件*/
                        var menu = $iosActionsheet.find(".weui-actionsheet__menu");
                        var title = $iosActionsheet.find(".weui-actionsheet__title .weui-actionsheet__title-text");
                        title.text("请选择币种支付？");
                        var btns = menu.find(".weui-actionsheet__cell");
                        if (btns.length <= 0) {
                            menu.append($("<div class='weui-actionsheet__cell'>USD</div>"));
                            menu.append($("<div class='weui-actionsheet__cell'>USDT</div>"));
                            btns = menu.find(".weui-actionsheet__cell");
                            btns.eq(0).click(function () {
                                //usd

                                paydialog.ftnIcon(postdata, typecode, getnum, tipsjson);
                                hideActionSheet();
                            });
                            btns.eq(1).click(function () {
                                //usdt
                                postdata.usdt = "usdt";
                                paydialog.ftnIcon(postdata, typecode, getnum, tipsjson);
                                hideActionSheet();
                            });

                        }
                        $iosActionsheet.show();
                        $iosActionsheet.addClass('weui-actionsheet_toggle');
                        $iosMask.fadeIn(200);



                    } else {
                        paydialog.ftnIcon(postdata, typecode, getnum, tipsjson);

                    }

                } else {
                    paydialog.ftnIcon(postdata, typecode, getnum, tipsjson);

                }


            });


        });
        function SelectOrder() {
            var box = $(".icontrade .icontrade_box");
            box.each(function (i, em) {

                var $this = $(this);
                var num = $this.find(".icon_box .num");
                var price = $this.find(".icon_box .price");
                var li = $this.find(".orders_list table tr");
                var _price_v = 0, _num_v = 0;

                li.click(function () {
                    var $that = $(this);
                    var _price = $that.find(".td2");
                    var _num = $that.find(".td3");
                    _price_v = parseFloat(_price.text());
                    _price_v = isNaN(_price_v) ? 0 : _price_v;
                    _num_v = parseFloat(_num.text());
                    _num_v = isNaN(_num_v) ? 0 : _num_v;

                    num.val(_num_v);
                    num.trigger("blur");
                    price.val(_price_v);
                    price.trigger("blur");

                    //$that.find("td").css({
                    //    background: "#eee"
                    //});
                    //$that.siblings().find("td").css({
                    //    background: "none"
                    //});
                });



            });
        };

        /****定时更新ESCC订单***************/

        const time = 3000;
        var icontrade_box = $(".icontrade .icontrade_box");
        var className = "icontrade_box_blue";
        var first_orderlist = icontrade_box.find(".first_orderlist");
        var nodata = icontrade_box.find(".nodata1");
        var htmlobj = null;
        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=GetCurrentEsccOrder";



        icontrade_box.each(function () {

            var $this = $(this);

            var avg = $this.find(".fudubox .price .value");
            var fudu = $this.find(".fudubox .fudu .value");
            var orders_list = $this.find(".orders_list");
            var table = orders_list.eq(0).find(".listtab table");
            var count = 0;
            function fillHtml() {
                // console.log(count);
                count++;
                orders_list.each(function (index, em) {
                    var outorin = 0;
                    var _this = $(this);
                    htmlobj = table.clone(true);
                    var currentHtml = htmlobj.clone(true);

                    if (_this.hasClass("in")) {
                        outorin = 1;
                    } else {
                        outorin = 0;
                    }
                    var isnodata = _this.hasClass("nodata1");


                    var allstr = "";
                    //获取数据
                    $.post(url, { outorin: outorin }, function (data) {
                        var jsondata = JSON.parse(data);
                        if (jsondata["status"] == 0) {
                            weui.alert(jsondata["msg"]);
                        } else {

                            avg.text(parseFloat(jsondata["fudu"]).toFixed(5));
                            //  fudu.text(jsondata["_fudu"] + "%");
                            var _fudu = parseFloat(jsondata["_fudu"]);
                            fudu.text("");

                            if (_fudu >= 0) {
                                avg.addClass("pricerise");
                                fudu.addClass("rise").removeClass("down");
                            } else {
                                fudu.addClass("down").removeClass("rise");
                                avg.removeClass("pricerise");
                            }

                            var list = jsondata["list"];

                            if (isnodata) {

                                for (var i = list.length - 1 ; i >= 0 ; i--) {
                                    var str = "";
                                    var value = list[i];
                                    value.price = parseFloat(value.price);
                                    value.price = isNaN(value.price) ? 0 : value.price;

                                    value.remain = parseFloat(value.remain);
                                    value.remain = isNaN(value.remain) ? 0 : value.remain;


                                    if (outorin == 0) {
                                        str += "<tr><td class='td1'>卖" + (i + 1) + "</td>";

                                    } else {
                                        str += "<tr><td class='td1'>买" + (i + 1) + "</td>";
                                    }
                                    str += "<td class='td2'>" + value.price.toFixed(5) + "</td>";
                                    str += "<td class='td3'>" + value.remain.GetCutPoint(3) + "</td>";
                                    str += "</tr>";

                                    allstr += str;

                                }


                            }
                            else {

                                list.forEach(function (value, index, array) {

                                    var str = "";

                                    value.price = parseFloat(value.price);
                                    value.price = isNaN(value.price) ? 0 : value.price;

                                    value.remain = parseFloat(value.remain);
                                    value.remain = isNaN(value.remain) ? 0 : value.remain;


                                    if (outorin == 0) {
                                        str += "<tr><td class='td1'>卖" + (index + 1) + "</td>";

                                    } else {
                                        str += "<tr><td class='td1'>买" + (index + 1) + "</td>";
                                    }
                                    str += "<td class='td2'>" + value.price.toFixed(5) + "</td>";
                                    str += "<td class='td3'>" + value.remain.GetCutPoint(3) + "</td>";
                                    str += "</tr>";

                                    allstr += str;

                                });

                            }

                            currentHtml.append(allstr);
                            _this.find(".listtab").html(currentHtml);

                            //noselected

                            if (!_this.hasClass("noselected")) {

                                SelectOrder();
                            } else {
                                //_this.find(".listtab tr").eq(0).remove();
                            }
                        }

                        if (first_orderlist.find(".listtab table tr").length <= 0) {
                            nodata.show();
                            first_orderlist.hide();
                        } else {
                            nodata.hide();
                            first_orderlist.show();
                        }


                    });

                });
            }
            fillHtml();
            setInterval(fillHtml, time);


        });

        /****定时更新ESCC订单***************/






    })();

    (function () {


        /*****币币交易订单 动态加载数据***************/
        var pageindex = 2; var len = 3;
        var orderlist = $(".icontrade .current_orders");
        var iconid = parseInt(getQueryString("iconid"));
        iconid = isNaN(iconid) ? 0 : iconid;
        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=EsccLoadmore";
        orderlist.each(function (index, em) {
            var $this = $(this);
            if ($this.hasClass("oldorders")) {
                url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=EsccHistoryLoadmore";
            }
            else if ($this.hasClass("main_old_orders")) {

                url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=EsccMinHistoryLoadmore";
            } else {
                url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=EsccLoadmore";

            }

            var escc_tips = parseFloat($this.attr("data_escc_tips"));
            var usd_tips = parseFloat($this.attr("data_usd_tips"));
            var loadmore = $this.find(".loadmore");

            var ul = $this.find("ul");
            if (ul.find("li").length < len) {
                loadmore.hide();
                return;
            }
            var liclone = ul.find("li").eq(0).clone(true);

            loadmore.click(function () {

                $.get(url, { pageindex: pageindex, len: len, iconid: iconid }, function (data) {
                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 1) {

                        var newhtml = $("<ul></ul>");
                        if (jsondata.list.length <= 0) {
                            weui.toast("已没有数据了！", function () {
                                loadmore.hide();

                                $(window).unbind("scroll");

                            });

                            return;
                        }
                        jsondata.list.forEach(function (value, _index, arr) {

                            var _liclone = liclone.clone(true);
                            /*内容替换*/
                            if (!$this.hasClass("oldorders") && !$this.hasClass("main_old_orders")) {
                                //当前订单
                                var _price = parseFloat(value.price);
                                var _num = parseFloat(value.remain);

                                var _total = 0;
                                _liclone.find(".order_item  a").attr("href", "userIconPage.aspx?action=icontrade_old_orders2&iconid=" + value.id);
                                _liclone.find(".order_item .orderno .num .num_num").text(value.orderid);
                                var _v = value.outorin == 0 ? "卖" : "买";
                                _liclone.find(".order_item .time_box .moneytype i").text(_v);
                                if (value.outorin == 0) {
                                    _liclone.find(".order_item .time_box .moneytype i").removeClass("sold");

                                }
                                else {
                                    _liclone.find(".order_item .time_box .moneytype i").addClass("sold");
                                }

                                _liclone.find(".order_item .time_box .time").text(value.createtime);

                                var body_box_td = _liclone.find(".order_item .body_box td");
                                body_box_td.eq(0).html(_price.toFixed(5) + "<br />价格");
                                body_box_td.eq(1).html(_num.GetCutPoint(2) + "<br />数量");
                                body_box_td.eq(2).html(parseFloat(value.remain).GetCutPoint(2) + "<br />余量");

                                if (value.outorin == 0) {
                                    _total = parseFloat((_num * _price) / 6.5).GetCutPoint(2);
                                    body_box_td.eq(3).html(_total + "<br /> 获得USD");
                                } else {
                                    _total = parseFloat((_num * _price) / 6.5).GetCutPoint(2);
                                    if (value.paymoneyname == "usdt") {
                                        body_box_td.eq(3).html(_total + "<br /> 支付USDT");
                                    } else {
                                        body_box_td.eq(3).html(_total + "<br /> 支付USD");
                                    }

                                }

                            } else if ($this.hasClass("main_old_orders")) {

                                //历史主订单

                                var _price = parseFloat(value.price);
                                var _num = parseFloat(value.success);

                                var _total = 0;
                                _liclone.find(".order_item  a").attr("href", "userIconPage.aspx?action=icontrade_old_orders2&iconid=" + value.id);
                                if (value.state == "2") {
                                    _liclone.find(".order_item  .orderno .state").text("已撤销");
                                }

                                _liclone.find(".order_item .orderno .num .num_num").text(value.orderid);
                                var _v = value.outorin == 0 ? "卖" : "买";
                                _liclone.find(".order_item .time_box .moneytype i").text(_v);
                                if (value.outorin == 0) {
                                    _liclone.find(".order_item .time_box .moneytype i").removeClass("sold");

                                }
                                else {
                                    _liclone.find(".order_item .time_box .moneytype i").addClass("sold");
                                }

                                _liclone.find(".order_item .time_box .time").text(value.createtime);

                                var body_box_td = _liclone.find(".order_item .body_box td");
                                body_box_td.eq(0).html(_price.toFixed(5) + "<br />价格");
                                body_box_td.eq(1).html(parseFloat(value.num).GetCutPoint(2) + "<br />数量");
                                body_box_td.eq(2).html(parseFloat(value.success).GetCutPoint(2) + "<br />成交量");

                                if (value.outorin == 0) {
                                    _total = parseFloat((_num * _price) / 6.5).GetCutPoint(2);
                                    body_box_td.eq(3).html(_total + "<br /> 获得USD");
                                } else {
                                    _total = parseFloat((_num * _price) / 6.5).GetCutPoint(2);
                                    if (value.paymoneyname == "usdt") {
                                        body_box_td.eq(3).html(_total + "<br /> 支付USDT");
                                    } else {
                                        body_box_td.eq(3).html(_total + "<br /> 支付USD");
                                    }
                                }





                            } else {
                                //历史订单

                                var _price = parseFloat(value.price);
                                var _num = parseFloat(value.num);
                                var _total = 0;
                                _liclone.find(".order_item .orderno .num a").attr("href", "userIconPage.aspx?action=icontrade_old_orders2&iconid=" + value.id);
                                _liclone.find(".order_item .orderno .num .num_num").text(value.sorderid);
                                var _v = value.outorin == 0 ? "卖" : "买";
                                _liclone.find(".order_item .time_box .moneytype i").text(_v);
                                _liclone.find(".order_item .time_box .time").text(value.createtime);

                                var body_box_td = _liclone.find(".order_item .body_box td");
                                body_box_td.eq(0).html(_price.GetCutPoint(2) + "<br />价格");
                                body_box_td.eq(1).html(_num.GetCutPoint(2) + "<br />数量");

                                if (value.outorin == 0) {
                                    _total = parseFloat(_num * (1 + escc_tips)).GetCutPoint(2);
                                    body_box_td.eq(3).html(_total + "<br /> 支付ESCC");
                                } else {
                                    _total = parseFloat((_num * _price) / 6.5).GetCutPoint(2);
                                    if (value.paymoneyname == "usdt") {
                                        body_box_td.eq(3).html(_total + "<br /> 支付USDT");
                                    } else {
                                        body_box_td.eq(3).html(_total + "<br /> 支付USD");
                                    }
                                }


                            }

                            /*内容替换*/
                            newhtml.append(_liclone);
                            _liclone = null;

                        });

                        ul.append(newhtml.html());
                        newhtml = null;

                    }
                    pageindex++;
                    CancelOrder();
                });




            });

            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
                if (scrollTop + windowHeight == scrollHeight) {

                    loadmore.trigger("click");


                }
            });


        });









        /*****币币交易订单 动态加载数据***************/

        //取消订单
        CancelOrder();
        function CancelOrder() {

            var btn = $(".icontrade .current_orders li .order_item .control_btns button.cancel");
            btn.click(function () {

                var $this = $(this);
                weui.confirm("您正在撤销委托订单，确定要撤销吗？", function () {
                    //点击确认后的回调函数


                    var id = parseInt($this.attr("data_id"));
                    if (isNaN(id)) {
                        weui.alert("参数不正确！");
                        return;
                    }
                    var url = url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=UpdateIconState";
                    $.post(url, { state: "2", orderid: id }, function (data) {
                        var jsondata = JSON.parse(data);
                        if (jsondata["status"] == 0) {
                            weui.alert(jsondata["msg"]);
                        } else {
                            weui.alert(jsondata["msg"], function () {
                                location.reload();
                            });
                        }


                    });


                },
                function () {
                    //点击取消后的回调函数
                });


            });
        };
    })();




    /*****币币交易2018.8.20 修改**************/



    function tabBanding(obj, firstobj) {

        var userIiconpage_a = obj;
        if (!firstobj)
            firstobj = $("#tab1");

        firstobj.show().siblings().hide();
        userIiconpage_a.click(function () {

            var $this = $(this);
            firstobj = $($this.attr("href"));
            $this.addClass("weui-bar__item--on").siblings().removeClass("weui-bar__item--on");
            firstobj.show().siblings().hide();
            return false;

        });

    }
    function tabBanding2(obj, firstobj) {

        var userIiconpage_a = obj;
        if (!firstobj)
            firstobj = $("#tab1");

        firstobj.show().siblings().hide();
        userIiconpage_a.click(function () {

            var $this = $(this);
            firstobj = $($this.attr("href"));
            $this.addClass("weui-bar__item--on").siblings().removeClass("weui-bar__item--on");
            firstobj.show().siblings().hide();
            var index = $this.index();
            if (index <= 1)
                return false;

        });

    }

    /*****币币交易 记录 选项卡******/

    (function () {

        var userIiconpage_a;


        userIiconpage_a = $(".shopc2c .weui-navbar a");
        tabBanding(userIiconpage_a);


        userIiconpage_a = $(".userc2cList .weui-navbar a");
        tabBanding(userIiconpage_a);


        // userIiconpage_a = $(".icontrade .weui-tab .weui-navbar a");

        //tabBanding(userIiconpage_a);


        trlink($(".userIiconpage .weui-tab__bd tr"));



    })();



    /*****币币交易 记录 选项卡******/
    function trlink(obj) {
        obj.click(function () {
            var $this = $(this);
            var dataurl = $this.attr("data_url");
            if (dataurl) {
                location.href = dataurl;
            }

        });
    }
    /*****商家取消订单shopc2c****************/
    (function () {

        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=C2CBookin";
        var inputbox = $(".shopc2c .c2c_post_box");
        var shopc2cCanel = $(".shopc2c .orderlist ul li .shop_cancel");

        var action = getQueryString("action");
        if (!action && action != null) {
            action = action.toLowerCase();
        }
        var payTypeArr = ["未指定项", "银行卡", "支付宝", "微信"];
        var alertTelmplate = "";


        alertTelmplate += "<div class='alert_template'>";
        alertTelmplate += "<ul>";
        alertTelmplate += "<li class='title'>{title}</li>";

        alertTelmplate += "<li><span class='name'>数量:</span><span class='text'>{num}</span></li>";
        alertTelmplate += "<li><span class='name'>最小:</span><span class='text'>{min}</span></li>";
        alertTelmplate += "<li><span class='name'>最大:</span><span class='text'>{max}</span></li>";
        //alertTelmplate += "<li><span class='name'>交易方式:</span><span class='text'>{paytype}</span></li>";
        alertTelmplate += "</ul>";
        alertTelmplate += "</div>";

        inputbox.each(function (i, e) {
            var $this = $(this);
            var remain = parseFloat($this.find(".remain span").text());
            remain = isNaN(remain) ? 0 : remain;
            var num_obj = $this.find(".num");
            var minnum_obj = $this.find(".minnum");
            var maxnum_obj = $this.find(".maxnum");
            var price_obj = $this.find(".price");
            var phone = $this.find(".phone");
            var yzcode = $this.find(".validate_code .item_input");
            var yzcodebtn = $this.find(".validate_code .button");
            var inputbtn = $this.find(".c2cbtn");
            var txtImgCode = $this.find("#txtImgCode");
            var imgobj = $this.find(".img_box");

            var code = "";
            var _num = 0, _minnum = 0, _maxnum = 0, _price = 0;
            _price = parseFloat(price_obj.val());
            _price = isNaN(_price) ? 0 : _price;

            valueCheck(num_obj, function (num) {
                _num = num;
            });
            valueCheck(minnum_obj, function (num) {
                _minnum = num;
                if (num <= 0) {
                    weui.alert("最小值不能小于等于0！");
                }

            });
            valueCheck(maxnum_obj, function (num) {
                _maxnum = num;
            });
            function reset() {
                minnum_obj.val(0.00);
                maxnum_obj.val(0.00);
                num_obj.val(0.00);
            }
            yzcodebtn.click(function () {

                //判断

                if (_num <= 0) {

                    weui.alert("数量不能小于等于0！");
                    return;

                }
                if (action == "shopc2c_out") {
                    if (_num > remain) {
                        weui.alert("您发布的出售数量超过当前账户余额，请重新输入！");
                        reset();
                        return;
                    }
                }
                if (_num > 10000000) {

                    weui.alert("数量超出限制！");
                    return;

                }


                if (!Validate.Isphone(phone.val())) {
                    weui.alert("手机号不正确！");
                    return;
                }

                var sendurl = "http://" + window.location.host + "/";

                if (action == "shopc2c_out") {

                    // sendSMS($(this), phone, sendurl, "", "usd_payout", _num);

                    sendSMSByImgCode($(this), phone, imgobj, sendurl, "in", "usd_payout", num_obj);
                }


            });

            inputbtn.click(function () {

                var new_num = 0, vv = 0, vv2 = 0;
                var _yzcode = "";
                if (yzcode)
                    _yzcode = yzcode.val();
                //验证
                //if (action == "shopc2c_out" && !_yzcode) {
                //    weui.alert("请输入手机验证码!");

                //    return;
                //}
                var new_num = parseFloat(num_obj.val());
                new_num = isNaN(new_num) ? 0 : new_num;

                if (new_num != _num) {
                    weui.alert("数量改变，请重新获取验证码!");

                    return;
                }
                vv = parseFloat(minnum_obj.val());
                vv = isNaN(vv) ? 0 : vv;
                vv2 = parseFloat(maxnum_obj.val());
                vv2 = isNaN(vv2) ? 0 : vv2;
                if (vv < 1) {
                    weui.alert("最小值应该大于等于1！");
                    return;
                }
                if (vv >= vv2) {
                    weui.alert("最小值应该小于最大值！");
                    return;
                }

                var postdata = { outorin: i, num: num_obj.val(), minnum: minnum_obj.val(), maxnum: maxnum_obj.val(), yzcode: _yzcode };
                postdata.outorin = action == "shopc2c_out" ? 0 : 1;
                //var alertTelmplate_box = "";
                ////替换
                //if (action == "shopc2c_out") {
                //    alertTelmplate_box = alertTelmplate.replace("{title}", "卖出");

                //} else {
                //    alertTelmplate_box = alertTelmplate.replace("{title}", "买入");
                //}
                //alertTelmplate_box = alertTelmplate_box
                //    .replace("{num}", postdata.num)
                //    .replace("{min}", postdata.minnum)
                //    .replace("{max}", postdata.maxnum);

                weui.confirm("确认提交？", function () {
                    //点击确认后的回调函数

                    $.post(url, postdata, function (data) {
                        var jsondata = JSON.parse(data);
                        if (jsondata["status"] == 0) {
                            if (jsondata["url"]) {
                                weui.alert(jsondata["msg"], function () {
                                    //调用通知短信
                                    //setTimeout(send_msg_log, 1000);
                                    send_msg_log();
                                    location.href = jsondata["url"];
                                });
                            } else {
                                send_msg_log();
                                weui.alert(jsondata["msg"]);
                            }
                        } else {
                            weui.alert(jsondata["msg"], function () {
                                //调用通知短信
                                send_msg_log();
                                location.reload();
                            });
                        }


                    });

                }, function () {
                    //点击取消后的回调函数
                });



            })

        });

        shopc2cCanel.click(function () {
            var $this = $(this);
            url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=CancelC2C";

            var postdata = { id: $this.attr("data_c2cid") };
            weui.confirm("取消信息将会取消所有未支付订单，确定要取消吗？", function () {
                //点击确认后的回调函数

                $.post(url, postdata, function (data) {
                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {
                        weui.alert(jsondata["msg"]);
                    } else {
                        weui.alert(jsondata["msg"], function () {
                            location.reload();
                        });
                    }

                });

            }, function () {
                //点击取消后的回调函数
            });




        });


    })();




    /*****商家shopc2c****************/



    /****用户c2c*********/


    (function () {

        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=DealC2C";
        var inputbox = $(".userc2c .userc2c_box .c2c_post_box");
        var orderlist = $(".userc2c .userc2c_box .orderlist");
        var action = getQueryString("action");
        if (!action && action != null) {
            action = action.toLowerCase();
        }
        var payTypeArr = ["未指定项", "银行卡", "支付宝", "微信"];
        var alertTelmplate = "";

        alertTelmplate += "<div class='alert_template'>";
        alertTelmplate += "<ul>";
        alertTelmplate += "<li class='title'>{title}</li>";
        alertTelmplate += "<li><span class='name'>卖出价格:</span><span class='text'>{price}</span></li>";
        alertTelmplate += "<li><span class='name'>卖出数量:</span><span class='text'>{num}</span>USD</li>";
        alertTelmplate += "<li><span class='name'>收入金额:</span><span class='text'>{total}</span>CNY</li>";

        alertTelmplate += "</ul>";
        alertTelmplate += "</div>";


        var alertTelmplate2 = "";

        alertTelmplate2 += "<div class='alert_template'>";
        alertTelmplate2 += "<ul>";
        alertTelmplate2 += "<li class='title'>{title}</li>";
        alertTelmplate2 += "<li><span class='name'>买入价格:</span><span class='text'>{price}</span></li>";
        alertTelmplate2 += "<li><span class='name'>买入数量:</span><span class='text'>{num}</span>USD</li>";
        alertTelmplate2 += "<li><span class='name'>支付金额:</span><span class='text'>{total}</span>CNY</li>";
        alertTelmplate2 += "<li><span class='name'>支付方式:</span><span class='text'>{paylist}</span></li>";

        alertTelmplate2 += "</ul>";
        alertTelmplate2 += "</div>";




        inputbox.each(function (i, e) {
            var $this = $(this);
            var num_obj = $this.find(".num");
            var remain = parseFloat($this.find(".remain span").text());
            remain = isNaN(remain) ? 0 : remain;
            var inputbtn = $this.find(".c2cbtn");
            var price_obj = $this.find(".price");
            var yzcode = $this.find(".validate_code .item_input");
            var yzcodebtn = $this.find(".validate_code .button");
            var phone = $this.find(".phone");
            var showtotal = $this.find(".showtotal");
            var txtImgCode = $this.find("#txtImgCode");
            var imgobj = $this.find(".img_box");
            var amount = $this.find(".remain span");
            var _num = 0;
            var _price = 0;
            var _total = 0;
            _price = parseFloat(price_obj.val());
            _price = isNaN(_price) ? 0 : _price;
            valueCheck1(num_obj, function (num) {
                _num = num;
                _total = (_price * _num).GetCutPoint(2);
                showtotal.val(_total);
                if (action == "userc2c_out") {
                    var money = parseFloat(amount.text());
                    money = isNaN(money) ? 0 : money;
                    if (_num > money) {
                        weui.alert("余额不足！");
                    }
                    //动态获取 最近商家订单
                    var _url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=GetParentOrder";
                    var li = orderlist.find("ul li");
                    if (li.length > 0 && li.eq(0).attr("class") != "nodata") {
                        $.post(_url, { outorin: 1, num: _num }, function (data) {

                            var jsondata = JSON.parse(data);
                            if (jsondata["status"] == 1) {

                                var list = jsondata.list[0];
                                var li1 = li.eq(0);
                                if (li1.find("tr").eq(0).find(".td2").text() != list.user_name) {

                                    li1.find("tr").eq(0).find(".td2").text(list.user_name);
                                    li1.find("tr").eq(0).find(".td4").text(list.num.toFixed(5));


                                    li1.find("tr").eq(1).find(".td4").text(list.minnum.toFixed(5));

                                    li1.find("tr").eq(2).find(".td2").text(list.remain.toFixed(5));
                                    li1.find("tr").eq(2).find(".td4").text(list.maxnum.toFixed(5));


                                }



                            }





                        });







                    }




                }






            });
            function reset() {
                showtotal.val(0.00);
                num_obj.val(0.00);
            }



            yzcodebtn.click(function () {
                //判断

                if (_num < 1) {

                    weui.alert("数量不能小于1！");
                    return;

                }
                if (action == "userc2c_out") {
                    if (_num > remain) {
                        weui.alert("余额不足！");
                        reset();
                        return;
                    }
                }
                if (_num > 1000000) {

                    weui.alert("数量超出限制！");
                    return;

                }

                if (!Validate.Isphone(phone.val())) {
                    weui.alert("手机号不正确！");
                    return;
                }

                var sendurl = "http://" + window.location.host + "/";
                if (action == "userc2c_out") {

                    //  sendSMS($(this), phone, sendurl, "", "usd_payout", _num);
                    var img_code = txtImgCode.val();
                    sendSMSByImgCode($(this), phone, imgobj, sendurl, "in", "usd_payout", num_obj);

                }


            });



            inputbtn.click(function () {
                var isclick = $(this).attr("isclick");
                if (isclick == "1") {
                    weui.alert("请不要重复点击！");

                    return;
                }
                $(this).attr("isclick", 1);
                setTimeout(function () { $this.attr("isclick", 0); }, 1000);

                if (_num < 1) {

                    weui.alert("数量不能小于1！");
                    return;

                }
                if (action == "userc2c_out") {
                    if (_num > remain) {
                        weui.alert("余额不足！");
                        reset();
                        return;
                    }
                }
                if (_num > 1000000) {

                    weui.alert("数量超出限制！");
                    return;

                }



                var paylist = $(this).attr("data_paylist");
                var _yzcode = "";
                if (yzcode) {
                    _yzcode = yzcode.val();
                }

                var now_num = 0;
                //if (action == "userc2c_out" && !_yzcode) {
                //    weui.alert("请填写手机验证码！");
                //    return;
                //}

                var hasUserInfo = $(this).attr("data_spassword");

                if (hasUserInfo == "1") {

                    weui.alert("请先完善您的个人信息！", function () {
                        location.href = "usercenter.aspx?action=userinfo";
                    });
                    return;
                }



                now_num = parseFloat(num_obj.val());
                now_num = isNaN(now_num) ? 0 : now_num;
                if (_num != now_num) {
                    weui.alert("数量改变了，请重新验证信息！");
                    return;
                }
                var alertTelmplate_box = "";
                var postdata = { outorin: i, num: num_obj.val(), yzcode: _yzcode };
                postdata.num = parseFloat(postdata.num);
                postdata.num = isNaN(postdata.num) ? 0 : postdata.num;
                _total = parseFloat(_total);
                _total = isNaN(_total) ? 0 : _total;
                postdata.outorin = action == "userc2c_out" ? 0 : 1;

                if (action == "userc2c_out") {
                    alertTelmplate_box = alertTelmplate.replace("{title}", "卖出");
                    alertTelmplate_box = alertTelmplate_box.replace("{num}", postdata.num.GetCutPoint(2))
                                              .replace("{price}", _price.GetCutPoint(2))
                                              .replace("{total}", _total.GetCutPoint(2));
                }
                else {
                    var paystr = "";

                    if (paylist.indexOf("[1]") > -1) {
                        paystr += "银行卡 ";
                    }
                    if (paylist.indexOf("[2]") > -1) {
                        paystr += "支付宝 ";
                    }

                    if (paylist.indexOf("[3]") > -1) {
                        paystr += "微信 ";
                    }

                    alertTelmplate_box = alertTelmplate2.replace("{title}", "买入");

                    alertTelmplate_box = alertTelmplate_box.replace("{num}", postdata.num.GetCutPoint(2))
                                              .replace("{price}", _price.GetCutPoint(2))
                                              .replace("{total}", _total.GetCutPoint(2))
                                              .replace("{paylist}", paystr);




                }





                weui.confirm(alertTelmplate_box, function () {
                    //点击确认后的回调函数
                    $.post(url,
                        postdata,
                        function (data) {
                            var jsondata = JSON.parse(data);
                            if (jsondata["status"] == 0) {
                                // console.log(data);
                                if (jsondata["url"]) {
                                    weui.alert(jsondata["msg"], function () {
                                        location.href = jsondata["url"];
                                    });
                                } else {
                                    weui.alert(jsondata["msg"], function () {

                                        location.reload();
                                    });
                                }

                            } else {
                                weui.alert(jsondata["msg"], function () {
                                    send_msg_log();
                                    location.href = "userC2CPage.aspx?action=userc2c_orders";
                                });
                            }

                            //调用通知短信
                            //setTimeout(send_msg_log, 1000);

                        });

                }, function () {
                    //点击取消后的回调函数
                });





            })

        });



    })();

    /****用户c2c*********/


    /******更新c2c_info_state  已废弃**************/


    (function () {

        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=UpdateDealC2CState";

        var dealdone = $(".shopc2cDetail .dealdone");
        var payed = $(".shopc2cDetail .payed");
        var shensu = $(".shopc2cDetail .shensu");
        var cancel = $(".shopc2cDetail .cancel");


        var i_pay = $(".shopc2cDetail .i_pay");
        var paybox = $(".shopc2cDetail .paybox");
        var _class = "i_on";
        i_pay.click(function () {
            var $this = $(this);
            if ($this.hasClass(_class)) {
                $this.removeClass(_class);
                paybox.slideUp();
            } else {
                $this.addClass(_class);
                paybox.slideDown();
            }


        });



        postUp(dealdone, 3);

        postUp(shensu, 2);

        postUp(payed, 1);
        postUp(cancel, 4);








    })();





    /******更新c2c_info_state**************/


    /******转账**********/

    (function () {

        var moneyTransfer = $(".moneyTransfer");
        var datajson = {
            toUser: "",
            moneyTypeid: "",
            num: "",
            spassword: ""
        };
        var url = "";
        moneyTransfer.each(function (i, e) {

            var $this = $(this);
            var touser = $this.find(".touser");
            var num = $this.find(".num");
            var tips = $this.find(".tips");
            var spassword = $this.find(".spassword");
            var moneyTypeid = $this.attr("data_moneyType");
            var button = $this.find("button");

            valueCheck(num);
            url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=GetTips";
            $.get(url, { moneyTypeid: moneyTypeid }, function (data) {
                var jsondata = JSON.parse(data);
                if (jsondata["status"] == 0) {
                    weui.alert(jsondata["msg"]);
                } else {
                    tips.val(jsondata["data"]);
                }

            });
            url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=moneyTransfer";
            button.click(function () {

                //验证
                var vv = "";
                vv = touser.val();
                if (!vv) {
                    weui.alert("用户名不能为空！");
                    return;
                }
                datajson.toUser = vv;

                vv = parseFloat(num.val());
                if (vv <= 0) {
                    weui.alert("金额不能小于0！");
                    return;
                }
                datajson.num = vv;
                vv = spassword.val();
                if (!vv) {
                    weui.alert("支付密码不能为空！");
                    return;
                }
                datajson.spassword = vv;
                datajson.moneyTypeid = moneyTypeid;


                //提交

                $.post(url, datajson, function (data) {

                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {
                        weui.alert(jsondata["msg"]);
                    } else {
                        weui.alert(jsondata["msg"], function () {
                            location.reload();
                        });
                    }

                });





            });







        })



    })();






    /******转账**********/


    /****** 头像上传 **************/

    (function () {


        var url = "http://" + window.location.host + "/tools/upload_ajax.ashx?action=headpicUpload";



        //var img = $(".uploadimg .uploadimg");
        var img = $(".headphoto img");

        var uploaderInput = document.getElementById("uploaderInput");
        if (uploaderInput) {
            uploaderInput.onchange = function (e) {
                var files = this.files;
                var file = files[0];
                var _src = "";
                if (file) {

                    if (window.URL.createObjectURL) {
                        _src = window.URL.createObjectURL(file);
                    } else {
                        _src = file.getAsDataURL();
                    }

                    img.attr("src", _src);
                    var oMyForm = new FormData();
                    oMyForm.append("file", file);
                    $.ajax({
                        url: url,
                        type: 'POST',
                        cache: false,
                        data: oMyForm,
                        processData: false,
                        contentType: false,
                        async: false,
                        success: function (data) {
                            var jsondata = JSON.parse(data);
                            if (jsondata["status"] == 0) {
                                weui.alert(jsondata["msg"], function () {

                                    location.reload();
                                });


                            } else {
                                if (jsondata["path"]) {
                                    url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=user_avatar_crop";
                                    var objdata = {
                                        hideFileName: unescape(jsondata["path"]),
                                        hideWidth: 150,
                                        hideHeight: 150,
                                        hideX1: 150,
                                        hideY1: 150,
                                    };
                                    $.post(url, objdata, function (data) {

                                        var jsondata = JSON.parse(data);
                                        weui.alert(jsondata["msg"], function () {
                                            location.reload();
                                        });



                                    });
                                }
                            }


                        }
                    })



                } else {
                    weui.alert("请上传图片");
                }

            }

        }



    })();


    /****** 头像上传 **************/

    /***微信和支付宝修改*************/



    (function () {

        var alipay = $(".alipay");
        var webcat = $(".webcat");

        modifyAlipayAndWebcat(alipay);
        modifyAlipayAndWebcat(webcat);

        function modifyAlipayAndWebcat(obj) {
            if (obj.length <= 0)
                return;
            var useraccount = obj.find(".useraccount");
            var real_name = obj.find(".real_name");
            var idcard = obj.find("#idcard");
            var yzcode = obj.find(".yzcode");
            var imgshow_dialog = $("#imgshow_bdialog");
            var img = obj.find(".skimg");
            var img_dialog = $("#imgshow_bdialog .weui-dialog__bd img");
            var txtImgCode = obj.find(".img_box");
            var send_mobile_msg = obj.find(".getcode");
            var escc_default_btn = obj.find(".weui-btn_escc_default");
            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=modifyAlipayAndWebcat";
            var phone = obj.find(".mobile");
            // 发送短信验证码
            send_mobile_msg.click(function () {

                var sendurl = "http://" + window.location.host + "/";
                sendSMSByImgCode($(this), phone, txtImgCode, sendurl, "in", "base_paylist");

            });
            var upload_shou = obj.find(".shoukuan .upload_shou");
            var tpurl = "http://" + window.location.host + "/tools/upload_ajax.ashx?action=headpicUpload";
            var oMyForm = new FormData();
            var path = "";
            var classname = "upload_shou_norightborder"
            var uploaderInput = document.getElementById("shoukuan_uploaderInput");

            if (uploaderInput) {
                uploaderInput.onchange = function (e) {
                    var files = this.files;
                    if (files.length <= 0) {

                        return;
                    }
                    var file = files[0];
                    if (file.size <= 0 || file.name == "" || file.name == null) {
                        return;
                    }
                    var _src = "";
                    if (file) {

                        if (window.URL.createObjectURL) {
                            _src = window.URL.createObjectURL(file);
                        } else {
                            _src = file.getAsDataURL();
                        }

                        // img.attr("src", _src);
                        img_dialog.attr("src", _src);
                        img.show();
                        var oMyForm = new FormData();
                        oMyForm.append("file", file);
                        $.ajax({
                            url: tpurl,
                            type: 'POST',
                            cache: false,
                            data: oMyForm,
                            processData: false,
                            contentType: false,
                            async: false,
                            success: function (data) {
                                var jsondata = JSON.parse(data);
                                if (jsondata["status"] == 0) {
                                    weui.alert(jsondata["msg"], function () {

                                        location.reload();
                                    });
                                } else {
                                    if (jsondata["path"]) {
                                        path = unescape(jsondata["path"]).replace("..", "");
                                        upload_shou.removeClass(classname);

                                    }
                                }


                            }
                        })
                    }

                };

            }

            var _path = img.attr("data_path");
            ;
            if (_path) {
                upload_shou.removeClass(classname);
                img.show();
                img_dialog.attr("src", _path);
            } else {
                upload_shou.addClass(classname);
            }
            imgshow_dialog.find(".weui-mask").click(function () {
                imgshow_dialog.fadeOut();
            });
            img.click(function () {

                imgshow_dialog.fadeIn();

            });

            escc_default_btn.click(function () {

                var objdata = {
                    real_name: "",
                    webcat: "",
                    alipay: "",
                    idcard: idcard.val(),
                    yzcode: yzcode.val(),
                    path: path

                };


                if (!useraccount.val()) {
                    weui.alert("账号不能为空！");
                    return;
                }
                if (!real_name.val()) {
                    weui.alert("绑定姓名不能为空！");
                    return;
                }
                objdata.real_name = real_name.val();
                if (obj.hasClass("alipay")) {
                    objdata.alipay = useraccount.val();
                }
                else if (obj.hasClass("webcat")) {
                    objdata.webcat = useraccount.val();
                }


                $.post(url, objdata, function (data) {

                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {
                        weui.alert(jsondata["msg"]);
                    } else {
                        weui.alert(jsondata["msg"], function () {
                            location.href = "./usercenter.aspx?action=userinfo";
                        });
                    }



                });




            });
        }





    })();



    /***微信和支付宝修改*************/










    /******2018.8.9c UI修改************/
    /*用户c2c和 商家c2c 公用*/
    (function () {

        //时间倒计时

        function Timetick() {
            var userc2c_box = $(".userc2c_box");
            var userc2c_tab_a = userc2c_box.find(".weui-tab .weui-navbar a");
            var order_item = userc2c_box.find(".user_order_list li .order_item");

            order_item.each(function (i, em) {
                var $this = $(this);

                var outorin = $this.find(".time_box .moneytype i");
                var time = $this.find(".time_box .time");
                var state = $this.find(".orderno .state span");
                var _sds = 0;

                if (outorin.text().trim() == "买" && state.text().trim() == "待支付") {
                    //第一次获取时间的控制
                    var _time = time.attr("data_time");

                    if (!_time) {
                        _time = time.text().trim();
                        time.attr("data_time", _time);
                    }

                    var date = new Date(_time);


                    date.setHours(date.getHours() + 1);//增加1个小时
                    var d = new Date();
                    _sds = date - d;

                    if (_sds > 0) {

                        _sds = parseInt(_sds / 1000);
                        var hour = parseInt(_sds / (60 * 60));
                        _sds = _sds - (hour * 60 * 60);
                        var min = parseInt(_sds / 60);
                        _sds = _sds - min * 60;
                        if (min < 10) {
                            min = "0" + min;
                        }
                        if (_sds < 10) {
                            _sds = "0" + _sds;
                        }
                        var _timestr = "0" + hour + ":" + min + ":" + _sds + "";

                        time.text(_timestr);
                        time.css({ color: "red" });
                    }

                }

                time.show(0);


            });

        }
        var action = getQueryString("action");
        if (action == "userc2c_orders" || action == "shopc2c_orders") {
            setInterval(Timetick, 1000);
        } else {
            $(".userc2c_box .user_order_list li .order_item .time_box .time").show();
        }


        function updatec2cState() {

            var userc2c_box = $(".userc2c_box");
            var userc2c_tab_a = userc2c_box.find(".weui-tab .weui-navbar a");
            var order_item = userc2c_box.find(".user_order_list li .order_item");


            order_item.each(function (i, em) {
                var $this = $(this);
                var btn = $this.find("button");
                var contact_info = $this.find(".contact_info");
                var paytype_a = $this.find(".pay_types .wenzi a");
                var p_str = "请选择支付方式";

                btn.click(function () {
                    var $that = $(this);

                    var infoid = $that.attr("data_infoid");
                    var phone = $that.attr("data_phone");
                    var num = $that.attr("data_num");
                    var _class = $that.attr("class");
                    switch (_class) {
                        case "cancel":
                            postUp($that, 4, "您正在取消订单，请点击确认！");
                            break;
                        case "ok":
                            var paybox = new PayDialog();
                            paybox.ftnc2c(infoid, 3);
                            paybox.title.hide();
                            paybox.pic_code.show();
                            paybox.C2CShow();
                            // postUp($that, 3, "您确认交易成功吗？");
                            break;
                        case "shensu":
                            // postUp($that, 2, "您确认要申诉吗？");
                            location.href = "userc2cpage.aspx?action=complainlog&infoid=" + infoid;

                            break;
                        case "payed":

                            if (paytype_a.text().trim().indexOf(p_str) > -1) {
                                weui.alert("请选择支付方式！");
                                break;
                            }

                            var paybox = new PayDialog();
                            paybox.ftnc2c(infoid, 1);
                            paybox.TitleReplace("CNY", num);
                            paybox.C2CShow();
                            // postUp($that, 1, "您确认已经支付成功款项吗？");
                            break;
                        case "buyagain":
                            //weui.alert("再次购买");
                            //break;
                        case "contact":

                            var isshop = $that.attr("data_isshop");
                            var contact_bdialog = $("#contact_bdialog");
                            var _html = "";
                            if (isshop == "0") {//用户查看-显示商家信息
                                _html = contact_info.find(".shop_info").html();
                            } else {
                                _html = contact_info.find(".userbox_info").html();
                            }
                            contact_bdialog.find(".weui-dialog__bd").html(_html);

                            contact_bdialog.fadeIn(200);





                            break;
                        default:
                            weui.alert("错误操作");
                            break;

                    }



                });



            });

        }
        updatec2cState();

        var user_order_list = $(".userc2c .userc2c_box .user_order_list");

        C2CAjaxAppendData(user_order_list, false);
        user_order_list = $(".shopc2c .userc2c_box .user_order_list");

        C2CAjaxAppendData(user_order_list, true);

        function C2CAjaxAppendData(obj, isshop) {
            var user_order_list = $(obj);
            var classname = "oldorders";


            user_order_list.each(function () {
                var pageindex = 2; var len = 3;
                var $this = $(this);
                var ishistory = $this.hasClass(classname);
                var url = "";
                if (isshop) {
                    if (ishistory) {
                        url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=Shop2cHistoryLoadmore";
                    } else {
                        url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=Shopc2cLoadmore";
                    }

                } else {
                    if (ishistory) {
                        url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=Userc2cHistoryLoadmore";
                    } else {
                        url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=Userc2cLoadmore";
                    }

                }


                var mobile = $this.attr("data_phone");
                var loadmore = $this.find(".loadmore");
                var ul = $this.find("ul").eq(0);
                var li = ul.find("li");
                if (li.length < len) {
                    loadmore.hide(0);
                    return;
                }
                var liclone = li.eq(0).clone(true);

                loadmore.click(function () {

                    $.get(url, { pageindex: pageindex, len: len }, function (data) {
                        var jsondata = JSON.parse(data);
                        if (jsondata["status"] == 1) {

                            var newhtml = $("<ul></ul>");
                            if (jsondata.list.length <= 0) {
                                weui.toast("已没有数据了！", function () {
                                    loadmore.hide();

                                    $(window).unbind("scroll");

                                });

                                return;
                            }
                            jsondata.list.forEach(function (value, _index, arr) {

                                value.outorin = parseInt(value.outorin);
                                value.outorin = isNaN(value.outorin) ? 0 : value.outorin;
                                var _state = parseInt(value.state);
                                _state = isNaN(_state) ? 0 : _state;

                                var _liclone = liclone.clone(true);
                                /*内容替换*/

                                _liclone.find(".order_item .orderno").attr("onclick", "location.href = 'userC2CPage.aspx?action=shopc2cDetail&sorderid=" + value.id + "'");
                                _liclone.find(".order_item .orderno .num .num_num").text(value.sorderid);
                                var state = _liclone.find(".order_item .orderno .state");

                                var str = "";
                                switch (_state) {
                                    case 0:

                                        if (value.outorin == 0) {
                                            if (isshop) {
                                                str = "<span style=\"color:red;\"> 等待支付</span>";
                                            } else {
                                                str = "<span style=\"color:red;\"> 待支付</span>";
                                            }

                                        } else {
                                            if (isshop) {
                                                str = "<span style=\"color:red;\"> 待支付</span>";

                                            } else {
                                                str = "<span style=\"color:red;\"> 等待支付</span>";
                                            }

                                        }

                                        break;
                                    case 1:
                                        str = "<span style=\"color:red;\"> 已支付</span>";
                                        break;
                                    case 2:
                                        str = "<span style=\"color:red;\"> 已申诉</span>";
                                        break;
                                    case 3:
                                        str = "<span style=\"color:burlywood;\"> 交易成功</span>";
                                        break;
                                    case 4:
                                        str = "<span style=\"color:gray;\"> 已取消</span>";
                                        break;
                                    default:
                                        break;

                                }
                                state.html(str);
                                var _i = _liclone.find(".order_item .time_box .moneytype i");
                                if (value.outorin == 0) {
                                    if (isshop) {
                                        _i.text("卖");
                                        _i.addClass("blue");
                                    } else {
                                        _i.text("买");
                                        _i.removeClass("blue");
                                    }

                                } else {
                                    if (isshop) {
                                        _i.text("买");
                                        _i.removeClass("blue");

                                    } else {
                                        _i.text("卖");
                                        _i.addClass("blue");
                                    }

                                }

                                _liclone.find(".order_item .time_box .time").text(value.createtime);
                                var td = _liclone.find(".body_box td");
                                var _price = parseFloat(value.price);
                                var _num = parseFloat(value.num);
                                var _total = parseFloat(_price * _num);
                                td.eq(0).html(_price.GetCutPoint(3) + "<br />价格");
                                td.eq(1).html(_num.GetCutPoint(3) + "<br />数量");
                                if (value.outorin == 0) {
                                    str = "<br />收入CNY";
                                } else {
                                    str = "<br />支付CNY";
                                }
                                td.eq(2).html(_total.GetCutPoint(3) + str);
                                var pay_types = _liclone.find(".order_item .pay_types .wenzi a");
                                var pay_types_box = _liclone.find(".order_item .pay_types");

                                var _paytype = parseInt(value.paytype);
                                _paytype = isNaN(_paytype) ? 0 : _paytype;
                                if (!ishistory) {

                                    //联系方式
                                    var contact_info = _liclone.find(".contact_info");
                                    if (contact_info.length > 0) {
                                        if (value.shop_realname.length > 1) {
                                            contact_info.find(".shop_info .realname").text("姓名:" + value.shop_realname);
                                        }
                                        if (value.shop_mobile.length > 1) {
                                            contact_info.find(".shop_info .mobile").text("手机:" + value.shop_mobile);
                                        }
                                        if (value.shop_email.length > 1) {
                                            contact_info.find(".shop_info .email").text("邮箱:" + value.shop_email);
                                        }


                                        if (value.u_realname.length > 1) {
                                            contact_info.find(".userbox_info .realname").text("姓名:" + value.u_realname);

                                        }
                                        if (value.u_mobile.length > 1) {
                                            contact_info.find(".userbox_info .mobile").text("手机:" + value.u_mobile);
                                        }
                                        if (value.u_email.length > 1) {
                                            contact_info.find(".userbox_info .email").text("邮箱:" + value.u_email);
                                        }
                                    }

                                    switch (_paytype) {

                                        case 1:
                                            pay_types.text("付款方式：（银行卡）");
                                            break;
                                        case 2:
                                            pay_types.text("付款方式：（支付宝）");
                                            break;
                                        case 3:
                                            pay_types.text("付款方式：（微信）");
                                            break;
                                        default:
                                            pay_types.text("请选择支付方式");
                                            break;

                                    }
                                    pay_types.attr("href", "userC2CPage.aspx?action=paylist&id=" + value.id);

                                    var control_btns = _liclone.find(".order_item .control_btns");
                                    control_btns.html("");

                                    //添加联系方式 按钮

                                    control_btns.html("<button class=\"contact\" data_isshop='" + value.isshop + "'>联系对方</button>");


                                    if (value.outorin == 0) {

                                        if (isshop) {

                                            if (_state == 0) {
                                                control_btns.append($("<button class=\"cancel\" data_infoid=\"" + value.id + "\">取消订单</button>"));


                                            } else if (_state == 1) {
                                                control_btns.append($("<button class=\"ok\" data_infoid=\"" + value.id + "\" data_phone=\"" + mobile + "\" data_num='" + _total.GetCutPoint(3) + "'> 确认收款 </button>"));
                                                control_btns.append($("<button class=\"shensu\" data_infoid=\"" + value.id + "\">我要申诉</button>"));
                                            }
                                            if (_state >= 1) {
                                                pay_types.removeAttr("href");
                                                pay_types_box.show();
                                            }


                                        } else {
                                            //用户c2c 商家卖出，用户买入
                                            if (_state == 0) {
                                                control_btns.append($("<button class=\"cancel\" data_infoid=\"" + value.id + "\">取消订单</button>"));
                                                control_btns.append($("<button class=\"payed\" data_infoid=\"" + value.id + "\" data_phone=\"" + mobile + "\" data_num='" + _total.GetCutPoint(3) + "'> 我已付款 </button>"));

                                            } else if (_state == 1) {

                                                control_btns.append($("<button class=\"shensu\" data_infoid=\"" + value.id + "\">我要申诉</button>"));
                                            }
                                            if (_state >= 1) {
                                                pay_types.removeAttr("href");

                                            }
                                            pay_types_box.show();
                                        }

                                    } else {

                                        if (isshop) {
                                            //用户c2c 商家卖出，用户买入
                                            if (_state == 0) {
                                                control_btns.append($("<button class=\"cancel\" data_infoid=\"" + value.id + "\">取消订单</button>"));
                                                control_btns.append($("<button class=\"payed\" data_infoid=\"" + value.id + "\" data_phone=\"" + mobile + "\" data_num='" + _total.GetCutPoint(3) + "'> 我已付款 </button>"));

                                            } else if (_state == 1) {

                                                control_btns.append($("<button class=\"shensu\" data_infoid=\"" + value.id + "\">我要申诉</button>"));
                                            }
                                            if (_state >= 1) {
                                                pay_types.removeAttr("href");

                                            }
                                            pay_types_box.show();

                                        } else {
                                            if (_state == 0) {
                                                control_btns.append($("<button class=\"cancel\" data_infoid=\"" + value.id + "\">取消订单</button>"));


                                            } else if (_state == 1) {
                                                control_btns.append($("<button class=\"ok\" data_infoid=\"" + value.id + "\" data_phone=\"" + mobile + "\" data_num='" + _total.GetCutPoint(3) + "'> 确认收款 </button>"));
                                                control_btns.append($("<button class=\"shensu\" data_infoid=\"" + value.id + "\">我要申诉</button>"));
                                            }
                                            if (_state >= 1) {
                                                pay_types.removeAttr("href");
                                                pay_types_box.show();
                                            }

                                        }

                                    }


                                }




                                /*内容替换*/
                                newhtml.append(_liclone);
                                _liclone = null;

                            });

                            ul.append(newhtml.html());
                            newhtml = null;

                        }
                        pageindex++;
                        updatec2cState();
                    });

                });

                $(window).scroll(function () {
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = $(document).height();
                    var windowHeight = $(this).height();
                    if (scrollTop + windowHeight == scrollHeight) {

                        loadmore.trigger("click");


                    }
                });



            });



        }













    })();




    /***我的资产*************/
    (function () {

        var heji = $(".zichan .topshow .heji");

        var li = $(".zichan .topshow td");

        li.each(function (i, em) {
            var $this = $(this);

            var show_money = $this.find(".show_money");

            var show_name = $this.find(".name");

            var ibtn = heji.find("i");
            var spanbox = show_money.find("span");
            var type = parseInt(heji.find(".show_money").attr("data_type"));
            type = isNaN(type) ? 0 : 1;




            if (type == 1) {
                spanbox.html(spanbox.attr("data_num"));
            }
            else {
                spanbox.html(spanbox.attr("data_stars"));
            }


            ibtn.click(function () {

                if (type == 1) {

                    spanbox.text(spanbox.attr("data_stars"));
                }
                else {
                    spanbox.text(spanbox.attr("data_num"));
                }
                type = type == 1 ? 0 : 1;
                heji.find(".show_money").attr("data_type", type);

            });


        });




    })();

    /*****账单明细**************/

    (function () {


        var coset_list_li = $(".coset_list .date_ul li.li1");
        coset_list_li.each(function (i, em) {
            var $this = $(this);
            var li_name = $this.find(".li_name");
            var list = $this.find(".list");
            li_name.click(function () {
                console.log(11);
                list.slideToggle();
            });



        });



    })();

    /******2018.8.9c UI修改************/


    //手机换绑
    (function () {

        var change_mobile = $(".change_mobile");
        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=ChangeMobile";
        changeMobile(change_mobile, url, true);

        change_mobile = $(".comfirm_mobile");
        url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=ComfirmMobile";
        changeMobile(change_mobile, url);


        function changeMobile(obj, url, ajaxcheck) {

            var change_mobile = $(obj);
            var phone = change_mobile.find(".phone");
            var yzcodebtn = change_mobile.find(".weui-vcode-btn");
            var yzcode = change_mobile.find(".yzcode");
            var _phone;
            var btn = change_mobile.find(".weui-btn_escc_default");

            var txtImgCode = change_mobile.find("#txtImgCode");
            var txtImgCode_box = change_mobile.find(".txtImgCode_box");


            yzcodebtn.click(function () {
                var $this = $(this);
                _phone = phone.val();
                if (!Validate.Isphone(_phone)) {
                    weui.alert("手机号不正确！");
                    return;
                }
                if (ajaxcheck) {

                    //动态验证手机是否可用
                    var _url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=AjaxCheckMobile"
                    $.post(_url, { mobile: _phone, type: 2 }, function (data) {
                        var jsondata = JSON.parse(data);
                        if (jsondata["status"] == 0) {
                            if (jsondata["url"]) {
                                weui.alert(jsondata["msg"], function () {
                                    location.href = jsondata["url"];
                                });
                            } else {
                                weui.alert(jsondata["msg"]);
                            }

                            var imag_a = txtImgCode_box.find("a");
                            ToggleCode(imag_a, "http://" + window.location.host + '/tools/verify_code.ashx');


                        } else {
                            var sendurl = "http://" + window.location.host + "/";
                            sendSMSByImgCode($this, phone, txtImgCode_box, sendurl, "", "base_change_mobile");
                        }
                    });


                } else {
                    var sendurl = "http://" + window.location.host + "/";

                    sendSMSByImgCode($this, phone, txtImgCode_box, sendurl, "in", "base_change_mobile");
                }


            });


            btn.click(function () {
                var code = yzcode.val();
                if (!code) {
                    weui.alert("请输入手机验证码！");
                    return;
                }
                if (_phone != phone.val()) {
                    weui.alert("手机号改变，请重新验证！");
                    return;
                }

                var pamers = { yzcode: code, mobile: _phone };
                $.post(url, pamers, function (data) {

                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {

                        weui.alert(jsondata["msg"], function () {
                            if (jsondata["url"]) {
                                location.href = jsondata["url"];
                            }
                        });

                    } else {
                        weui.alert(jsondata["msg"], function () {
                            if (jsondata["url"]) {
                                location.href = jsondata["url"];
                            } else {
                                location.href = "usercenter.aspx?action=index";
                            }
                        });
                    }


                });




            });
        }

    })();


    //邮箱换绑
    (function () {

        var change_mobile = $(".change_email");
        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=EmailEdit";
        changeEmail(change_mobile, url, true);
        change_mobile = $(".comfirm_email");
        url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=ComfirmEmail";
        changeEmail(change_mobile, url);

        function changeEmail(obj, url, ajaxcheck) {

            var phone = change_mobile.find(".email");
            var yzcodebtn = change_mobile.find(".weui-vcode-btn");
            var yzcode = change_mobile.find(".yzcode");
            var _phone;
            var btn = change_mobile.find(".weui-btn_escc_default");

            var txtImgCode = change_mobile.find("#txtImgCode");
            var txtImgCode_box = change_mobile.find(".txtImgCode_box");
            yzcodebtn.click(function () {
                _phone = phone.val();
                if (!Validate.IsEmail(_phone)) {
                    weui.alert("邮箱不正确！");
                    return;
                }
                if (ajaxcheck) {

                    //动态验证邮箱是否可用
                    var _url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=AjaxCheckEmail"
                    $.post(_url, { email: _phone }, function (data) {
                        var jsondata = JSON.parse(data);
                        if (jsondata["status"] == 0) {

                            if (jsondata["url"]) {
                                weui.alert(jsondata["msg"], function () {
                                    location.href = jsondata["url"];
                                });
                            } else {
                                weui.alert(jsondata["msg"]);
                            }
                            var imag_a = txtImgCode_box.find("a");
                            ToggleCode(imag_a, "http://" + window.location.host + '/tools/verify_code.ashx');


                        } else {
                            SendEmalCode($(this), phone, txtImgCode_box);
                        }
                    });


                } else {
                    SendEmalCode($(this), phone, txtImgCode_box);
                }


            });


            btn.click(function () {
                var code = yzcode.val();
                if (!code) {
                    weui.alert("请输入邮箱验证码！");
                    return;
                }
                if (_phone != phone.val()) {
                    weui.alert("邮箱改变，请重新验证！");
                    return;
                }

                var pamers = { yzcode: code, email: _phone };
                $.post(url, pamers, function (data) {

                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {

                        weui.alert(jsondata["msg"], function () {
                            if (jsondata["url"]) {
                                location.href = jsondata["url"];
                            }
                        });

                    } else {
                        weui.alert(jsondata["msg"], function () {
                            if (jsondata["url"]) {
                                location.href = jsondata["url"];
                            } else {
                                location.href = "usercenter.aspx?action=index";
                            }
                        });
                    }


                });




            });
        }

    })();


    //付款方式
    (function () {

        var webcode_bdialog = $("#webcode_bdialog");
        var paylist = $(".paylist");
        var paytype = parseInt(paylist.attr("data_paytype"));
        paytype = isNaN(paytype) ? 0 : paytype;
        var bank = paylist.find(".pay_bank");
        var alipay = paylist.find(".pay_alipay");
        var webcat = paylist.find(".pay_webcat");
        var all_i = paylist.find(".pay .selectbox i");
        var copy_a = paylist.find(".pay .td3 a");
        var webcode_alipay = paylist.find(".pay_alipay .webcode");
        var webcode_webcat = paylist.find(".pay_webcat .webcode");
        var bs = navigator.userAgent.toLowerCase();
        if (bs == "ios_csf") {
            copy_a.hide(0);
        }

        switch (paytype) {
            case 1:
                selectbox(bank.find(".selectbox  i"));
                break;
            case 2:
                selectbox(alipay.find(".selectbox  i"));
                break;
            case 3:
                selectbox(webcat.find(".selectbox  i"));
                break;
            default:
                break;
        }

        all_i.click(function () {
            var $this = $(this);
            selectbox($this);
            var parent = $this.parents(".pay");
            if (parent.hasClass("pay_bank")) {
                paytype = 1;
            }
            else if (parent.hasClass("pay_alipay")) {
                paytype = 2;
            } else if (parent.hasClass("pay_webcat")) {
                paytype = 3;
            }
            var id = getQueryString("id");
            id = parseInt(id);
            id = isNaN(id) ? 0 : id;
            if (id <= 0) {
                weui.alert("参数错误，返回重试！");
                return;
            }
            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=Updatec2cPayType";
            $.post(url,
                { id: id, paytype: paytype },
                function (data) {
                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {
                        weui.alert(jsondata["msg"]);
                    } else {
                        window.location.href = document.referrer;
                    }
                });



        });

        copy_a.click(function () {
            var $this = $(this);
            var str = $this.attr("data_for");
            copyText(str);
            return false;
        });

        function selectbox(obj) {

            all_i.removeClass("checked");
            obj.addClass("checked");

        }
        function copyText(str) {

            var txtObj = document.getElementById(str);

            if (window.clipboardData) { // 仅IE支持此对象，firefox、chrome不支持 
                //  1、通过clipboardData对象实现复制 
                window.clipboardData.clearData();
                window.clipboardData.setData("Text", txtObj.value);
            }
            else {
                txtObj.select(); // 选中文本
                document.execCommand("copy"); // 执行浏览器复制命令

            }

            weui.alert("复制成功");
        }


        webcode_alipay.click(function () {
            var $this = $(this);
            var src = $this.attr("data_path");
            webcode_bdialog.find(".weui-dialog__bd img").attr("src", src);
            var json = "{ \"type\": \"appewm\",\"url\":\"" + src + "\"}";
            webcode_bdialog.find(".weui-dialog__bd img").click(function (e) {
                send_clien_new(json);


            });
            webcode_bdialog.fadeIn();

        });
        webcode_webcat.click(function () {

            var $this = $(this);
            var src = $this.attr("data_path");

            webcode_bdialog.find(".weui-dialog__bd img").attr("src", src);
            var json = "{ \"type\": \"appewm\",\"url\":\"" + src + "\"}";
            webcode_bdialog.find(".weui-dialog__bd img").click(function () {
                send_clien_new(json);
                // console.log(json);

            });
            webcode_bdialog.fadeIn();

        });
        webcode_bdialog.find(".weui-mask").click(function () {
            webcode_bdialog.fadeOut();

        });


    })();



    /***确认支付，输入支付密码页面**/

    function PayDialog() {

    };

    PayDialog.prototype.ftnc2c = function (infoid, state) {
        PayDialog.prototype.BindClick(state);
        PayDialog.prototype.infoid = infoid;
        PayDialog.prototype.state = state;
        PayDialog.prototype.DialogPostUp(PayDialog.prototype.postbtn, state);

    };
    PayDialog.prototype.ftnIcon = function (postdata, typecode, getnumobj, tipsjson) {
        //  var tipsjson = {usd:0.01,escc:0.1};
        // var postdata = { outorin: _outorin, MoneyTypeId: _MoneyTypeId, price: _price, num: _num, spassword: _spassword, yzcode: code };

        //替换
        var outtrade = 6.5;
        var intrade = 6.5;
        if (postdata.outorin == 0) {
            PayDialog.prototype.TitleReplace("ESCC", (postdata.num * (1 + tipsjson.escc)).GetCutPoint(2));
            PayDialog.prototype.TipsReplace("ESCC", (100 * tipsjson.escc).toFixed(0) + "%");

        }
        else {

            if (postdata.usdt) {
                var _total = postdata.price * postdata.num / intrade;
                PayDialog.prototype.TitleReplace("USDT", (_total * (1 + tipsjson.usd)).GetCutPoint(2));
                //PayDialog.prototype.TipsReplace("USD", (_total * tipsjson.usd).toFixed(2));
                PayDialog.prototype.TipsReplace("USDT", (100 * tipsjson.usd).toFixed(0) + "%");
            } else {

                var _total = postdata.price * postdata.num / intrade;
                PayDialog.prototype.TitleReplace("USD", (_total * (1 + tipsjson.usd)).GetCutPoint(2));
                //PayDialog.prototype.TipsReplace("USD", (_total * tipsjson.usd).GetCutPoint(2));
                PayDialog.prototype.TipsReplace("USD", (100 * tipsjson.usd).toFixed(0) + "%");
            }
        }

        PayDialog.prototype.IconBindClick(postdata, typecode, getnumobj);
        PayDialog.prototype.IconShow();



    };



    PayDialog.prototype.dialog = $(".paydialog");
    PayDialog.prototype.infoid = "";
    PayDialog.prototype.state = 0;

    PayDialog.prototype.closedbtn = PayDialog.prototype.dialog.find(".closed");
    PayDialog.prototype.shadowbox = PayDialog.prototype.dialog.find(".shadowbox");
    PayDialog.prototype.title = PayDialog.prototype.dialog.find(".title");
    PayDialog.prototype.titleClone = PayDialog.prototype.title.clone(true);
    PayDialog.prototype.tips = PayDialog.prototype.dialog.find(".tips");
    PayDialog.prototype.tipsClone = PayDialog.prototype.tips.clone(true);
    PayDialog.prototype.spassword = PayDialog.prototype.dialog.find("#spassword");
    PayDialog.prototype.picture = PayDialog.prototype.dialog.find(".picture");//图形验证码接收input
    PayDialog.prototype.msg_box = PayDialog.prototype.dialog.find(".msg_code");//图形验证码组 
    PayDialog.prototype.msg_box_a = PayDialog.prototype.dialog.find(".msg_code .td3 a");//图形验证码组 
    PayDialog.prototype.pic_code = PayDialog.prototype.dialog.find(".checkbox .pic_code");//手机短信验证码组 

    PayDialog.prototype.phone = PayDialog.prototype.dialog.find(".checkbox .pic_code .phone");//图形验证码组 
    PayDialog.prototype.mobile = PayDialog.prototype.dialog.find(".checkbox .pic_code .mobile");
    PayDialog.prototype.codeBtn = PayDialog.prototype.dialog.find(".checkbox .pic_code .codeBtn");
    PayDialog.prototype.postbtn = PayDialog.prototype.dialog.find(".ok_box button");


    //替换数字
    /*替换title*/
    /*替换手续费*/
    PayDialog.prototype.TitleReplace = function (name, num) {

        var text = PayDialog.prototype.titleClone.text();
        text = text.replace("money_name", name)
                   .replace("num", num);
        PayDialog.prototype.title.text(text);
        return this;
    };

    PayDialog.prototype.TipsReplace = function (name, num) {
        var text = PayDialog.prototype.tipsClone.text();

        text = text.replace("money_name", name)
                   .replace("tips", num);
        PayDialog.prototype.tips.text(text);
        return this;
    };
    PayDialog.prototype.Reset = function () {
        this.msg_box_a.trigger("click");
        this.picture.val("");
        this.mobile.val("");
        this.spassword.val("");

    };

    //显示
    /*icon显示*/
    /*c2c显示*/
    PayDialog.prototype.C2CShow = function () {
        PayDialog.prototype.tips.hide();
        PayDialog.prototype.Show();
    };
    PayDialog.prototype.IconShow = function () {
        PayDialog.prototype.tips.show();
        PayDialog.prototype.Show();
    };

    PayDialog.prototype.Show = function () {
        PayDialog.prototype.dialog.show();
    };

    //关闭
    PayDialog.prototype.Close = function () {
        PayDialog.prototype.dialog.hide();
    };


    //绑定事件，上传数据和发送验证码
    PayDialog.prototype.BindClick = function (state) {

        PayDialog.prototype.closedbtn.click(function () {
            PayDialog.prototype.Close();
        });
        PayDialog.prototype.codeBtn.click(function () {

            var _phone = PayDialog.prototype.phone.val();
            if (!Validate.Isphone(_phone)) {
                PayDialog.prototype.Close();
                weui.toast('手机号不正确', function () {
                    PayDialog.prototype.Show();
                });
                return;
            }
            var sendurl = "http://" + window.location.host + "/";
            var typecode = "base_buy_usd";
            if (state == 1) {
                //确认支付
                typecode = "base_buy_usd";
            } else if (state == 3) {
                //确认付款
                typecode = "base_sold_usd";
            }

            sendSMSByImgCodeNotime($(this), PayDialog.prototype.phone,
                PayDialog.prototype.msg_box, sendurl, "in", typecode);

        });


    };
    //绑定事件，上传数据和发送验证码
    PayDialog.prototype.IconBindClick = function (postdata, typecode, getnumobj) {

        PayDialog.prototype.closedbtn.click(function () {
            PayDialog.prototype.Close();
        });
        //隐藏图形验证和手机验证
        //PayDialog.prototype.pic_code.hide();
        PayDialog.prototype.msg_box.hide();

        PayDialog.prototype.codeBtn.click(function () {

            var _phone = PayDialog.prototype.phone.val();
            if (!Validate.Isphone(_phone)) {
                PayDialog.prototype.Close();
                weui.toast('手机号不正确', function () {
                    PayDialog.prototype.Show();
                });
                return;
            }
            var sendurl = "http://" + window.location.host + "/";
            sendSMSByImgCodeNotime($(this), PayDialog.prototype.phone,
                PayDialog.prototype.msg_box, sendurl, "in", typecode, getnumobj);

        });

        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=GetIconC2C";
        PayDialog.prototype.postbtn.click(function () {
            // var postdata = { outorin: _outorin, MoneyTypeId: _MoneyTypeId, price: _price, num: _num, spassword: _spassword, yzcode: code };

            var _msgcode = PayDialog.prototype.mobile.val();
            var _spasswrod = PayDialog.prototype.spassword.val();
            //if (!_msgcode) {
            //    PayDialog.prototype.Close();
            //    weui.toast('请输入短信验证码！', function () {

            //        PayDialog.prototype.Show();
            //    });
            //    return;
            //}

            //if (!_spasswrod) {
            //    PayDialog.prototype.Close();
            //    weui.toast('请输入支付密码！', function () {

            //        PayDialog.prototype.Show();
            //    });
            //    return;
            //}

            postdata.spassword = _spasswrod;
            postdata.yzcode = _msgcode;


            $.post(url, postdata, function (data) {


                var jsondata = JSON.parse(data);
                if (jsondata["status"] == 0) {
                    weui.alert(jsondata["msg"]);
                } else {
                    weui.alert(jsondata["msg"], function () {
                        send_msg_log();
                        location.href = "userIconPage.aspx?action=icontrade_orders";
                    });
                }

                //调用通知短信
                //setTimeout(send_msg_log, 1000);


            });


        });



    };
    //确认支付和确认订单； 更新c2c状态
    PayDialog.prototype.DialogPostUp = function (obj, state) {
        var _this = this;
        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=UpdateDealC2CState";
        var pamers = { infoid: "", state: "", msgcode: "", spassword: "" };
        obj.click(function () {
            var _msgcode = PayDialog.prototype.mobile.val();
            var _spasswrod = PayDialog.prototype.spassword.val();
            //if (!_msgcode) {
            //    PayDialog.prototype.Close();
            //    weui.toast('请输入短信验证码！', function () {

            //        PayDialog.prototype.Show();
            //    });
            //    return;
            //}

            if (state == 3 && !_spasswrod) {
                PayDialog.prototype.Close();
                weui.toast('请输入支付密码！', function () {

                    PayDialog.prototype.Show();
                });
                return;
            }
            var $this = $(this);
            pamers.infoid = _this.infoid;
            pamers.state = state;
            pamers.msgcode = _msgcode;
            pamers.spassword = _spasswrod;
            $.post(url, pamers, function (data) {
                var jsondata = JSON.parse(data);
                if (jsondata["status"] == 0) {
                    if (jsondata["url"]) {
                        weui.alert(jsondata["msg"], function () {
                            location.href = jsondata["url"];
                        });
                    } else {
                        weui.alert(jsondata["msg"]);
                    }
                    _this.Reset();
                } else {
                    weui.alert(jsondata["msg"], function () {
                        if (state == 3) {
                            location.href = "userC2CPage.aspx?action=userc2c_old_orders";
                        } else {
                            location.reload();
                        }
                    });
                }



            });




        });

    };




    /***确认支付，输入支付密码页面**/
    /****我的资产提示框*****/
    (function () {
        var out = $(" .zichan .moneybox .links .out");
        out.click(function () {
            weui.alert("该功能暂未开放。");
            return false;
        });
    })();

    /****我的资产提示框*****/

    //首次登陆 完成推荐人，手机或者邮箱，手机和邮箱
    (function () {
        var proinfo_box = $(".proinfo_box");
        var tjr = proinfo_box.find("#txtTjr");
        var img_box = proinfo_box.find(".img_box");

        var mobile = proinfo_box.find("#mobile");
        var mobilecode = proinfo_box.find(".mobilecode");
        var mobilecodebtn = proinfo_box.find(".mobilecodebtn");

        var email = proinfo_box.find("#email");
        var emailcode = proinfo_box.find(".emailcode");
        var emailcodebtn = proinfo_box.find(".emailcodebtn");
        var _mobile = null, _email = null;
        var btnSubmit = proinfo_box.find("#btnSubmit");
        mobilecodebtn.click(function () {
            var $this = $(this);
            _mobile = mobile.val();
            if (!_mobile || !Validate.Isphone(_mobile)) {
                weui.alert("请输入正确的手机号！");
                return;
            }
            alert('xhccl');
            var sendurl = "http://" + window.location.host + "/";
            sendSMSByImgCode($this, mobile, img_box, sendurl, "in");


        });
        emailcodebtn.click(function () {
            var $this = $(this);
            _email = email.val();
            if (!_email || !Validate.IsEmail(_email)) {
                weui.alert("请输入正确的邮箱地址！");
                return;
            }
            SendEmalCode($(this), email, img_box);

        });

        btnSubmit.click(function () {

            var $this = $(this);
            var uptype = $this.attr("data_uptype");//1:手机和邮箱都要验证2：手机验证，3：邮箱验证
            var now_mobile = null,
                now_email = null;
            var _tjr = tjr.val();
            var _mobilecode = mobilecode.val();
            var _emailcode = emailcode.val();

            now_mobile = mobile.val();
            now_email = email.val();

            if (!_tjr) {
                weui.alert("请输入推荐人！");
                return;
            }
            switch (uptype) {
                case 1:
                    if (!now_mobile) {
                        weui.alert("请输入手机号！");
                        return;
                    }
                    if (now_mobile != _mobile) {
                        weui.alert("手机号已更改，请重新发送验证码！");
                        return;
                    }
                    if (!_mobilecode) {
                        weui.alert("请输入手机验证码！");
                        return;
                    }
                    if (!now_email) {
                        weui.alert("请输入邮箱地址！");
                        return;
                    }
                    if (now_email != _mobile) {
                        weui.alert("邮箱已更改，请重新发送验证码！");
                        return;
                    }
                    if (!_emailcode) {
                        weui.alert("请输入邮箱验证码！");
                        return;
                    }

                    break;
                case 2:
                    if (!now_mobile) {
                        weui.alert("请输入手机号！");
                        return;
                    }
                    if (now_mobile != _mobile) {
                        weui.alert("手机号已更改，请重新发送验证码！");
                        return;
                    }
                    if (!_mobilecode) {
                        weui.alert("请输入手机验证码！");
                        return;
                    }
                    break;
                case 3:
                    if (!now_email) {
                        weui.alert("请输入邮箱地址！");
                        return;
                    }
                    if (now_email != _mobile) {
                        weui.alert("邮箱已更改，请重新发送验证码！");
                        return;
                    }
                    if (!_emailcode) {
                        weui.alert("请输入邮箱验证码！");
                        return;
                    }
                    break;

            }

            var param = {
                txtTjr: _tjr,
                phone: _mobile,
                email: _email,
                mobilecode: _mobilecode,
                emailcode: _emailcode
            };
            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=user_info_edit_tjr";
            $.post(url, param, function (data) {
                var jsondata = JSON.parse(data);
                if (jsondata["status"] == 0) {
                    weui.alert(jsondata["msg"]);
                } else {
                    weui.alert(jsondata["msg"], function () {
                        location.href = "usercenter.aspx?action=index";
                    });
                }

            });





        });




    })();




    /*获取当天的最高价，最低价，涨幅*/

    (function () {

        var kline_box = $(".kline_box");
        var time_link = kline_box.find(".time_links a");
        var up_down_box = kline_box.find(".k_time_box .td2 i");
        var time_link_box = kline_box.find(".time_links");
        time_link.eq(0).addClass("on");
        time_link.click(function () {
            var $this = $(this);
            if (!$this.hasClass("on")) {
                $this.addClass("on").siblings().removeClass("on");
            }
            kline2('kline_body', $this.index() + 1);
            return false;
        });
        var state = 0;
        up_down_box.click(function () {
            var $this = $(this);
            if (state == 0) {
                time_link_box.animate({
                    height: "80px"
                });
                $this.addClass("up");
                state = 1;

            } else {
                time_link_box.animate({
                    height: "36px"
                });
                $this.removeClass("up");
                state = 0;
            }



        });


        /*动态更新幅度和 最高价最低价*/
        var hprice = kline_box.find(".hprice");
        var k_fudu = kline_box.find(".fudu");
        var lprice = kline_box.find(".lprice");
        var daynum = kline_box.find(".daynum");
        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=GetCurrentKlinData";
        function updateprice() {
            $.get(url, function (data) {
                //context.Response.Write("{\"status\": 1, \"msg\": \"获取数据成功！\",\"list\":[" + hprice + "," + lprice + "," + fudu + "]}");
                data = JSON.parse(data);
                var fudu = data.list[2];
                fudu = parseFloat(fudu);
                if (fudu > 0) {
                    fudu = "+" + fudu.toFixed(5);
                }
                fudu += "%";
                hprice.text(data.list[0].toFixed(5));
                lprice.text(data.list[1].toFixed(5));
                k_fudu.text(fudu);
                daynum.text(data.list[3].toFixed(5));


            });



        }
        updateprice();
        setInterval(updateprice, 60000);
    })();



    /***用户完善资料页面*************/

    (function () {

        var userinfo = $(".userinfo_box .fixinfo2");
        var tjr = userinfo.find("#txtTjr");
        var txtNickName = userinfo.find("#txtNickName");
        var img_box = userinfo.find(".img_box");
        var mobile = userinfo.find("#mobile");
        var mobilecode = userinfo.find(".mobilecode");
        var mobilecodebtn = userinfo.find(".mobilecodebtn");
        var txtSPassWord = userinfo.find("#txtSPassWord");
        var txtSPassWord2 = userinfo.find("#txtSPassWord2");
        var btnSubmit = userinfo.find("#btnSubmit");
        var params = {
            txtNickName: "",
            txtSPassWord: "",
            txtSPassWord2: "",
            txtTjr: "",
            phone: "",
            mobilecode: ""
        };
        var _mobile = null;
        if (mobile.length > 0) {
            mobilecodebtn.click(function () {

                var $this = $(this);
                _mobile = mobile.val();
                if (!_mobile || !Validate.Isphone(_mobile)) {
                    weui.alert("请输入正确的手机号！");
                    return;
                }

                //动态验证手机是否可用
                var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=AjaxCheckMobile"
                $.post(url, { mobile: _mobile, type: 1 }, function (data) {
                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {
                        if (jsondata["url"]) {
                            weui.alert(jsondata["msg"], function () {
                                location.href = jsondata["url"];
                            });
                        } else {
                            weui.alert(jsondata["msg"]);
                        }

                    } else {
                        var sendurl = "http://" + window.location.host + "/";
                        sendSMSByImgCode($this, mobile, img_box, sendurl, "", "base_sms_code");
                    }
                });



            });
        }
        tjr.blur(function () {
            var $this = $(this);
            var username = $this.val();
            if (!username) {
                weui.alert("请输入正确的推荐人信息！");
            }
            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=CheckReferee"
            $.post(url, { referee: username }, function (data) {
                var jsondata = JSON.parse(data);
                if (jsondata["status"] == 0) {
                    weui.alert(jsondata["msg"]);
                }


            });




        });


        btnSubmit.click(function () {
            var $this = $(this);
            var _txtNickName = "";
            if (txtNickName) {
                _txtNickName = txtNickName.val();
            }

            var _txtSPassWord = txtSPassWord.val();
            var _txtSPassWord2 = txtSPassWord2.val();
            var _phone = "";
            var _mobilecode = "";
            var _tjr = "";
            if (tjr.length > 0) {
                _tjr = tjr.val();
            }

            if (tjr.length > 0 && !_tjr) {
                weui.alert("请输入推荐人！");
                return;
            }
            if (mobile.length > 0) {
                _phone = mobile.val();
                _mobilecode = mobilecode.val();
                if (!_phone || !Validate.Isphone(_phone)) {
                    weui.alert("请输入正确的手机号！");
                    return;
                }
                if (_phone != _mobile) {
                    weui.alert("手机号已修改，请重新发送验证码？");
                    return;
                }
            }
            if (!_txtSPassWord) {
                weui.alert("请输入支付密码！");
                return;
            }
            if (_txtSPassWord != _txtSPassWord2) {
                weui.alert("两次输入的支付密码不一致！");
                return;
            }


            params.txtTjr = _tjr;
            params.phone = _phone;

            params.txtNickName = _txtNickName;
            params.txtSPassWord = _txtSPassWord;
            params.txtSPassWord2 = _txtSPassWord2;
            params.mobilecode = _mobilecode;
            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=user_info_edit_rzt";
            $.post(url, params, function (data) {
                var jsondata = JSON.parse(data);
                if (jsondata["status"] == 0) {
                    weui.alert(jsondata["msg"]);
                } else {

                    location.reload();

                }
            });




        });



    })();

    /***用户完善资料页面*************/


    /****昵称编辑*****************/

    (function () {
        var nickname_edit = $(".nickname_edit");
        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=NickNameEdit";
        var nickname = nickname_edit.find(".nickname");
        var btn = nickname_edit.find(".weui-btn_escc_default");
        btn.click(function () {
            var _nickname = nickname.val();
            if (!_nickname) {
                weui.alert("请输入昵称！");
                return;
            }
            $.post(url, { nickname: _nickname }, function (data) {

                var jsondata = JSON.parse(data);
                if (jsondata["status"] == 0) {
                    weui.alert(jsondata["msg"]);
                } else {
                    weui.alert(jsondata["msg"], function () {
                        location.href = document.referrer;
                    });
                }



            });



        });

    })();



    /****昵称编辑*****************/


    /*****新闻动态加载***************/
    (function () {


        var pageindex = 2; var len = 3;
        var orderlist = $(".newslist .txt-list");
        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=NewscLoadmore";
        orderlist.each(function (index, em) {
            var $this = $(this);

            var category_id = parseInt($this.attr("data_articaleid"));

            var pagesize = parseFloat($this.attr("data_pagesize"));
            len = pagesize;
            var loadmore = $this.find(".loadmore");
            var ul = $this.find("ul");
            if (ul.find("li").length < len) {
                loadmore.hide();
                return;
            }
            var liclone = ul.find("li").eq(0).clone(true);

            loadmore.click(function () {

                $.get(url, { pageindex: pageindex, len: len, articleid: category_id }, function (data) {
                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 1) {

                        var newhtml = $("<ul></ul>");
                        if (jsondata.list.length <= 0) {
                            weui.toast("已没有数据了！", function () {
                                loadmore.hide();

                                $(window).unbind("scroll");

                            });

                            return;
                        }
                        jsondata.list.forEach(function (value, _index, arr) {

                            var _liclone = liclone.clone(true);
                            /*内容替换*/
                            _liclone.find("a").attr("href", "news_show.aspx?id=" + value.id + "");
                            if (value.img_url != "") {
                                var img = _liclone.find("a img");
                                if (!img) {
                                    img = $("<img />");
                                    img.attr("src", value.img_url);
                                    _liclone.find(".title").before(img);
                                }
                                img.attr("src", value.img_url);
                            }
                            _liclone.find(".title").text(value.title);
                            var _p = _liclone.find(".note p");
                            _p.eq(0).text(value.zhaiyao);
                            //click
                            _p.eq(1).find(".hot").text(value.click + "次");
                            _p.eq(1).find(".date").text("时间：" + value.add_time);

                            /*内容替换*/
                            newhtml.append(_liclone);
                            _liclone = null;

                        });

                        ul.append(newhtml.html());
                        newhtml = null;

                    }
                    pageindex++;

                });




            });

            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
                if (scrollTop + windowHeight == scrollHeight) {

                    loadmore.trigger("click");


                }
            });


        });

    })();
    /*****新闻动态加载***************/


    /*****节点动态加载***************/
    (function () {

        var pageindex = 2; var len = 15;
        var orderlist = $(".jiedian");
        var name = "";
        function teamalert() {
            $(".jiedian tr .team i").unbind("click");
            $(".jiedian tr .team i").click(function () {
                var $this = $(this);
                var parent = $this.parent();
                var data = parent.attr("data_team");
                weui.alert("团队总量：" + data);


            });

            $(".jiedian tr .username").unbind("click");
            $(".jiedian tr .username").click(function () {
                var $this = $(this);
                var title_tips = $(".title_tips");
                var username = $this.attr("data-name");
                if (name == username && !title_tips.is(":hidden")) {
                    title_tips.hide();

                } else {

                    title_tips.css({
                        top: $this.offset().top,
                        left: $this.offset().left + $this.width() + 5
                    });
                    title_tips.text(username).show();
                    $this.attr("data-clicked", 1)
                    name = username;
                }

            })
        }
        teamalert();

        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=JiedianLoadmore";
        orderlist.each(function (index, em) {
            var $this = $(this);

            var loadmore = $this.find(".loadmore");
            var table = $this.find("table");
            var tr = table.find(" tr");

            if (tr.length - 1 < len) {
                loadmore.hide();
                return;
            }
            var liclone = tr.eq(1).clone(true);

            loadmore.click(function () {

                $.get(url, { pageindex: pageindex, len: len }, function (data) {
                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 1) {

                        var newhtml = $("<table></table>");
                        if (jsondata.list.length <= 0) {
                            weui.toast("已没有数据了！", function () {
                                loadmore.hide();

                                $(window).unbind("scroll");

                            });
                            return;
                        }




                        //alert(data);
                        jsondata.list.forEach(function (value1, _index, arr) {

                            var _liclone = liclone.clone(true);

                            /*内容替换*/
                            var td = _liclone.find("td");
                            //alert(td.length);
                            if (value1.userid.length != 11) {
                                td.eq(0).find("span.username").text(GetStartformString(value1.userid));
                            } else {
                                td.eq(0).find("span.username").text(value1.userid);
                            }

                            td.eq(0).find("span.username").attr("data-name", value1.userid);
                            td.eq(1).text(value1.grouptitle);
                            td.eq(2).find("span").text(parseFloat(value1.bussions).toFixed(5));
                            td.eq(2).attr("data_team", value1.td_money);
                            td.eq(3).text(value1.reg_time);

                            /*内容替换*/

                            newhtml.append(_liclone);
                            _liclone = null;

                        });

                        table.append(newhtml.html());
                        newhtml = null;


                        teamalert();
                    }
                    pageindex++;

                });




            });

            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
                if (scrollTop + windowHeight == scrollHeight) {

                    loadmore.trigger("click");


                }
            });


        });



    })();
    /*****节点动态加载***************/






    /******我要申诉提交*****************/

    (function () {
        var url = "http://" + window.location.host + "/tools/upload_ajax.ashx?action=headpicUpload";
        var complainbox = $(".complainbox");
        complainbox.each(function (i, e) {

            var $this = $(this);
            var notes = $this.find(".textarea1");
            var img = $this.find(".filepath .uploadbox img");
            var btn = $this.find(".btn button");
            var sorderid = $this.attr("data_sorderid");
            if (!sorderid) {
                weui.alert("对不起，参数错误！", function () {
                    window.history.back();

                });
            }
            var _notes = "";
            notes.blur(function () {
                var _this = $(this);
                _notes = _this.val();
                if (_notes.length > 400) {
                    weui.alert("内容字符数超出限制！");
                }


            });

            var oMyForm = new FormData();
            var path = "";

            var uploaderInput = document.getElementById("uploaderInput1");
            if (uploaderInput) {
                uploaderInput.onchange = function (e) {
                    var files = this.files;
                    var file = files[0];
                    var _src = "";
                    if (file) {

                        if (window.URL.createObjectURL) {
                            _src = window.URL.createObjectURL(file);
                        } else {
                            _src = file.getAsDataURL();
                        }

                        img.attr("src", _src);
                        var oMyForm = new FormData();
                        oMyForm.append("file", file);
                        $.ajax({
                            url: url,
                            type: 'POST',
                            cache: false,
                            data: oMyForm,
                            processData: false,
                            contentType: false,
                            async: false,
                            success: function (data) {
                                var jsondata = JSON.parse(data);
                                if (jsondata["status"] == 0) {
                                    weui.alert(jsondata["msg"], function () {

                                        location.reload();
                                    });
                                } else {
                                    if (jsondata["path"]) {
                                        path = unescape(jsondata["path"]);
                                    }
                                }


                            }
                        })
                    }

                };

            }


            btn.click(function () {

                url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=Complain_logAdd";
                var objdata = {
                    content: notes.val(),
                    sorderid: sorderid,
                    path: path
                };
                $.post(url, objdata, function (data) {

                    var jsondata = JSON.parse(data);
                    if (jsondata["status"] == 0) {
                        weui.alert(jsondata["msg"], function () {
                            location.reload();
                        });
                    } else {
                        weui.alert(jsondata["msg"], function () {
                            location.href = document.referrer;
                        });
                    }



                });



            });




        });


    })();



    /******我要申诉提交*****************/


    /****意见反馈************************/

    (function () {
        var url = "http://" + window.location.host + "/tools/upload_ajax.ashx?action=headpicUpload";
        var advicebox = $(".advicebox");
        var contentbox = advicebox.find(".contentbox");
        var mysend = contentbox.find(".mysend");
        var sendtome = contentbox.find(".sendtome");

        /*提交数据*/
        var msgbox = advicebox.find(".postbox  .sendbox  .message");
        var sendbtn = advicebox.find(".postbox .sendbox  .sendbtn");
        var tupianupload = document.getElementById("tupianupload");

        var pageindex = 1;
        var len = 10;

        //图片上传
        if (tupianupload) {
            tupianupload.onchange = function (e) {
               
                var files = this.files;
                var file = files[0];
                var _src = "";
                if (file) {

                    //if (window.URL.createObjectURL) {
                    //    _src = window.URL.createObjectURL(file);
                    //} else {
                    //    _src = file.getAsDataURL();
                    //}

                    //img.attr("src", _src);
                    var oMyForm = new FormData();
                    oMyForm.append("file", file);
                    $.ajax({
                        url: url,
                        type: 'POST',
                        cache: false,
                        data: oMyForm,
                        processData: false,
                        contentType: false,
                        async: false,
                        success: function (data) {
                            var jsondata = JSON.parse(data);
                            if (jsondata["status"] == 0) {
                                weui.alert(jsondata["msg"], function () {

                                    location.reload();
                                });


                            } else {
                                if (jsondata["path"]) {
                                    var _v = msgbox.val();
                                    var text = _v + "<img src='" + unescape(jsondata["path"]).replace("..","") + "' style='max-height:80px;max-width:80px' />";
                                    
                                    msgbox.val(text);
                                    sendbtn.trigger("click");
                                }
                            }


                        }
                    })



                } else {
                    weui.alert("请上传图片");
                }

            }

        }



        sendbtn.click(function () {
            var _v = msgbox.val();
            msgbox.val("");
            if (!_v) {
                return;
            }
            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=AdviceLogAdd";
            $.post(url, { msg: _v }, function (data) {

                var jsondata = JSON.parse(data);
                if (jsondata["status"] == 0) {
                    weui.alert(jsondata["msg"], function () {
                        // location.reload();
                    });
                } else {
                    //提交成功
                    AjaxData();

                }

            });


        });
        //if (advicebox.length > 0)
        //    AjaxData();

        function AjaxData(len) {
            if (!len) {
                len = 10;
            }
            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=AjaxAdviceLog";
            $.post(url, { len: len, pageindex: 1 }, function (data) {
                var jsondata = JSON.parse(data);
                if (jsondata["status"] == 1) {

                    FillContent(jsondata["list"]);
                    ToBottom();
                }

            });


        }
        function AjaxData2(len) {
            if (!len) {
                len = 10;
            }
            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=AjaxAdviceLog";
            $.post(url, { len: len, pageindex: 1 }, function (data) {
                var jsondata = JSON.parse(data);
                if (jsondata["status"] == 1) {

                    FillContent(jsondata["list"]);

                }

            });


        }

        function FillContent(arr) {

            contentbox.html("");
            var html = $("<div></div>");


            arr.forEach(function (value, index, arr) {

                var _mysend = mysend.clone(true);
                var _sendtome = sendtome.clone(true);
                _mysend.removeAttr("style");
                _sendtome.removeAttr("style");
                if (value.sourceuser) {
                    //我发送的
                    _mysend.find(".message_box").html(value.msg);
                    html.append(_mysend);

                } else {
                    //发给我的

                    _sendtome.find(".message_box").html(value.msg);
                    html.append(_sendtome);


                }



            });

            contentbox.html(html.html());

        }

        function ToBottom() {

            $(window).scrollTop($(document).height() - $(window).height());

            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();

                if (scrollTop <= 0) {
                    pageindex++;
                    AjaxData2(pageindex * 10);

                }

            });

        }




    })();


    /****意见反馈************************/

    /*********全站交易记录************/
    //(function () {








    //    var swiper_containner = $(".quanzhan .swiper-container");
    //    var len = 10;
    //    if (swiper_containner.length > 0) {
    //        //var h = $(window).height() - 130;
    //        if (swiper_containner.find(".swiper-slide").length < len) {
    //            len = swiper_containner.find(".swiper-slide").length;
    //        }

    //        var h = len * 40;
    //        swiper_containner.height(h);


    //        var mySwiper = $('.swiper-container').swiper({
    //            autoplay: 1000,
    //            slidesPerView: len,
    //            mode: 'vertical',
    //            loopedSlides: len,
    //            loop: true
    //            //其他设置
    //        });

    //        var qbox = $(".qbox");
    //        var usd_tips = parseFloat(qbox.attr("data_usd_tips"));
    //        var escc_tips = parseFloat(qbox.attr("data_escc_tips"));
    //        usd_tips = isNaN(usd_tips) ? 0 : usd_tips;
    //        escc_tips = isNaN(escc_tips) ? 0 : escc_tips;

    //        function updateData() {
    //            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=Geticonlist";
    //            $.get(url, function (data) {
    //                var jsondata = JSON.parse(data);
    //                if (jsondata["status"] == 1) {
    //                    var len = mySwiper.slides.length;
    //                    if (len <= 0) {
    //                        return;
    //                    }

    //                    var newSlide = mySwiper.slides[0];
    //                    mySwiper.removeAllSlides(); //移除全部
    //                    var list = jsondata["list"];

    //                    list.forEach(function (values, index, arr) {
    //                        values.outorin = parseInt(values.outorin);
    //                        values.num = parseFloat(values.num);
    //                        values.price = parseFloat(values.price);

    //                        var newSlideClone = newSlide.clone();
    //                        var _newClone = $("<div>" + newSlideClone.html() + "</div>");
    //                        _newClone.find(".t4").text(GetStartformString(values.user_name));

    //                        _newClone.find(".t1").text(values.createtime);

    //                        var _usd = 0; var _cny = 0;
    //                        if (values.outorin == 0) {

    //                            _usd = values.num * values.price / 6.5;
    //                            _cny = values.num * values.price;
    //                        } else {
    //                            _usd = values.num * values.price * (1 + usd_tips) / 6.5;
    //                            _cny = values.num * values.price * (1 + usd_tips);
    //                        }

    //                        _newClone.find(".t2 div").eq(0).text(_usd.toFixed(5) + " USD");
    //                        if (values.outorin == 1) {
    //                            _newClone.find(".t2 div").eq(0).addClass("price").removeClass("blue");

    //                        } else {
    //                            _newClone.find(".t2 div").eq(0).addClass("blue").removeClass("price");
    //                        }
    //                        _newClone.find(".t2 div").eq(1).text("≈" + (_cny * 6.5).toFixed(5) + " ");

    //                        _newClone.find(".t3").text(values.num.toFixed(5));
    //                        newSlideClone.html(_newClone.html());

    //                        newSlideClone.append();
    //                    });



    //                }


    //            });


    //        }


    //        setInterval(updateData, 60000);

    //    }
    //})();


    /*********全站交易记录************/




    /******俱乐部申请资质资料提交**********/
   /* (function () {

        var club_applay = $(".club_applay");
        if (club_applay.length <= 0) {
            return;
        }
        club_applay.each(function (i, e) {
            var $this = $(this);
            var btn = $this.find(".weui-btn_escc_default");
            var mobile = $this.find(".mobile");
            mobile.blur(function () {
                var _that = $(this);
                var _v = _that.val();
                if (!Validate.Isphone(_v)) {
                    weui.alert("请输入正确的手机号！");

                }


            });

            var postdata = {
                username: "",
                mobile: "",
                area: "",
                address: "",
                isshop: "",
                teamnum: "",
                hasoffice: "",
                isspeech: "",
                ispersonover: "",
                isteamover: ""

            };
            var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=ClubApplayPost";
            btn.click(function () {

                postdata.username = $this.find(".username").val();
                postdata.mobile = mobile.val();
                postdata.area = $this.find(".area").val();
                postdata.address = $this.find(".address").val();
                postdata.teamnum = $this.find(".teamnum").val();

                postdata.isshop = $this.find(".isshop").is(":checked") ? 1 : 2;
                postdata.hasoffice = $this.find(".hasoffice").is(":checked") ? 1 : 2;
                postdata.isspeech = $this.find(".isspeech").is(":checked") ? 1 : 2;
                postdata.ispersonover = $this.find(".ispersonover").is(":checked") ? 1 : 2;
                postdata.isteamover = $this.find(".isteamover").is(":checked") ? 1 : 2;
                //  console.log(postdata);
                if (postdata.username.length <= 0) {
                    weui.alert("请填写姓名！");
                    return;
                }
                else if (!Validate.Isphone(postdata.mobile)) {
                    weui.alert("请输入正确的手机号！");
                    return;
                }
                else if (postdata.area.length <= 0) {
                    weui.alert("请输入所在区域！");
                    return;
                }
                else if (postdata.address.length <= 0) {
                    weui.alert("请输入办公地址！");
                    return;
                }

                $.post(url, postdata, function (data) {
                    var jsondata = JSON.parse(data);
                    weui.alert(jsondata.msg, function () {

                        if (jsondata["status"] == 1) {

                            location.href = "usercenter.aspx?action=index";
                        }
                        else {
                            location.reload();
                        }
                    });
                });


            });



        });



    })();
    */
    /******俱乐部申请资质资料提交**********/


    /******极光推送ajax加载********************/

    String.prototype.PadLeft = function (len, charStr) {
        var s = this + '';
        if (s.length >= len) {
            return s;
        }
        return new Array(len - s.length + 1).join(charStr, '') + s;
    };
    String.prototype.PadRight = function (len, charStr) {
        var s = this + '';
        if (s.length >= len) {
            return s;
        }
        return s + new Array(len - s.length + 1).join(charStr, '');
    };




    (function () {

        var url = "http://" + window.location.host + "/tools/submit_ajax.ashx?action=JiguangAjax";
        var len = 10;
        var page = 2;
        var userjiguang = $(".userjiguang");
        console.log(userjiguang.length);
        if (userjiguang.length <= 0) {
            return;
        }
        userjiguang.each(function (i, e) {
            send_msg_log();
            var $this = $(this);
            var listbox = $this.find(".list_box");
            var li = $this.find(".list_box li");
            var loading = $this.find(".loading");
            if (li.length < len) {
                loading.hide(0);
            }
            loading.click(function () {


                var html = $("<ul></ul>");
                $.post(url, { pagesize: len, page: page },
                    function (data) {
                        var jsondata = JSON.parse(data);
                        if (jsondata.status == 1) {
                            var list = jsondata.list;

                            if (list.length <= 0) {
                                weui.toast("没有数据了");
                                loading.hide();
                                return;
                            }

                            list.forEach(function (values, index, arr) {
                                var li_copy = li.eq(0).clone(true);
                                li_copy.find("a").attr("href", "userjiguang_show.aspx?id=" + values.id);
                                li_copy.find(".title").text(values.title);
                                var date = new Date(parseInt(values.addtime.match(/\d+/)[0]));


                                li_copy.find(".date").text(date.getFullYear().toString().PadLeft(4, '0')
                                    + "-" + date.getMonth().toString().PadLeft(2, '0')
                                    + "-" + date.getDay().toString().PadLeft(2, '0')
                                    + " " + date.getHours().toString().PadLeft(2, '0')
                                    + ":" + date.getMinutes().toString().PadLeft(2, '0'));
                                li_copy.find(".description").text(values.content);
                                if (values.isread == 0 && values.state == 1)
                                {
                                    li_copy.addClass("news");

                                }
                                html.append(li_copy);
                            });
                            listbox.append(html.html());
                            html.html("");
                            page++;

                        }
                    });



            });

            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
                if (scrollTop + windowHeight == scrollHeight) {

                    loading.trigger("click");


                }
            });





        });



    })();



    /******极光推送ajax加载********************/










});