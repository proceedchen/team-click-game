const UPSTASH_URL = process.env.UPSTASH_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_TOKEN;

// 校验环境变量
if (!UPSTASH_URL || !UPSTASH_TOKEN) {
  throw new Error('Missing UPSTASH_URL or UPSTASH_TOKEN environment variable');
}

export async function GET() {
  try {
    // 直接使用 REST API 调用
    const response = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers: {
        'Authorization': UPSTASH_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['ZREVRANGE', 'leaderboard', '0', '9', 'WITHSCORES'])
    });

    const data = await response.json();
    console.log('Redis response:', data);

    // 解析结果
    const result = [];
    if (data.result && Array.isArray(data.result)) {
      for (let i = 0; i < data.result.length; i += 2) {
        result.push({
          nickname: data.result[i],
          score: Number(data.result[i + 1])
        });
      }
    }

    return Response.json({ leaderboard: result });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message, leaderboard: [] }, { status: 500 });
  }
}