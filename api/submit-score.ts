const UPSTASH_URL = process.env.UPSTASH_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_TOKEN;

// 校验环境变量
if (!UPSTASH_URL || !UPSTASH_TOKEN) {
  throw new Error('Missing UPSTASH_URL or UPSTASH_TOKEN environment variable');
}

export async function POST(request: Request) {
  try {
    const { score, nickname } = await request.json();

    if (typeof score !== 'number' || score < 0) {
      return Response.json({ error: 'Invalid score' }, { status: 400 });
    }

    // 使用昵称作为 key
    const playerName = (nickname && nickname.trim()) ? nickname.trim() : '匿名玩家';

    // 获取当前分数
    const currentScoreResponse = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers: {
        'Authorization': UPSTASH_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['ZSCORE', 'leaderboard', playerName])
    });
    const currentScoreData = await currentScoreResponse.json();
    const currentScore = currentScoreData.result ? Number(currentScoreData.result) : 0;

    // 只在新区分数更高时更新
    if (score > currentScore) {
      await fetch(UPSTASH_URL, {
        method: 'POST',
        headers: {
          'Authorization': UPSTASH_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['ZADD', 'leaderboard', score.toString(), playerName])
      });
    }

    // 获取排行榜
    const leaderboardResponse = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers: {
        'Authorization': UPSTASH_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['ZREVRANGE', 'leaderboard', '0', '9', 'WITHSCORES'])
    });
    const leaderboardData = await leaderboardResponse.json();

    // 获取排名
    const rankResponse = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers: {
        'Authorization': UPSTASH_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['ZREVRANK', 'leaderboard', playerName])
    });
    const rankData = await rankResponse.json();

    // 获取最高分
    const scoreResponse = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers: {
        'Authorization': UPSTASH_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['ZSCORE', 'leaderboard', playerName])
    });
    const scoreData = await scoreResponse.json();

    // 转换为数组格式
    const leaderboard = [];
    if (leaderboardData.result && Array.isArray(leaderboardData.result)) {
      for (let i = 0; i < leaderboardData.result.length; i += 2) {
        leaderboard.push({
          nickname: leaderboardData.result[i],
          score: Number(leaderboardData.result[i + 1])
        });
      }
    }

    return Response.json({
      success: true,
      rank: (rankData.result || 0) + 1,
      totalScore: Number(scoreData.result) || score,
      leaderboard: leaderboard
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ error: 'Use POST' }, { status: 405 });
}