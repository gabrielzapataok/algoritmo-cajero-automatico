/*clase billete*/
class Billete{
  constructor(valor,cantidad){
    this.valor = valor
    this.cantidad = cantidad
  }
}

/*elementos del DOM*/
const inputNumber = document.getElementById("dinero");
const inputButon = document.getElementById("extraer");

const diez = document.getElementById("diez");
const veinte = document.getElementById("veinte");
const cincuenta = document.getElementById("cincuenta");
const cien = document.getElementById("cien");
const dosientos = document.getElementById("dosientos");
const quinientos = document.getElementById("quinientos");
const mil = document.getElementById("mil");

/*configuracion inicial*/
let billetesEntregados = []
let billetesEnCaja = []

billetesEnCaja.push(new Billete(500,5))
billetesEnCaja.push(new Billete(100,5))
billetesEnCaja.push(new Billete(50,10))
billetesEnCaja.push(new Billete(20,5))
billetesEnCaja.push(new Billete(10,10))

function renderizarResultado(billetesEntregados) {
  for(let billete of billetesEntregados){
    switch (billete.valor) {
      case 10: if(billete.cantidad > 0){ diez.textContent = billete.cantidad};break;
      case 20: if(billete.cantidad > 0){ veinte.textContent = billete.cantidad};break;
      case 50: if(billete.cantidad > 0){ cincuenta.textContent = billete.cantidad};break;
      case 100: if(billete.cantidad > 0){ cien.textContent = billete.cantidad};break;
      case 200: if(billete.cantidad > 0){ dosientos.textContent = billete.cantidad};break;
      case 500: if(billete.cantidad > 0){ quinientos.textContent = billete.cantidad};break;
      case 1000: if(billete.cantidad > 0){ mil.textContent = billete.cantidad};break;
      default: break;
    }
  }
}

function entregarDinero(){
  let division = 0
  let billetesQueEntregar = 0
  
  /*Almaceno el valor que el cliente quiere extraer*/
  let extraccion = parseInt(inputNumber.value);
  
  /*Por cada tipo de billete que existe*/
  for(let tipoDeBillate of billetesEnCaja){

    /*Divido la extraccion entre el tipo de billete*/
    division = Math.floor(extraccion / tipoDeBillate.valor);

    /*Si el resultado es mayor a la cantidad de billetes de ese tipo*/
    if(division > tipoDeBillate.cantidad){

      /*Entrego toda esa cantidad de billetes de ese tipo que hay*/
      billetesQueEntregar = tipoDeBillate.cantidad;

    }else{

      /*Sino entrego solo la cantidad de billetes que me dio la division*/
      billetesQueEntregar = division;

    }

    /*Calculo los billetes que voy a darle al cliente */
    billetesEntregados.push(new Billete(tipoDeBillate.valor, billetesQueEntregar));

    /* Descuento de su extrccion el valor de los billetes que ya le di */
    extraccion = extraccion - (tipoDeBillate.valor * billetesQueEntregar);

  }

  /*Actualizo el dom*/
  renderizarResultado(billetesEntregados);

}

inputButon.addEventListener("click", entregarDinero);
