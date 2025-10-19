import { useState } from 'react'

export default function App() {
    const [question, setQuestion] = useState('What is the meaning of life?')
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function ask() {
        setLoading(true)
        setError(null)
        setAnswer('')
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: question })
            })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const data = await res.json()
            setAnswer(data.answer ?? JSON.stringify(data))
        } catch (e: any) {
            setError(e?.message ?? String(e))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
            <h1>OpenRouter Demo</h1>
            <p>Ask a question; the server will call OpenRouter through the shared library.</p>
            <textarea
                style={{ width: '100%', minHeight: 120 }}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <div style={{ marginTop: 12 }}>
                <button onClick={ask} disabled={loading}>
                    {loading ? 'Asking…' : 'Ask'}
                </button>
            </div>
            {error && <pre style={{ color: 'crimson' }}>{error}</pre>}
            {answer && (
                <div style={{ marginTop: 16 }}>
                    <h3>Answer</h3>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{answer}</pre>
                </div>
            )}
        </div>
    )
}
