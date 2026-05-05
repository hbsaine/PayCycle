import { BottomNav } from '../components/BottomNav'
import { useFinancialNews } from '../hooks/useFinancialNews'

export function FinancialNews() {
  const { articles, loading, error } = useFinancialNews()

  return (
    <div className="app-shell">
      <div className="page-content">
        <header className="page-header">
          <h1 className="page-title">Financial News</h1>
          <p className="page-subtitle">Stay updated with market trends</p>
        </header>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching latest news...</p>
          </div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <div className="news-grid">
            {articles.map((article) => (
              <a 
                key={article.id} 
                href={article.url} 
                className="news-card" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {article.imageUrl && (
                  <div className="news-card-image-container">
                    <img src={article.imageUrl} alt="" className="news-card-image" loading="lazy" />
                  </div>
                )}
                <div className="news-card-content">
                  <div className="news-meta">
                    <span className="news-source">{article.source}</span>
                    <span className="news-date">
                      {new Date(article.publishedAt).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <h3 className="news-title">{article.title}</h3>
                  <p className="news-summary">{article.summary}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
