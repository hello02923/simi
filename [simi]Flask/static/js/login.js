// particle.js
particlesJS.load('particles-js', "./../static/js/particlesjs-config.json", function() {
    console.log('callback - particles.js config loaded');
});

$(document).ready(function() {
    // bind the form submit event to our function
    // console.log('mkefwj')
    $("#loginform").bind('submit', function(e) {
        // prevent page refresh
        e.preventDefault();
        // post the data
        var username = $(this).find('input[name="username"]').val();
        var password = $(this).find('input[name="password"]').val();
        var ajax = $.ajax({
            type: "POST",
            dataType: 'json',
            encode: true,
            async: false,
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            data: {},
            url: login_api
        }).done(function(data) { //data有access_token
            if (data['msg'] == 'password error') {
                Swal.fire({
                    title: 'Error!',
                    text: '登入失敗，密碼有誤',
                    icon: 'error',
                    confirmButtonText: '確認'
                })
            } else if (data['msg'] == 'Don\'t find username!') {
                Swal.fire({
                    title: 'Error!',
                    text: '登入失敗，找不到使用者',
                    icon: 'error',
                    confirmButtonText: '確認'
                })
            } else {
                document.cookie = "access_token=" + data['access_token'];
                Swal.fire({
                    icon: 'success',
                    title: '登入成功 ~',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function() { location.href = index_page; }, 1500);
            }
        });
        ajax.fail(function(jqXHR, textStatus, errorThrown) {
            console.log('error! ' + jqXHR + ' - ' + textStatus + ' - ' + errorThrown);
            console.log(jqXHR)
            var err = JSON.parse(jqXHR.responseText);
            Swal.fire({
                title: 'Error!',
                text: err['msg'],
                icon: 'error',
                confirmButtonText: '確認'
            })
        });
    });
});