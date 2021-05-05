function listaDeTarefas() {
    const inpTarefas = document.querySelector('#inpTarefas')
    const ulTarefas = document.querySelector('.ulTarefas')
    const dvNotice = document.querySelector('.dvNotice')
    const pNote = document.querySelector('#pNote')
    let count = 0, rm

    window.addEventListener('load', () => {
        inpTarefas.focus()
        addTarefasSalvas()
    })

    document.addEventListener('click', e => {
        const el = e.target
        if (el.classList.contains('btTarefas')) {
            enviado()
            return
        }

        if (el.classList.contains('spanTarefa')) {
            el.parentElement.remove()
            salvarTarefas()
            return
        }
    })

    inpTarefas.addEventListener('keypress', e => {
        if (e.keyCode === 13) {
            enviado()
        }
    })

    function enviado() {
        const tarefa = tratarTarefa()
        if (!tarefa) return
        criarLi(tarefa)
        limparInp()
    }

    function limparInp() {
        inpTarefas.value = ''
        inpTarefas.focus()
    }

    function tratarTarefa() {
        const tarefa = inpTarefas.value.trim()
        if (!tarefa || !tarefa.replace(/\s/g, '').length) {
            clearInterval(rm)
            rmColor('success')
            addColor('danger')
            pNote.innerHTML = 'Informe algo para sua tarefa'
            dvNotice.style.display = 'block'
            limparInp()
            noneDisplay()
        } else {
            clearInterval(rm)
            rmColor('danger')
            addColor('success')
            pNote.innerHTML = 'Tarefa adicionada com sucesso!'
            dvNotice.style.display = 'block'
            limparInp()
            noneDisplay()
            return tarefa
        }
    }

    function rmColor(color) {
        dvNotice.classList.remove(color)
    }

    function addColor(color) {
        dvNotice.classList.add(color)
    }

    function noneDisplay() {
        count = 0
        rm = setInterval(() => {
            if (count === 2) {
                dvNotice.style.display = 'none'
                clearInterval(rm)
            } else {
                count++
            }
        }, 1000)
    }

    function criarLi(tarefa) {
        const li = criarEl('li')
        addChild(li, addConteudo(tarefa))
        criarSpanLi(li)
    }

    function criarSpanLi(li) {
        const span = criarEl('span')
        span.setAttribute('class', 'spanTarefa material-icons-outlined')
        addChild(span, addConteudo('delete_forever'))
        addChild(li, span)
        addTarefa(li)
    }

    function addTarefa(li) {
        addChild(ulTarefas, li)
        salvarTarefas()
    }

    function criarEl(el) { return document.createElement(el) }

    function addConteudo(cont) { return document.createTextNode(cont) }

    function addChild(pai, filho) { return pai.appendChild(filho) }

    function salvarTarefas() {
        const liTarefas = ulTarefas.querySelectorAll('li')
        const listaDeTarefas = []

        for (let tarefa of liTarefas) {
            let tarefaTexto = tarefa.innerText
            tarefaTexto = tarefaTexto.replace('delete_forever', '').trim()
            listaDeTarefas.push(tarefaTexto)
        }
        const tarefasJSON = JSON.stringify(listaDeTarefas)
        localStorage.setItem('tarefas', tarefasJSON)
    }

    function addTarefasSalvas() {
        const tarefas = localStorage.getItem('tarefas')
        const lstTarefas = JSON.parse(tarefas)

        for (let tarefas of lstTarefas) {
            criarLi(tarefas)
        }
    }

}
listaDeTarefas()