/**
 * LUNARIS ECHOES - CORE ENGINE (v2.0 Professional)
 * Desenvolvido para funcionar com Spritesheet Único e Lógica Modular.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("🌙 Lunaris Engine Iniciada: Sistemas Carregando...");

    // =========================================================================
    // 1. ESTADO GLOBAL E DADOS (DATABASE)
    // =========================================================================
    
    // Estado do Jogo
    const gameState = {
        coins: 150, // Começa com um troco pra testar a loja
        emFoco: false, // Modo Dormir
        stats: {
            hunger: 100,
            vibe: 100,
            sleep: 100
        },
        unlockedPages: 1, // Quantas páginas do diário o jogador tem
        currentTrackIndex: 0
    };

    // Banco de Dados: Lore do Diário
    const diaryEntries = [
        { title: "Dia 1: A Chegada", text: "Ele apareceu na janela durante a tempestade de neon. Olhos grandes, refletindo a cidade. Decidi chamá-lo de Lunaris." },
        { title: "Dia 2: Frequências", text: "Percebi que ele reage às frequências Lo-Fi. O ronronar dele parece vibrar no mesmo BPM das músicas." },
        { title: "Dia 3: O Visitante", text: "Achei um bilhete estranho debaixo da porta. Dizia apenas: 'Cuidado com a estática'." },
        { title: "Dia 4: Sincronia", text: "Quando estou focado programando, ele dorme. Quando estou ansioso, ele pede carinho. Estamos conectados." },
        { title: "Dia 5: Glitch", text: "Por um segundo, vi o Lunaris pixelizar no ar. Devo estar trabalhando demais." },
        { title: "Dia 6: A Loja", text: "Descobri um canal na dark web que vende sachês quânticos. O que está acontecendo?" }
    ];

    // Banco de Dados: Playlist Lo-Fi
    const playlist = [
        'track1.mp3',
        'track2.mp3',
        'track3.mp3',
        'track4.mp3'
    ];

    // Timer para loops de jogo
    let gameLoopInterval;
    let catAnimationTimer;

    // =========================================================================
    // 2. SISTEMA DE AUDIO (AUDIO MANAGER)
    // =========================================================================

    const audioManager = {
        bgm: document.getElementById('audio-lofi'),
        sfxClick: document.getElementById('click-sfx'),
        sfxPurr: document.getElementById('ronronar-sfx'),
        sfxRain: document.getElementById('audio-chuva'),

        init() {
            // Configura playlist automática
            if (this.bgm) {
                this.bgm.volume = 0.4;
                this.bgm.addEventListener('ended', () => this.nextTrack());
            }
            if (this.sfxRain) this.sfxRain.volume = 0.5;
        },

        playClick() {
            if (this.sfxClick) {
                this.sfxClick.currentTime = 0;
                this.sfxClick.play().catch(() => {});
            }
        },

        playPurr() {
            if (this.sfxPurr) {
                this.sfxPurr.currentTime = 0;
                this.sfxPurr.play().catch(() => {});
            }
        },

        nextTrack() {
            if (!this.bgm) return;
            gameState.currentTrackIndex = (gameState.currentTrackIndex + 1) % playlist.length;
            this.bgm.src = playlist[gameState.currentTrackIndex];
            this.bgm.play().catch(e => console.log("Autoplay bloqueado:", e));
        },

        toggleSleepMode(isSleeping) {
            if (!this.bgm) return;
            if (isSleeping) {
                this.bgm.pause();
            } else {
                this.bgm.play().catch(() => {});
            }
        }
    };

    // Inicializa o som
    audioManager.init();

    // =========================================================================
    // 3. MOTOR DE ANIMAÇÃO (SPRITE ENGINE) - CORRIGIDO
    // =========================================================================

    function setCatState(stateName, durationMs = 0) {
        const sprite = document.getElementById('lunaris-sprite');
        if (!sprite) return;

        // 1. Limpeza Radical: Remove todas as classes de estado anteriores
        // Isso impede que ele fique com 'state-idle' e 'state-eat' ao mesmo tempo
        sprite.className = ''; 
        
        // 2. Reflow Mágico: Força o navegador a reiniciar a renderização CSS
        // Sem isso, a animação não "reseta" do quadro 0
        void sprite.offsetWidth; 

        // 3. Aplica o novo estado
        sprite.classList.add('state-' + stateName);
        console.log(`🐱 Gato mudou para: ${stateName}`);

        // 4. Se for uma ação temporária (comer, lamber), volta pro estado anterior
        if (durationMs > 0) {
            // Limpa timer anterior para não encavalar animações
            if (catAnimationTimer) clearTimeout(catAnimationTimer);

            catAnimationTimer = setTimeout(() => {
                const defaultState = gameState.emFoco ? 'sleep' : 'idle';
                setCatState(defaultState);
            }, durationMs);
        }
    }

    // Inicializa o gato no estado padrão
    setCatState('idle');

    // =========================================================================
    // 4. LÓGICA DO JOGO (GAME LOOP & ECONOMY)
    // =========================================================================

    function updateUI() {
        // Atualiza moedas
        const coinDisplay = document.getElementById('coin-count'); // Ajuste conforme seu HTML
        if (coinDisplay) coinDisplay.innerText = gameState.coins;
        
        // Atualiza barras (se existirem)
        updateBar('hunger-bar', gameState.stats.hunger);
        updateBar('vibe-bar', gameState.stats.vibe);
        updateBar('sleep-bar', gameState.stats.sleep);
    }

    function updateBar(id, value) {
        const bar = document.getElementById(id);
        if (bar) bar.style.width = value + '%';
    }

    function earnCoins(amount) {
        gameState.coins += amount;
        updateUI();
        showFloatingText(`+${amount}🪙`, 'gold');
    }

    function showFloatingText(text, color) {
        const sprite = document.getElementById('lunaris-sprite');
        if (!sprite) return;
        
        const floatEl = document.createElement('div');
        floatEl.innerText = text;
        floatEl.style.position = 'absolute';
        floatEl.style.left = (sprite.offsetLeft + 100) + 'px'; // Centralizado no gato
        floatEl.style.top = sprite.offsetTop + 'px';
        floatEl.style.color = color;
        floatEl.style.fontWeight = 'bold';
        floatEl.style.fontSize = '24px';
        floatEl.style.textShadow = '0 0 5px black';
        floatEl.style.pointerEvents = 'none';
        floatEl.style.transition = 'all 1s ease-out';
        floatEl.style.zIndex = '100';

        document.body.appendChild(floatEl);

        // Anima subindo e desaparecendo
        requestAnimationFrame(() => {
            floatEl.style.top = (sprite.offsetTop - 50) + 'px';
            floatEl.style.opacity = '0';
        });

        setTimeout(() => floatEl.remove(), 1000);
    }

    // Loop de decadência de status (Fome/Sono cai com o tempo)
    gameLoopInterval = setInterval(() => {
        if (gameState.emFoco) return; // Não perde status dormindo

        // Decadência leve
        if (gameState.stats.hunger > 0) gameState.stats.hunger -= 0.5;
        if (gameState.stats.vibe > 0) gameState.stats.vibe -= 0.2;
        
        updateUI();
    }, 5000); // A cada 5 segundos

    // =========================================================================
    // 5. SISTEMA DE MODAIS (LOJA E DIÁRIO)
    // =========================================================================

    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');

    function openModal(contentHTML) {
        if (!modalOverlay || !modalBody) return;
        modalBody.innerHTML = contentHTML;
        modalOverlay.classList.remove('hidden');
        modalOverlay.style.display = 'flex'; // Garante que apareça
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.add('hidden');
        setTimeout(() => { modalOverlay.style.display = 'none'; }, 300); // Espera fade out
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    // --- FUNÇÕES DA LOJA ---
    function openShop() {
        let html = `<h2>🕍 Santuário (Loja)</h2>`;
        
        // Item 1: Sachê
        html += `
        <div class="shop-item">
            <div>
                <strong>🐟 Sachê Quântico</strong><br>
                <small>Recupera 50 de Fome. O gato adora.</small>
            </div>
            <button onclick="window.buyItem('food', 20)">Comprar (20🪙)</button>
        </div>`;

        // Item 2: Página do Diário
        if (gameState.unlockedPages < diaryEntries.length) {
            html += `
            <div class="shop-item">
                <div>
                    <strong>📜 Página Perdida</strong><br>
                    <small>Desbloqueia um novo segredo do diário.</small>
                </div>
                <button onclick="window.buyItem('diary', 100)">Comprar (100🪙)</button>
            </div>`;
        } else {
            html += `<div class="shop-item"><em>Diário Completo! Você sabe tudo.</em></div>`;
        }

        openModal(html);
    }

    // Função Global para ser acessada pelo HTML do Modal
    window.buyItem = function(type, price) {
        if (gameState.coins >= price) {
            gameState.coins -= price;
            audioManager.playClick();
            
            if (type === 'food') {
                gameState.stats.hunger = Math.min(100, gameState.stats.hunger + 50);
                setCatState('eat', 4000); // Animação de comer
                showFloatingText("Nham!", "#00ff00");
                closeModal();
            } else if (type === 'diary') {
                gameState.unlockedPages++;
                showFloatingText("Nova Página!", "#ff00ff");
                openShop(); // Reabre pra atualizar a lista
            }
            updateUI();
        } else {
            alert("Sem moedas suficientes! Clique no gato para ganhar mais.");
        }
    };

    // --- FUNÇÕES DO DIÁRIO ---
    function openDiary() {
        let html = `<h2>📖 O Diário de Lunaris</h2>`;
        
        for (let i = 0; i < gameState.unlockedPages; i++) {
            const entry = diaryEntries[i];
            html += `
            <div class="modal-section" style="margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                <h3 style="color: #00ffff; margin-bottom: 5px;">${entry.title}</h3>
                <p style="font-style: italic; color: #ddd;">"${entry.text}"</p>
            </div>`;
        }

        openModal(html);
    }

    // =========================================================================
    // 6. INTERAÇÃO E EVENT LISTENERS (INPUTS)
    // =========================================================================

    // --- O GATO (CLIQUE) ---
    const sprite = document.getElementById('lunaris-sprite');
    if (sprite) {
        sprite.addEventListener('click', () => {
            if (gameState.emFoco) return; // Não acorda ele