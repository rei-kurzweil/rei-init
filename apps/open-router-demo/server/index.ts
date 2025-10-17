import express from 'express'
import OpenRouterManager from '@rei-init/open-router-manager'

const app = express()
app.use(express.json())

const orm = new OpenRouterManager()

app.post('/api/chat', async (req, res) => {
  try {
    const prompt: string = req.body?.prompt ?? ''
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' })
    const data = await orm.send({
      messages: [{ role: 'user', content: prompt }]
    })
    // Try to extract a typical OpenAI-like content field
    const answer = data?.choices?.[0]?.message?.content ?? data
    res.json({ answer })
  } catch (e: any) {
    res.status(500).json({ error: e?.message ?? String(e) })
  }
})

const PORT = process.env.PORT ? Number(process.env.PORT) : 8788
app.listen(PORT, () => {
  console.log(`OpenRouter demo server listening on http://localhost:${PORT}`)
})
