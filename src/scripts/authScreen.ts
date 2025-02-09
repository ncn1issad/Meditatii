const registerButton = document.getElementById('register-button') as HTMLButtonElement;
const loginButton = document.getElementById('login-button') as HTMLButtonElement;
const message = document.getElementById('auth-error') as HTMLParagraphElement;

registerButton.addEventListener('click', async () : Promise<void> => {
    const username : string = (document.getElementById('register-username') as HTMLInputElement).value;
    const email : string = (document.getElementById('register-email') as HTMLInputElement).value;
    const password : string = (document.getElementById('register-password') as HTMLInputElement).value;

    const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    message.textContent = data.message || data.error;
});

loginButton.addEventListener('click', async () : Promise<void> => {
    const email : string = (document.getElementById('login-email') as HTMLInputElement).value;
    const password : string = (document.getElementById('login-password') as HTMLInputElement).value;

    const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        message.textContent = "Autentificare reușită";
    } else {
        message.textContent = data.error;
    }
});