# Vaga Frontend 2SOW
Projeto desenvolvido como teste técnico para uma vaga de desenvolvedor frontend na empresa 2SOW.

Desenvolvido utilizando as melhores práticas para evitar duplicidade de código, e deixar o código limpo e de fácil leitura e manutenção.

## Sobre o projeto :label:
Sistema de cadastro de usuários composto das seguintes páginas:

**1. Tela de login:**
  - Usuário pode realizar login, ao ser autenticado salva um token no `localStorage`
  - Redirecionado para esta página caso não esteja autenticado
  - Validação de e-mail e senha
  - **Para realizar login** basta digitar qualquer email cadastrado no backend e qualquer senha com mais de 4 caracteres

**2. Tela de listagem:**
  - Exibe a lista de usuários cadastrados
  - Pode filtrar usuários por nome (utilizado o LIKE para buscar digitando menos caracteres)
  - Pode selecionar um usuário para navegar para a página de edição
  - Pode excluir um usuário (ao excluir com sucesso exibe um toast e recarrega a lista)
  - Pode carregar mais usuários (limite selecionado para carregar de 10 em 10 usuários)
 
 **3. Tela de adicionar/editar usuários**
  - Exibe um formulário de cadastro/edição de usuários
  - Se vier de algum usuário abre a página em modo de edição
  - Todos os campos obrigatórios
  - Valida o formato do CPF e CEP (apenas se está digitado da forma correta e não se é válido)
  - Busca os dados do CEP na [ViaCEP](https://viacep.com.br/) ao digitar ele todo
  - Caso haja retorno da [ViaCEP](https://viacep.com.br/), preenche os campos de cidade, bairro e rua, e muda o foco para o campo de número
  - Caso não haja retorno da [ViaCEP](https://viacep.com.br/) adiciona o foco novamente no CEP
  - Ao cadastrar/editar um usuário exibe um Toast de sucesso e redireciona para a página de lista de usuários
  
 **4. Tela de logout**
  - Tela apenas com funcionalidade para desautenticar o usuário e jogar ele de volta para o login
 

Desenvolvido utilizando as ferramentas:

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Styled-components](https://styled-components.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [React Hook Form](https://react-hook-form.com/)
- Backend feito com [json-server](https://github.com/typicode/json-server) como solicitado no teste

## Instalação e Testes :package:
```bash
  # Clone o repositório na pasta desejada
  git clone https://github.com/Henriquepb22/vaga-frontend-2sow
  # Via SSH
  git@github.com:Henriquepb22/vaga-frontend-2sow.git
  
  # Entre no backend, instale as dependencias, aguarde e coloque ele para rodar
  cd backend
  yarn
  yarn start
  # Com NPM
  npm install
  npm run start
  
  # Em outro terminal entre no frontend, instale as dependencias adicione as váriaveis de ambiente e rode o projeto
  cd frontend
  yarn
  # Verifique o `.env` para adicionar o endereço correto do backend e da API do CEP
  # Já estou subindo junto o arquivo com os valores padrões para evitar configurações extras
  yarn start
  # Com NPM
  npm install
  npm run start
  
  # Para rodar os testes basta entrar na pasta do frontend e rodar o rodar o seguinte comando
  yarn test
```

# Licença :heavy_check_mark:
[MIT](https://github.com/Henriquepb22/vaga-frontend-2sow/blob/main/LICENSE)
