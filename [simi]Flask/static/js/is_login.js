$.ajax({
    url: index_api,
    data: {},
    type: "GET",
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('access_token'));
    },
    success: function(resp) {
        $('.user_info').text('歡迎: ' + resp['logged_in_as'])
    },
    error: function(response) {
        window.stop();
        err_status_code(JSON.parse(response.status))
        $('.swal2-container.swal2-center.swal2-backdrop-show').css('background', 'gray')
        setTimeout(function() { location.href = login_page; }, 3500);
    }
});

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