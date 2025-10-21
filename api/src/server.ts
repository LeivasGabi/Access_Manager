import express from "express";
import cors from "cors";
import path from "path";
import { z } from "zod";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

type AccessRequest = {
  id: number;
  user: string;
  resource: string;
  reason?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string; 
};

let seqId = 1;
const db: AccessRequest[] = [];

const createSchema = z.object({
  user: z.string().min(1),
  resource: z.string().min(1),
  reason: z.string().optional()
});

const updateSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"])
});


app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/access", (_req, res) => {
  res.json(db.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
});

app.post("/api/access", (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const now = new Date().toISOString();
  const item: AccessRequest = {
    id: seqId++,
    status: "pending",
    createdAt: now,
    ...parsed.data
  };
  db.push(item);
  res.status(201).json(item);
});

app.put("/api/access/:id", (req, res) => {
  const id = Number(req.params.id);
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const idx = db.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  db[idx].status = parsed.data.status;
  res.json(db[idx]);
});

app.delete("/api/access/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = db.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const [removed] = db.splice(idx, 1);
  res.json(removed);
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Access_Manager rodando em http://localhost:${PORT}`);
});
