const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log('SERVIDOR ENCENDIDO')
})

const { obtenerJoyas, estructuraHATEOAS, obtenerJoyasPorFiltros } = require('./consultas')

const reportarConsultas = async (req, res, next) => {
    const parametros = req.params
    const url = req.url
    console.log(`Hoy ${new Date()} se ha recibido una consulta en la ruta ${url} con los parametros:`, parametros)
    next()
}


app.get('/joyas', reportarConsultas, async (req, res) => {
    try {
        const queryStrings = req.query
        const respuesta = await obtenerJoyas(queryStrings)
        const HATEOAS = await estructuraHATEOAS(respuesta)
        res.json(HATEOAS)
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Ups algo salio mal! ')
    }
})


app.get('/joyas/filtros', reportarConsultas, async (req, res) => {
    try {
        const queryStrings = req.query
        const inventario = await obtenerJoyasPorFiltros(queryStrings)
        res.json(inventario)
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Ups algo salio mal!')
    }
})
