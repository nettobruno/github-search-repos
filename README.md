# Github Search Repos

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge&logo=git&logoColor=white)](https://typicode.github.io/husky/#/)
[![Commitlint](https://img.shields.io/badge/Commitlint-000000?style=for-the-badge&logo=commitlint&logoColor=white)](https://commitlint.js.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)](https://prettier.io/)
[![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=css3&logoColor=white)](https://github.com/css-modules/css-modules)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Lucide](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)


---

## 🚀 Stack utilizada

### **Frontend**

- React 18
- TypeScript
- CSS Modules
- Axios
- Jest
- Lucide Icons
- Vite

### **Padronização / Qualidade**

- ESLint + Prettier
- Husky (pré-commit)
- Commitlint + Commitizen (Conventional Commits)

---

## 📸 Screenshots

<img width="1888" height="948" alt="github" src="https://github.com/user-attachments/assets/d441b46e-5f67-48d3-8a44-007577849c21" />

---

## 🛠 Rodando localmente

Clone o projeto:

```bash
git clone https://github.com/nettobruno/github-search-repos.git
```

Entre na pasta

```bash
cd github-search-repos
```

crie o arquivo `.env` e preencha com o seguinte conteúdo:
```bash
VITE_GITHUB_API_URL=https://api.github.com
VITE_GITHUB_TOKEN=seu_token_do_github
```

Instale as dependências:

```bash
yarn
```

Inicie o servidor de desenvolvimento:

```bash
yarn dev
```

Acesse:

```bash
http://localhost:5173
```

---

## 🔐 Sobre o token do GitHub

O token é utilizado apenas para evitar limitações de rate limit da API durante o desenvolvimento.

⚠️ Em um cenário real de produção, o token não deveria ficar no frontend, sendo necessário um backend intermediário.

---

## 📦 Commits

Este projeto segue Commitlint com convenção Conventional Commits e usa Husky para pré-validar mensagens.

Para criar commits padronizados, basta rodar:

```bash
yarn commit
```

Isso abrirá um assistente interativo (Commitizen) para escolher o tipo de alteração e gerar mensagens de commit corretas, como:

- feat: → Nova funcionalidade
- fix: → Correção de bug
- chore: → Atualização de dependências ou configuração

---


