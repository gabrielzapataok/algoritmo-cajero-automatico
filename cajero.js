/*Clase billete*/
class Billete{
  constructor(valor,cantidad){
    this.valor = valor
    this.cantidad = cantidad
  }
}

/*Elementos billetes del DOM*/
const diez = document.getElementById("diez");
const veinte = document.getElementById("veinte");
const cincuenta = document.getElementById("cincuenta");
const cien = document.getElementById("cien");
const dosientos = document.getElementById("dosientos");
const quinientos = document.getElementById("quinientos");
const mil = document.getElementById("mil");

const inputNumber = document.getElementById("dinero");
const inputButon = document.getElementById("extraer");
const dineroEnCajaDOM = document.getElementById("dineroEnCaja")

/*Configuracion inicial*/
let billetesEntregados = []
let billetesEnCaja = []

billetesEnCaja.push(new Billete(1000,5))
billetesEnCaja.push(new Billete(500,5))
billetesEnCaja.push(new Billete(200,0))
billetesEnCaja.push(new Billete(100,5))
billetesEnCaja.push(new Billete(50,10))
billetesEnCaja.push(new Billete(20,5))
billetesEnCaja.push(new Billete(10,10))

function imprimirDineroEnCaja(){
  billetesEnCaja.forEach(billete => {
    dineroEnCaja.innerHTML += `<p>${billete.cantidad} billetes de ${billete.valor}</p>`
  })
}

const render = (billete,element) => billete.cantidad > 0 ? element.textContent = billete.cantidad : element.textContent = ''

/*Funcion que renderiza los billetes que el cajero le entrega al cliente*/
const renderizarResultado = (billetesEntregados) => {

  /*Por cada item del arreglo billetesEntregados*/
  for(let billete of billetesEntregados){
    
    /*Dependiendo del valor de este billete*/
    switch (billete.valor) {

      /*Renderizo el billete en el elemento DOM*/
      case 10: render(billete,diez);
        break;
      case 20: render(billete,veinte);
        break;
      case 50: render(billete,cincuenta);
        break;
      case 100: render(billete,cien);
        break;
      case 200: render(billete,dosientos);
        break;
      case 500: render(billete,quinientos);
        break;
      case 1000: render(billete,mil);
        break;
      default: break;
    }
  }
}

let division = 0
let billetesQueEntregar = 0

function entregarDinero(){
  
  /*Almaceno el valor que el cliente quiere extraer*/
  let extraccion = parseInt(inputNumber.value)

  if( extraccion < 10 ){
    console.log('es una cifra demasiado chica')
  }else if( extraccion % 10 != 0 ){
    console.log('no tengo moneditas jeje')
  }else{
    /*Por cada tipo de billete que existe*/
    for(let tipoDeBillate of billetesEnCaja){
      /*Divido la extraccion entre el tipo de billete*/
      division = Math.floor(extraccion / tipoDeBillate.valor);
      /*Si el resultado es mayor a la cantidad de billetes de ese tipo*/
      if(division > tipoDeBillate.cantidad){
        /*Entrego toda esa cantidad de billetes de ese tipo que hay*/
        billetesQueEntregar = tipoDeBillate.cantidad;
        /*Sino entrego solo la cantidad de billetes que me dio la division*/
      }else{billetesQueEntregar = division;}
      /*Calculo los billetes que voy a darle al cliente */
      billetesEntregados.push(new Billete(tipoDeBillate.valor, billetesQueEntregar));
      /* Descuento de su extrccion el valor de los billetes que ya le di */
      extraccion = extraccion - (tipoDeBillate.valor * billetesQueEntregar);
    }
    /*Descuento el dinero entregado de el dinero que esta en la caja*/
    /*En proceso*/
  }

  /*Actualizo el dom*/
  renderizarResultado(billetesEntregados);

}

inputButon.addEventListener("click", entregarDinero);