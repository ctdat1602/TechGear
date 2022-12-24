const rmb = document.getElementById("remember"),
    emailRmb = document.getElementById("email");

var emailError = document.getElementById('email-error');
var emailSuccess = document.getElementById('email-success');
var passwordError = document.getElementById('password-error');
var passwordSuccess = document.getElementById('password-success');


function rmbMe() {
    if (rmb.checked && emailRmb.value !== "") {
        localStorage.email = emailRmb.value;
        localStorage.checkbox = rmb.value;
    } else {
        localStorage.email = "";
        localStorage.checkbox = "";
    }
}

function validateEmail() {
    var email = document.getElementById('email').value;

    if (email.length == 0) {
        emailError.innerHTML = 'Không được bỏ trống';
        emailSuccess.innerHTML = '';
        return false;
    }

    if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        emailError.innerHTML = 'Sai định dạng Email';
        emailSuccess.innerHTML = '';
        return false;
    }

    else {
        emailError.innerHTML = '';
        emailSuccess.innerHTML = '<ion-icon name="checkbox"></ion-icon>';
    }

    return true;
}

function validatePassword() {
    var password = document.getElementById('password').value;

    if (password.length == 0) {
        passwordError.innerHTML = 'Không được bỏ trống';
        passwordSuccess.innerHTML = '';
        return false;
    }

    if (password.length >= 1 && password.length <= 6) {
        passwordError.innerHTML = 'Vui lòng nhập trên 6 ký tự';
        passwordSuccess.innerHTML = '';
        return false;
    }

    else {
        passwordError.innerHTML = '';
        passwordSuccess.innerHTML = '<ion-icon name="checkbox"></ion-icon>';
        return true;
    }

}

function validateSubmit() {
    if (!validateEmail() || !validatePassword()) {
        alert("Vui lòng điền đầy đủ thông tin và đúng định dạng ở phần tài khoản và mật khẩu")
        return false;
    }
}

const onChangeFile = () => {
    const file = document.getElementById('image-file').files[0];
    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('image-view').src = e.target.result;
    }
    reader.readAsDataURL(file);
}

const fetchAPI = async (url, option) => {
    const res = await fetch(url, option);
    return res.json();
}

const onDelete = async (id) => {
    const url = `http://localhost:3000/${id}/userDelete`;
    const option = {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    }
    try {
        await fetchAPI(url, option);
        window.location.href = '/customers';
    } catch (e) { console.log('Delete error: ', e) }
}

function btnSubmit() {
    validateSubmit();
    lsRememberMe();
}







