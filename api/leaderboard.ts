const UPSTASH_URL = 'https://rare-krill-145916.upstash.io';
const UPSTASH_TOKEN = 'gQAAAAAAAjn8AAIgcDE3ZmEzNDM4YjY3YTg0Y2QyOWE3OGM1MmU2NWY2N2IxOA';

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