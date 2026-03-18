require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { createClient } = require("@supabase/supabase-js") // identificar quem é o cliente

const app = express()
app.use(cors())
app.use(express.json())

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// LISTAR
app.get("/estoque", async (req, res) => {
  const { data, error } = await supabase
    .from("estoque")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return res.status(400).json(error)
  res.json(data)
})

// ADICIONAR
app.post("/estoque", async (req, res) => {
  const { nome, consumo_mensal, quantidade_atual } = req.body

  const { data, error } = await supabase
    .from("estoque")
    .insert([{ nome, consumo_mensal, quantidade_atual }])
    .select()

  if (error) return res.status(400).json(error)
  res.json(data[0])
})

// ATUALIZAR
app.put("/estoque/:id", async (req, res) => {
  const { id } = req.params
  const { quantidade_atual } = req.body

  const { data, error } = await supabase
    .from("estoque")
    .update({ quantidade_atual })
    .eq("id", id)
    .select()

  if (error) return res.status(400).json(error)
  res.json(data[0])
})

// DELETE
app.delete("/estoque/:id", async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from("estoque")
    .delete()
    .eq("id", id)

  if (error) return res.status(400).json(error)
  res.json({ success: true })
})

app.listen(3000, () => console.log("Servidor rodando na porta 3000"))