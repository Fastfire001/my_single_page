function ajax(url, getPost = 'get', asy = false) {
    var request = new XMLHttpRequest();
    request.open(getPost, url, asy);
    var resp = '';
    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            resp = this.response;
        }
    };
    request.send();
    return resp
}

function submitLog(evt) {
    var userName = this.elements['username'].value;
    var passwrd = this.elements['password'].value;
    var isFormvalid = true;
    if (1 > userName.length){
        alert('Invalid username!');
        isFormvalid = false;
    } if (1 > passwrd.length){
        alert('Invalid password');
        isFormvalid = false;
    }
    if (isFormvalid){
        sessionStorage.setItem('user', userName);
        testUserAccount();
    }
    evt.preventDefault();
}

function testUserAccount() {
    if (sessionStorage.getItem('user')){
        document.querySelector('nav').classList.remove('hide');
    } else {
        document.querySelector('main').innerHTML = ajax('login.html');
        document.querySelector('form.login').addEventListener("submit", submitLog, true)
    }
}

window.onload = testUserAccount;