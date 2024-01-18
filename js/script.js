//Declaração de Variaveis Globais
//Elementos 
var Carousel_item = [document.getElementsByClassName('carousel-js'),document.getElementsByClassName('carousel-js-pj')]
var Selecoes = document.getElementsByClassName('project')
//Numerico
var nAntSec = 0
var nPosic = 0
var nCont = 0
//Array
var ClassesAuto = [['carousel-js d-none active flex-wrap justify-content-around', 'carousel-js d-flex active flex-wrap justify-content-around'],
	['carousel-js-pj d-none flex-wrap justify-content-around', 'carousel-js-pj d-flex flex-wrap justify-content-around']]
var status_ = []
var nPosic = [0, 0]
var nAnt = [0, 0]
var TamItens = [0,0]
var contPag = [[], []]
//Funções anonimas
var rotacao = function (val, item, selecao) {
	var bloco = document.getElementById('selec' + selecao)
	if (val == 0) {
		bloco.className = 'container-fluid d-block w-100'
		bloco.style.transform = 'rotateY(180deg)'
	} else {
		bloco.className = 'container-fluid d-none'
		item.style.background = "url('img/bg-total.png') no-repeat center"
		item.style.backgroundSize = 'cover'
	}
}


//=======================Escopo=====================
//Busca os Elementos para Contador do Carousel
contPag[0] = document.getElementsByClassName('contador-pag')
contPag[1] = document.getElementsByClassName('contador-pag-pj')
//Recebe a quantidade dos Itens existentes no carousel
TamItens[0] = Carousel_item[0].length - 1
TamItens[1] = Carousel_item[1].length - 1

//Seta o tamanho Inicial para os dois carousel da Página
contPag[0][0].innerHTML = '1 de ' + (TamItens[0] + 1).toString()
contPag[0][1].innerHTML = '1 de ' + (TamItens[0] + 1).toString()

contPag[1][0].innerHTML = '1 de ' + (TamItens[1] + 1).toString()
contPag[1][1].innerHTML = '1 de ' + (TamItens[1] + 1).toString()

//Guarda Quantos Projetos Estão Disponiveis na Página
for (nCont = 0; nCont <= Selecoes.length - 1; nCont++) {
	status_[nCont] = 0
}

//=======================Funções====================
function mudarPagina(opc, conteudoPagina) {

	//Aqui ele guarda a posição da proxima página selecionada pelo usuario
	switch (opc) {
		case 1:
			nPosic[conteudoPagina] --
			nAnt[conteudoPagina] = nPosic[conteudoPagina] + 1
			break
		case 2:
			nPosic[conteudoPagina] ++
			nAnt[conteudoPagina] = nPosic[conteudoPagina] - 1
			break
	}

	//Verifica se atingiu os limites dos itens do carousel e reseta a posição
	nPosic[conteudoPagina] = decrementaValor(nPosic[conteudoPagina], TamItens[conteudoPagina])
	nAnt[conteudoPagina] = decrementaValor(nAnt[conteudoPagina], TamItens[conteudoPagina])

	//Troca a Página Selecionada
	Carousel_item[conteudoPagina][nAnt[conteudoPagina]].className = ClassesAuto[conteudoPagina][0]
	Carousel_item[conteudoPagina][nPosic[conteudoPagina]].className = ClassesAuto[conteudoPagina][1]
	contPag[conteudoPagina][0].innerHTML = (nPosic[conteudoPagina] + 1).toString() + ' de ' + (TamItens[conteudoPagina] + 1).toString()
	contPag[conteudoPagina][1].innerHTML = (nPosic[conteudoPagina] + 1).toString() + ' de ' + (TamItens[conteudoPagina] + 1).toString()
}

function decrementaValor(nValor, nLimite) {
	if (nValor < 0) {
		nValor = nLimite
	}
	else if (nValor > nLimite) {
		nValor = 0
	}

	return nValor
}

function transicao(selecao) {
	//Objeto
	var y = null
	//Numerico
	var x = 0
	var nValEsp = 0
	var nOpc = 0

	if (status_[selecao] > 0) {
		nOpc = 1
		nValEsp = 0
		x = status_[selecao]
	}
	else {
		nOpc = 0
		nValEsp = 180
	}

	y = setInterval(function () {

		Selecoes[selecao].style.transform = 'rotateY(' + x.toString() + 'deg)'
		if (x == nValEsp) {
			clearInterval(y)
		} else if (x == 91) {
			rotacao(nOpc, Selecoes[selecao], selecao)
		}
		status_[selecao] = x
		x = decrementoAcremento(x, nOpc)
	}, 1)
}

function decrementoAcremento(val, nOpc) {

	switch (nOpc) {
		case 0:
			val++
			break
		case 1:
			val--
			break
	}
	return val
}