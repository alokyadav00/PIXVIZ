let userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfoLS')) || [];

let currentUser = '';

document.getElementById('signup-link').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.login').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('login-link').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.login').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
});

document.querySelector('.login-submit').addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('username-ip').value;
    const password = document.getElementById('password-ip').value;

    if (username && password) {
        let loginSuccess = false;
        userLoginInfo.forEach((info) => {
            if (info.username === username && info.password === password) {
                loginSuccess = true;
                currentUser = username;
                localStorage.setItem('currentUser', currentUser);
            }
        });

        if (loginSuccess) {
            window.location.href = 'index.html';
        }
         else {
            alert('Invalid username or password');
            location.reload();
        }
    } 
    else {
        alert('Please enter both username and password');
    }
});

document.querySelector('.signup-submit').addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username-ip').value;
    const password = document.getElementById('signup-password-ip').value;

    if (username && password) {
        userLoginInfo.push({ username, password });
        alert('Sign-up successful. Please log in.');
        document.querySelector('.login').style.display = 'block';
        document.getElementById('signup-form').style.display = 'none';
        localStorage.setItem('userLoginInfoLS', JSON.stringify(userLoginInfo));
    } else {
        alert('Please fill in all details');
    }
});
