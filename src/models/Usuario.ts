const bcrypt = require('bcryptjs');

class Usuario{
	id: number;
	nome: string;
	email: string;
	senha: string;

	public hashSenha(senha: string): string{
		const salt = bcrypt.genSalt(10);
		const hash = bcrypt.hash(senha, salt);
		return hash;
	}

	constructor(id: number, nome: string, email: string, senha: string){
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.senha = this.hashSenha(senha);
	}
}

export default Usuario;