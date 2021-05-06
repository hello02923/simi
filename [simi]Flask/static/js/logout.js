$('.logout').click(function() {
    Swal.fire({
        title: '你確定要登出嗎?',
        text: "點選確定回到登入頁面",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: logout_api,
                data: {},
                type: "POST",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('access_token'));
                },
                success: function(resp) {
                    if (resp['msg']) {
                        delete_cookie('access_token')
                        Swal.fire({
                            icon: 'success',
                            title: '登出成功，Bye ~',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setTimeout(function() { location.href = login_page; }, 1500);
                    }
                },
                error: function(response) {
                    err_status_code(JSON.parse(response.status))
                }
            });
        }
    })
})

function delete_cookie(name) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}