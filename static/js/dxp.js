;(function () {

    var updata_vip_privilege = function (inx) {

        if( isNaN(inx) || inx <= 0 && inx > 12 )
            return;

        var list = $('.page .page__bd .content .vip-privilege .weui-grids .weui-grid');
        for ( var i = 0; i < inx + 1; i++ ) {
            var img = $(list.get(i)).find('img');
            var img_src = String(img.attr('src'));
            var temp = img_src;
            var img_data_src = String(img.attr('data-src'));
            img_data_src = img_src.replace(/icon/,'icon_active');
            img.attr('src',img_data_src).attr('data-src',temp);
        }
    }

    if( $('.page .page__bd .content .vip-privilege') ) {
       updata_vip_privilege(8);
   }

    var updata_user_record = function () {
       var list = $('.page .page__bd .user_record .user-record .img-list li');
       list.each(function () {
           if( $(this).hasClass('on') ) {
               var img = $(this).find('img');
               var temp = img.attr('src');
               img.attr('src',img.attr('data-src')).attr('data-src',temp);
           }
       })
    };

    if( $('.page .page__bd .user_record .user-record .img-list') ) {
        updata_user_record();
    }

    function set_user_vip(inx){
        /**
         *  在这里调用接口获取用户的vip等级
         *  默认是0级
         *  ...
         */

        var index;
        if( isNaN(index) || index < 0 ) {
            index = 0;
        }
        index = inx;
        //开始判断
        var list = $('.page .page__bd .user_record .user-record .img-list li');
        for ( var i = 0; i < index + 1; i++ ) {
            var temp = $(list.get(list.length - 1 - i));
            temp.addClass('on');
        }
        updata_user_record();
    }
    //设置vip等级
    $('body').ready(function () {
        set_user_vip(3);
    })
})();