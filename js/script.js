//Declaração de Variaveis Globais
//Elementos 
var Carousel_item = document.getElementsByClassName('carousel-js')
var contPag = document.getElementsByClassName('contador-pag')
var Selecoes = document.getElementsByClassName('project')
//Numerico
var nAnt = 0
var nAntSec = 0
var nDeg = 0
var nPosic = 0
var TamItens = 0
var nCont = 0
var ocupado = ''
var status_ = []
var lDeg = false
//Array
var ClassesAuto = ['carousel-js d-none active flex-wrap justify-content-around', 'carousel-js d-flex active flex-wrap justify-content-around' ]

//=======================Escopo=====================
TamItens = Carousel_item.length -1//Recebe a quantidade de Itens existente no carousel
//Seta o tamanho Inicial do Carousel
contPag[0].innerHTML = '1 de ' + (TamItens + 1).toString()
contPag[1].innerHTML = '1 de ' + (TamItens + 1).toString()

for(nCont = 0; nCont <= Selecoes.length -1; nCont++){
	status_[nCont] = ''
}

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

function transicao(selecao){
	var x = 0

	if(ocupado == ''){
		ocupado = 'yes'

		if(selecao == nAntSec && status_[selecao] == 'virado' 
		 || selecao != nAntSec && status_[selecao] == 'virado'){
			x = 180
			lDeg = true
		}

		var y = setInterval(function (){

			if(lDeg == true){
				x--
			}else{
				x++ 
			}

			if(x == 91 && lDeg == false){
				Selecoes[selecao].style.background = 'yellow'
			}
			else if(x == 180 && lDeg == false){
				ocupado = ''
				nAntSec = selecao
				status_[selecao] = 'virado'
				clearInterval(y)
			}

			if(x == 91 && lDeg == true){
				Selecoes[selecao].style.background = 'black'
			}
			else if(x == 0 && lDeg == true){
				lDeg = false
				ocupado = ''
				status_[selecao] = ''
				nAntSec = selecao
				clearInterval(y)
			}			
			
			Selecoes[selecao].style.transform = 'rotateY(' + x.toString() + 'deg)'
		}, 0.001)		
	}
}
