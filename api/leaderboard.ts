import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const runtime = 'edge';

export async function GET() {
  try {
    // 按分数降序排列获取前10
    const leaderboard = await redis.zrevrange('leaderboard', 0, 9, { withScores: true });

    // 转换为数组格式
    const result = [];
    for (let i = 0; i < leaderboard.length; i += 2) {
      result.push({
        id: leaderboard[i],
        score: Number(leaderboard[i + 1])
      });
    }

    return Response.json({ leaderboard: result });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ leaderboard: [] }, { status: 500 });
  }
}