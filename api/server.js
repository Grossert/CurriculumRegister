import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB:')
    console.error('Error name:', err.name)
    console.error('Error message:', err.message)
    if (err.reason) console.error('Error reason:', err.reason)
    if (err.code) console.error('Error code:', err.code)
    if (err.stack) console.error('Error stack:', err.stack)
    process.exit(1)
  })

// Schema para o Currículo
const curriculoSchema = new mongoose.Schema({
  nomeCompleto: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  enderecoCompleto: { type: String, required: true },
  idiomas: { type: String, required: true },
  objetivoProfissional: { type: String, required: true },
  formacao: {
    curso: { type: String, required: true },
    instituicao: { type: String, required: true },
    anoConclusao: { type: Number, required: true },
  },
  experiencia: {
    empresa: { type: String, required: true },
    cargo: { type: String, required: true },
    periodo: { type: String, required: true },
  },
});

// Modelo Currículo
const Curriculo = mongoose.model('Curriculo', curriculoSchema);

// Rota para cadastro de currículos
app.post('/api/curriculos', async (req, res) => {
  try {
    const curriculo = new Curriculo(req.body);
    await curriculo.save();
    res.status(201).json(curriculo); // Retorna o currículo salvo como resposta
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Erro ao cadastrar currículo', error: error.message });
  }
});

app.get('/api/curriculos', async (req, res) => {
  try {
    const curriculos = await Curriculo.find(); // Busca todos os currículos
    res.status(200).json(curriculos); // Retorna a lista de currículos
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar currículos', error: error.message });
  }
});

app.put('/api/curriculos/:id', async (req, res) => {
  const { id } = req.params; // Obtém o ID do currículo
  try {
    const curriculo = await Curriculo.findByIdAndUpdate(id, req.body, { new: true }); // Atualiza o currículo
    if (!curriculo) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    res.status(200).json(curriculo); // Retorna o currículo atualizado
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Erro ao editar currículo', error: error.message });
  }
});

// Rota para deletar um currículo
app.delete('/api/curriculos/:id', async (req, res) => {
  const { id } = req.params; // Obtém o ID do currículo
  try {
    const curriculo = await Curriculo.findByIdAndDelete(id); // Deleta o currículo
    if (!curriculo) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    res.status(200).json({ message: 'Currículo deletado com sucesso' }); // Confirma a exclusão
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar currículo', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
