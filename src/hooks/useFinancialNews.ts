import { useEffect, useState } from 'react'

export interface NewsArticle {
  id: string
  title: string
  summary: string
  url: string
  imageUrl?: string
  source: string
  publishedAt: string
}

export interface FinancialNewsData {
  articles: NewsArticle[]
  loading: boolean
  error: string | null
}

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY as string

export function useFinancialNews(): FinancialNewsData {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchNews() {
      if (!API_KEY) {
        if (!cancelled) {
          setError('Finnhub API key is missing. Please add VITE_FINNHUB_API_KEY to your .env file.')
          setLoading(false)
        }
        return
      }

      try {
        const response = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`)
        if (!response.ok) {
          if (response.status === 429) {
            throw new Error('API rate limit exceeded. Please try again later.')
          }
          throw new Error(`Failed to fetch news: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        if (cancelled) return

        if (!Array.isArray(data)) {
          throw new Error('Invalid response format from Finnhub API')
        }

        // Map Finnhub response to our standard NewsArticle interface
        const mappedArticles: NewsArticle[] = data.slice(0, 20).map((item: any) => ({
          id: String(item.id),
          title: item.headline || 'No title',
          summary: item.summary || '',
          url: item.url,
          imageUrl: item.image || undefined,
          source: item.source || 'Unknown Source',
          publishedAt: item.datetime ? new Date(item.datetime * 1000).toISOString() : new Date().toISOString()
        }))

        setArticles(mappedArticles)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching news.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchNews()

    return () => {
      cancelled = true
    }
  }, [])

  return { articles, loading, error }
}
