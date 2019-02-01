import { Api } from "./api.model";
import { error } from "util";

export class Github extends Api {
    protected api_path: string = 'https://api.github.com';
    protected auth_token: string = '';
    private client_id: string = '';
    private client_secret: string = '';
    public liElements: HTMLLIElement[];
    
    constructor() {
        super();

        this.ApiKey = this.api_key;
        this.ApiUrl = this.api_path;
        this.AuthToken = this.auth_token;

        // this.getAuthToken();
    }

    public async search(query: string) {
        this.liElements = [];
        await (this.fetchResults(query)).then(res => this.liElements = this.buildResults(res));

        return this.liElements;
            // console.log(this.liElements);
    }

    // private getAuthToken() {
    //     return new Promise(
    //         (resolve, reject) => {
    //             const req = new XMLHttpRequest();
    //             req.open('GET', `${this.api_path}/authorizations`);
    //             req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //             const params = {
    //                 client_id: this.client_id,
    //                 client_secret: this.client_secret
    //             };

    //             req.onload = () => req.status == 200 ? resolve(req.response) : reject(error(req.statusText));
    //             req.onerror = () => reject(error('Network Error'));

    //             req.send(JSON.stringify(params));
    //         }
    //     );
    // }

    public buildResults(data: any) {
        const results: Results = JSON.parse(data);
        return results.items.map(r => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${r.html_url}">
                    <span>${r.name}</span>
                </a>
                `
            return li;
        });
    }

    private fetchResults(query: string) {
        return new Promise(
            (resolve, reject) => {
                const req = new XMLHttpRequest();
                req.open('GET', `${this.api_path}/search/repositories?q=${query}`);
                req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                req.setRequestHeader("Authorization", `token ${this.auth_token}`);

                req.onload = () => req.status == 200 ? resolve(req.response) : reject(error(req.statusText));
                req.onerror = () => reject(error('Network Error'));

                req.send();
            }
        );
    }
}

export interface Results {
    incomplete_results: boolean;
    items: GithubRepository[];
    total_count: number;
}

export interface GithubRepository {
    archive_url: string;
    archived: boolean;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    clone_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    created_at: string;
    default_branch: string;
    deployments_url: string;
    description: string;
    downloads_url: string;
    events_url: string;
    fork: boolean;
    forks: number;
    forks_count: number;
    forks_url: string;
    full_name: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url: string;
    has_downloads: boolean;
    has_issues: boolean;
    has_pages: boolean;
    has_projects: boolean;
    has_wiki: boolean;
    homepage: string;
    hooks_url: string;
    html_url: string;
    id: number;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    language: string;
    languages_url: string;
    license: RepoLicense;
    merges_url: string;
    milestones_url: string;
    mirror_url: null
    name: string;
    node_id: string;
    notifications_url: string;
    open_issues: number;
    open_issues_count: number;
    owner: RepoOwner
    permissions: RepoPermissions;
    private: boolean;
    pulls_url: string;
    pushed_at: string;
    releases_url: string;
    score: number;
    size: number;
    ssh_url: string;
    stargazers_count: number;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    svn_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    updated_at: string;
    url: string;
    watchers: number;
    watchers_count: number;
}

export interface RepoOwner {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
}

export interface RepoLicense {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
}

export interface RepoPermissions {
    admin: boolean;
    push: boolean;
    pull: boolean;
}