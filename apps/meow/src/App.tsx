import { useState } from 'react'
import { Card } from '@rei-init/ui'
import './App.css'

export interface MeowAppProps {
    title?: string
    initialCount?: number
    className?: string
}

function App({ title = "🛠 full send item", initialCount = 0, className }: MeowAppProps) {
    const [count, setCount] = useState(initialCount)

    function sendItem() {
        alert("Item sent! 🚀")
    }

    return (
        <div className={className}>
            <div>
                <h1>{title}</h1>
            </div>

            <Card
                title="📞 what's up, nya? ;3"
                content={`⚠ owo. we need to make dis editabwu`}
            />

            <div className="card">
                <button onClick={() => sendItem()}>
                    🚀 Send
                </button>
            </div>
        </div>
    )
}

export default App