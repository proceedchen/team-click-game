import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { score } = await request.json();

    if (typeof score !== 'number' || score < 0) {
      return Response.json({ error: 'Invalid score' }, { status: 400 });
    }

    // 获取当前时间戳作为ID
    const id = Date.now().toString();

    // 获取现有排行榜
    const leaderboard = await redis.zadd('leaderboard', {
      score: score,
      member: id,
    });

    // 按分数降序排列获取前10
    const top10 = await redis.zrevrange('leaderboard', 0, 9, { withScores: true });

    // 获取当前用户的排名
    const rank = await redis.zrevrank('leaderboard', id);

    return Response.json({ success: true, rank: (rank || 0) + 1, leaderboard: top10 });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ error: 'Use POST' }, { status: 405 });
}