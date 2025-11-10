// ================= VERIFICAÇÃO DE LOGIN =================
function verificarLogin() {
    const usuario = localStorage.getItem('usuario');
    const idFuncionario = localStorage.getItem('idFuncionario');
    
    if (!usuario || !idFuncionario) {
        if (!window.location.href.includes('login.html') && 
            !window.location.href.includes('splash.html')) {
            window.location.href = 'login.html';
        }
        return false;
    }
    return true;
}

// ================= DADOS DO SISTEMA =================
const dadosSistema = {
    tarefas: JSON.parse(localStorage.getItem('tarefas')) || [
        { id: 1, titulo: "Revisar relatório mensal", status: "pendente", prioridade: "alta" },
        { id: 2, titulo: "Enviar planilha de custos", status: "andamento", prioridade: "media" },
        { id: 3, titulo: "Preparar apresentação", status: "pendente", prioridade: "alta" },
        { id: 4, titulo: "Reunião com equipe", status: "concluido", prioridade: "baixa" },
        { id: 5, titulo: "Atualizar documentos", status: "andamento", prioridade: "media" }
    ],
    
    conversas: JSON.parse(localStorage.getItem('conversas')) || [
        {
            id: 1,
            nome: "João Silva",
            status: "online",
            ultimaMensagem: "Você poderia revisar o relatório que enviei?",
            hora: "há 2 min",
            mensagens: [
                { texto: "Olá, você poderia revisar o relatório que enviei?", hora: "10:30", enviada: false },
                { texto: "Claro! Já estou analisando. Só preciso de mais algumas informações sobre os dados do último trimestre.", hora: "10:32", enviada: true },
                { texto: "Perfeito! Vou preparar essas informações e te envio até o final do dia.", hora: "10:33", enviada: false },
                { texto: "Ótimo! Enquanto isso, vou ajustando a análise com os dados que já tenho.", hora: "10:34", enviada: true },
                { texto: "Obrigado pela agilidade! Precisamos entregar esse projeto até sexta-feira.", hora: "10:35", enviada: false }
            ]
        },
        {
            id: 2,
            nome: "Maria Santos",
            status: "online",
            ultimaMensagem: "Reunião confirmada para amanhã",
            hora: "há 5 min",
            mensagens: []
        },
        {
            id: 3,
            nome: "Pedro Oliveira",
            status: "offline",
            ultimaMensagem: "Documentos aprovados",
            hora: "há 1 hora",
            mensagens: []
        },
        {
            id: 4,
            nome: "Ana Torres",
            status: "disponivel",
            ultimaMensagem: "Preciso da sua assinatura",
            hora: "há 30 min",
            mensagens: []
        },
        {
            id: 5,
            nome: "Equipe Geral",
            status: "grupo",
            ultimaMensagem: "12 participantes",
            hora: "há 2 horas",
            mensagens: []
        }
    ],
    
    usuario: {
        nome: localStorage.getItem('usuario') || 'Usuário',
        id: localStorage.getItem('idFuncionario') || '0000',
        cargo: 'Analista',
        departamento: 'TI',
        email: 'usuario@empresa.com',
        telefone: '(11) 99999-9999'
    }
};

// ================= NAVEGAÇÃO ENTRE TELAS =================
function configurarNavegacao() {
    const links = document.querySelectorAll('[data-tela]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tela = link.getAttribute('data-tela');
            carregarTela(tela);
            
            // Atualiza menu ativo
            links.forEach(l => l.classList.remove('ativo'));
            link.classList.add('ativo');
        });
    });
}

// ================= CARREGAR TELAS =================
function carregarTela(tela) {
    const conteudo = document.getElementById('conteudo');
    if (!conteudo) return;

    const pageTitle = document.getElementById('pageTitle');
    
    switch(tela) {
        case 'inicio':
            pageTitle.textContent = 'Dashboard';
            carregarDashboard();
            break;
            
        case 'tarefas':
            pageTitle.textContent = 'Minhas Tarefas';
            carregarTarefas();
            break;
            
        case 'agenda':
            pageTitle.textContent = 'Agenda';
            carregarAgenda();
            break;
            
        case 'chat':
            pageTitle.textContent = 'Chat da Equipe';
            carregarChat();
            break;
            
        case 'perfil':
            pageTitle.textContent = 'Meu Perfil';
            carregarPerfil();
            break;
            
        default:
            carregarDashboard();
    }
}

function carregarDashboard() {
    const tarefasPendentes = dadosSistema.tarefas.filter(t => t.status === 'pendente').length;
    const tarefasAndamento = dadosSistema.tarefas.filter(t => t.status === 'andamento').length;
    const mensagensNovas = dadosSistema.conversas.reduce((total, conv) => total + conv.mensagens.length, 0);

    document.getElementById('conteudo').innerHTML = `
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Tarefas Pendentes</h3>
                <div class="numero">${tarefasPendentes}</div>
            </div>
            <div class="dashboard-card">
                <h3>Em Andamento</h3>
                <div class="numero">${tarefasAndamento}</div>
            </div>
            <div class="dashboard-card">
                <h3>Mensagens</h3>
                <div class="numero">${mensagensNovas}</div>
            </div>
        </div>

        <div class="card">
            <h2>Próximas Tarefas</h2>
            <div class="tarefas-lista">
                ${dadosSistema.tarefas.filter(t => t.status !== 'concluido').slice(0, 3).map(tarefa => `
                    <div class="tarefa-item ${tarefa.status}">
                        <span>${tarefa.titulo}</span>
                        <div class="tarefa-botoes">
                            <button class="btn-mover btn-andamento" onclick="moverTarefa(${tarefa.id}, 'andamento')">
                                Andamento
                            </button>
                            <button class="btn-mover btn-concluir" onclick="moverTarefa(${tarefa.id}, 'concluido')">
                                Concluir
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function carregarTarefas() {
    document.getElementById('conteudo').innerHTML = `
        <div class="card">
            <h2>Minhas Tarefas</h2>
            <div class="tarefas-colunas">
                <!-- Pendentes -->
                <div class="tarefa-coluna coluna-pendente">
                    <h3>Para Fazer</h3>
                    ${carregarTarefasPorStatus('pendente')}
                </div>
                
                <!-- Em Andamento -->
                <div class="tarefa-coluna coluna-andamento">
                    <h3>Em Andamento</h3>
                    ${carregarTarefasPorStatus('andamento')}
                </div>
                
                <!-- Concluídas -->
                <div class="tarefa-coluna coluna-concluido">
                    <h3>Concluídas</h3>
                    ${carregarTarefasPorStatus('concluido')}
                </div>
            </div>
        </div>
    `;
}

function carregarTarefasPorStatus(status) {
    const tarefas = dadosSistema.tarefas.filter(t => t.status === status);
    
    if (tarefas.length === 0) {
        return '<p style="text-align: center; color: #666; font-style: italic;">Nenhuma tarefa</p>';
    }
    
    return tarefas.map(tarefa => `
        <div class="tarefa-item ${tarefa.status}">
            <strong>${tarefa.titulo}</strong>
            <div class="tarefa-botoes">
                ${status !== 'pendente' ? `
                    <button class="btn-mover btn-pendente" onclick="moverTarefa(${tarefa.id}, 'pendente')">
                        Pendente
                    </button>
                ` : ''}
                
                ${status !== 'andamento' ? `
                    <button class="btn-mover btn-andamento" onclick="moverTarefa(${tarefa.id}, 'andamento')">
                        Andamento
                    </button>
                ` : ''}
                
                ${status !== 'concluido' ? `
                    <button class="btn-mover btn-concluir" onclick="moverTarefa(${tarefa.id}, 'concluido')">
                        Concluir
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function carregarAgenda() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    
    let calendarioHTML = '';
    
    // Cabeçalho dos dias da semana
    calendarioHTML += '<div class="calendario-dias-semana">';
    diasSemana.forEach(dia => {
        calendarioHTML += `<div class="dia-semana">${dia}</div>`;
    });
    calendarioHTML += '</div>';
    
    // Dias do calendário
    calendarioHTML += '<div class="calendario-dias">';
    
    // Dias vazios no início
    for (let i = 0; i < primeiroDia.getDay(); i++) {
        calendarioHTML += '<div class="dia-calendario"></div>';
    }
    
    // Dias do mês
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
        const hojeClasse = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear() ? 'hoje' : '';
        
        calendarioHTML += `
            <div class="dia-calendario ${hojeClasse}" onclick="mostrarTarefasDia(${dia})">
                ${dia}
            </div>
        `;
    }
    
    calendarioHTML += '</div>';

    document.getElementById('conteudo').innerHTML = `
        <div class="card">
            <h2>Agenda</h2>
            <div class="calendario-container">
                <div class="calendario-mes">
                    ${hoje.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </div>
                ${calendarioHTML}
            </div>
            <div id="tarefas-dia" style="margin-top: 2rem;"></div>
        </div>
    `;
}

function carregarChat() {
    document.getElementById('conteudo').innerHTML = `
        <div class="card">
            <h2>Chat da Equipe</h2>
            <div class="chat-empresarial">
                <!-- LISTA DE CONVERSAS -->
                <div class="lista-conversas">
                    <div class="cabecalho-chat">
                        <h3>Conversas</h3>
                    </div>
                    <div class="lista-contatos">
                        ${dadosSistema.conversas.map(contato => `
                            <div class="contato-item ${contato.id === 1 ? 'ativo' : ''}" onclick="selecionarConversa(${contato.id})">
                                <div class="nome-contato">${contato.nome}</div>
                                <div class="status-contato ${contato.status === 'online' || contato.status === 'disponivel' ? 'status-online' : 'status-offline'}">
                                    ${contato.status === 'online' ? 'Online' : 
                                      contato.status === 'disponivel' ? 'Disponível' : 
                                      contato.status === 'grupo' ? '12 participantes' : 'Última mensagem ' + contato.hora}
                                </div>
                                ${contato.ultimaMensagem ? `<div class="hora-mensagem">${contato.hora}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- ÁREA DE MENSAGENS -->
                <div class="area-mensagens">
                    <div class="cabecalho-conversa">
                        <div class="info-contato">
                            <div>
                                <div class="nome-contato-ativo">João Silva</div>
                                <div class="status-contato-ativo status-online">Online</div>
                            </div>
                        </div>
                    </div>

                    <div class="mensagens-container" id="mensagensContainer">
                        ${renderizarMensagens(dadosSistema.conversas[0].mensagens)}
                    </div>

                    <div class="input-mensagem-container">
                        <div class="input-mensagem">
                            <input type="text" id="inputMensagem" placeholder="Digite sua mensagem...">
                            <button class="btn-enviar" onclick="enviarMensagem()">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Rolagem para baixo
    const container = document.getElementById('mensagensContainer');
    if (container) {
        container.scrollTop = container.scrollHeight;
    }
}

function carregarPerfil() {
    document.getElementById('conteudo').innerHTML = `
        <div class="card perfil-container">
            <h2>Meu Perfil</h2>
            <div class="foto-perfil">
                <div class="foto-perfil-img">
                    ${dadosSistema.usuario.nome.charAt(0).toUpperCase()}
                </div>
                <h3>${dadosSistema.usuario.nome}</h3>
                <p>${dadosSistema.usuario.cargo}</p>
            </div>
            
            <div class="info-perfil">
                <div class="campo-perfil">
                    <label>ID do Funcionário</label>
                    <div class="valor">${dadosSistema.usuario.id}</div>
                </div>
                
                <div class="campo-perfil">
                    <label>Departamento</label>
                    <div class="valor">${dadosSistema.usuario.departamento}</div>
                </div>
                
                <div class="campo-perfil">
                    <label>Email</label>
                    <div class="valor">${dadosSistema.usuario.email}</div>
                </div>
                
                <div class="campo-perfil">
                    <label>Telefone</label>
                    <div class="valor">${dadosSistema.usuario.telefone}</div>
                </div>
            </div>
        </div>
    `;
}

// ================= FUNÇÕES AUXILIARES =================
function moverTarefa(id, novoStatus) {
    const tarefa = dadosSistema.tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.status = novoStatus;
        salvarDados();
        
        // Recarrega a tela atual
        const pageTitle = document.getElementById('pageTitle').textContent;
        carregarTela(pageTitle.toLowerCase());
    }
}

function mostrarTarefasDia(dia) {
    const container = document.getElementById('tarefas-dia');
    container.innerHTML = `
        <h3>Tarefas do dia ${dia}</h3>
        <p style="text-align: center; color: #666; font-style: italic;">
            Nenhuma tarefa agendada para o dia ${dia}
        </p>
    `;
}

function salvarDados() {
    localStorage.setItem('tarefas', JSON.stringify(dadosSistema.tarefas));
    localStorage.setItem('conversas', JSON.stringify(dadosSistema.conversas));
}

// ================= FUNÇÕES DO CHAT =================
function renderizarMensagens(mensagens) {
    if (!mensagens || mensagens.length === 0) {
        return '<p style="text-align: center; color: #666; padding: 2rem;">Nenhuma mensagem ainda. Inicie a conversa!</p>';
    }
    
    return mensagens.map(msg => `
        <div class="mensagem ${msg.enviada ? 'enviada' : 'recebida'}">
            <div class="balao-mensagem">
                ${msg.texto}
            </div>
            <div class="hora-mensagem-individual">${msg.hora}</div>
        </div>
    `).join('');
}

function selecionarConversa(id) {
    const contatoItem = document.querySelectorAll('.contato-item');
    contatoItem.forEach(item => item.classList.remove('ativo'));
    event.currentTarget.classList.add('ativo');
    
    // Aqui você implementaria a lógica para carregar mensagens específicas da conversa
    console.log('Conversa selecionada:', id);
}

function enviarMensagem() {
    const input = document.getElementById('inputMensagem');
    const texto = input.value.trim();
    
    if (texto) {
        const horaAtual = new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', minute: '2-digit' 
        });
        
        const container = document.getElementById('mensagensContainer');
        const novaMensagem = `
            <div class="mensagem enviada">
                <div class="balao-mensagem">
                    ${texto}
                </div>
                <div class="hora-mensagem-individual">${horaAtual}</div>
            </div>
        `;
        
        container.innerHTML += novaMensagem;
        input.value = '';
        container.scrollTop = container.scrollHeight;
        
        // Resposta automática
        setTimeout(() => {
            const respostas = [
                "Entendido! Obrigado pela informação.",
                "Perfeito! Vou verificar isso.",
                "Obrigado! Continuação de bom trabalho.",
                "Certo, estou analisando."
            ];
            
            const resposta = respostas[Math.floor(Math.random() * respostas.length)];
            const horaResposta = new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', minute: '2-digit' 
            });
            
            container.innerHTML += `
                <div class="mensagem recebida">
                    <div class="balao-mensagem">${resposta}</div>
                    <div class="hora-mensagem-individual">${horaResposta}</div>
                </div>
            `;
            container.scrollTop = container.scrollHeight;
        }, 2000);
    }
}

// ================= CONFIGURAÇÃO DA SIDEBAR =================
function configurarSidebar() {
    // Atualiza informações do usuário na sidebar
    const userAvatar = document.querySelector('.user-avatar');
    const userName = document.querySelector('.user-name');
    const userId = document.querySelector('.user-id');
    
    if (userAvatar) {
        userAvatar.textContent = dadosSistema.usuario.nome.charAt(0).toUpperCase();
    }
    if (userName) {
        userName.textContent = dadosSistema.usuario.nome;
    }
    if (userId) {
        userId.textContent = `ID: ${dadosSistema.usuario.id}`;
    }
    
    // Adiciona item de perfil na navegação se não existir
    const nav = document.querySelector('.sidebar-nav ul');
    if (nav && !document.querySelector('[data-tela="perfil"]')) {
        const itemPerfil = document.createElement('li');
        itemPerfil.innerHTML = `
            <a href="#" class="nav-item" data-tela="perfil">
                Perfil
            </a>
        `;
        nav.appendChild(itemPerfil);
    }
}

// ================= LOGOUT =================
function configurarLogout() {
    const sairBtn = document.getElementById('sair');
    if (sairBtn) {
        sairBtn.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja sair?')) {
                localStorage.clear();
                window.location.href = 'login.html';
            }
        });
    }
}

// ================= EVENTO ENTER PARA CHAT =================
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && document.getElementById('inputMensagem')) {
        enviarMensagem();
    }
});

// ================= INICIALIZAÇÃO =================
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.painel')) {
        if (!verificarLogin()) {
            return;
        }
        
        // Atualiza dados do usuário com informações do localStorage
        dadosSistema.usuario.nome = localStorage.getItem('usuario') || 'Usuário';
        dadosSistema.usuario.id = localStorage.getItem('idFuncionario') || '0000';
        
        configurarSidebar();
        configurarNavegacao();
        configurarLogout();
        carregarTela('inicio');
    }
});