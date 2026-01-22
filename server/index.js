const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 1. 分类接口
app.get('/api/categories', async (req, res) => {
  res.json([
    { id: 1, name: '美食', icon: '🍱' },
    { id: 2, name: '外卖', icon: '🛵' },
    { id: 3, name: '酒店', icon: '🏨' },
    { id: 4, name: '休闲', icon: '🎮' },
    { id: 5, name: '电影', icon: '🎬' },
    { id: 6, name: '打车', icon: '🚕' },
    { id: 7, name: '买菜', icon: '🥬' },
    { id: 8, name: '超市', icon: '🛒' },
    { id: 9, name: '水果', icon: '🍎' },
    { id: 10, name: '全部', icon: '➕' },
  ]);
});

// 2. 轮播图接口
app.get('/api/banners', async (req, res) => {
  await sleep(800); 
  res.json([
    { id: 1, img: 'https://picsum.photos/800/300?random=1', title: '狂欢美食节' },
    { id: 2, img: 'https://picsum.photos/800/300?random=2', title: '周末半价起' },
  ]);
});

// 3. 商家列表接口 (大数据负载)
app.get('/api/shops', async (req, res) => {
  await sleep(1200);
  const shops = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    name: `美团推荐商家-${i + 1}`,
    score: (Math.random() * 1 + 4).toFixed(1),
    sales: Math.floor(Math.random() * 1000),
    distance: (Math.random() * 5).toFixed(1) + 'km',
    avgPrice: Math.floor(Math.random() * 50 + 20),
    metadata: new Array(100).fill(0).map(() => Math.random())
  }));
  res.json(shops);
});

app.listen(PORT, () => {
  console.log(`Node Server is running at http://localhost:${PORT}`);
});
