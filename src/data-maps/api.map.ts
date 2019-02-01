import * as Models from '../models';

export const ApiTypes: any = {
    "github": () => {
        return new Models.Github();
    },
    "dribbble": () => {
        return new Models.Dribbble();
    },
    "gitlab": () => {
        return new Models.Gitlab();
    },
    "wiki": () => {
        return new Models.WikiPedia();
    },
    "help": () => {
        return new Models.Help();
    },
}

// namespace Class {

    // }
    // type Class = { new(...args: any[]): any; };
// enum Class = []
