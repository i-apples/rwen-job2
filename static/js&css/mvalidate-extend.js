/*表单验证扩展
 *需配合Zepto和mvalidate.js一起使用*/
$(function(){
    $.mvalidateExtend({
        s:{
            required : true,   
            pattern : /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
            each:function(){
                   
            },
            descriptions:{
                required : '请输入中英文字符',
                pattern : '不能输入特殊字符'
            }
        },
        n:{
            required : true,   
            pattern : /^\d+$/,
            each:function(){
                   
            },
            descriptions:{
                required : '请输入数字',
                pattern : '只允许整数类型'
            }
        },
        m:{
            required : true,   
            pattern : /^0?1[3|4|5|7|8][0-9]\d{8}$/,
            each:function(){
                   
            },
            descriptions:{
                required : '请输入手机号码',
                pattern : '您的手机号码格式不正确'
            }
        },
        //分享分手机号
        mfxr:{
            required : true,
            pattern : /^0?1[3|4|5|7|8][0-9]\d{8}$/,
            each:function(){

            },
            descriptions:{
                required : '请输入分享人手机号',
                pattern : '您的分享人手机号码格式不正确'
            }
        },
        e:{
            required : true,   
            pattern : /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            each:function(){
                   
            },
            descriptions:{
                required : '请输入邮箱地址',
                pattern : '邮箱地址格式不正确'
            }
        },
        amount:{
            required : true,   
            pattern : /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/,
            each:function(){
                   
            },
            descriptions:{
                required : '请输入金额',
                pattern : '金额格式不正确'
            }
        },
        url:{
            required : true,   
            pattern : /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
            each:function(){
                   
            },
            descriptions:{
                required : '请输入URL地址',
                pattern : 'URL格式不正确'
            }
        },
        comment:{
            required : true,   
            pattern : /^[\w\W]{10,500}$/,
            each:function(){
                   
            },
            descriptions:{
                required : '请输入评论内容',
                pattern : '评论字数须在10-500字内'
            }
        },
        code:{
            required : true,   
            pattern : /^\w{4,6}$/,
            each:function(){
                   
            },
            descriptions:{
                required : '请输入验证码',
                pattern : '请输入4-6位验证码'
            }
        },
        dxcode:{
            required : true,
            pattern : /^\w{4,6}$/,
            each:function(){

            },
            descriptions:{
                required : '请输入短信验证码',
                pattern : '请输入4位短信验证码'
            }
        },
        username:{
            required : true,   
            pattern : /[\w\W]{2,}/,
            each:function(){
                   
            },
            descriptions:{
                required : '请输入用户名',
                pattern : '请输入中英文用户名'
            }
        },
        password:{
            required : true,   
            pattern : /[\w\W]{6,}/,
            each:function(){
                   
            },
            descriptions:{
                required : '请输入密码',
                pattern : '请输入至少6位密码'
            }
        },
        repassword:{
            required : true,
            pattern : /[\w\W]{6,}/,
            each:function(row){

            },
            descriptions:{
                required : '请输入确认密码',
                pattern : '请输入至少6位密码'
            }
        },
        select:{
            required : true,
            descriptions:{
                required : '请选择其中一项'
            }
        },
        zcselect:{
            required : true,
            descriptions:{
                required : '必须勾选注册协议'
            }
        }
    });

});
var rsegss= /^0?1[3|4|5|7|8][0-9]\d{8}$/;