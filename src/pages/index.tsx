import { useState, useEffect } from 'react';
import './index.css';

// 模拟超大数据接口返回，增加传输和解析负担
const mockMassiveData = (size: number) => {
  return Array.from({ length: size }, (_, i) => ({
    id: i,
    name: `游戏数据项-${i}`,
    timestamp: Date.now(),
    payload: 'A'.repeat(500), // 故意增加字段长度
    metadata: {
      stats: new Array(20).fill(0).map(() => Math.random())
    }
  }));
};

// 故意模拟一个很慢的异步接口
const slowFetch = (name: string, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[API] ${name} 加载完成`);
      resolve(mockMassiveData(400)); // 每次请求返回 400 条数据
    }, delay);
  });
};

// 静态分类
const gameCategories = [
  { id: 1, name: '动作', icon: '🎮', color: '#ff6b6b' },
  { id: 2, name: '角色扮演', icon: '⚔️', color: '#4ecdc4' },
  { id: 3, name: '策略', icon: '🏰', color: '#45b7d1' },
  { id: 4, name: '休闲', icon: '🎯', color: '#f9ca24' },
  { id: 5, name: '竞技', icon: '🏆', color: '#f0932b' },
  { id: 6, name: '卡牌', icon: '🃏', color: '#eb4d4b' },
  { id: 7, name: '模拟', icon: '🏠', color: '#6c5ce7' },
  { id: 8, name: '更多', icon: '➕', color: '#95afc0' },
];

function GameCard({ game, index }: { game: any; index: number }) {
  // 故意增加组件内部渲染时的同步计算开销
  const expensiveCalculation = () => {
    let sum = 0;
    // 复杂度随 index 增加，模拟列表渲染压力
    for (let i = 0; i < (index + 1) * 1500; i++) {
      sum += Math.sqrt(i) * Math.sin(i);
    }
    return sum;
  };

  const calcValue = expensiveCalculation();

  return (
    <div className="game-card">
      <div className="game-cover">
        <img src={`https://picsum.photos/200/300?random=${index}`} alt={game.name} />
        <div className="game-tag">计算: {calcValue.toFixed(0)}</div>
      </div>
      <div className="game-info">
        <h3>{game.name}</h3>
        <p className="game-downloads">ID: {game.id} | Size: {game.payload.length}</p>
      </div>
    </div>
  );
}

export default function IndexPage() {
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apiData1, setApiData1] = useState<any[]>([]);
  const [apiData2, setApiData2] = useState<any[]>([]);
  const [apiData3, setApiData3] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  // 1. 极其频繁的状态更新 (50ms)，导致整个页面不断重绘
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // 2. 故意制造接口瀑布流 (Waterfall)
  // 多个接口串行调用，大大延长首屏显示时间
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      setLogs(prev => [...prev, '>>> 开始同步初始化...']);

      // 串行请求 1
      const res1: any = await slowFetch('UserConfig', 800);
      setApiData1(res1);
      setLogs(prev => [...prev, '接口1完成，等待接口2...']);

      // 串行请求 2
      const res2: any = await slowFetch('GameList', 1000);
      setApiData2(res2);
      setLogs(prev => [...prev, '接口2完成，等待接口3...']);

      // 串行请求 3
      const res3: any = await slowFetch('Stats', 1200);
      setApiData3(res3);
      setLogs(prev => [...prev, '所有接口加载完毕']);
      
      // 3. 故意在加载完成后执行一次超长阻塞任务 (Long Task)
      const start = Date.now();
      while (Date.now() - start < 600) {
        // 阻塞主线程 600ms
      }
      
      setLoading(false);
    };

    initData();
  }, []);

  // 4. 冗余且沉重的副作用计算
  useEffect(() => {
    // 每次组件因 timer 更新时，都进行无意义的大数据遍历
    if (apiData1.length > 0) {
      const complexProcessing = [...apiData1, ...apiData2].filter(item => {
        let internalCalc = 0;
        for (let i = 0; i < 100; i++) internalCalc += Math.random();
        return internalCalc > 0;
      });
      // 仅仅是为了消耗 CPU 周期
      const _ = complexProcessing.length;
    }
  }, [timer]);

  return (
    <div className="xunlei-game-app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">性能劣化实验室</div>
          <div className="header-right">
            <span className="cpu-monitor">CPU Load: {timer}</span>
          </div>
        </div>
      </header>

      <div className="loading-status">
        <h3>数据同步状态:</h3>
        <div className="log-container">
          {logs.map((log, i) => <div key={i} className="log-item">{log}</div>)}
          {loading && <div className="spinner">⚠️ 正在串行加载大量数据...</div>}
        </div>
      </div>

      <section className="categories-section">
        <div className="categories-grid">
          {gameCategories.map((cat, i) => (
            <div key={i} className="category-item">
              <div className="category-icon" style={{ backgroundColor: cat.color }}>{cat.icon}</div>
              <span className="category-name">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="hot-games-section">
        <h2 className="section-title">动态数据列表 (无虚拟滚动)</h2>
        <div className="games-list">
          {/* 将所有接口返回的数据混合渲染，总计上千个 DOM 节点 */}
          {[...apiData1, ...apiData2, ...apiData3].map((item, index) => (
            <GameCard key={index} game={item} index={index} />
          ))}
        </div>
      </section>

      <footer className="app-footer">
        <div className="footer-item active"><span>🏠</span><span>首页</span></div>
        <div className="footer-item"><span>🎮</span><span>性能差</span></div>
        <div className="footer-item"><span>👤</span><span>我的</span></div>
      </footer>
    </div>
  );
}
