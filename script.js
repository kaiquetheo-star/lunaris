// ==========================================
// 1. DADOS E LORE
// ==========================================
const paginasDiario = [
    {
        id: 1,
        titulo: "O Visitante da Meia-Noite",
        texto: "Dia 1. A chuva não para faz semanas e o neon da rua reflete nas poças lá fora. Não sei o que pesa mais, o céu cinza ou o silêncio insuportável aqui dentro. Hoje, deixei a janela entreaberta e ele entrou. Um gato preto, com olhos que parecem duas luas cheias. Ele não miou, não pediu nada. Só deitou na minha coberta roxa e me encarou. Desde que o Lunaris chegou, o silêncio do meu quarto deixou de ser solidão para virar... um refúgio. Acho que nós dois estávamos precisando de um lugar seguro.",
        custo: 0 // A primeira página pode ser grátis!
    },
    {
        id: 2,
        titulo: "Frequências Roxas",
        texto: "Dia 12. A depressão é um bicho estranho. Ela te convence de que você é invisível e te rouba a vontade de levantar da cama. Mas o Lunaris não deixa. Ele me acorda empurrando o potinho vazio, me obrigando a ficar de pé. É um passo pequeno, mas hoje foi o suficiente para eu colocar uma fita lo-fi antiga pra tocar. Notei algo mágico: o brilho nos olhos dele pulsa exatamente no ritmo dos graves. É como se ele estivesse filtrando a energia pesada do ambiente. Quando o som para, ele me olha pedindo mais. A música virou o nosso combustível.",
        custo: 50
    },
    {
        id: 3,
        titulo: "O Guardião do Foco",
        texto: "Dia 28. A dor no peito ainda lateja de vez em quando, mas pela primeira vez em muito tempo, o apartamento não parece vazio. Hoje tive que trabalhar até tarde. Estava prestes a desistir quando senti o peso dele se aconchegando perto do meu teclado. O sono dele é profundo, mas sinto que é protetor. Percebi que, enquanto ele dorme e eu me concentro, o tempo flui mais leve. Somos uma equipe agora: eu sigo em frente criando o som, e ele mantém a paz.",
        custo: 110
    },
    {
        id: 4,
        titulo: "Frequência de Cura",
        texto: "Dia 45. Tentei cantar hoje. Fazia tanto tempo que minha garganta parecia enferrujada. Eu sempre amei melodias mais quentes, aquele R&B mais sensual que preenche a sala, sabe? Mas a voz falhou no primeiro agudo. Fiquei frustrada, quase chorei. Foi quando o Lunaris pulou no meu colo e começou a ronronar em um tom baixo, contínuo. Fechei os olhos e apenas murmurei acompanhando a vibração dele. Não foi perfeito, mas foi um recomeço.",
        custo: 120
    },
    {
        id: 5,
        titulo: "Neon e Chuva de Verão",
        texto: "Dia 60. O temporal de fim de tarde lavou a cidade. Da janela, vejo os fios de poste balançando e o letreiro da padaria piscando em vermelho lá embaixo. É uma beleza caótica, bem brasileira, mas que hoje me trouxe uma paz imensa. Fiz um café forte. O Lunaris ficou observando as gotas escorrendo pelo vidro, os olhos amarelos refletindo a luz da rua. O peso que eu carregava no peito está mais leve. Aos poucos, a cor está voltando para o meu mundo.",
        custo: 150
    },
    {
        id: 6,
        titulo: "Sombras no Quarto",
        texto: "Dia 72. A espiral voltou. Acordei com aquela sensação de que nada faz sentido. Fiquei debaixo das cobertas até as três da tarde, ignorando o celular. Mas o Lunaris tem um sexto sentido para a tristeza. Ele não me forçou a levantar hoje. Apenas deitou no meu travesseiro, enrolado no meu cabelo, e ficou lá. Às vezes, a gente não precisa de alguém que nos puxe para fora do buraco, mas de alguém que sente no escuro com a gente até a luz voltar.",
        custo: 200
    },
    {
        id: 7,
        titulo: "Papel e Caneta",
        texto: "Dia 88. Madrugada adentro. O teclado do notebook parece um piano, cada tecla um passo na direção dos meus projetos. Estou escrevendo de novo, rascunhando ideias, melodias, tentando colocar a vida nos trilhos e tirar os sonhos do papel. O Lunaris assumiu seu posto de guardião em cima da mesa de som. Quando perco o foco e começo a duvidar de mim mesma, ele me dá uma patadinha suave no braço. 'Volte para o papel', ele parece dizer. E eu volto.",
        custo: 250
    },
    {
        id: 8,
        titulo: "Poeira Estelar",
        texto: "Dia 105. Eu juro que vi algo impossível hoje. A música estava alta, uma batida lo-fi com um baixo bem marcado e eu cantarolava uma letra por cima. O Lunaris bocejou e, por um segundo, os pelos dele pareceram soltar pequenas faíscas roxas, como poeira estelar flutuando no ar. Talvez seja o cansaço, a iluminação neon... ou talvez eu tenha adotado um pequeno espírito cósmico disfarçado de felino. De qualquer forma, não me sinto mais sozinha.",
        custo: 300
    },
    {
        id: 9,
        titulo: "O Ritmo Próprio",
        texto: "Dia 130. Já não conto mais os dias de escuridão, estou contando os de luz. Minha rotina ganhou forma. Acordo, dou o sachê do Lunaris, abro a janela para o vento entrar e coloco a primeira fita para rodar. Descobri que a cura não é um milagre repentino, é um trabalho diário, como afinar um instrumento. O Lunaris me ensinou que o descanso não é preguiça, é preparação. Ele dorme sem culpa, e eu aprendi a me perdoar também.",
        custo: 400
    },
    {
        id: 10,
        titulo: "Ecos do Universo",
        texto: "Dia 165. O quarto está diferente. Não porque mudei os móveis, mas porque a minha visão sobre ele mudou. As paredes roxas não são mais um esconderijo ou uma prisão, são o meu estúdio, meu templo. O Lunaris está enrodilhado no tapete, dormindo aquele sono profundo e protetor. Peguei o microfone de verdade hoje. Cantei, com falhas, com alma, com tudo que estava preso na garganta. E pela primeira vez, eu não cantei para a tristeza. Cantei para o amanhã.",
        custo: 500
    }
];

// ==========================================
// 2. ESTADO DO JOGO E SALVAMENTO
// ==========================================
let stats = {
    hunger: parseFloat(localStorage.getItem('lun_fome')) || 100,
    vibe: parseFloat(localStorage.getItem('lun_vibe')) || 100,
    sleep: parseFloat(localStorage.getItem('lun_sono')) || 100,
    coins: parseInt(localStorage.getItem('lun_coins')) || 0
};

let paginasDesbloqueadas = parseInt(localStorage.getItem('lun_paginas')) || 1; // Começa com 1
let emFoco = false;

let medals = JSON.parse(localStorage.getItem('lun_medals')) || {
    plant: false, // 🌱
    fish: false,  // 🐟
    music: false, // 🎶
    diary: false  // 📖
};

function saveMedals() { localStorage.setItem('lun_medals', JSON.stringify(medals)); }

// ==========================================
// 3. SISTEMA PRINCIPAL E AUDIO
// ==========================================
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('splash').classList.add('hidden');
    iniciarAudio();
});

function iniciarAudio() {
    const lofi = document.getElementById('audio-lofi');
    lofi.src = 'mp4/track1.mp3'; // Ajuste o caminho se necessário
    lofi.play().catch(() => console.log("Aguardando interação"));
    setInterval(drenarStats, 60000); // Drena a cada 1 minuto
}

function drenarStats() {
    stats.hunger = Math.max(0, stats.hunger - 1);
    stats.vibe = Math.max(0, stats.vibe - 0.5);
    if (!emFoco) stats.sleep = Math.max(0, stats.sleep - 0.8);
    atualizarUI();
}

function atualizarUI() {
    document.getElementById('hunger-bar').style.width = stats.hunger + '%';
    document.getElementById('vibe-bar').style.width = stats.vibe + '%';
    document.getElementById('sleep-bar').style.width = stats.sleep + '%';
    document.getElementById('coin-count').innerText = stats.coins;
    
    localStorage.setItem('lun_fome', stats.hunger);
    localStorage.setItem('lun_vibe', stats.vibe);
    localStorage.setItem('lun_sono', stats.sleep);
    localStorage.setItem('lun_coins', stats.coins);
    localStorage.setItem('lun_paginas', paginasDesbloqueadas);
}

document.getElementById('vol-chuva').addEventListener('input', (e) => {
    document.getElementById('audio-chuva').volume = e.target.value / 100;
});

document.getElementById('lunaris-sprite').addEventListener('click', () => {
    stats.vibe = Math.min(100, stats.vibe + 5);
    stats.coins += 2;
    document.getElementById('click-sfx').play().catch(()=>{});
    atualizarUI();
});

window.addEventListener('blur', () => { emFoco = true; });
window.addEventListener('focus', () => { emFoco = false; });
atualizarUI();

// ==========================================
// 4. MODAL DO SANTUÁRIO (LOJA, DIÁRIO, INVENTÁRIO)
// ==========================================
const santuarioBtn = document.getElementById('santuario-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');

function openSantuarioModal() {
    // ---- ABA DA LOJA ----
    const shopSection = document.createElement('div');
    shopSection.className = 'modal-section';
    shopSection.innerHTML = `
        <h2>🛒 Loja</h2>
        <div class="shop-item">
            <span>🍖 Sachê (20 moedas)</span>
            <button id="buy-sache">Comprar</button>
        </div>
        <div class="shop-item">
            <span>🎵 Nova Faixa (100 moedas)</span>
            <button id="buy-track">Comprar</button>
        </div>
    `;

    // ---- ABA DO DIÁRIO ----
    const diarySection = document.createElement('div');
    diarySection.className = 'modal-section';
    diarySection.innerHTML = `<h2>📖 Diário de Lunaris</h2><div id="diary-pages"></div>`;
    
    // Descobre qual é a próxima página a comprar
    if (paginasDesbloqueadas < paginasDiario.length) {
        const proximaPagina = paginasDiario[paginasDesbloqueadas];
        diarySection.innerHTML += `
            <div class="shop-item" style="margin-top: 10px; border-top: 1px solid #ff00ff; padding-top: 10px;">
                <span>Desbloquear: "${proximaPagina.titulo}" (${proximaPagina.custo} moedas)</span>
                <button id="buy-page">Comprar Página</button>
            </div>
        `;
    }

    // ---- ABA DE MEDALHAS ----
    const medalsSection = document.createElement('div');
    medalsSection.className = 'modal-section';
    medalsSection.innerHTML = `
        <h2>🏅 Inventário & Medalhas</h2>
        <div id="medals-list" style="font-size: 2em; display: flex; gap: 10px; justify-content: center;">
            <span class="medal${medals.plant ? ' unlocked' : ''}" style="opacity: ${medals.plant ? 1 : 0.3}">🌱</span>
            <span class="medal${medals.fish ? ' unlocked' : ''}" style="opacity: ${medals.fish ? 1 : 0.3}">🐟</span>
            <span class="medal${medals.music ? ' unlocked' : ''}" style="opacity: ${medals.music ? 1 : 0.3}">🎶</span>
            <span class="medal${medals.diary ? ' unlocked' : ''}" style="opacity: ${medals.diary ? 1 : 0.3}">📖</span>
        </div>
    `;

    // Limpa e injeta tudo
    modalBody.innerHTML = '';
    modalBody.appendChild(shopSection);
    modalBody.appendChild(diarySection);
    modalBody.appendChild(medalsSection);

    // Renderiza as páginas lidas
    const diaryPagesDiv = document.getElementById('diary-pages');
    for (let i = 0; i < paginasDesbloqueadas; i++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'diary-page unlocked';
        pageDiv.style.cssText = "background: rgba(255,0,255,0.1); padding: 10px; margin-bottom: 10px; border-radius: 8px;";
        pageDiv.innerHTML = `<strong>${paginasDiario[i].titulo}</strong><p style="font-size: 0.9em;">${paginasDiario[i].texto}</p>`;
        diaryPagesDiv.appendChild(pageDiv);
    }

    // ---- LÓGICA DOS BOTÕES DA LOJA ----
    document.getElementById('buy-sache').onclick = function() {
        if (stats.coins >= 20) {
            stats.coins -= 20;
            stats.hunger = 100;
            atualizarUI();
            alert('Você alimentou o Lunaris! Fome restaurada.');
        } else {
            alert('Moedas insuficientes!');
        }
    };

    document.getElementById('buy-track').onclick = function() {
        if (stats.coins >= 100) {
            stats.coins -= 100;
            medals.music = true;
            saveMedals();
            atualizarUI();
            openSantuarioModal(); // Recarrega o modal para acender a medalha
            alert('Nova faixa desbloqueada e Medalha ganha!');
        } else {
            alert('Moedas insuficientes!');
        }
    };

    const btnBuyPage = document.getElementById('buy-page');
    if (btnBuyPage) {
        btnBuyPage.onclick = function() {
            const proximaPagina = paginasDiario[paginasDesbloqueadas];
            if (stats.coins >= proximaPagina.custo) {
                stats.coins -= proximaPagina.custo;
                paginasDesbloqueadas++;
                atualizarUI();
                openSantuarioModal(); // Recarrega para mostrar o texto novo
            } else {
                alert(`Você precisa de ${proximaPagina.custo} moedas!`);
            }
        };
    }

    modalOverlay.classList.remove('hidden');
}

santuarioBtn.addEventListener('click', openSantuarioModal);

closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.add('hidden');
    }
});