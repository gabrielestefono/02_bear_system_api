import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

class LoginUserController{
    async loginUser(req: Request, res: Response) {
		try {
			const email = req.body.email;
			const senha = req.body.senha;
			const rawData = fs.readFileSync('./src/config/users.json', 'utf-8');
			const data = JSON.parse(rawData);
			const user = data.find((user: { email: string; senha: string; }) => user.email === email);
			if (!user) {
				res.status(404).json({ message: 'Usuário não encontrado' });
				return;
			}
			const isPasswordCorrect = bcrypt.compareSync(senha, user.senha);
			if (!isPasswordCorrect) {
				res.status(401).json({ message: 'Senha incorreta' });
				return;
			}
			res.status(200).json({ message: 'Usuário logado' });
		} catch (error) {
			console.error(error);
		}
	}
}

export default new LoginUserController();