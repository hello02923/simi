// particle.js
particlesJS.load('particles-js', "./../static/js/particlesjs-config.json", function() {
    console.log('callback - particles.js config loaded');
});

$(document).ready(function() {
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
                "Authorization": "Basic " + btoa(unescape(encodeURIComponent(username + ":" + password)))
            },
            data: {},
            url: login_api
        }).done(function(response) {
            document.cookie = "access_token=" + response['access_token'];
            Swal.fire({
                icon: 'success',
                title: '登入成功 ~',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(function() { location.href = index_page; }, 1500);
        });
        ajax.fail(function(response) { err_status_code(JSON.parse(response.status)) });
    });
});