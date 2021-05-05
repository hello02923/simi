// particle.js
particlesJS.load('particles-js', "./../static/js/particlesjs-config.json", function() {
    console.log('callback - particles.js config loaded');
});
$(document).ready(function() {
    // bind the form submit event to our function
    $("#forgetpass-form").bind('submit', function(e) {
        // prevent page refresh
        e.preventDefault();
        // post the data
        var email = $(this).find('input[name="email"]').val();
        var ajax = $.ajax({
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "email": email
            }),
            url: forget_api
        }).done(function(data) { //data有access_token
            if (data['msg'] == "success send email") {
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: '傳送成功，請去email查看～',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function() { location.href = login_page; }, 1500);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: '此Email未註冊任何帳號哦～',
                    icon: 'error',
                    confirmButtonText: '確認'
                })
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