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
                    // alert('Logout Success!' + authHeader); 
                    // console.log(resp)
                    if (resp['msg']) {
                        delete_cookie('access_token')
                        Swal.fire({
                            // position: 'top-end',
                            icon: 'success',
                            title: '登出成功，Bye ~',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setTimeout(function() { location.href = login_page; }, 1500);
                    }
                    // alert('goodbye~ '+resp['logged_in_as'])

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('error! ' + jqXHR + ' - ' + textStatus + ' - ' + errorThrown);
                    console.log(jqXHR)
                    var err = JSON.parse(jqXHR.responseText);
                    // alert(err['msg']);
                    Swal.fire({
                        title: 'Error!',
                        text: err['msg'],
                        icon: 'error',
                        confirmButtonText: '確認'
                    })
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