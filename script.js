// ==========================================
// 1. DADOS E LORE
// ==========================================
const paginasDiario = [
    { titulo: "O Visitante da Meia-Noite", texto: "Dia 1. A chuva não para faz semanas e o neon da rua reflete nas poças lá fora. Não sei o que pesa mais, o céu cinza ou o silêncio insuportável aqui dentro. Hoje, deixei a janela entreaberta e ele entrou. Um gato preto, com olhos que parecem duas luas cheias. Ele não miou, não pediu nada. Só deitou na minha coberta roxa e me encarou. Desde que o Lunaris chegou, o silêncio do meu quarto deixou de ser solidão para virar... um refúgio. Acho que nós dois estávamos precisando de um lugar seguro.", custo: 0 },
    { titulo: "Frequências Roxas", texto: "Dia 12. A depressão é um bicho estranho. Ela te convence de que você é invisível e te rouba a vontade de levantar da cama. Mas o Lunaris não deixa. Ele me acorda empurrando o potinho vazio, me obrigando a ficar de pé. É um passo pequeno, mas hoje foi o suficiente para eu colocar uma fita lo-fi antiga pra tocar. Notei algo mágico: o brilho nos olhos dele pulsa exatamente no ritmo dos graves. É como se ele estivesse filtrando a energia pesada do ambiente. Quando o som para, ele me olha pedindo mais. A música virou o nosso combustível.", custo: 50 },
    { titulo: "O Guardião do Foco", texto: "Dia 28. A dor no peito ainda lateja de vez em quando, mas pela primeira vez em muito tempo, o apartamento não parece vazio. Hoje tive que trabalhar até tarde. Estava prestes a desistir quando senti o peso dele se aconchegando perto do meu teclado. O sono dele é profundo, mas sinto que é protetor. Percebi que, enquanto ele dorme e eu me concentro, o tempo flui mais leve. Somos uma equipe agora: eu sigo em frente criando o som, e ele mantém a paz.", custo: 110 },
    { titulo: "Frequência de Cura", texto: "Dia 45. Tentei cantar hoje. Fazia tanto tempo que minha garganta parecia enferrujada. Eu sempre amei melodias mais quentes, aquele R&B mais sensual que preenche a sala, sabe? Mas a voz falhou no primeiro agudo. Fiquei frustrada, quase chorei. Foi quando o Lunaris pulou no meu colo e começou a ronronar em um tom baixo, contínuo. Fechei os olhos e apenas murmurei acompanhando a vibração dele. Não foi perfeito, mas foi um recomeço.", custo: 120 },
    { titulo: "Neon e Chuva de Verão", texto: "Dia 60. O temporal de fim de tarde lavou a cidade. Da janela, vejo os fios de poste balançando e o letreiro da padaria piscando em vermelho lá embaixo. É uma beleza caótica, bem brasileira, mas que hoje me trouxe uma paz imensa. Fiz um café forte. O Lunaris ficou observando as gotas escorrendo pelo vidro, os olhos amarelos refletindo a luz da rua. O peso que eu carregava no peito está mais leve. Aos poucos, a cor está voltando para o meu mundo.", custo: 150 },
    { titulo: "Sombras no Quarto", texto: "Dia 72. A espiral voltou. Acordei com aquela sensação de que nada faz sentido. Fiquei debaixo das cobertas até as três da tarde, ignorando o celular. Mas o Lunaris tem um sexto sentido para a tristeza. Ele não me forçou a levantar hoje. Apenas deitou no meu travesseiro, enrolado no meu cabelo, e ficou lá. Às vezes, a gente não precisa de alguém que nos puxe para fora do buraco, mas de alguém que sente no escuro com a gente até a luz voltar.", custo: 200 },
    { titulo: "Papel e Caneta", texto: "Dia 88. Madrugada adentro. O teclado do notebook parece um piano, cada tecla um passo na direção dos meus projetos. Estou escrevendo de novo, rascunhando ideias, melodias, tentando colocar a vida nos trilhos e tirar os sonhos do papel. O Lunaris assumiu seu posto de guardião em cima da mesa de som. Quando perco o foco e começo a duvidar de mim mesma, ele me dá uma patadinha suave no braço. 'Volte para o papel', ele parece dizer. E eu volto.", custo: 250 },
    { titulo: "Poeira Estelar", texto: "Dia 105. Eu juro que vi algo impossível hoje. A música estava alta, uma batida lo-fi com um baixo bem marcado e eu cantarolava uma letra por cima. O Lunaris bocejou e, por um segundo, os pelos dele pareceram soltar pequenas faíscas roxas, como poeira estelar flutuando no ar. Talvez seja o cansaço, a iluminação neon... ou talvez eu tenha adotado um pequeno espírito cósmico disfarçado de felino. De qualquer forma, não me sinto mais sozinha.", custo: 300 },
    { titulo: "O Ritmo Próprio", texto: "Dia 130. Já não conto mais os dias de escuridão, estou contando os de luz. Minha rotina ganhou forma. Acordo, dou o sachê do Lunaris, abro a janela para o vento entrar e coloco a primeira fita para rodar. Descobri que a cura não é um milagre repentino, é um trabalho diário, como afinar um instrumento. O Lunaris me ensinou que o descanso não é preguiça, é preparação. Ele dorme sem culpa, e eu aprendi a me perdoar também.", custo: 400 },
    { titulo: "Ecos do Universo", texto: "Dia 165. O quarto está diferente. Não porque mudei os móveis, mas porque a minha visão sobre ele mudou. As paredes roxas não são mais um esconderijo ou uma prisão, são o meu estúdio, meu templo. O Lunaris está enrodilhado no tapete, dormindo aquele sono profundo e protetor. Peguei o microfone de verdade hoje. Cantei, com falhas, com alma, com tudo que estava preso na garganta. E pela primeira vez, eu não cantei para a tristeza. Cantei para o amanhã.", custo: 500 }
];

// ==========================================
// 2. ESTADO DO JOGO
// ==========================================
let stats = {
    hunger: parseFloat(localStorage.getItem('lun_fome')) || 100,
    vibe: parseFloat(localStorage.getItem('lun_vibe')) || 100,
    sleep: parseFloat(localStorage.getItem('lun_sono')) || 100,
    coins: parseInt(localStorage.getItem('lun_coins')) || 0
};

let paginasDesbloqueadas = parseInt(localStorage.getItem('lun_paginas')) || 1;
let emFoco = false;
let gatoCooldown = false; // Controle de tempo para ganhar moedas

let medals = JSON.parse(localStorage.getItem('lun_medals')) || { plant: false, fish: false, music: false, diary: false };

function saveMedals() { localStorage.setItem('lun_medals', JSON.stringify(medals)); }

// Função global de clique
function playClick() { document.getElementById('click-sfx').play().catch(()=>{}); }

// ==========================================
// 3. SISTEMA PRINCIPAL E AUDIO
// ==========================================
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('splash').classList.add('hidden');
    playClick();
    iniciarAudio();
    gerarChuva();
});

function iniciarAudio() {
    const lofi = document.getElementById('audio-lofi');
    const chuva = document.getElementById('audio-chuva');
    const ronrono = document.getElementById('audio-ronrono');
    
    // Inicia todas as tracks (volumes baseados nos sliders)
    lofi.volume = document.getElementById('vol-lofi').value / 100;
    chuva.volume = document.getElementById('vol-chuva').value / 100;
    ronrono.volume = document.getElementById('vol-ronrono').value / 100;

    lofi.play().catch(()=>{});
    chuva.play().catch(()=>{});
    ronrono.play().catch(()=>{});

    setInterval(drenarStats, 60000); 
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

// Sliders de Volume
document.getElementById('vol-chuva').addEventListener('input', (e) => { document.getElementById('audio-chuva').volume = e.target.value / 100; });
document.getElementById('vol-lofi').addEventListener('input', (e) => { document.getElementById('audio-lofi').volume = e.target.value / 100; });
document.getElementById('vol-ronrono').addEventListener('input', (e) => { document.getElementById('audio-ronrono').volume = e.target.value / 100; });

// A REGRA DE OURO DO LUNARIS (Sem som de clique no gato)
document.getElementById('lunaris-sprite').addEventListener('click', () => {
    const sprite = document.getElementById('lunaris-sprite');
    sprite.style.transform = "scale(1.05)";
    setTimeout(() => sprite.style.transform = "scale(1)", 200);

    // Só recompensa se estiver saudável
    if (stats.hunger >= 90 && stats.vibe >= 90 && stats.sleep >= 90) {
        if (!gatoCooldown) {
            stats.coins += 20;
            atualizarUI();
            
            // Um toque de feedback visual fofo
            sprite.style.filter = "drop-shadow(0 0 40px #00ff00)";
            setTimeout(() => sprite.style.filter = "drop-shadow(0 0 20px rgba(255, 0, 110, 0.5))", 1000);
            
            gatoCooldown = true;
            setTimeout(() => { gatoCooldown = false; }, 60000); // 1 minuto de recarga
        }
    }
});

// Foco
window.addEventListener('blur', () => { emFoco = true; });
window.addEventListener('focus', () => { emFoco = false; });
atualizarUI();

// ==========================================
// 4. EFEITO DE CHUVA
// ==========================================
function gerarChuva() {
    const rainContainer = document.getElementById('rain-layer');
    for (let i = 0; i < 50; i++) {
        let drop = document.createElement('div');
        drop.classList.add('rain-drop');
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.animationDuration = Math.random() * 1 + 0.5 + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        rainContainer.appendChild(drop);
    }
}

// ==========================================
// 5. MODAL DO SANTUÁRIO
// ==========================================
const santuarioBtn = document.getElementById('santuario-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');

function openSantuarioModal() {
    playClick();
    
    const shopSection = document.createElement('div');
    shopSection.className = 'modal-section';
    shopSection.innerHTML = `
        <h2 style="color: #00ffff;">🛒 Loja do Quarto</h2>
        <div class="shop-item"><span>🍖 Sachê (Fome 100%) - 20 🪙</span><button id="buy-sache">Comprar</button></div>
        <div class="shop-item"><span>🎵 Nova Fita Lo-Fi - 100 🪙</span><button id="buy-track">Comprar</button></div>
    `;

    const diarySection = document.createElement('div');
    diarySection.className = 'modal-section';
    diarySection.innerHTML = `<h2 style="color: #ff00ff;">📖 Diário de Lunaris</h2><div id="diary-pages"></div>`;
    
    if (paginasDesbloqueadas < paginasDiario.length) {
        const proxima = paginasDiario[paginasDesbloqueadas];
        diarySection.innerHTML += `
            <div class="shop-item" style="margin-top: 15px;">
                <span>Desbloquear: "${proxima.titulo}" - ${proxima.custo} 🪙</span>
                <button id="buy-page">Desbloquear</button>
            </div>
        `;
    }

    modalBody.innerHTML = '';
    modalBody.appendChild(shopSection);
    modalBody.appendChild(diarySection);

    const diaryPagesDiv = document.getElementById('diary-pages');
    for (let i = 0; i < paginasDesbloqueadas; i++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'diary-page unlocked';
        pageDiv.innerHTML = `<strong style="color:#ff006e;">${paginasDiario[i].titulo}</strong><p>${paginasDiario[i].texto}</p>`;
        diaryPagesDiv.appendChild(pageDiv);
    }

    // Botões
    document.getElementById('buy-sache').onclick = function() {
        playClick();
        if (stats.coins >= 20) { stats.coins -= 20; stats.hunger = 100; atualizarUI(); alert('Lunaris alimentado!'); }
        else { alert('Moedas insuficientes!'); }
    };

    document.getElementById('buy-track').onclick = function() {
        playClick();
        if (stats.coins >= 100) { stats.coins -= 100; medals.music = true; saveMedals(); atualizarUI(); alert('Nova faixa desbloqueada!'); }
        else { alert('Moedas insuficientes!'); }
    };

    const btnBuyPage = document.getElementById('buy-page');
    if (btnBuyPage) {
        btnBuyPage.onclick = function() {
            playClick();
            const proxima = paginasDiario[paginasDesbloqueadas];
            if (stats.coins >= proxima.custo) {
                stats.coins -= proxima.custo;
                paginasDesbloqueadas++;
                atualizarUI();
                openSantuarioModal(); // Recarrega
            } else { alert(`Você precisa de ${proxima.custo} moedas!`); }
        };
    }

    modalOverlay.classList.remove('hidden');
}

santuarioBtn.addEventListener('click', openSantuarioModal);
closeModalBtn.addEventListener('click', () => { playClick(); modalOverlay.classList.add('hidden'); });
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) { playClick(); modalOverlay.classList.add('hidden'); } });