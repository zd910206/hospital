$(document).ready(function() {
	noParentPage(1);

	$('body').bind('keydown', function(event) {
		if (event.keyCode == 13) {
			submitLogin();
		}
	});

	$('#submitBtn').bind('click', function() {
		submitLogin();
	});

});

function noParentPage() {
	if (!isEmpty($(".boxy-inner:has(.login)").text())) {
		window.location.reload();
	}
}

function getCookie() {
	var cookie = document.cookie;
	var cookies = cookie.split(";");
	for ( var index in cookies) {
		var str = cookies[index] + "";
		if (str.indexOf("=") >= 0 && str.split("=").length == 2) {
			var cookieDitail = cookies[index].split("=");
			if (cookieDitail[0].trim() == "tw_cookieUser") {
				var userAndpw = cookieDitail[1].trim().split("-");
				$(":input[name='userName']").val(userAndpw[0].trim());
				$(":input[name='pwd']").val(userAndpw[1].trim());
			}
		}
	}
}

function clearForm() {
	$("#userName").val('');
	$("#pwd").val('');
}

var submitLogin = function() {
	$("#pwd").val(hex_md5($("#T__pwd").val()));
	$('#validDiv').css('display', 'none');
	$("#submitBtn").val("LOGINNING...").attr("disabled", "disabled");
	var userName = $("#userName").val();
	var pwd = $("#pwd").val();
	var loginUrl = ctx + "user/login";
	$.post(loginUrl, {
		userName : userName,
		password : pwd,
		captcha : $('#captcha').val(),
		forwardUrl : $('input[name=forwardUrl]').val()
	}, function(res) {
		if (res.result) {
			window.top.location = path + "/index";
		} else {
			get_code();
			$('#errMsg').text(res.message);
			$('#validDiv').css('display', 'block');
			$('#captcha').val('');
			$("#submitBtn").val("LOGIN").attr("disabled", false);
		}
	}, "json").error(function() {
		MessageAlert("Unknown error, please contact the administrator!");
		$("#submitBtn").val("LOGIN").attr("disabled", false);
	});
}

function setCookie(name, value) {
	var Days = 7;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();
}
