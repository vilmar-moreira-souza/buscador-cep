"use strict"


const entrada = document.querySelector('[data-js="campoInput"]')
const pesquisar = document.querySelector('[data-js="campoButton"]')
const resultado = document.querySelector('.busca').children[2]
const historico = document.querySelector('.lateral')
const historicoMobile = document.querySelector('[data-js="spanMobile"]')
historicoMobile.innerHTML += `<br><br><h2 class="noVisible" >historico</h2> `

// busca cep 
function buscaCep() {
    if (entrada.value != "") {
        fetch(`https://cep.awesomeapi.com.br/${entrada.value}`)
            .then((data) => {
                return data.json()
            })
            .then((cep) => {
                //console.log(cep)
                if (cep.status == 404) {
                    resultado.innerHTML = `<br><hr><h2 class="alert">  erro</h2> ` + cep.message
                }

                if (cep.status == 400) {
                    resultado.innerHTML = `<br><hr><h2 class="alert"> nao encontrado</h2> ` + cep.message
                }
                else if (cep.status != 404 && cep.status != 400) {
                    //console.log(cep.status)              
                    let acumulador = `<hr>cep:${cep.cep} <br> cidade:${cep.city}- ${cep.state} <br>${cep.address} <br>Bairro: ${cep.district}`
                    historico.innerHTML += acumulador
                    resultado.innerHTML = acumulador
                    historicoMobile.innerHTML += `<div class="noVisible"> ${acumulador} <div>`

                }
            })
            .then((err) => {
                console.log(err)
            })
        //entrada.value=""
    }
    else {
        resultado.innerHTML = `<br><hr> <h2 class="alert ">digite um cep</h2>`
    }

}

//procurar cep quando tecla enter for clicada
const enterCep = (event) => {
    if (event.key == "Enter") {
        buscaCep()
    }
}

entrada.addEventListener("keypress", enterCep)
pesquisar.addEventListener("click", buscaCep)