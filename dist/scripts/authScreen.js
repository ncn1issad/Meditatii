"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-button');
const message = document.getElementById('auth-error');
registerButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const response = yield fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });
    const data = yield response.json();
    message.textContent = data.message || data.error;
}));
loginButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const response = yield fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = yield response.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        message.textContent = "Autentificare reușită";
    }
    else {
        message.textContent = data.error;
    }
}));
