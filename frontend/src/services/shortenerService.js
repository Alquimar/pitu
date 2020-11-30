import baseAPI from './api';

// Responsável pela conexão do Frontend com o Backend
class ShortnerService {
    constructor() {
        // Informando a url da API (Backend)
        this.api = baseAPI(process.env.REACT_APP_API);
    }

    // Defino a função 'getLink' como 'assync' para
    // informar que o retorno será aguardado 'await'
    async getLink(code) {
        const result = await this.api.get(`links/${code}`);

        return result.data;
    }

    async getStats(code) {
        const result = await this.api.get(`links/${code}/stats`);

        return result.data;
    }

    async generate(model) {
        const result = await this.api.post('links', model);

        return result.data;
    }
}

export default ShortnerService;