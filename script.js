document.addEventListener('DOMContentLoaded', () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtos = [
        { id: 1, nome: 'Produto 1', preco: 50 },
        { id: 2, nome: 'Produto 2', preco: 100 },
        { id: 3, nome: 'Produto 3', preco: 150 }
    ];

    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalElement = document.getElementById('total');
    const botaoFinalizar = document.getElementById('finalizar-compra');

    const atualizarCarrinho = () => {
        listaCarrinho.innerHTML = '';
        let total = 0;
        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.textContent = ${item.nome} - R$ ${item.preco.toFixed(2)};
            listaCarrinho.appendChild(li);
            total += item.preco;
        });
        totalElement.textContent = total.toFixed(2);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    };

    document.querySelectorAll('.adicionar-carrinho').forEach(button => {
        button.addEventListener('click', () => {
            const produtoId = parseInt(button.parentElement.getAttribute('data-id'));
            const produto = produtos.find(p => p.id === produtoId);
            if (produto) {
                carrinho.push(produto);
                atualizarCarrinho();
            }
        });
    });

    botaoFinalizar.addEventListener('click', () => {
        if (carrinho.length > 0) {
            alert('Compra finalizada com sucesso!');
            carrinho.length = 0;
            localStorage.removeItem('carrinho');
            atualizarCarrinho();
        } else {
            alert('Seu carrinho está vazio.');
        }
    });

    atualizarCarrinho();
});