//Declaração de Variaveis Globais
//Elementos 
var Carousel_item = document.getElementsByClassName('carousel-js')
var contPag = document.getElementsByClassName('contador-pag')
//Numerico
var nAnt = 0
var nPosic = 0
var TamItens = 0
//Array
var ClassesAuto = ['carousel-js d-none active flex-wrap justify-content-around', 'carousel-js d-flex active flex-wrap justify-content-around' ]

//=======================Escopo=====================
TamItens = Carousel_item.length -1//Recebe a quantidade de Itens existente no carousel
//Seta o tamanho Inicial do Carousel
contPag[0].innerHTML = '1 de ' + (TamItens + 1).toString()
contPag[1].innerHTML = '1 de ' + (TamItens + 1).toString()

//=======================Funções====================
function mudarPagina(opc){

	//Aqui ele guarda a posição da proxima página selecionada pelo usuario
	switch(opc){
		case 1:
			nPosic--
			nAnt = nPosic + 1
			break
		case 2:
			nPosic++
			nAnt = nPosic - 1
			break
	}

	//Verifica se atingiu os limites dos itens do carousel e reseta a posição
	nPosic = decrementaValor(nPosic, TamItens)
	nAnt = decrementaValor(nAnt, TamItens)

	//Troca a Página Selecionada
	Carousel_item[nAnt].className = ClassesAuto[0]
	Carousel_item[nPosic].className = ClassesAuto[1]
	contPag[0].innerHTML = (nPosic + 1).toString() + ' de ' + (TamItens + 1).toString()
	contPag[1].innerHTML = (nPosic + 1).toString() + ' de ' + (TamItens + 1).toString()
}

function decrementaValor(nValor, nLimite){
	if(nValor < 0){
		nValor = nLimite
	}
	else if(nValor > nLimite){
		nValor = 0
	}
	
	return nValor
}