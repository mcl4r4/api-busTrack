import express, { response } from 'express'
import cors from 'cors'
import { promises as fs } from 'node:fs'
import { request } from 'node:http'

const app = express()

const PORT = 3333

const DATABASE_URL = "./database/busTrack.json"

app.use(express.json())

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


app.post('/motoristas', async (request, response) => {

    const { nome, data_nascimento, carteira_habilitacao, onibus_id } = request.body;
    

    try {
        const data = await fs.readFile(DATABASE_URL, 'utf-8')
        const motoristas = JSON.parse(data)

        const novoMotoristas = {
            id: Date.now().toString(),
            nome,
            data_nascimento,
            carteira_habilitacao,
            onibus_id
        }


        motoristas.motoristas.push(novoMotoristas)
        await fs.writeFile(DATABASE_URL, JSON.stringify(motoristas, null, 2))
        response.status(201).json({ message: "Mototrista cadastrado" })

    } catch (error) {
        console.log(error)
        response.status(500).json({ message: "Erro internal serve" })
    }
});

app.post('/onibus', async (request, response) => {
    const { placa, modelo, ano_fabricado, capacidade, motorista_id } = request.body;


    try {
        
        const data = await fs.readFile(DATABASE_URL, 'utf-8')
        const onibus = JSON.parse(data)

        const novoOnibus = {
            id: Date.now().toString(),
            placa,
            modelo,
            ano_fabricado,
            capacidade,
            motorista_id
        }

        onibus.onibus.push(novoOnibus)
        await fs.writeFile(DATABASE_URL, JSON.stringify(onibus, null, 2))
        response.status(201).json({ message: "Ônibus cadastrado" })

    } catch (error) {
        console.log(error)
        response.status(500).json("Erro internal serve")
    }


})

app.get('/motoristas', async (request, response) => {

    try {
        const data = await fs.readFile(DATABASE_URL, 'utf-8')
        const motoristas = JSON.parse(data)



        response.status(200).json(motoristas.motoristas)

    } catch (error) {
        console.log(error)
        response.status(500).json({ message: "Erro internal serve" })
    }

})

app.get('/onibus', async (request, response) => {

    try {
        const data = await fs.readFile(DATABASE_URL, 'utf-8')
        const onibus = JSON.parse(data)



        response.status(200).json(onibus.onibus)

    } catch (error) {
        console.log(error)
        response.status(500).json({ message: "Erro internal serve" })
    }

})

app.get('/onibus/motorista/:id', async (request, response) => {

    const { id } = request.params;

    try {



    } catch (error) {
        console.log(error)
        response.status(500).json({ message: "Erro internal serve" })
    }
})
app.put('/motoristas/onibus/:id', async (request, response) => {
})
app.delete('/onibus/motorista/:id', async (request, response) => {
})









app.listen(PORT, () => {
    console.log(`Servido iniciado na porta: ${PORT}`)
})