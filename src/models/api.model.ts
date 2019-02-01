/**
 *
 *
 * @export
 * @class Api
 * @author Miles Williams
 * @description Base Api class
 */
export class Api {
    protected api_path: string;
    protected api_key: string;
    protected auth_token: string;

    constructor() { }

    /**
     *
     * @type {string}
     * @memberof Api
     * @returns {string}
     */
    get ApiKey(): string {
        return this.api_key;
    }
    /**
     *
     * @memberof Api
     */
    set ApiKey(key: string) {
        this.api_key = key;
    }

    /**
     *
     * @type {string}
     * @memberof Api
     * @returns {string}
     */
    get ApiUrl(): string {
        return this.ApiUrl;
    }

    /**
     *
     * @memberof Api
     */
    set ApiUrl(url: string) {
        this.api_path = url;
    }
    /**
     *
     * @type {string}
     * @memberof Api
     * @returns {string}
     */
    get AuthToken(): string {
        return this.auth_token;
    }
    /**
     *
     * @memberof Api
     */
    set AuthToken(token: string) {
        this.auth_token = token;
    }

    debounce(func: Function, wait: number) {
        let timeout: any;
        return (...args: any) => {
            const context = this
            clearTimeout(timeout)
            timeout = setTimeout(() => func.apply(context, args), wait)
        }
    }

}