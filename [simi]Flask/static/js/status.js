function err_status_code(status_code) {
    switch (status_code) {
        case 200:
            description = "正確"
            break
        case 400:
            description = "失敗"
            alert_err(description)
            break
        case 422:
            description = "帳號驗證失敗"
            alert_err(description)
            break
        case 465:
            description = "必填資料缺失"
            alert_err(description)
            break
        case 466:
            description = "帳號驗證失敗"
            alert_err(description)
            break
        case 467:
            description = "登入失敗"
            alert_err(description)
            break
        case 468:
            if (window.location.href == signup_page) {
                description = "此用戶名稱已被註冊"
                alert_err(description)
                break
            } else {
                description = "查無此用戶"
                alert_err(description)
                break
            }
        case 469:
            description = "密碼有誤"
            alert_err(description)
            break
        case 470:
            description = "此信箱已被註冊"
            alert_err(description)
            break
        case 471:
            description = "註冊失敗，此帳號或信箱已有人使用"
            alert_err(description)
            break
        case 472:
            description = "密碼變更"
            alert_err(description)
            break
        default:
            description = "不明原因錯誤"
            alert_err(description)
    }
}

function alert_err(description) {
    Swal.fire({
        title: 'Error!',
        text: description,
        icon: 'error',
        confirmButtonText: '確認'
    })
}