import { Expect,Locator, Page, expect, } from "@playwright/test";
//configuarcion de tiempo deseado
const tie =500

const sleep = (ms)=> {
    return new Promise(resolve => setTimeout(resolve, ms));
};
export class PTS{
    readonly page: Page;
    //contructos de la clase
    constructor(page: Page){
        this.page = page; 
    }
    //Abril la url que resive como parametro
    async OpenUrl(url, tiempo=tie){
        await this.page.goto(url)
        await sleep(tiempo)
    }
    //Refrezca la pagina web
    async Refrescar_Pagina(tiempo=tie){
        await this.page.reload();
        await sleep(tiempo);
    }
    //Configuracion de tiempo de espera segun la variable tie
    async Tiempo(tiempo=tie){
        await sleep(tiempo);
    } 
    //Dar Scroll por cordenadas x, y
    async Scroll(x:number, y:number, tiempo=tie){
        await this.page.mouse.wheel(x,y)
        await sleep(tiempo)
    }
    //validar la etiqueta titulo de la pagina web 
    async Validar_Titulo(titulo:string, tiempo=tie){
        await expect(this.page).toHaveTitle(titulo);
        await sleep(tiempo);
    }
    //Valdar la url de la pagina web    
    async Validar_Url(url:string, tiempo=tie){
        await expect(this.page).toHaveURL(url);
        await sleep(tiempo);
    }
    //Ecribe un un campo tipo text, pide como parametros selector, texto   
    async Escribir_Texto(selector:Function,val:string,tiempo=tie){
        const valor = selector();//guardar el dato en una variable
        await expect (valor).toBeVisible();//valida que el campo sea visible
        await expect (valor).toBeEnabled();//valida que el campo este habilitado
        await valor?.focus();
        await valor?.fill(val);//escribir el valor
        await sleep(tiempo)//Espero un tiempo
    } 
    //Valida un texto resibe como parametros selector y texto a validar
    async Validar_Texto(seletor:string, val: string, tiempo=tie){
        const locator = this.page.locator(seletor);
        await expect(locator).toContainText(val);
        await sleep(tiempo);
    }
      //Da click en un boton pide como parametro nombre del boton
      async Click_Boton(texto:string,tiempo=tie){
        const sel = await this.page.getByRole('button', { name: texto, exact:true }).click({ force: true });
        await sleep(tiempo)
    }
    //Da click en un boton pide como parametro nombre de
    async Click_Opcion(opcion:Locator,tiempo=tie){
        await opcion.click()
        await sleep(tiempo)
    } 
    //Seleccionar un check
    async check(texto: Function, tiempo = tie) {
        await texto().check();
        await sleep(tiempo);
    }
    //Deselecionar un check
    async uncheck(texto: Function, tiempo = tie) {
        await texto().uncheck();
        await sleep(tiempo);
    }
    //selecciona un elemento de un campo lista desplegable cuando es ...Seleccione uno, pide como parametro selector, y nombre de opcion a seleccionar
    async SeleccioneUno(selector: Function, optcion:Function, tiempo=tie){
        await selector().click();
        await optcion().click();
        await sleep(tiempo);
    } 
    //para dar tabulador en un campo
    async Tab(selector: string,tiempo=tie){
        const sel = await this.page.locator(selector)
        await sel.press("Tab")
        await sleep(tiempo);
    } 
    ///catura pantalla 
    async Screenshot(ruta: string,tiempo=tie){
        await this.page.screenshot({path:ruta})
        await sleep(tiempo);
    }
    //Captura de pantalla completa 
    async Screenshot_Full(ruta: string,tiempo=tie){
        await this.page.screenshot({path:ruta, fullPage: true})
        await sleep(tiempo);
    }
    //Captuara pnatalla a campo en especial
    async Screenshot_Elemento(selector: string, ruta: string,tiempo=tie){
        const sel = await this.page.locator(selector)
        await this.page.screenshot({path:ruta})
        await sleep(tiempo);
    }
}