import { BASE_URL } from "./constants";

// Запрос на регистрацию пользователя
export const register = (username: string, password: string) => {
  return fetch(
    `${BASE_URL}/register?username=${username}&password=${password}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
};

// Запрос на авторизацию пользователя
export const login = (username: string, password: string) => {
  return fetch(`${BASE_URL}/login`, {
    body: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  }).then(checkResponse);
};

// Запрос на создание сокращенной ссылки
export const squeeze = (link: string, token: string) => {
  return fetch(`${BASE_URL}/squeeze?link=${link}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer ${token}`,
    },
  }).then(checkResponse);
};

// Запрос на получение списка созданных пользователем коротких ссылок
export const getStatistics = (token: string, query: string) => {
  return fetch(`${BASE_URL}/statistics${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer ${token}`,
    },
  }).then(checkResponse);
};

// Функция проверки ответа от сервера
export function checkResponse(response: {
  ok: any;
  json: () => any;
  status: any;
}) {
  return response.ok
    ? response.json()
    : Promise.reject(`Error ${response.status}`);
}
