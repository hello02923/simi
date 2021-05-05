// particle.js
particlesJS.load('particles-js', "./../static/js/particlesjs-config.json", function() {
    console.log('callback - particles.js config loaded');
});

var getUrlString = location.href;
var url = new URL(getUrlString);
var rt = url.searchParams.get('reset_token');
$(document).ready(function() {
    // bind the form submit event to our function
    $("#changepass-form").bind('submit', function(e) {
        // prevent page refresh
        e.preventDefault();
        // post the data
        var ps = $(this).find('input[name="password"]').val();
        var ps2 = $(this).find('input[name="repeat-password"]').val();
        var ajax = $.ajax({
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "password": ps,
                "repeat_password": ps2,
                "reset_token": rt
            }),
            url: reset_api
        }).done(function(data, Status) { //data有access_token
            if (data['msg'] == "success send email") {
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: '密碼重設成功！ 將會回到登入頁面 ~',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function() { location.href = login_page; }, 1500);
            }
        });
        ajax.fail(function(jqXHR, textStatus, errorThrown) {
            console.log('error! ' + jqXHR + ' - ' + textStatus + ' - ' + errorThrown);
            console.log(jqXHR)
            var err = JSON.parse(jqXHR.responseText);
            Swal.fire({
                title: 'Error!',
                text: err['message'],
                icon: 'error',
                confirmButtonText: '確認'
            })
        });
    });
});