const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");


window.onload = () =>{
    formulario.addEventListener("submit", enviarFormulario);
}

function enviarFormulario(e){
    e.preventDefault();
    
    const busqueda = document.querySelector("#busqueda").value;
    if(busqueda === ''){
        mensajes("Porfavor escriba algo en el campo","error");
        return;
    }

    consultarAPI(busqueda);

}


function consultarAPI(termino){
    const urlAPI = `https://jobs.github.com/positions.json?search=${termino}`;
    const url = `https://api.allorigins.win/get?url=${ encodeURIComponent( urlAPI )}`;

    axios.get(url)
        .then( resultado => {
            const data = JSON.parse(resultado.data.contents);
            if(data.length < 1){
                mensajes("No se encontraron resultados", "error");
                return;
            }
            console.log(data);
            mostrarResultados(data);
        })
        
        

}

function mostrarResultados(data){
    
    limpiarLista();
    data.forEach(datos => {
        const {company, company_logo, company_url, created_at, description,how_to_apply,location,title,type,url} = datos;
        resultado.innerHTML += `
                <div class="shadow bg-white p-6 rounded">
                    <h2 class="text-2xl font-light mb-4">${title}</h2>
                    <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                    <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                    <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
                </div>      
        `;
    });

    // while(paginacion.firstChild){
    //     paginacion.removeChild(paginacion.firstChild);
    // }
    // imprimirPaginador();
    
}



function mensajes(mensaje, tipo){

    const alerta = document.querySelector(".alerta");
    if(!alerta){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('bg-red-100',  'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta')

        if(tipo === 'error'){
            divMensaje.innerHTML=`<strong class="font-bold">Error!</strong>
                                <span class="block sm:inline">${mensaje}</span>`;
        }else{
            
        }

        formulario.appendChild(divMensaje);

        setTimeout(() =>{
            divMensaje.remove();
        },2000);
    }    
}

function limpiarLista(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}