import { type Page, } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    elements = {
        //elementos de la pagina
        getTxtUsuario: () => this.page.getByPlaceholder('Username'),
        getTxtPassword: () => this.page.getByPlaceholder('Password'),
    };

}