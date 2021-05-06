if (getCookie('access_token')) {
    $.ajax({
        url: index_api,
        data: {},
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('access_token'));
        },
        success: function(resp) {
            Swal.fire({
                icon: 'success',
                title: '您已經登入ㄌ ~',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(function() { location.href = index_page; }, 1500);
        },
        error: function(response) {
            err_status_code(JSON.parse(response.status))
            setTimeout(function() {
                delete_cookie('access_token')
                location.href = login_page;
            }, 1500);
        }
    });
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function delete_cookie(name) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}