# MINDGROUP-TEST-BACKEND
##Introdução

Este repositório contém o código fonte do backend do Sistema de Estoque, desenvolvido como parte de um processo seletivo na Mind Group. O sistema permite o gerenciamento de produtos, controle de entrada e saída de itens, e autenticação de usuários.

##Tecnologias Utilizadas

* Backend: Node.js com Express
* Banco de Dados: MySQL
* Linguagem: TypeScript
* Criptografia: bcrypt
* Armazenamento de Imagens: Opcional (local ou em formato BLOB no banco de dados)

##Funcionalidades
 ###Produtos:
  * Registro, visualização, edição e remoção de produtos.
  * Propriedades: nome, descrição, imagem, valor e quantidade em estoque.
  ### Entradas e Saídas:
  *Controle de entrada e saída de produtos, com registro de data e quantidade.
  ###Usuários:
    *Sistema de login e cadastro de usuários com senhas criptografadas.
    *Propriedades: nome, email e senha.
    
##Requisitos de Implementação
* Utilização de bcrypt para criptografar senhas.
* Armazenamento de imagens localmente ou no banco de dados em formato BLOB (opcional).
* Repositórios públicos no GitHub, separados para frontend e backend.
* Dump do banco de dados incluso no repositório do backend.
