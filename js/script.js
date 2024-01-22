//Declaração de Variaveis Globais
//Elementos 
var Carousel_item = [document.getElementsByClassName('carousel-js'), document.getElementsByClassName('carousel-js-pj')]
var Selecoes = document.getElementsByClassName('project')
var TitulosPj = document.getElementsByClassName('titulo_projetos-js')
var CaixaSelecao = document.getElementsByClassName('select-box')
var Secoes = document.getElementsByTagName('section')
var Certificados = document.getElementsByClassName('posicao')
var FotosCertificados = document.getElementsByClassName('borda-foto')
//Numerico
var nAntSec = 0
var nCont = 0
var nSection = 1
//Array
var ClassesAuto = [['carousel-js d-none active flex-wrap justify-content-around', 'carousel-js d-flex active flex-wrap justify-content-around'],
['carousel-js-pj d-none flex-wrap justify-content-around', 'carousel-js-pj d-flex flex-wrap justify-content-around']]
var status_ = []
var nPosic = [0, 0]
var nAnt = [0, 0]
var TamItens = [0, 0]
var contPag = [[], []]
var aDeg = [14, 12, 10, 8, 6, 4, 2]
//Funções anonimas
var rotacao = function (val, item, selecao) {
	var bloco = document.getElementById('selec' + selecao)
	if (val == 0) {
		bloco.className = 'container-fluid d-block w-100'
		bloco.style.transform = 'rotateY(180deg)'
		TitulosPj[selecao].className = 'text-center font-weight-bold text-warning d-none titulo_projetos-js'
	} else {
		bloco.className = 'container-fluid d-none'
		item.style.background = "url('img/bg-total.png') no-repeat center"
		item.style.backgroundSize = 'cover'
		TitulosPj[selecao].className = 'text-center font-weight-bold text-warning d-block titulo_projetos-js'
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
/*
===========================================================
Função: mudarPagina(opção a ser selecionado, numero da Página)
Motivo: Responsavel por mudar a página do carousel
Data: 20/01/2024
Programador(a): Ighor Drummond
===========================================================
*/
function mudarPagina(opc, conteudoPagina) {

	//Aqui ele guarda a posição da proxima página selecionada pelo usuario
	switch (opc) {
		case 1:
			nPosic[conteudoPagina]--
			nAnt[conteudoPagina] = nPosic[conteudoPagina] + 1
			break
		case 2:
			nPosic[conteudoPagina]++
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
/*
===========================================================
Função: decrementaValor(valor a ser decrementado, Limite para verificação)
Motivo: Verifique se o valor chegou no limite desejado
Data: 20/01/2024
Programador(a): Ighor Drummond
===========================================================
*/
function decrementaValor(nValor, nLimite) {
	if (nValor < 0) {
		nValor = nLimite
	}
	else if (nValor > nLimite) {
		nValor = 0
	}

	return nValor
}
/*
===========================================================
Função: transicao(numero do elemento a sofrer uma transição)
Motivo: Responsavel por mostrar os projetos após ser selecionado
Data: 20/01/2024
Programador(a): Ighor Drummond
===========================================================
*/
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

	//Ativa ou Desative o Card Inferior dos Projetos
	abreCaixa(nOpc, selecao)

	//Rotaciona para abrir ou fechar os Cards Principais
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
/*
===========================================================
Função: decrementoAcremento(valor a ser operado, opção desejada)
Motivo: Função Responsavel por subtrair ou somar um valor determinado
Data: 20/01/2024
Programador(a): Ighor Drummond
===========================================================
*/
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
/*
===========================================================
Função: abreCaixa(Opção a Ser Considerada, Card Selecionado)
Motivo: Ajusta a Entrada e Saíada Animada do Card Inferior dos Projetos
Data: 20/01/2024
Programador(a): Ighor Drummond
===========================================================
*/
function abreCaixa(nOpc, selecao) {

	switch (nOpc) {
		case 0:
			CaixaSelecao[selecao].style.animation = 'acessaCard 1s'
			CaixaSelecao[selecao].className = 'bg-white select-box border border-dark text-white nt-weight-bold p-2 text-center d-block'
			break
		case 1:
			CaixaSelecao[selecao].style.animation = 'saiCard 1s'
			var tiemOut = setTimeout(function () {
				CaixaSelecao[selecao].className = 'bg-white select-box border border-dark text-white nt-weight-bold p-2 text-center d-none'
			}, 900)
			break
	}

}
/*
===========================================================
Função: certificado(Posição do Certificado)
Motivo: Ajusta a Exibição do Proximo Certificado
Data: 22/01/2024
Programador(a): Ighor Drummond
===========================================================
*/
function certificado(nPosic) {

	if (nPosic == 0) {
		certificadoMostra()
	}
	else {
		Certificados[nPosic].className = 'itemC0' + (nPosic + 1).toString + ' posicao w-100 text-center d-none'
	}
}
/*
===========================================================
Função: certificadoMostra()
Motivo: Ajusta a Exibição de Todos os Certificados
Data: 22/01/2024
Programador(a): Ighor Drummond
===========================================================
*/
function certificadoMostra() {
	var nCont = 1
	var p = null
	
	p = setInterval(function () {
		Certificados[nCont].className ='itemC0' + (nCont + 1).toString + ' posicao w-100 mt-3 text-center'
		FotosCertificados[nCont].animate([
			// keyframes
			{ transform: "rotateZ(0)", opacity: "0" },
			{ transform: "rotateZ(" + aDeg[nCont].toString() + "deg)", opacity: "1" }
		], {
			// timing options
			duration: 450,
			iterations: 1
		});

		if(nCont == 5){
			clearInterval(p)
		}

		nCont++
	}, 450)
}
