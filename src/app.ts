import express from 'express'
import mongoose from 'mongoose'
import axios from 'axios'
import { CharacterRoutes } from '../src/character/routes/character.routes'
import { ComicRoutes } from '../src/comic/routes/comic.routes'
import { CreatorRoutes } from './creator/routes/creator.routes'

class App {
    public express: express.Application

    constructor() {
        this.express = express()
        this.middleware()
        this.database()
        this.routes()
        this.marvelApiRoutes() 
    }

    public middleware() {
        this.express.use(express.json())
    }

    public async database() {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/Marvel-Api');
            console.log('Conectado com a base de dados')
        } catch (error) {
            console.error("Erro ao conectar com a base de dados:", error)
        }
    }

    public routes() {
        this.express.use(CharacterRoutes)
        this.express.use(ComicRoutes)
        this.express.use(CreatorRoutes)
    }

    public marvelApiRoutes() {
        // Rota para buscar personagens da Marvel
        this.express.get('/api/marvel/characters', async (_req, res) => {
            try {
                const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
                    params: {
                        apikey: '1ab791b522e72b2bd13eae61b137ba76', 
                    }
                });
                const characters = response.data.data.results;
                res.json(characters);
            } catch (error) {
                console.error("Erro ao buscar personagens da Marvel:", error);
                res.status(500).json({ error: 'Erro ao buscar personagens da Marvel' });
            }
        });

        // Rota para buscar quadrinhos da Marvel
        this.express.get('/api/marvel/comics', async (_req, res) => {
            try {
                const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
                    params: {
                        apikey: '1ab791b522e72b2bd13eae61b137ba76', 
                    }
                });
                const comics = response.data.data.results;
                res.json(comics);
            } catch (error) {
                console.error("Erro ao buscar quadrinhos da Marvel:", error);
                res.status(500).json({ error: 'Erro ao buscar quadrinhos da Marvel' });
            }
        });
    }
}

export default new App().express
