"use strict"


const entrada = document.querySelector('[data-js="campoInput"]')
const pesquisar = document.querySelector('[data-js="campoButton"]')
const resultado = document.querySelector('.busca').children[2]
const historico = document.querySelector('.lateral')


function buscaCep() {
    if (entrada.value !="") {
        fetch(`https://cep.awesomeapi.com.br/${entrada.value}`)
        .then((data)=>{
           return data.json()
        })
        .then((cep)=>{
            //console.log(cep.status)
            if (cep.status ==  404) {
                resultado.innerHTML =`<br><hr><h2 class="alert">  erro</h2> `+ cep.message
            }
            
            if (cep.status ==  400) {
                resultado.innerHTML =`<br><hr><h2 class="alert"> nao encontrado</h2> `+ cep.message
            }
            else if (cep.status != 404 && cep.status !=400) {
                           
            let acumulador =`<hr>cep:${cep.cep} <br> cidade:${cep.city} <br>${cep.address}<br>estado: ${cep.state}`
            historico.innerHTML += acumulador  
            resultado.innerHTML = acumulador
        }
        })
        .then((err)=>{
            console.log(err)
        })
        //entrada.value=""
    }
    else{
        resultado.innerHTML = `<br><hr> <h2 class="alert">digite um cep</h2>`
    }
    
}

pesquisar.addEventListener("click",buscaCep)