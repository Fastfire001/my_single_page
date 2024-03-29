function ajax(url, getPost = 'get', asy = false) {
    var request = new XMLHttpRequest();
    request.open(getPost, url, asy);
    var resp = '';
    request.onload = function () {
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
    if (1 > userName.length) {
        alert('Invalid username!');
        isFormvalid = false;
    }
    if (1 > passwrd.length) {
        alert('Invalid password');
        isFormvalid = false;
    }
    if (isFormvalid) {
        setUsername(userName);
        testUserAccount();
    }
    evt.preventDefault();
}

function testUserAccount() {
    var main = document.querySelector('main');
    if (getUsername()) {
        document.querySelector('nav').classList.remove('hide');
        main.innerHTML = ajax('accueil.html');
        document.querySelector('span.profile').innerHTML = getUsername();
        document.querySelector('span.home').addEventListener('click', displayHome, true);
        document.querySelector('span.profile').addEventListener('click', displayProfile, true);
        document.querySelector('span.logout').addEventListener('click', logout, true);
    } else {
        main.innerHTML = ajax('login.html');
        document.querySelector('nav').classList.add('hide');
        document.querySelector('form.login').addEventListener('submit', submitLog, true);
    }
}

function displayHome() {
    document.querySelector('main').innerHTML = ajax('accueil.html');
}

function displayProfile() {
    document.querySelector('main').innerHTML = ajax('profil.html');
    document.querySelector('input.new-username').value = getUsername();
    document.querySelector('button.save-username').addEventListener('click', checkNewUserName, true);
}

function logout() {
    sessionStorage.removeItem('user');
    testUserAccount();
}

function setUsername(username) {
    sessionStorage.setItem('user', username);
}

function getUsername() {
    return sessionStorage.getItem('user');
}

function checkNewUserName() {
    var newUsername = document.querySelector('input.new-username').value;
    var isUsernameValid = true;
    if (1 > newUsername.length) {
        isUsernameValid = false;
    }
    if (isUsernameValid) {
        setUsername(newUsername);
        testUserAccount();
    } else {
        alert('Invalid username');
    }
}

window.onload = testUserAccount;