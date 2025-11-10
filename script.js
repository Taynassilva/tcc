// ================= SISTEMA PRINCIPAL =================
class SistemaTarefas {
    constructor() {
        this.dados = {
            tarefas: JSON.parse(localStorage.getItem('tarefas')) || this.getTarefasPadrao(),
            conversas: JSON.parse(localStorage.getItem('conversas')) || this.getConversasPadrao(),
            usuario: {
                nome: localStorage.getItem('usuario') || 'tayna',
                id: localStorage.getItem('idFuncionario') || '#12345',
                cargo: 'Administrador',
                departamento: 'Tecnologia da Informação',
                email: 'tayna@empresa.com'
            },
            conversaAtiva: 1
        };
        
        this.init();
    }

    init() {
        this.configurarMenuMobile();
        this.configurarNavegacao();
        this.configurarBotoesSair();
        this.configurarBotoesTarefas();
        this.configurarCalendario();
        this.configurarChat();
        this.configurarPerfil();
        this.atualizarInterfaceUsuario();
    }

    // ================= DADOS PADRÃO =================
    getTarefasPadrao() {
        return [
            { 
                id: 1, 
                titulo: "Configurar servidor novo", 
                status: "pendente", 
                prioridade: "alta",
                data: "2024-11-28",
                progresso: 0
            },
            { 
                id: 2, 
                titulo: "Desenvolver módulo de relatórios", 
                status: "andamento", 
                prioridade: "media",
                data: "2024-11-26",
                progresso: 60
            },
            { 
                id: 3, 
                titulo: "Atualizar documentação", 
                status: "concluido", 
                prioridade: "baixa",
                data: "2024-11-24",
                progresso: 100
            },
            { 
                id: 4, 
                titulo: "Reunião com equipe de desenvolvimento", 
                status: "pendente", 
                prioridade: "alta",
                data: "2024-11-25",
                hora: "10:00",
                progresso: 0
            }
        ];
    }

    getConversasPadrao() {
        return [
            {
                id: 1,
                nome: "Equipe Desenvolvimento",
                status: "online",
                ultimaMensagem: "Vamos nos reunir às 10h",
                hora: "09:30",
                mensagens: [
                    { texto: "Bom dia! Precisamos alinhar sobre o novo projeto.", hora: "09:15", enviada: false },
                    { texto: "Bom dia! Estou disponível para a reunião às 10h.", hora: "09:20", enviada: true }
                ]
            },
            {
                id: 2,
                nome: "Carlos Silva - Supervisor",
                status: "online",
                ultimaMensagem: "Precisamos conversar sobre o projeto",
                hora: "09:30",
                mensagens: [
                    { texto: "Olá, podemos conversar sobre o projeto às 15h?", hora: "09:25", enviada: false }
                ]
            }
        ];
    }

    // ================= CONFIGURAÇÕES DE INTERFACE =================
    configurarMenuMobile() {
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
            
            // Fechar menu ao clicar fora (mobile)
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024 && 
                    !sidebar.contains(e.target) && 
                    !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            });
        }
    }

    configurarNavegacao() {
        // Navegação entre seções no painel único
        document.querySelectorAll('.nav-item[data-section]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = item.getAttribute('data-section') + '-section';
                
                // Esconder todas as seções
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Mostrar seção clicada
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
                
                // Atualizar menu ativo
                document.querySelectorAll('.nav-item').forEach(nav => {
                    nav.classList.remove('ativo');
                });
                item.classList.add('ativo');
                
                // Atualizar título
                this.atualizarTituloPagina(item.textContent);
                
                // Executar ações específicas da seção
                this.aoMudarSecao(sectionId);
            });
        });
    }

    configurarBotoesSair() {
        document.querySelectorAll('.logout-button').forEach(btn => {
            btn.addEventListener('click', () => {
                this.sair();
            });
        });
    }

    configurarBotoesTarefas() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-mover')) {
                const tarefa = e.target.closest('.tarefa-item');
                const acao = e.target.textContent.toLowerCase();
                
                if (tarefa) {
                    this.moverTarefaInterface(tarefa, acao);
                }
            }
        });
    }

    // ================= SISTEMA DE TAREFAS =================
    moverTarefaInterface(tarefaElement, acao) {
        const titulo = tarefaElement.querySelector('strong').textContent;
        const tarefa = this.dados.tarefas.find(t => t.titulo === titulo);
        
        if (!tarefa) return;

        switch(acao) {
            case 'iniciar':
            case 'reabrir':
                tarefa.status = 'andamento';
                tarefa.progresso = tarefa.progresso || 0;
                break;
            case 'concluir':
                tarefa.status = 'concluido';
                tarefa.progresso = 100;
                break;
            case 'pausar':
            case 'pendente':
                tarefa.status = 'pendente';
                tarefa.progresso = 0;
                break;
        }

        this.salvarDados();
        this.atualizarInterfaceTarefas();
    }

    atualizarInterfaceTarefas() {
        // Atualizar contadores do dashboard
        const tarefasPendentes = this.dados.tarefas.filter(t => t.status === 'pendente').length;
        const tarefasAndamento = this.dados.tarefas.filter(t => t.status === 'andamento').length;
        const tarefasConcluidas = this.dados.tarefas.filter(t => t.status === 'concluido').length;

        // Atualizar cards do dashboard se existirem
        this.atualizarElementoTexto('.dashboard-card:nth-child(1) .numero', tarefasPendentes);
        this.atualizarElementoTexto('.dashboard-card:nth-child(2) .numero', tarefasAndamento);
        this.atualizarElementoTexto('.dashboard-card:nth-child(3) .numero', tarefasConcluidas);
        this.atualizarElementoTexto('.dashboard-card:nth-child(4) .numero', this.dados.tarefas.length);
    }

    // ================= SISTEMA DE CHAT =================
    configurarChat() {
        const inputMensagem = document.getElementById('input-mensagem');
        const btnEnviar = document.querySelector('.btn-enviar');
        
        if (inputMensagem) {
            inputMensagem.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.enviarMensagem();
                }
            });
        }
        
        if (btnEnviar) {
            btnEnviar.addEventListener('click', () => {
                this.enviarMensagem();
            });
        }

        // Configurar seleção de conversas
        document.querySelectorAll('.contato-item').forEach(item => {
            item.addEventListener('click', () => {
                this.selecionarConversa(parseInt(item.dataset.id || '1'));
            });
        });
    }

    selecionarConversa(id) {
        this.dados.conversaAtiva = id;
        
        // Atualizar interface da conversa
        document.querySelectorAll('.contato-item').forEach(item => {
            item.classList.remove('ativo');
        });
        
        document.querySelector(`.contato-item[data-id="${id}"]`)?.classList.add('ativo');
        
        this.atualizarMensagensConversa();
    }

    atualizarMensagensConversa() {
        const conversa = this.dados.conversas.find(c => c.id === this.dados.conversaAtiva);
        const container = document.querySelector('.mensagens-container');
        
        if (!container || !conversa) return;

        container.innerHTML = conversa.mensagens.map(msg => `
            <div class="mensagem ${msg.enviada ? 'enviada' : 'recebida'}">
                <div class="balao-mensagem">${msg.texto}</div>
                <div class="hora-mensagem-individual">${msg.hora}</div>
            </div>
        `).join('');

        container.scrollTop = container.scrollHeight;
    }

    enviarMensagem() {
        const input = document.getElementById('input-mensagem');
        const texto = input?.value.trim();
        
        if (!texto) return;
        
        const conversa = this.dados.conversas.find(c => c.id === this.dados.conversaAtiva);
        if (conversa) {
            const novaMensagem = {
                texto: texto,
                hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                enviada: true
            };
            
            conversa.mensagens.push(novaMensagem);
            conversa.ultimaMensagem = texto;
            conversa.hora = 'Agora';
            
            this.salvarDados();
            this.atualizarMensagensConversa();
            
            input.value = '';
        }
    }

    // ================= SISTEMA DE CALENDÁRIO =================
    configurarCalendario() {
        const btnMesAnterior = document.getElementById('mes-anterior');
        const btnMesProximo = document.getElementById('mes-proximo');
        
        if (btnMesAnterior) {
            btnMesAnterior.addEventListener('click', () => {
                this.mudarMes(-1);
            });
        }
        
        if (btnMesProximo) {
            btnMesProximo.addEventListener('click', () => {
                this.mudarMes(1);
            });
        }

        this.gerarCalendario();
    }

    mudarMes(direcao) {
        // Implementação simplificada - em um sistema real, isso controlaria uma data atual
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const mesAtualElement = document.getElementById('mes-atual');
        
        if (mesAtualElement) {
            const textoAtual = mesAtualElement.textContent;
            const [mes, ano] = textoAtual.split(' ');
            const mesIndex = meses.findIndex(m => m.toLowerCase() === mes.toLowerCase());
            
            if (mesIndex !== -1) {
                let novoMesIndex = (mesIndex + direcao + 12) % 12;
                let novoAno = parseInt(ano);
                
                if (direcao === 1 && mesIndex === 11) novoAno++;
                if (direcao === -1 && mesIndex === 0) novoAno--;
                
                mesAtualElement.textContent = `${meses[novoMesIndex]} ${novoAno}`;
                this.gerarCalendario();
            }
        }
    }

    gerarCalendario() {
        const calendario = document.getElementById('calendario-dias');
        if (!calendario) return;

        calendario.innerHTML = '';
        
        // Dias do mês (exemplo simplificado)
        for (let i = 1; i <= 30; i++) {
            const dia = document.createElement('div');
            dia.className = 'calendario-dia';
            
            if (i === new Date().getDate()) {
                dia.classList.add('hoje');
            }
            
            // Simular tarefas em alguns dias
            if (i % 3 === 0 || i === 15 || i === 25) {
                dia.classList.add('com-tarefas');
            }
            
            dia.innerHTML = `
                <div class="calendario-numero">${i}</div>
                ${dia.classList.contains('com-tarefas') ? '<div class="calendario-marcador"></div>' : ''}
            `;
            
            dia.addEventListener('click', () => {
                this.mostrarTarefasDia(i);
            });
            
            calendario.appendChild(dia);
        }
    }

    mostrarTarefasDia(dia) {
        const container = document.getElementById('tarefas-dia');
        if (!container) return;

        // Filtrar tarefas para o dia (simulação)
        const tarefasDoDia = this.dados.tarefas.filter((_, index) => 
            (dia + index) % 3 === 0
        );

        container.innerHTML = `
            <div class="card">
                <h2>Tarefas para ${dia}/11/2024</h2>
                <div class="tarefas-lista">
                    ${tarefasDoDia.length > 0 ? 
                        tarefasDoDia.map(tarefa => `
                            <div class="tarefa-item">
                                <div class="tarefa-header">
                                    <strong>${tarefa.titulo}</strong>
                                    <div class="tarefa-hora">${tarefa.hora || '09:00'}</div>
                                </div>
                                <div class="tarefa-info">
                                    <span class="status ${tarefa.status}">${tarefa.status.toUpperCase()}</span>
                                    <span class="prioridade ${tarefa.prioridade}">${tarefa.prioridade.toUpperCase()}</span>
                                </div>
                                <div class="tarefa-botoes">
                                    ${tarefa.status !== 'andamento' ? 
                                        '<button class="btn-mover btn-andamento">Iniciar</button>' : ''}
                                    ${tarefa.status !== 'concluido' ? 
                                        '<button class="btn-mover btn-concluir">Concluir</button>' : ''}
                                    ${tarefa.status !== 'pendente' ? 
                                        '<button class="btn-mover btn-pendente">Pendente</button>' : ''}
                                </div>
                            </div>
                        `).join('') : 
                        '<p class="sem-tarefas">Nenhuma tarefa para este dia</p>'
                    }
                </div>
            </div>
        `;
        container.style.display = 'block';
    }

    // ================= SISTEMA DE PERFIL =================
    configurarPerfil() {
        const btnAlterarEmail = document.querySelector('.btn-mover');
        if (btnAlterarEmail) {
            btnAlterarEmail.addEventListener('click', () => {
                this.alterarEmail();
            });
        }

        // Configurar checkboxes de notificação
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.salvarConfiguracoesNotificacao(e.target.id, e.target.checked);
            });
        });
    }

    alterarEmail() {
        const novoEmail = prompt('Digite o novo email:', this.dados.usuario.email);
        if (novoEmail && novoEmail !== this.dados.usuario.email) {
            this.dados.usuario.email = novoEmail;
            this.salvarDados();
            
            const inputEmail = document.querySelector('.input-editavel');
            if (inputEmail) {
                inputEmail.value = novoEmail;
            }
            
            this.mostrarMensagem('Email alterado com sucesso!', 'success');
        }
    }

    salvarConfiguracoesNotificacao(id, ativo) {
        // Em um sistema real, isso salvaria no localStorage ou API
        console.log(`Configuração ${id}: ${ativo ? 'ativada' : 'desativada'}`);
    }

    // ================= UTILITÁRIOS =================
    atualizarInterfaceUsuario() {
        // Atualizar informações do usuário em todos os lugares
        this.atualizarElementoTexto('.user-name', this.dados.usuario.nome);
        this.atualizarElementoTexto('.user-id', `ID: ${this.dados.usuario.id}`);
        this.atualizarElementoTexto('.user-info', `Olá, ${this.dados.usuario.nome}`);
        
        // Atualizar data atual no dashboard
        const dataAtual = document.getElementById('data-atual');
        if (dataAtual) {
            const data = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dataAtual.textContent = data.toLocaleDateString('pt-BR', options);
        }
    }

    atualizarTituloPagina(titulo) {
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = titulo;
        }
    }

    atualizarElementoTexto(seletor, texto) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            elemento.textContent = texto;
        }
    }

    aoMudarSecao(sectionId) {
        // Executar ações específicas quando uma seção é carregada
        switch(sectionId) {
            case 'tarefas-section':
                this.atualizarInterfaceTarefas();
                break;
            case 'chat-section':
                this.atualizarMensagensConversa();
                break;
            case 'agenda-section':
                this.gerarCalendario();
                break;
        }
    }

    mostrarMensagem(mensagem, tipo = 'info') {
        // Criar elemento de mensagem temporária
        const alert = document.createElement('div');
        alert.className = `alert ${tipo} fade-in`;
        alert.textContent = mensagem;
        
        document.querySelector('.content-body')?.prepend(alert);
        
        // Remover após 3 segundos
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    salvarDados() {
        localStorage.setItem('tarefas', JSON.stringify(this.dados.tarefas));
        localStorage.setItem('conversas', JSON.stringify(this.dados.conversas));
        localStorage.setItem('usuario', this.dados.usuario.nome);
        localStorage.setItem('idFuncionario', this.dados.usuario.id);
    }

    sair() {
        if (confirm('Deseja realmente sair do sistema?')) {
            localStorage.removeItem('usuario');
            localStorage.removeItem('idFuncionario');
            window.location.href = 'login.html';
        }
    }
}

// ================= INICIALIZAÇÃO DO SISTEMA =================
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos em uma página do painel
    if (document.querySelector('.painel-page')) {
        window.sistema = new SistemaTarefas();
    }
    
    // Configurar login
    if (document.querySelector('.login-page')) {
        const loginForm = document.querySelector('.login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Simula login bem-sucedido
                localStorage.setItem('usuario', 'tayna');
                localStorage.setItem('idFuncionario', '#12345');
                window.location.href = 'dashboard.html';
            });
        }
    }
    
    // Splash screen
    if (document.querySelector('.splash-page')) {
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    }
});

// ================= FUNÇÕES GLOBAIS PARA HTML =================
function sair() {
    if (window.sistema) {
        window.sistema.sair();
    } else {
        if (confirm('Deseja realmente sair?')) {
            window.location.href = 'login.html';
        }
    }
}

function enviarMensagem() {
    if (window.sistema) {
        window.sistema.enviarMensagem();
    }
}

function fazerLogin(event) {
    if (event) event.preventDefault();
    // Simula login bem-sucedido
    localStorage.setItem('usuario', 'tayna');
    localStorage.setItem('idFuncionario', '#12345');
    window.location.href = 'dashboard.html';
}
function sair() {
    if (window.sistema) {
        window.sistema.sair();
    } else {
        if (confirm('Deseja realmente sair?')) {
            window.location.href = 'login.html';
        }
    }
}

function enviarMensagem() {
    if (window.sistema) {
        window.sistema.enviarMensagem();
    } else {
        // Fallback para quando o sistema não está carregado
        const input = document.getElementById('input-mensagem');
        const mensagem = input?.value.trim();
        
        if (mensagem) {
            const container = document.querySelector('.mensagens-container');
            if (container) {
                const novaMensagem = document.createElement('div');
                novaMensagem.className = 'mensagem enviada';
                novaMensagem.innerHTML = `
                    <div class="balao-mensagem">${mensagem}</div>
                    <div class="hora-mensagem-individual">Agora</div>
                `;
                container.appendChild(novaMensagem);
                input.value = '';
                container.scrollTop = container.scrollHeight;
            }
        }
    }
}

function fazerLogin(event) {
    if (event) event.preventDefault();
    
    const email = document.getElementById('email')?.value;
    const senha = document.getElementById('senha')?.value;
    
    if (!email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Simula login bem-sucedido
    localStorage.setItem('usuario', 'tayna');
    localStorage.setItem('idFuncionario', '#12345');
    window.location.href = 'dashboard.html';
}

// ================= SISTEMA DE NOTIFICAÇÕES =================
class NotificacaoSistema {
    constructor() {
        this.notificacoes = JSON.parse(localStorage.getItem('notificacoes')) || [];
    }
    
    adicionar(titulo, mensagem, tipo = 'info') {
        const notificacao = {
            id: Date.now(),
            titulo,
            mensagem,
            tipo,
            data: new Date().toISOString(),
            lida: false
        };
        
        this.notificacoes.unshift(notificacao);
        this.salvar();
        this.atualizarBadge();
    }
    
    marcarComoLida(id) {
        const notificacao = this.notificacoes.find(n => n.id === id);
        if (notificacao) {
            notificacao.lida = true;
            this.salvar();
            this.atualizarBadge();
        }
    }
    
    getNaoLidas() {
        return this.notificacoes.filter(n => !n.lida);
    }
    
    atualizarBadge() {
        const naoLidas = this.getNaoLidas().length;
        const badge = document.querySelector('.notificacao-badge');
        
        if (badge) {
            badge.textContent = naoLidas;
            badge.style.display = naoLidas > 0 ? 'flex' : 'none';
        }
    }
    
    salvar() {
        localStorage.setItem('notificacoes', JSON.stringify(this.notificacoes));
    }
}

// ================= SISTEMA OFFLINE =================
class SistemaOffline {
    constructor() {
        this.suporteOffline = 'serviceWorker' in navigator && 'SyncManager' in window;
        this.inicializarServiceWorker();
    }
    
    async inicializarServiceWorker() {
        if (this.suporteOffline) {
            try {
                const registro = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registrado:', registro);
            } catch (error) {
                console.log('Service Worker não suportado:', error);
            }
        }
    }
    
    salvarDadosOffline(dados) {
        if (!navigator.onLine) {
            const pendentes = JSON.parse(localStorage.getItem('pendentes') || '[]');
            pendentes.push({
                ...dados,
                timestamp: Date.now()
            });
            localStorage.setItem('pendentes', JSON.stringify(pendentes));
            return true;
        }
        return false;
    }
    
    sincronizarPendentes() {
        if (navigator.onLine) {
            const pendentes = JSON.parse(localStorage.getItem('pendentes') || '[]');
            if (pendentes.length > 0) {
                // Simular sincronização com servidor
                console.log('Sincronizando dados pendentes:', pendentes);
                localStorage.removeItem('pendentes');
                
                // Mostrar notificação de sincronização
                if (window.notificacaoSistema) {
                    window.notificacaoSistema.adicionar(
                        'Sincronização Concluída',
                        'Todos os dados pendentes foram sincronizados com sucesso.',
                        'success'
                    );
                }
            }
        }
    }
}

// ================= OTIMIZAÇÕES DE PERFORMANCE =================
class PerformanceManager {
    constructor() {
        this.observers = [];
        this.inicializarObservers();
    }
    
    inicializarObservers() {
        // Observer para elementos que entram na viewport
        if ('IntersectionObserver' in window) {
            this.lazyLoadObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        this.lazyLoadObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                this.lazyLoadObserver.observe(img);
            });
        }
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ================= ANIMAÇÕES E EFEITOS VISUAIS =================
class AnimacaoManager {
    constructor() {
        this.animacoes = new Map();
    }
    
    fadeIn(element, duration = 300) {
        return new Promise((resolve) => {
            element.style.opacity = '0';
            element.style.display = 'block';
            
            let start = null;
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const opacity = Math.min(progress / duration, 1);
                
                element.style.opacity = opacity.toString();
                
                if (progress < duration) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }
    
    fadeOut(element, duration = 300) {
        return new Promise((resolve) => {
            let start = null;
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const opacity = Math.max(1 - progress / duration, 0);
                
                element.style.opacity = opacity.toString();
                
                if (progress < duration) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.display = 'none';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }
    
    slideDown(element, duration = 300) {
        return new Promise((resolve) => {
            element.style.maxHeight = '0';
            element.style.overflow = 'hidden';
            element.style.display = 'block';
            
            const height = element.scrollHeight;
            element.style.maxHeight = height + 'px';
            element.style.transition = `max-height ${duration}ms ease-in-out`;
            
            setTimeout(() => {
                element.style.maxHeight = 'none';
                resolve();
            }, duration);
        });
    }
    
    slideUp(element, duration = 300) {
        return new Promise((resolve) => {
            const height = element.scrollHeight;
            element.style.maxHeight = height + 'px';
            element.style.overflow = 'hidden';
            
            setTimeout(() => {
                element.style.maxHeight = '0';
            }, 10);
            
            setTimeout(() => {
                element.style.display = 'none';
                element.style.maxHeight = 'none';
                resolve();
            }, duration);
        });
    }
}

// ================= GERENCIAMENTO DE ESTADO =================
class EstadoManager {
    constructor() {
        this.estado = {
            usuario: null,
            preferencias: {},
            ui: {
                tema: 'claro',
                sidebarAberta: true,
                ultimaSecao: 'dashboard'
            }
        };
        this.ouvintes = new Map();
        this.carregarEstado();
    }
    
    carregarEstado() {
        const estadoSalvo = localStorage.getItem('estado-ui');
        if (estadoSalvo) {
            this.estado = { ...this.estado, ...JSON.parse(estadoSalvo) };
        }
        this.aplicarEstado();
    }
    
    salvarEstado() {
        localStorage.setItem('estado-ui', JSON.stringify(this.estado.ui));
    }
    
    atualizar(caminho, valor) {
        const partes = caminho.split('.');
        let atual = this.estado;
        
        for (let i = 0; i < partes.length - 1; i++) {
            atual = atual[partes[i]];
        }
        
        atual[partes[partes.length - 1]] = valor;
        this.salvarEstado();
        this.notificarOuvintes(caminho, valor);
    }
    
    observar(caminho, callback) {
        if (!this.ouvintes.has(caminho)) {
            this.ouvintes.set(caminho, new Set());
        }
        this.ouvintes.get(caminho).add(callback);
    }
    
    notificarOuvintes(caminho, valor) {
        const ouvintes = this.ouvintes.get(caminho);
        if (ouvintes) {
            ouvintes.forEach(callback => callback(valor));
        }
    }
    
    aplicarEstado() {
        // Aplicar tema
        if (this.estado.ui.tema === 'escuro') {
            document.body.classList.add('tema-escuro');
        } else {
            document.body.classList.remove('tema-escuro');
        }
        
        // Aplicar estado da sidebar
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            if (this.estado.ui.sidebarAberta) {
                sidebar.classList.remove('fechada');
            } else {
                sidebar.classList.add('fechada');
            }
        }
    }
}

// ================= EXPORTAÇÃO DE MÓDULOS =================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SistemaTarefas,
        NotificacaoSistema,
        SistemaOffline,
        PerformanceManager,
        AnimacaoManager,
        EstadoManager
    };
}

// ================= INICIALIZAÇÃO COMPLETA DO SISTEMA =================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos os subsistemas
    window.notificacaoSistema = new NotificacaoSistema();
    window.sistemaOffline = new SistemaOffline();
    window.performanceManager = new PerformanceManager();
    window.animacaoManager = new AnimacaoManager();
    window.estadoManager = new EstadoManager();
    
    // Verificar se estamos em uma página do painel
    if (document.querySelector('.painel-page')) {
        window.sistema = new SistemaTarefas();
        
        // Configurar eventos globais
        configurarEventosGlobais();
        
        // Verificar conexão
        window.addEventListener('online', () => {
            window.sistemaOffline.sincronizarPendentes();
            window.sistema.mostrarMensagem('Conexão restaurada', 'success');
        });
        
        window.addEventListener('offline', () => {
            window.sistema.mostrarMensagem('Você está offline', 'warning');
        });
    }
    
    // Configurar login
    if (document.querySelector('.login-page')) {
        configurarPaginaLogin();
    }
    
    // Splash screen
    if (document.querySelector('.splash-page')) {
        configurarSplashScreen();
    }
    
    console.log('Sistema completamente inicializado!');
});

function configurarEventosGlobais() {
    // Debounce para pesquisas
    const buscaInput = document.getElementById('busca');
    if (buscaInput) {
        const buscaDebounced = window.performanceManager.debounce((termo) => {
            if (window.sistema) {
                window.sistema.buscar(termo);
            }
        }, 300);
        
        buscaInput.addEventListener('input', (e) => {
            buscaDebounced(e.target.value);
        });
    }
    
    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        // Ctrl + K para busca
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const buscaInput = document.getElementById('busca');
            if (buscaInput) {
                buscaInput.focus();
            }
        }
        
        // Escape para fejar modais
        if (e.key === 'Escape') {
            const modais = document.querySelectorAll('.modal-overlay');
            modais.forEach(modal => {
                if (modal.style.display !== 'none') {
                    modal.style.display = 'none';
                }
            });
        }
    });
}

function configurarPaginaLogin() {
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email')?.value;
            const senha = document.getElementById('senha')?.value;
            
            if (!email || !senha) {
                mostrarErroLogin('Por favor, preencha todos os campos!');
                return;
            }
            
            // Simular processo de login
            simularLogin(email, senha);
        });
    }
    
    // Animações de entrada
    const loginCard = document.querySelector('.login-card');
    if (loginCard && window.animacaoManager) {
        window.animacaoManager.fadeIn(loginCard, 500);
    }
}

function simularLogin(email, senha) {
    const btnLogin = document.querySelector('.btn-login');
    const textoOriginal = btnLogin.textContent;
    
    // Simular loading
    btnLogin.textContent = 'Entrando...';
    btnLogin.disabled = true;
    
    // Simular delay de rede
    setTimeout(() => {
        // Credenciais de demonstração
        if (email === 'tayna@empresa.com' && senha === '123456') {
            localStorage.setItem('usuario', 'tayna');
            localStorage.setItem('idFuncionario', '#12345');
            localStorage.setItem('email', email);
            
            window.sistema.mostrarMensagem('Login realizado com sucesso!', 'success');
            window.location.href = 'dashboard.html';
        } else {
            mostrarErroLogin('Email ou senha incorretos!');
            btnLogin.textContent = textoOriginal;
            btnLogin.disabled = false;
        }
    }, 1500);
}

function mostrarErroLogin(mensagem) {
    const alert = document.createElement('div');
    alert.className = 'alert error';
    alert.textContent = mensagem;
    alert.style.cssText = `
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 8px;
        background: var(--error);
        color: white;
        font-weight: 500;
    `;
    
    const loginForm = document.querySelector('.login-form');
    loginForm.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

function configurarSplashScreen() {
    // Animar barra de progresso
    const progressBar = document.querySelector('.loading-progress');
    if (progressBar && window.animacaoManager) {
        progressBar.style.animation = 'loading 2.5s ease-in-out';
    }
    
    // Animar estatísticas de carregamento
    const stats = document.querySelectorAll('.stat-item');
    if (stats.length > 0 && window.animacaoManager) {
        stats.forEach((stat, index) => {
            setTimeout(() => {
                window.animacaoManager.fadeIn(stat, 300);
            }, index * 800);
        });
    }
    
    setTimeout(() => {
        if (window.animacaoManager) {
            const splashContainer = document.querySelector('.splash-container');
            window.animacaoManager.fadeOut(splashContainer, 500).then(() => {
                window.location.href = 'login.html';
            });
        } else {
            window.location.href = 'login.html';
        }
    }, 3500);
}

// ================= POLYFILLS PARA COMPATIBILIDADE =================
if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        }
        return this.indexOf(search, start) !== -1;
    };
}

if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement, fromIndex) {
        if (this == null) {
            throw new TypeError('Array.prototype.includes called on null or undefined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (len === 0) {
            return false;
        }
        var n = fromIndex | 0;
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
            if (O[k] === searchElement) {
                return true;
            }
            k++;
        }
        return false;
    };
}

// ================= FINAL DO ARQUIVO =================
console.log('JavaScript do sistema carregado completamente!');

// Exportar para uso global
window.SistemaTarefas = SistemaTarefas;
window.NotificacaoSistema = NotificacaoSistema;
window.SistemaOffline = SistemaOffline;
window.PerformanceManager = PerformanceManager;
window.AnimacaoManager = AnimacaoManager;
window.EstadoManager = EstadoManager;