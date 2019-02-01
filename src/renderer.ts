import { ApiTypes } from "./data-maps/api.map";
import { ipcRenderer } from "electron";
import { SvgIcons } from "./data-maps/icons.map";

class Search {
    private inputElement: HTMLInputElement;
    private resultsDivElement: HTMLDivElement;
    private iconsElement: HTMLDivElement;
    private timer: NodeJS.Timeout;
    public appLoaded: boolean;

    constructor() {
        window.addEventListener('load', _ => this.init());
    }

    private init() {
        this.appLoaded = true;
        this.inputElement = document.querySelector('input');
        this.resultsDivElement = document.querySelector('.search-results ul');
        this.iconsElement = document.getElementById('api-logo') as HTMLDivElement;
        this.inputElement.addEventListener('keyup', (e) => this.onSearch(e));
    }

    /**
     *
     * @private
     * @param {KeyboardEvent} e
     * @memberof Search
     */
    private onSearch(e: KeyboardEvent) {
        const command = this.inputElement.value;
        const query = command.split(' ')[1];

        clearTimeout(this.timer);
        if (command.length > 0) {
            if ( command.match(' ')) {
                const api = command.split(' ')[0];
                this.iconsElement.innerHTML = SvgIcons[api]();
                if ((command.length - 1) > command.match(' ').index) {
                    const apiClass= this.determinApi(api);

                    if (query.length > 0) {
                        this.timer = setTimeout(()=>{
                            apiClass.search(query)
                            .then((res: any) => this.onSuccess(res))
                            .catch((err: Error) => this.onError(err));
                            
                        }, 500);  
                    } else {
                        apiClass.search('');
                    }
                }
            } else {
                this.iconsElement.innerHTML = '';
                this.resizeWindow(false);
            }
        } 
    }

    private determinApi(prefix: string): any {
        return ApiTypes[prefix]();
    }

    /**
     *
     * @private
     * @param {*} results
     * @memberof Search
     */
    private onSuccess(results: any) {
        this.resultsDivElement.innerHTML = '';

        results.forEach((element: any) => {
            this.resultsDivElement.appendChild(element)  
        });

        if (results) 
            this.resizeWindow(true);
    }

    /**
     *
     * @private
     * @param {Error} err
     * @memberof Search
     */
    private onError(err: Error) {

    }

    /**
     *
     * @private
     * @param {boolean} open
     * @memberof Search
     */
    private resizeWindow(open: boolean) {
        var ipc = ipcRenderer;
        ipc.send('has-results', open);
    }
}

new Search();