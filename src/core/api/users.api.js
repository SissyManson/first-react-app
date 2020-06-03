import axios from 'axios';
import { deleteReciForAuthor } from './recipies.api';

const apiUrl = "http://localhost:3005";

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
}

export function getAllUsers() {
    //returns promises, which resolve async operations
    return axios.get(`${apiUrl}/users`);
}

export function getUserById(id) {
    return axios.get(`${apiUrl}/users/${id}`);
}

export async function register(userData) {

    const users = (await getAllUsers()).data;

    if (users.find(u => u.email === userData.email)) {
        throw new Error('Email already exists!');
    }
    //proverki za admin & active nie da si gi napravim, zashtoto stavat po sushtiq nachin

    userData = {
        ...userData,
        isActive: true,
        isAdmin: false,
        picture: "https://picsum.photos/250/300?random=8",
        phone: "555-555-555"
    }

    return axios.post(`${apiUrl}/users`, userData);
}

export async function login(userData) {
    const users = (await getAllUsers()).data;

    const loggedUser = users.find(u => u.email === userData.email && u.password.toString() === userData.password);

    if (!loggedUser.isActive) {
        throw new Error('This user is banned!');
    }

    if (loggedUser) {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        return;
    }

    throw new Error('Incorrect email / password!');
}

export function logout() {
    localStorage.removeItem('loggedUser');

}

export function saveUser(userData) {
    if (userData.id) {
        return axios.put(`${apiUrl}/users/${userData.id}`, userData);
    }

    return register(userData);
}

export function deleteUser(id) {
    deleteReciForAuthor(id);

    return axios.delete(`${apiUrl}/users/${id}`);
}