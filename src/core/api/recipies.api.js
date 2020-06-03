import axios from "axios";
import { getLoggedUser } from "./users.api";

const apiUrl = 'http://localhost:3005'

export function getAllRecipies() {
    return axios.get(`${apiUrl}/recipies`);
}

export function getReciById(id) {
    return axios.get(`${apiUrl}/recipies/${id}`);
}

export async function getReciByAuthorId(authorId) {
    const allRecipies = (await getAllRecipies()).data;

    return allRecipies.filter(recipe => recipe.authorId === authorId);
}

export function getMyRecipies() {
    const loggedUserId = getLoggedUser().id;

    return getReciByAuthorId(loggedUserId);
}

export function saveRecipe(reciData) {
    const loggedUser = getLoggedUser();
    if (reciData.id) {
        return axios.put(`${apiUrl}/recipies/${reciData.id}`, reciData);
    }

    reciData.authorId = loggedUser.id;
    reciData.authorName = loggedUser.name;
    reciData.date = new Date();

    return axios.post(`${apiUrl}/recipies`, reciData);
}

export function deleteRecipe(id) {
    return axios.delete(`${apiUrl}/recipies/${id}`);
}

export async function deleteReciForAuthor(authorId) {
    const recipies = await getReciByAuthorId(authorId);

    recipies.forEach(recipe => {
        deleteRecipe(recipe.id);
    });
}