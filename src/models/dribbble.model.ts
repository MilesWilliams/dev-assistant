import { Api } from "./api.model";
import { error } from "util";

export class Dribbble extends Api {
    protected api_key: string = '';
    protected api_path: string = '';
    protected auth_token: string = '';
    constructor() {
        super();

        this.ApiKey = this.api_key;
        this.ApiUrl = this.api_path;
        this.AuthToken = this.auth_token;
    }

    search(query: any) {
        return new Promise(
			(resolve, reject) => {
				const req = new XMLHttpRequest();
                req.open('POST', this.api_path);
                req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                

				req.onload = () => req.status == 200 ? resolve(req.response) : reject(error(req.statusText));
				req.onerror = () => reject(error('Network Error'));

                req.send();
			}
		);
    }

}