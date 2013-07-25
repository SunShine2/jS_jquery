jQuery(function() {
    //高度自适应
if(typeof(SET_INITLAYOUT) == "undefined"){
    initLayout();
    nthchild();
    $(window).resize(function() {
        initLayout();
    });
	}
});

//高度自适应
function initLayout() {
	if (window.top != window.self) {		
		var winHeight = parent.document.documentElement.clientHeight;
		var view_h =  winHeight - 208;
		var h = $('body').height();
		h = (h>view_h)?h:view_h;
		parent.document.getElementById('mainFrame').height = parseInt(h)+100;		
	}else{
		var w = document.documentElement.clientWidth-$('#leftMain').width()-18;
		$('#mainFrame').width(w);
	}
}

/**
 * 全选checkbox,注意：标识checkbox id固定为为check_box
 * @param string name 列表check名称,如 uid[]
 */
function selectall(thisid, name) {
    if (!$("#" + thisid).is(':checked')) {
        $("input[name='" + name + "']").each(function() {
            this.checked = false;
        });
    } else {
        $("input[name='" + name + "']").each(function() {
            this.checked = true;
        });
    }
}

/**
 * 奇数行
 */
function nthchild() {
    $(".tablegrid tbody tr:nth-child(even)").css("background-color", "#F6F6F6");
}

//字符串验证
function validate(value, pattern) {
    switch (pattern) {
    case 'required':
        pattern = /\S+/i;
        break;
    case 'email':
        pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)+$/i;
        break;
    case 'qq':
        pattern = /^[1-9][0-9]{4,}$/i;
        break;
    case 'id':
        pattern = /^\d{15}(\d{2}[0-9x])?$/i;
        break;
    case 'ip':
        pattern = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/i;
        break;
    case 'zip':
        pattern = /^\d{6}$/i;
        break;
    case 'phone':
        pattern = /^((\d{3,4})|\d{3,4}-)?\d{7,8}(-\d{3})*$/i;
        break;
    case 'mobi':
        pattern = /^1[358]\d{9}$/i;
        break;
    case 'url':
        pattern = /^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))+(\/?\S*)?$/i;
        break;
    }
    if (value.search(pattern) == -1) {
        return false;
    } else {
        return true;
    }
}

/**
 * @brief 获取控件元素值的数组形式
 * @param string nameVal 控件元素的name值
 * @param string sort    控件元素的类型值:checkbox,radio,text,textarea,select
 * @return array
 */
function getArray(nameVal, sort) {
    //要ajax的json数据
    jsonData = new Array;

    switch (sort) {
    case "checkbox":
        $('input:checkbox[name="' + nameVal + '"]:checked').each(function(i) {
            jsonData[i] = $(this).val();
        });
        break;
    }
    return jsonData;
}

//根据表单的name值提交
function formSubmit(formName) {
    $('form[name="' + formName + '"]').submit();
}

//根据checkbox的name值检测checkbox是否选中
function checkboxCheck(boxName, errMsg) {
    if ($('input[name="' + boxName + '"]:checked').length < 1) {
        alert(errMsg);
        return false;
    }
    return true;
}

//倒计时
var countdown = function() {
    var _self = this;
    this.handle = {};
    this.parent = {
        'second': 'minute',
        'minute': 'hour',
        'hour': ""
    };
    this.add = function(id) {
        _self.handle.id = setInterval(function() {
            _self.work(id, 'second');
        },
        1000);
    };
    this.work = function(id, type) {
        if (type == "") return false;

        var e = document.getElementById("cd_" + type + "_" + id);

        var value = parseInt(e.innerHTML);
        if (value == 0 && _self.work(id, _self.parent[type]) == false) {
            clearInterval(_self.handle.id);
            return false;
        } else {
            e.innerHTML = (value == 0 ? 59 : (value - 1));
            return true;
        }
    };
};

//切换验证码
function changeCaptcha(urlVal) {
    var radom = Math.random();
    $('#captchaImg').attr('src', urlVal + '/' + radom);
}

/*加法函数，用来得到精确的加法结果
 *返回值：arg1加上arg2的精确结果
 */
function mathAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch(e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch(e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

/*减法函数
 *返回值：arg2减arg1的精确结果
 */
function mathSub(arg2, arg1) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch(e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch(e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1: r2;
    return ((arg2 * m - arg1 * m) / m).toFixed(n);
}

/*乘法函数，用来得到精确的乘法结果
 *返回值：arg1乘以arg2的精确结果
 */
function mathMul(arg1, arg2) {
    var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch(e) {}
    try {
        m += s2.split(".")[1].length
    } catch(e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/*除法函数，用来得到精确的除法结果
 *返回值：arg1除以arg2的精确结果
 */
function mathDiv(arg1, arg2) {
    var t1 = 0,
    t2 = 0,
    r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch(e) {}
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch(e) {}
    with(Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
/*实现事件页面的连接*/
function event_link(url) {
    window.location.href = url;
}

//隐藏或显示
function onShowHide(_self, id) {
    var obj_id = jQuery(id);
    jQuery(_self).toggle(function() {
        obj_id.show();
		initLayout();
    },
    function() {
        obj_id.hide();
		initLayout();
    });
}

/*是否确认*/
function onDelConfirm(msg) {
    var m = msg ? msg: 'Checking understanding';
    if (confirm(m)) {
        return true;
    } else {
        return false;
    }
};

/*是否确认提交表单*/
function onformSubmit(msg, formname) {
    if (onDelConfirm(msg)) {
        formSubmit(formname);
    }
};

//当前导航设置
function onSendCurrentMenu(id) {
	var $_obj = jQuery('.nav ul li');
	if (window.top != window.self){
		$_obj = jQuery('.nav ul li',parent.document);
	}
	$_obj.children('a').removeClass('navEn');
	if(id) {
		var menu = '#menu_' + id;
		$_obj.find(menu).addClass('navEn');
	}
};

/*window.open框架*/
function onWindowOpen(url,style) {
    if (url) {
		var _this_style = style?style:'height=800,width=900,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no';
        window.open(url, 'newwindow', _this_style);
    }
};
