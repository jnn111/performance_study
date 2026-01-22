import { useState, useEffect } from 'react';
import './index.css';

export default function MeituanHome() {
  const [categories, setCategories] = useState<any[]>([]);
  const [shops, setShops] = useState<any[]>([]);

  useEffect(() => {
    // 同时请求分类和商家数据
    const fetchData = async () => {
      try {
        // 请求分类数据
        const catRes = await fetch('http://localhost:3001/api/categories');
        const catData = await catRes.json();
        setCategories(catData);

        // 请求商家数据
        const shopRes = await fetch('http://localhost:3001/api/shops');
        const shopData = await shopRes.json();
        setShops(shopData);
      } catch (error) {
        console.error('获取数据失败，请确保后端服务已启动:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="meituan-h5">
      {/* 搜索栏 */}
      <header className="header">
        <div className="location">上海市 ▼</div>
        <div className="search-bar">输入商家名、品类或商圈</div>
      </header>

      {/* 分类网格 */}
      <section className="category-grid">
        {categories.map(c => (
          <div key={c.id} className="cat-item">
            <span className="cat-icon">{c.icon}</span>
            <span className="cat-name">{c.name}</span>
          </div>
        ))}
      </section>

      {/* 商家列表 */}
      <section className="shop-section">
        <h3 className="section-title">猜你喜欢</h3>
        <div className="shop-list">
          {shops.map(shop => (
            <div key={shop.id} className="shop-card">
              <div className="shop-left">
                <img src={`https://picsum.photos/200/200?random=${shop.id}`} alt={shop.name} className="shop-img" />
              </div>
              <div className="shop-right">
                <h4>{shop.name}</h4>
                <div className="shop-meta">
                  <span className="score">⭐ {shop.score}</span>
                  <span className="sales">月售 {shop.sales}</span>
                  <span className="distance">{shop.distance}</span>
                </div>
                <div className="price-info">起送￥15 | 配送￥3 | 人均￥{shop.avgPrice}</div>
                <div className="tags">
                  {shop.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 底部导航 */}
      <footer className="footer">
        <div className="tab-item active">🏠 首页</div>
        <div className="tab-item">📋 订单</div>
        <div className="tab-item">👤 我的</div>
      </footer>
    </div>
  );
}
