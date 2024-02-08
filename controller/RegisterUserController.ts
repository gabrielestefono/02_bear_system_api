import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

class RegisterUserController{
    async registerUser(req: Request, res: Response) {
		try {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(req.body.senha, salt);
			let data: any[] = [];
            if (fs.existsSync('users.json')) {
                const rawData = fs.readFileSync('users.json', 'utf-8');
                data = JSON.parse(rawData);
            }
			if (!Array.isArray(data)) {
                data = [];
            }
			data.push({
                nome: req.body.nome,
                sobreNome: req.body.sobreNome,
                email: req.body.email,
                senha: hash
            });
			fs.writeFileSync('users.json', JSON.stringify(data));
			res.status(200).json({ message: 'Usuário Registrado' });
		} catch (error) {
			console.error(error);
		}
	}
}

export default new RegisterUserController();