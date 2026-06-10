const UPSTASH_URL = 'https://rare-krill-145916.upstash.io';
const UPSTASH_TOKEN = 'gQAAAAAAAjn8AAIgcDE3ZmEzNDM4YjY3YTg0Y2QyOWE3OGM1MmU2NWY2N2IxOA';

// HTML 内容
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<title>数据跳舞机</title>
<style>
:root{--bg-0:#07111f;--bg-1:#0d1929;--bg-2:#162336;--bg-3:#1d2e44;--text:#fff;--text-dim:#7489a6;--accent:#58d9ff;--accent-2:#7bffcc;--panel:rgba(22,35,54,.8);--panel-border:rgba(88,217,255,.15)}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:linear-gradient(160deg,var(--bg-1),var(--bg-2) 55%,var(--bg-3));color:var(--text);min-height:100vh;overflow:hidden;user-select:none;-webkit-user-select:none}
.app{display:flex;flex-direction:column;min-height:100vh;position:relative}
.page{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:30px;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}
.page.active{opacity:1;visibility:visible}
h1{font-size:32px;font-weight:900;margin-bottom:20px;background:linear-gradient(135deg,var(--accent),var(--accent-2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.desc{font-size:16px;color:var(--text-dim);line-height:1.6;margin-bottom:20px}
.start-page{gap:20px}.start-page h1{font-size:36px}
.nickname-input{margin:10px 0}
.nickname-input input{width:200px;padding:12px 16px;font-size:16px;border:2px solid var(--accent);border-radius:10px;text-align:center;background:rgba(255,255,255,.1);color:#fff;outline:none}
.nickname-input input::placeholder{color:var(--text-dim)}
.nickname-input input:focus{border-color:var(--accent-2);box-shadow:0 0 15px rgba(88,217,255,.3)}
.start-button{padding:20px 60px;font-size:22px;font-weight:800;border:none;border-radius:50px;background:linear-gradient(135deg,var(--accent),#1e97ff);color:#fff;box-shadow:0 10px 40px rgba(30,151,255,.4);cursor:pointer;transition:transform .2s}
.start-button:active{transform:scale(0.95)}
.leaderboard-button{margin-top:15px;padding:12px 30px;font-size:16px;font-weight:600;border:2px solid rgba(255,255,255,.3);border-radius:25px;background:0 0;color:rgba(255,255,255,.8);cursor:pointer;transition:all .2s}
.leaderboard-button:active{transform:scale(0.95)}
.chip{margin-top:20px;padding:8px 16px;border-radius:20px;background:rgba(255,255,255,.08);font-size:12px;color:var(--text-dim)}
.leaderboard-page h1{font-size:28px}
.leaderboard-modal{width:100%;max-width:320px;padding:20px;border-radius:20px;background:var(--panel);border:1px solid var(--panel-border)}
.leaderboard-modal .leaderboard-list{list-style:none;padding:0;margin:0}
.leaderboard-modal .leaderboard-item{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);font-size:15px}
.leaderboard-modal .rank{color:var(--accent);font-weight:700;width:30px}
.leaderboard-modal .nickname{flex:1;text-align:left;padding-left:10px;color:#fff}
.leaderboard-modal .score{font-weight:700;color:var(--accent-2)}
.back-button{margin-top:20px;padding:12px 32px;font-size:16px;font-weight:600;border:none;border-radius:25px;background:rgba(255,255,255,.15);color:#fff;cursor:pointer}
.game-page{justify-content:space-between;padding-top:20px;padding-bottom:20px}
.topbar{width:100%;display:flex;justify-content:space-between;align-items:center;padding:10px 0}
.title-block{text-align:left}
.eyebrow{font-size:10px;color:var(--accent);letter-spacing:2px;margin-bottom:4px}
.topbar h1{font-size:20px;margin:0}
.timer-card{padding:10px 20px;border-radius:15px;background:var(--panel);border:1px solid var(--panel-border);text-align:center}
.timer-label{font-size:10px;color:var(--text-dim)}
.timer-value{font-size:28px;font-weight:900;color:var(--accent)}
.timer-value.warning{color:#ff5858;animation:pulse .5s infinite}
.stage{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative}
.arrow-indicator{font-size:60px;margin-bottom:20px;height:80px;display:flex;align-items:center;justify-content:center;transition:transform .1s}
.arrow-indicator.up{color:#ff6b6b;transform:translateY(-20px)}
.arrow-indicator.down{color:#4ecdc4;transform:translateY(20px)}
.arrow-indicator.left{color:#ffe66d;transform:translateX(-20px)}
.arrow-indicator.right{color:#95e1d3;transform:translateX(20px)}
.arrow-indicator.show{animation:arrowPop .3s ease}
@keyframes arrowPop{0%{transform:scale(.5);opacity:0}50%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}
.dancer{font-size:100px;line-height:1;transition:transform .15s;cursor:default}
.dancer.jump-up{transform:translateY(-40px) rotate(-10deg)}
.dancer.jump-down{transform:translateY(30px) scaleY(.8)}
.dancer.jump-left{transform:translateX(-40px) rotate(-15deg)}
.dancer.jump-right{transform:translateX(40px) rotate(15deg)}
.dancer.correct{animation:correctPulse .2s ease}
.dancer.wrong{animation:wrongShake .3s ease}
@keyframes correctPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.2);filter:brightness(1.3)}}
@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-10px)}75%{transform:translateX(10px)}}
.keyboard-hints{display:flex;gap:15px;margin-top:20px}
.key-hint{width:50px;height:50px;border-radius:10px;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:24px;transition:all .1s}
.key-hint.active{background:var(--accent);border-color:var(--accent);color:var(--bg-0);transform:scale(1.1)}
.footer{display:flex;align-items:center;gap:15px}
.score-chip{padding:10px 20px;border-radius:25px;background:var(--panel);border:1px solid var(--accent);font-size:18px;font-weight:700;color:var(--accent-2)}
.score-label{font-size:12px;color:var(--text-dim);font-weight:400}
.result-page{gap:25px}
.result-page h1{font-size:28px}
.score-display{padding:30px 50px;border-radius:24px;background:var(--panel);border:1px solid var(--panel-border)}
.score-label{font-size:14px;color:var(--text-dim);margin-bottom:8px}
.score-value{font-size:64px;font-weight:900;color:#fff}
.leaderboard{width:100%;max-width:320px}
.leaderboard h3{margin:0 0 16px;font-size:16px;color:var(--text-dim)}
.leaderboard-list{list-style:none;padding:0;margin:0}
.leaderboard-item{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.08);font-size:15px}
.leaderboard-item .rank{color:var(--accent);font-weight:700;width:30px}
.leaderboard-item .nickname{flex:1;text-align:left;padding-left:10px}
.leaderboard-item .score{font-weight:700;color:var(--accent-2)}
.restart-button{padding:16px 48px;font-size:18px;font-weight:700;border:none;border-radius:50px;background:linear-gradient(135deg,var(--accent-2),var(--accent));color:var(--bg-0);cursor:pointer}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@media(max-width:420px){h1{font-size:24px}.dancer{font-size:80px}.arrow-indicator{font-size:50px}.score-value{font-size:48px}}
</style>
</head>
<body>
<main class="app">
<section id="startPage" class="page start-page active">
<div><h1>🎮 数据跳舞机</h1><p class="desc">10秒内根据箭头方向<br/>按下对应键盘按键</p></div>
<div class="nickname-input"><input type="text" id="nicknameInput" placeholder="请输入你的昵称" maxlength="10"></div>
<button id="startButton" class="start-button">开始挑战</button>
<button id="leaderboardButton" class="leaderboard-button">🏆 排行榜</button>
<div class="chip">⬅️⬆️⬇️➡️ 使用方向键</div>
</section>
<section id="leaderboardPage" class="page leaderboard-page">
<h1>🏆 排行榜</h1>
<div class="leaderboard-modal"><ul id="leaderboardList2" class="leaderboard-list"></ul></div>
<button id="backButton" class="back-button">返回</button>
</section>
<section id="gamePage" class="page game-page">
<header class="topbar">
<div class="title-block"><div class="eyebrow">DANCE · RHYTHM · SCORE</div><h1>数据跳舞机</h1></div>
<div class="timer-card"><div class="timer-label">剩余时间</div><div id="timer" class="timer-value">10</div></div>
</header>
<section class="stage">
<div id="arrowIndicator" class="arrow-indicator">⬆️</div>
<div id="dancer" class="dancer">💃</div>
<div class="keyboard-hints">
<div id="keyLeft" class="key-hint">⬅️</div>
<div id="keyUp" class="key-hint">⬆️</div>
<div id="keyDown" class="key-hint">⬇️</div>
<div id="keyRight" class="key-hint">➡️</div>
</div>
</section>
<footer class="footer"><div class="score-chip"><span class="score-label">正确 </span><span id="counter">0</span><span class="score-label"> 次</span></div></footer>
</section>
<section id="resultPage" class="page result-page">
<h1>🎉 挑战结束！</h1>
<div class="score-display"><div class="score-label">你的得分</div><div id="finalScore" class="score-value">0</div></div>
<div class="leaderboard"><h3>🏆 排行榜 TOP10</h3><ul id="leaderboardList" class="leaderboard-list"><li class="leaderboard-item"><span class="rank">-</span><span>加载中...</span></li></ul></div>
<button id="restartButton" class="restart-button">再来一次</button>
</section>
</main>
<script>
const startPage=document.getElementById('startPage'),gamePage=document.getElementById('gamePage'),resultPage=document.getElementById('resultPage'),leaderboardPage=document.getElementById('leaderboardPage'),startButton=document.getElementById('startButton'),leaderboardButton=document.getElementById('leaderboardButton'),backButton=document.getElementById('backButton'),restartButton=document.getElementById('restartButton'),timerEl=document.getElementById('timer'),counterEl=document.getElementById('counter'),dancerEl=document.getElementById('dancer'),arrowIndicator=document.getElementById('arrowIndicator'),finalScoreEl=document.getElementById('finalScore'),leaderboardList=document.getElementById('leaderboardList'),leaderboardList2=document.getElementById('leaderboardList2'),nicknameInput=document.getElementById('nicknameInput'),keyLeft=document.getElementById('keyLeft'),keyUp=document.getElementById('keyUp'),keyDown=document.getElementById('keyDown'),keyRight=document.getElementById('keyRight');
let count=0,timeLeft=10,timerInterval=null,gameActive=false,currentArrow='',arrowTimeout=null;
const arrows=[{key:'ArrowUp',symbol:'⬆️',direction:'up',class:'up'},{key:'ArrowDown',symbol:'⬇️',direction:'down',class:'down'},{key:'ArrowLeft',symbol:'⬅️',direction:'left',class:'left'},{key:'ArrowRight',symbol:'➡️',direction:'right',class:'right'}];
function showPage(page){startPage.classList.remove('active');gamePage.classList.remove('active');resultPage.classList.remove('active');leaderboardPage.classList.remove('active');page.classList.add('active')}
function renderLeaderboard(data,container){if(data.leaderboard&&data.leaderboard.length>0){container.innerHTML=data.leaderboard.map((item,idx)=>\`<li class="leaderboard-item"><span class="rank">\${idx+1}</span><span class="nickname">\${item.nickname}</span><span class="score">\${item.score}分</span></li>\`).join('')}else{container.innerHTML='<li class="leaderboard-item"><span>-暂无数据-</span></li>'}}
async function loadLeaderboard(){try{const res=await fetch('/api/leaderboard');const data=await res.json();renderLeaderboard(data,leaderboardList)}catch(e){leaderboardList.innerHTML='<li class="leaderboard-item"><span>-加载失败-</span></li>'}}
function showNewArrow(){if(!gameActive)return;const arrow=arrows[Math.floor(Math.random()*arrows.length)];currentArrow=arrow.key;arrowIndicator.textContent=arrow.symbol;arrowIndicator.className='arrow-indicator show '+arrow.class;if(arrowTimeout)clearTimeout(arrowTimeout);arrowTimeout=setTimeout(()=>{if(gameActive)showNewArrow()},1500)}
function handleKeyDown(e){if(!gameActive)return;if(!arrows.find(a=>a.key===e.key))return;e.preventDefault();const arrow=arrows.find(a=>a.key===e.key);const isCorrect=e.key===currentArrow;highlightKey(arrow.direction);if(isCorrect){count++;counterEl.textContent=count;dancerEl.className='dancer jump-'+arrow.direction+' correct';showNewArrow()}else{dancerEl.className='dancer wrong'}setTimeout(()=>{dancerEl.className='dancer'},200)}
function highlightKey(direction){const keyMap={left:keyLeft,up:keyUp,down:keyDown,right:keyRight};const keyEl=keyMap[direction];if(keyEl){keyEl.classList.add('active');setTimeout(()=>keyEl.classList.remove('active'),150)}}
function startGame(){const nickname=nicknameInput.value.trim()||'匿名玩家';localStorage.setItem('playerNickname',nickname);count=0;timeLeft=10;gameActive=true;counterEl.textContent='0';timerEl.textContent='10';timerEl.classList.remove('warning');dancerEl.className='dancer';showPage(gamePage);showNewArrow();timerInterval=setInterval(()=>{timeLeft--;timerEl.textContent=timeLeft;if(timeLeft<=3)timerEl.classList.add('warning');if(timeLeft<=0)endGame()},1000)}
function endGame(){gameActive=false;clearInterval(timerInterval);if(arrowTimeout)clearTimeout(arrowTimeout);finalScoreEl.textContent=count;submitScore(count);loadLeaderboard();showPage(resultPage)}
async function submitScore(score){const nickname=localStorage.getItem('playerNickname')||'匿名玩家';try{const res=await fetch('/api/submit-score',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({score,nickname})});const data=await res.json();console.log('提交结果:',data)}catch(e){console.error('提交分数失败:',e)}}
function restartGame(){showPage(startPage)}
startButton.addEventListener('click',startGame);restartButton.addEventListener('click',restartGame);
leaderboardButton.addEventListener('click',async()=>{showPage(leaderboardPage);try{const res=await fetch('/api/leaderboard');const data=await res.json();renderLeaderboard(data,leaderboardList2)}catch(e){leaderboardList2.innerHTML='<li class="leaderboard-item"><span>-加载失败-</span></li>'}});
backButton.addEventListener('click',()=>{showPage(startPage)});
document.addEventListener('keydown',handleKeyDown);
let touchStartX=0,touchStartY=0;
document.addEventListener('touchstart',(e)=>{touchStartX=e.touches[0].clientX;touchStartY=e.touches[0].clientY},{passive:true});
document.addEventListener('touchend',(e)=>{if(!gameActive)return;const touchEndX=e.changedTouches[0].clientX,touchEndY=e.changedTouches[0].clientY,dx=touchEndX-touchStartX,dy=touchEndY-touchStartY;if(Math.abs(dx)<30&&Math.abs(dy)<30)return;let key='';if(Math.abs(dx)>Math.abs(dy)){key=dx>0?'ArrowRight':'ArrowLeft'}else{key=dy>0?'ArrowDown':'ArrowUP'}handleKeyDown({key,preventDefault:()=>{}})},{passive:true});
</script>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle OPTIONS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // API routes
    if (path === '/api/leaderboard') {
      try {
        const response = await fetch(UPSTASH_URL, {
          method: 'POST',
          headers: { 'Authorization': UPSTASH_TOKEN, 'Content-Type': 'application/json' },
          body: JSON.stringify(['ZREVRANGE', 'leaderboard', '0', '9', 'WITHSCORES'])
        });
        const data = await response.json();
        const result = [];
        if (data.result && Array.isArray(data.result)) {
          for (let i = 0; i < data.result.length; i += 2) {
            result.push({ nickname: data.result[i], score: Number(data.result[i + 1]) });
          }
        }
        return new Response(JSON.stringify({ leaderboard: result }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message, leaderboard: [] }), {
          status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

    if (path === '/api/submit-score' && request.method === 'POST') {
      try {
        const { score, nickname } = await request.json();
        const playerName = (nickname && nickname.trim()) ? nickname.trim() : '匿名玩家';

        // Get current score
        const currentScoreResponse = await fetch(UPSTASH_URL, {
          method: 'POST',
          headers: { 'Authorization': UPSTASH_TOKEN, 'Content-Type': 'application/json' },
          body: JSON.stringify(['ZSCORE', 'leaderboard', playerName])
        });
        const currentScoreData = await currentScoreResponse.json();
        const currentScore = currentScoreData.result ? Number(currentScoreData.result) : 0;

        // Only update if new score is higher
        if (score > currentScore) {
          await fetch(UPSTASH_URL, {
            method: 'POST',
            headers: { 'Authorization': UPSTASH_TOKEN, 'Content-Type': 'application/json' },
            body: JSON.stringify(['ZADD', 'leaderboard', score.toString(), playerName])
          });
        }

        // Get leaderboard
        const leaderboardResponse = await fetch(UPSTASH_URL, {
          method: 'POST',
          headers: { 'Authorization': UPSTASH_TOKEN, 'Content-Type': 'application/json' },
          body: JSON.stringify(['ZREVRANGE', 'leaderboard', '0', '9', 'WITHSCORES'])
        });
        const leaderboardData = await leaderboardResponse.json();

        // Get rank
        const rankResponse = await fetch(UPSTASH_URL, {
          method: 'POST',
          headers: { 'Authorization': UPSTASH_TOKEN, 'Content-Type': 'application/json' },
          body: JSON.stringify(['ZREVRANK', 'leaderboard', playerName])
        });
        const rankData = await rankResponse.json();

        const leaderboard = [];
        if (leaderboardData.result && Array.isArray(leaderboardData.result)) {
          for (let i = 0; i < leaderboardData.result.length; i += 2) {
            leaderboard.push({ nickname: leaderboardData.result[i], score: Number(leaderboardData.result[i + 1]) });
          }
        }

        return new Response(JSON.stringify({
          success: true,
          rank: (rankData.result || 0) + 1,
          totalScore: score > currentScore ? score : currentScore,
          leaderboard
        }), { headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      }
    }

    // Serve HTML for all other routes
    return new Response(HTML_CONTENT, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders }
    });
  }
};