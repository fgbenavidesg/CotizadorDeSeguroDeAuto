//constructores
function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//realiza la cotizacion con los datos

Seguro.prototype.cotizarSeguro = function(){
    /*
        1 = americano 1.15
        2 = asiatico 1.05
        3= europeo  1.35
    */
   let cantidad;
   const base = 2000;

     switch(this.marca){

        case '1' :
                cantidad = base *1.15;
                break;
        
        case '2' :
                cantidad = base *1.05;
                break;
        case '3' :
                cantidad = base *1.35;
                break;

        default: 
            break;
     }
     //LEER AÑO
     const diferencia = new Date().getFullYear() - this.year;
     //CADA AÑO QUE LA DIF ES MAYOR, EL COSTO VA A REDUCIRSE EN 3%
     cantidad -= ((diferencia * 3 ) * cantidad ) / 100;

     /* seguro basico se multiplica por un 30 % mas 
     seguro completo se multiplica por un 50% mas*/
     if(this.tipo==='basico'){
         cantidad *= 1.30;
     }else{
         cantidad*=1.50;
     }
     return cantidad;
}

function UI(){}

UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear();
    min = max - 20;

   const selectYear =  document.querySelector('#year');

   for(let i = max; i > min; i-- ){

        let option = document.createElement('option');
        option.value = i;
        option.textContent=i;
        selectYear.appendChild(option);
        

   }
   
}
//muestra mensajes de alerta
UI.prototype.mostrarMensaje = (msj,tipo) =>{

    const div = document.createElement('div');
    if(tipo==='error'){
        div.classList.add('mensaje','error','mt-10');
    }else{
        div.classList.add('mensaje','correcto','mt-10');    
    }
    div.textContent = msj;

    //insertar en html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div,document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado =(seguro, total) =>{
    let texto;
    switch(seguro.marca){

        case '1' :
                texto = "Americana";
                break;
        
        case '2' :
                texto = "Asiatico";
                break;
        case '3' :
                texto = "Europeo";
                break;

        default: 
            break;
     }
    const div =document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML=`
        <p class="header" > tu resumen </p>
        <p class="font-bold">total : $ ${total} </p>
        <p class="font-bold">marca : ${texto} </p>
        <p class="font-bold">año :  ${seguro.year} </p>
        <p class="font-bold">tipo :  ${seguro.tipo} </p>
    `;
    const resultadoDiv = document.querySelector('#resultado');
    
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display='none'; // se borra el spinner    

        resultadoDiv.appendChild(div);// se muestra el resultado
    }, 3000);

}   
//instancia UI
const ui = new UI(); 

document.addEventListener('DOMContentLoaded',()=>{

    ui.llenarOpciones();
});

function addEventListener() {

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro); 

}
addEventListener();

function cotizarSeguro(e){
    e.preventDefault();
    //leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    //leer el año seleccionado
    const year = document.querySelector('#year').value;
    //leer el tipo de covertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //valida si esta vacio
    if(marca === '' || year ==='' || tipo ===''){
        ui.mostrarMensaje('todos los campos son obligatorios','error');
        return;
    }
    ui.mostrarMensaje('cotizando...','correcto');
    //ocultar las cotizaciones previas
     const resultados = document.querySelector('#resultado div');
     if(resultados != null){
        resultados.remove();
     }
        
    //instanciar el seguro
    const seguro = new Seguro(marca,year,tipo);
    //utilizar el prototype que va a cotizar
    const total = seguro.cotizarSeguro();

    ui.mostrarResultado(seguro,total);

}
