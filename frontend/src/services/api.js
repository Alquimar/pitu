// Responsável pelo controle e realização das requisições que serão fetias ao backend
import axios from 'axios';

const baseAPI = (baseURL) => {
    const api = axios.create({
        baseURL,
    });

    return api;
}

export default baseAPI;