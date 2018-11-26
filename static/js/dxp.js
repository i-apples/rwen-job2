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


})();