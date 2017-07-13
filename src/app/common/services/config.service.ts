export class ConfigService {
    /**
     * Api Url
     * @type {string}
     */
    private static apiUrl: string = 'http://api.commands.local';

    /**
     * Get api Url
     * @returns {string}
     */
    public static getApiUrl(str: string = '') {
        return this.apiUrl + str;
    }
}