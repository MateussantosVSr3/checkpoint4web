// Função para adicionar ou atualizar um produto no carrinho
function adicionarProduto(id, nome, valor, quantidade) {
    // Obter os produtos do localStorage ou criar um novo array vazio
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verificar se o produto já está no carrinho
    let produtoExistente = carrinho.find(produto => produto.id === id);

    if (produtoExistente) {
        // Se o produto já existe, apenas atualizar a quantidade
        produtoExistente.quantidade += quantidade;
    } else {
        // Caso contrário, adicionar o novo produto ao array
        carrinho.push({ id, nome, valor, quantidade });
    }

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualizar a exibição do carrinho
    exibirCarrinho();
}

// Função para remover um produto do carrinho
function removerProduto(id) {
    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Filtrar os produtos, removendo o produto com o id especificado
    carrinho = carrinho.filter(produto => produto.id !== id);

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualizar a exibição do carrinho
    exibirCarrinho();
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Verificar se o carrinho está vazio
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    if (carrinho && carrinho.length > 0) {
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${produto.valor.toFixed(2)}`;

            // Criar botão de remover
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.onclick = () => removerProduto(produto.id);
            li.appendChild(btnRemover);

            listaProdutos.appendChild(li);
        });
    } else {
        // Exibir a mensagem de carrinho vazio
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}

// Função para incrementar a quantidade de um produto existente
function incrementarProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    let produtoExistente = carrinho.find(produto => produto.id === id);

    if (produtoExistente) {
        produtoExistente.quantidade++;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        exibirCarrinho();
    }
}

// Inicialização da aplicação: verificar se há produtos no carrinho e exibi-los
exibirCarrinho();
