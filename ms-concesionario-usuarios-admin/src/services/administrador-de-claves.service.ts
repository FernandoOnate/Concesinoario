import {injectable, /* inject, */ BindingScope} from '@loopback/core';
var generatePassword = require('password-generator');
var CryptoJS = require("crypto-js");
@injectable({scope: BindingScope.TRANSIENT})
export class AdministradorDeClavesService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  GenerarClaveAleatoria() {
    let claveAleatoria = generatePassword(10, false);
    return claveAleatoria;
  }
  CifrarC(text:string) {
    let Ccifrada = CryptoJS.MD5(text).toString();
    return Ccifrada;
  }
}
