window.onload = function() {
    var dynamicLoading = {
        css: function (path) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },
        js: function (path) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.src = path;
            script.type = 'text/javascript';
            body.appendChild(script);
        }
    };
//main css
    dynamicLoading.css('static/css/weui.min.css')
    dynamicLoading.css('static/css/style.css')
    dynamicLoading.css('static/css/main.css')
    dynamicLoading.css('//at.alicdn.com/t/font_933086_9y355wtm9ev.css')

//me css
    dynamicLoading.css('static/css/dxp.css')
    dynamicLoading.css('static/css/main.css')

//me js
    dynamicLoading.js('http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js');
    dynamicLoading.js('static/js/weui.min.js');
    dynamicLoading.js('static/js/dxp.js');
}