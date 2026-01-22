import { useState, useEffect } from 'react';
import './index.css';

// 游戏分类数据
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

// 热门游戏数据
const generateHotGames = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `热门游戏${i + 1}`,
    cover: `https://picsum.photos/200/300?random=${i}`,
    downloads: Math.floor(Math.random() * 1000000),
    rating: (Math.random() * 2 + 3).toFixed(1),
    tags: ['热门', '推荐', '新游'][Math.floor(Math.random() * 3)],
  }));
};

// Banner数据
const banners = [
  { id: 1, image: 'https://picsum.photos/750/300?random=1', title: '新游戏上线' },
  { id: 2, image: 'https://picsum.photos/750/300?random=2', title: '限时活动' },
  { id: 3, image: 'https://picsum.photos/750/300?random=3', title: '热门推荐' },
];

// 故意不优化的游戏卡片组件 - 每次父组件更新都会重新渲染
function GameCard({ game, index }: { game: any; index: number }) {
  // 故意做大量同步计算
  const expensiveCalculation = () => {
    let sum = 0;
    for (let i = 0; i < index * 1000; i++) {
      sum += Math.sqrt(i) * Math.sin(i);
    }
    return sum;
  };

  const calcValue = expensiveCalculation();

  // 每次渲染都创建新对象
  const cardStyle = {
    background: `linear-gradient(135deg, rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1), rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1))`,
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '12px',
  };

  return (
    <div className="game-card" style={cardStyle}>
      <div className="game-cover">
        <img src={game.cover} alt={game.name} loading="lazy" />
        <div className="game-tag">{game.tags}</div>
        <div className="game-rating">⭐ {game.rating}</div>
      </div>
      <div className="game-info">
        <h3>{game.name}</h3>
        <p className="game-downloads">下载量: {(game.downloads / 10000).toFixed(1)}万</p>
        <div className="game-calc">计算值: {calcValue.toFixed(2)}</div>
      </div>
    </div>
  );
}

// 故意不优化的分类图标组件
function CategoryItem({ category, index }: { category: any; index: number }) {
  // 故意做复杂计算
  const complexValue = () => {
    let result = 0;
    for (let i = 0; i < 500; i++) {
      result += Math.sqrt(i) * Math.cos(i);
    }
    return result;
  };

  return (
    <div className="category-item">
      <div 
        className="category-icon" 
        style={{ backgroundColor: category.color }}
      >
        <span style={{ fontSize: '28px' }}>{category.icon}</span>
      </div>
      <span className="category-name">{category.name}</span>
      <div className="category-calc">{complexValue().toFixed(0)}</div>
    </div>
  );
}

export default function IndexPage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [hotGames] = useState(generateHotGames());
  const [timer, setTimer] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  // 故意频繁更新状态，导致大量重渲染
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
      // 每次更新都触发整个组件树重渲染
    }, 50); // 每 50ms 更新一次，非常频繁

    return () => clearInterval(interval);
  }, []);

  // Banner自动轮播
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(bannerInterval);
  }, []);

  // 故意在渲染时做大量计算
  const renderHeavyComputation = () => {
    let result = 0;
    for (let i = 0; i < timer * 100; i++) {
      result += Math.sqrt(i) * Math.cos(i);
    }
    return result;
  };

  return (
    <div className="xunlei-game-app">
      {/* 顶部导航栏 */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">迅雷游戏</div>
          <div className="header-right">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="搜索游戏"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  // 每次输入都触发不必要的计算（故意消耗性能）
                  const _ = renderHeavyComputation();
                }}
              />
            </div>
            <div className="user-icon">
              👤
            </div>
          </div>
        </div>
      </header>

      {/* Banner轮播 */}
      <div className="banner-section">
        <div className="banner-container">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`banner-item ${index === currentBanner ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${banner.image})`,
                transform: `translateX(${(index - currentBanner) * 100}%)`,
              }}
            >
              <div className="banner-overlay">
                <h2>{banner.title}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="banner-dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={index === currentBanner ? 'active' : ''}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>

      {/* 游戏分类 */}
      <section className="categories-section">
        <h2 className="section-title">游戏分类</h2>
        <div className="categories-grid">
          {gameCategories.map((category, index) => (
            <CategoryItem key={category.id} category={category} index={index} />
          ))}
        </div>
      </section>

      {/* 热门游戏 */}
      <section className="hot-games-section">
        <div className="section-header">
          <span className="section-icon">🔥</span>
          <h2 className="section-title">热门游戏</h2>
          <span className="timer-badge">更新: {timer}</span>
        </div>
        <div className="games-list">
          {hotGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </section>

      {/* 推荐游戏 */}
      <section className="recommend-section">
        <div className="section-header">
          <span className="section-icon">🏆</span>
          <h2 className="section-title">推荐游戏</h2>
        </div>
        <div className="games-list">
          {hotGames.slice(0, 10).map((game, index) => (
            <GameCard key={`rec-${game.id}`} game={game} index={index} />
          ))}
        </div>
      </section>

      {/* 底部导航栏 */}
      <footer className="app-footer">
        <div className="footer-item active">
          <span className="footer-icon">🏠</span>
          <span>首页</span>
        </div>
        <div className="footer-item">
          <span className="footer-icon">🎮</span>
          <span>游戏</span>
        </div>
        <div className="footer-item">
          <span className="footer-icon">👤</span>
          <span>我的</span>
        </div>
      </footer>

      {/* 隐藏的性能消耗计算 */}
      <div style={{ display: 'none' }}>
        计算值: {renderHeavyComputation().toFixed(2)}
      </div>
    </div>
  );
}
