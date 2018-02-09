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

window.onload = function () {
    if (sessionStorage.getItem('user')){
        document.querySelector('nav').classList.remove('hide');
    } else {
        document.querySelector('main').innerHTML = ajax('login.html');
    }
};