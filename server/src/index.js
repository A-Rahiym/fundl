import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api/v1/health', (_req, res) => {
  res.json({ ok: true, service: 'fundi-api' })
})

app.listen(PORT, () => {
  console.log(`fundi-api listening on :${PORT}`)
})
