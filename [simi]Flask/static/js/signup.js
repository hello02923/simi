// particle.js
particlesJS.load('particles-js', "./../static/js/particlesjs-config.json", function() {
    console.log('callback - particles.js config loaded');
});
$(document).ready(function() {
    // bind the form submit event to our function
    $("#signup-form").bind('submit', function(e) {
        // prevent page refresh
        e.preventDefault();
        // post the data
        var username = $(this).find('input[name="username"]').val();
        var password = $(this).find('input[name="password"]').val();
        var email = $(this).find('input[name="email"]').val();
        var ajax = $.ajax({
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "username": username,
                "password": password,
                "email": email
            }),
            url: signup_api
        }).done(function(data) { //data有access_token
            Swal.fire({
                icon: 'success',
                title: '註冊成功 ~',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(function() { location.href = login_page; }, 1500);
        });
        ajax.fail(function(response) { err_status_code(JSON.parse(response.status)) });
    });
});