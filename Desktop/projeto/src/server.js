const express = require("express"); // Importa o módulo Express
const cors = require("cors");
const todosRoutes = require("./todos.route")
const app = express(); // Cria uma instância do aplicativo Express

app.use(express.json());
app.use(cors());
app.use(todosRoutes);
// Define uma rota para a página inicial
app.get('/health', (req,res) => {
    res.send('Olá mundo !');
    // Envia a resposta "Olá, mundo!" ao cliente
    return res.json("Fluindo")
});

app.listen(3333, () => console.log("Funcionando na porta 3333"));