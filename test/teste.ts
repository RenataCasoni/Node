import request from 'supertest';
import characterSchema from '../src/character/schemas/character.schema';
import app from '../src/app';
import { describe, it } from 'node:test';

describe("Testes", () => {
    it("Criar", async () => {
        const Character1 = {
            name: "Thanos",
            description: "Teste: supervilão com primeira aparição na edição The Invincible Iron Man #55",
            img_URL: "https://nishiweb.com.br/animecomics/images/upload/507.jpg"
        };

        const response = await request
            .default(app)
            .post("/Teste")
            .send(Character1);
        const foundCharacter = await characterSchema.findById(response.body._id);

        expect(response.status).toEqual(201);
        expect(response.body._id).toBeDefined();
        expect(Character1.name).toBe(foundCharacter?.name);
        expect(Character1.description).toBe(foundCharacter?.description);
        expect(Character1.img_URL).toStrictEqual(foundCharacter?.img_URL);
    });
});
function expect(status: any) {
    throw new Error('Function not implemented.');
}

