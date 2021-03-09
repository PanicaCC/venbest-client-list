class ApiService {

    _baseURL = 'https://venbest-test.herokuapp.com'

    getResource = async url => {
        const res = await fetch(this._baseURL + url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        } else {
            return await res.json();
        }
    }

    getClients = async () => {
       return await this.getResource(`/`)
            .then(response => response)
    }
}
export default ApiService