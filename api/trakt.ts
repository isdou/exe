// /api/trakt.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: 'Missing slug' });
  }

  try {
    // 1. 获取剧集核心信息
    const showRes = await fetch(`https://api.trakt.tv/shows/${slug}?extended=full`, {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': process.env.TRAKT_CLIENT_ID as string, // 读取你刚才设置的环境变量
      },
    });
    if (!showRes.ok) {
        return res.status(showRes.status).json({ error: 'Trakt API Access Denied' });
      }

    // 2. 获取演员表 (Cast)
    const peopleRes = await fetch(`https://api.trakt.tv/shows/${slug}/people`, {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': process.env.TRAKT_CLIENT_ID as string,
      },
    });

    const showData = await showRes.json();
    const peopleData = await peopleRes.json();

    // 3. 整合并清洗数据给前端
    const cleanedData = {
      originalTitle: showData.title,
      year: showData.year,
      region: showData.country?.toUpperCase(),
      genre: showData.genres?.join(' / '),
      status: showData.status,
      network: showData.network,
      runtime: `${showData.runtime}m`,
      totalSeasons: showData.aired_episodes > 0 ? `${showData.seasons[showData.seasons.length - 1].number} Seasons` : 'N/A',
      description: showData.overview,
      cast: peopleData.cast?.slice(0, 5).map((person: any) => person.person.name), // 只取前5个主演
    };

    // 设置缓存控制，避免频繁请求 API
    res.setHeader('Cache-Control', 's-maxage=86400'); 
    return res.status(200).json(cleanedData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch from Trakt' });
  }
}