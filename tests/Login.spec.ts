import { test, expect, chromium, Page } from '@playwright/test';
import { PTS } from '../common/Funciones';
import { Common } from '../common/commo';
import dotenv from 'dotenv';

import { LoginPage } from "../pageObjects/LoginPage/loginPage";



dotenv.config()
//valiables Globales
let tg:number=300;
let f:any=0;
let page:Page;
let browser:any;
let context:any;


let common = new Common();
let date: Date = new Date();
let loginPage: LoginPage;





test.describe('Escenarios Login TVT', () => {
  // Define una función llamada sleep que toma un parámetro ms, que representa la cantidad de milisegundos que se deben esperar 
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

test.beforeAll(async () => {
  browser=await chromium.launch({});// Inicia un nuevo navegador Chromium 
  context=await browser.newContext({}); // Crea un nuevo contexto en el navegador
  page=await context.newPage();// Abre una nueva página en el contexto
  
  f = new PTS(page);// Crea una nueva instancia de la clase PTS, pasando la página como argumento
  loginPage = new LoginPage(page)

  await f.OpenUrl(process.env.url + "/web/index.php/auth/login");// Abre una URL construida a partir de la variable de entorno 'url' y navega a la página de inicio de sesión
  await f.Validar_Titulo("OrangeHRM");// Valida que el título de la página sea "OrangeHRM"
  await f.Validar_Url(process.env.url + "/web/index.php/auth/login");// Valida que la URL de la página sea la esperada, construida a partir de la variable de entorno 'url'
});


test('Verificar login usuario y contraseña inavido', async () => {
  test.info().annotations.push({
    type: 'Login',
    description: 'Escenario para Verificar login ingresando un usuario y contraseña inavido'
  })
  const{
    getTxtUsuario,
    getTxtPassword,
  }= loginPage.elements

  await test.step('Dado que ingresado usuario y contraseña inavlidas', async () => {
    await f.Escribir_Texto(getTxtUsuario, '123', tg)
    await f.Escribir_Texto(getTxtPassword, 'xxx', tg)
  })

  await test.step('Cuando el usuario da clic en el botón Login', async () => {
    await f.Click_Boton('Login', tg)
    await sleep(1000);    
  })

  await test.step('Entonces deberia presentar una alerta que indique credenciales invalidas', async () => {
    await f.Validar_Texto("//p[contains(.,'Invalid credentials')]", "Invalid credentials",tg)
    await f.Screenshot(process.env.ruta_screen_inicio + 'Login usuario y contraseña inavalida'+ " " + date.getFullYear()+ " "+ "M" +(new Date().getMonth()+ 1)+ " "+ "D" + date.getDate()+ " "+ "H" + date.getHours()+ " "+ "m" + date.getMinutes()+ '.png', tg)   
  })
})
test('Verificar login Contraseña inavlida', async () => {
  test.info().annotations.push({
    type: 'Login',
    description: 'Escenario para Verificar login ingresando Contraseña inavlida'
  })
  const{
    getTxtUsuario,
    getTxtPassword,
  }= loginPage.elements

  await test.step('Dado que ingresado contraseña inavalida @Inicio', async () => {
    await f.Escribir_Texto(getTxtUsuario, 'Admin', tg)
    await f.Escribir_Texto(getTxtPassword, '123', tg)   
  })
  await test.step('Cuando el usuario da clic en el botón Login', async () => {
    await f.Click_Boton('Login', tg)
    await sleep(1000);    
  })
  await test.step('Entonces deberia presentar una alerta que indique credenciales invalidas', async () => {
    await f.Validar_Texto("//p[contains(.,'Invalid credentials')]", "Invalid credentials",tg)
    await f.Screenshot(process.env.ruta_screen_inicio + 'Login contraseña inavalida'+ " " + date.getFullYear()+ " "+ "M" +(new Date().getMonth()+ 1)+ " "+ "D" + date.getDate()+ " "+ "H" + date.getHours()+ " "+ "m" + date.getMinutes()+ '.png', tg)    
  })
})

test('Verificar login exitoso', async () => {
  test.info().annotations.push({
    type: 'Login',
    description: 'Escenario para Verificar login ingresando creciales validas'
  })
  
  const{
    getTxtUsuario,
    getTxtPassword,
  }= loginPage.elements

  await test.step('Dado que ingresado contraseña y usuario validos @Inicio', async () => {
    await f.Escribir_Texto(getTxtUsuario, 'Admin', tg)
    await f.Escribir_Texto(getTxtPassword, 'admin123', tg)
  })
  await test.step('Cuando el usuario da clic en el botón Login', async () => {
    await f.Click_Boton('Login', tg)
    await sleep(1000);    
  })
  await test.step('Entonces deberia el sistema direcionarme al home de aplicacion', async () => {
    await f.Validar_Texto("//h6[contains(.,'Dashboard')]", "Dashboard",tg)
    await page.waitForLoadState('load');
    await f.Screenshot(process.env.ruta_screen_inicio + 'Login exitoso'+ " " + date.getFullYear()+ " "+ "M" +(new Date().getMonth()+ 1)+ " "+ "D" + date.getDate()+ " "+ "H" + date.getHours()+ " "+ "m" + date.getMinutes()+ '.png', tg)    
  })
})

test.afterAll(async()=>{
  await page.close();// Cierra la página
  await context.close();// Cierra el contexto
  await browser.close();// Cierra el navegador
})

});
