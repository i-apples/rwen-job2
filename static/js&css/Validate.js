var Validate = {};
//验证规则：11位数字，以1开头。
Validate.Isphone = function (str) {
    var re = /^(1[3456789][0-9])\d{8}$/
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }

};
Validate.IsEmail = function (str) {
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
};

////验证规则：字母、数字、下划线组成，字母开头，4-16位。
Validate.IsNickName = function (str) {

    var re = /^[a-zA-Z]{3,15}$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
};

Validate.IsPassword = function (str) {

    var re = /^\w{6,20}$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
};

Validate.IsPayPassword = function (str) {
    var re = /^[0-9]{6}$/
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }

};

Validate.WeekPassword = function (str) {
    var re = /^\d+$/;
    var re1 = /^[a-zA-Z]+$/;

    if (str.length >= 6 && (re.test(str) || re1.test(str))) {
        return true;
    }
    else {
        return false;
    }

};
Validate.MiddlePassword = function (str) {
    var re = /\d+/;
    var re1 = /[a-zA-Z]+/;
    var re2 = /\W+/;

    if (str.length >= 6 && re.test(str) && re1.test(str)) {
        return true;
    } else if (str.length >= 6 && re.test(str) && re2.test(str)) {
        return true;
    } else if (str.length >= 6 && re1.test(str) && re2.test(str)) {
        return true;
    }
    else {
        return false;
    }

};


Validate.StrongPassword = function (str) {
    var re = /\d+/;
    var re1 = /[a-zA-Z]+/;
    var re2 = /\W+/;

    if (str.length >= 6 && re.test(str) && re1.test(str) && re2.test(str)) {
        return true;
    } else {
        return false;
    }

};

Validate.EnNum = function (str) {
    var re = /\d+/;
    var re1 = /[a-zA-Z]+/;

    if (str.length >= 6 && re.test(str) && re1.test(str)) {
        return true;
    } else {
        return false;
    }

};



