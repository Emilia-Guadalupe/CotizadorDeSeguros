//Cotizador Constructor para seguro

class Seguro{
    constructor(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
    } 
    cotizarSeguro(){
        /* 
        1 = americano, valor 1, 15
        2 = asiático, valor 1, 05
        3 = europeo, valor 1, 35
        */
    
        let cantidad;
        const base = 2000;
    
        switch(this.marca){
            case '1':
                cantidad = base*1.15;
                break;
            case '2':
                cantidad = base*1.05;
                break;
            case '3':
                cantidad = base*1.35;
                break;
    
        }
    
        //Leer el año
        const diferencia = new Date().getFullYear() - this.year;
    
        //Cada año de diferencia, hay que reducir 3% el costo del seguro
        cantidad -= ((diferencia * 3) * cantidad) / 100;
    
        /* 
        Si el seguro es básico, se multiplica por 30% más
        Si el segudo es completo, se multiplica por 50% más
        */
    
        if(this.tipo === 'basico'){
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }
        
        return cantidad;
    
    }
}

//Todo lo que se muestra

class Interfaz{
    //Mensaje de error y calculando
    mostrarError(mensaje, tipo){
        const div = document.createElement('div');
        if(tipo === 'error'){
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group') );
        setTimeout(function(){
            document.querySelector('.mensaje').remove();
        }, 3000);
    }

    mostrarResultado(seguro, total){
        const resultado = document.getElementById('resultado');
        let marca;
        switch(seguro.marca){
            case '1': 
                marca = 'Americano';
                break;
            case '2': 
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
            
        }
    
        //Crear un div
        const div = document.createElement('div');
        //Agregar info para el resumen
        div.innerHTML = `
        <p class='header'>Tu resumen:</p>
        <p>Marca: ${marca}</p>
        <p>Año: ${seguro.year}</p>
        <p>Tipo de cobertura: ${seguro.tipo}</p>
        <p>Total: ${total}</p>
        `;
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function(){
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 3000);
        
    }
}

//Event Listeners
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    //Leer la marca de auto seleccionada 
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //Leer el año seleccionado
    const year = document.getElementById('year');
    const yearSelected = year.options[year.selectedIndex].value;

    //Lee el valor del Radio Button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //Crear instancia de interfaz
    const interfaz = new Interfaz();

    //Revisar que los campos no estén vacíos
    if(marcaSeleccionada === '' || yearSelected === '' || tipo === ''){
        //Interfaz imprimiendo un error
        interfaz.mostrarError("Faltan datos", "error");
    } else {
        //Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }

        //Calcular seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada, yearSelected, tipo);
        //Cotizar el seguro 
        const cantidad = seguro.cotizarSeguro(seguro);
        //Mostrar resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarError('Cotizando...')
    }

} )

//Generador de opciones del Menú Select 

const max = new Date().getFullYear();
const min = max - 20;

const selectYear = document.getElementById('year');
for(let i = max; i > min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectYear.appendChild(option);
} 