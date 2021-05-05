$.ajax({
    url: index_api,
    data: {},
    type: "GET",
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('access_token'));
    },
    success: function(resp) {
        $('.user_info').text('歡迎: ' + resp['logged_in_as'])
            // alert('Success!' + authHeader); 
            // if (window.location.href == index_page) {
            //     Swal.fire({
            //         title: 'welcome~ ' + resp['logged_in_as'],
            //         showClass: {
            //             popup: 'animate__animated animate__fadeInDown'
            //         },
            //         hideClass: {
            //             popup: 'animate__animated animate__fadeOutUp'
            //         }
            //     })
            // } else {
        console.log(1)
            // }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log('error! ' + jqXHR + ' - ' + textStatus + ' - ' + errorThrown);
        console.log(jqXHR)
        window.stop();

        var err = JSON.parse(jqXHR.responseText);
        Swal.fire({
            // position: 'top-end',
            icon: 'error',
            title: err['msg'],
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(function() { location.href = login_page; }, 1500);
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