# School Manager App

Aplicativo móvel desenvolvido com React Native para gestão de escolas públicas e turmas. O projeto implementa um fluxo completo de CRUD (Create, Read, Update, Delete) com foco em arquitetura limpa, usabilidade e boas práticas de desenvolvimento mobile.

## Tecnologias e Ferramentas

O projeto foi construído utilizando o ecossistema moderno do React Native:

- **Core:** React Native (Expo SDK 50+)
- **Linguagem:** TypeScript
- **Roteamento:** Expo Router (File-based routing)
- **Interface (UI):** Gluestack UI (Componentes estilizados e acessíveis)
- **Back-end Mock:** MirageJS (Simulação completa de API REST e Banco de Dados em memória)
- **Cliente HTTP:** Axios
- **Ícones:** Lucide React Native

## Funcionalidades

### Gestão de Escolas
- **Listagem:** Visualização de todas as escolas cadastradas.
- **Cadastro:** Modal interativo para adicionar novas instituições.
- **Exclusão:** Remoção de escolas com validação de segurança.
- **Persistência Temporária:** Os dados são mantidos e gerenciados pelo MirageJS durante a sessão.

### Gestão de Turmas
- **Navegação Dinâmica:** Roteamento parametrizado (`/school/[id]`) para acessar detalhes.
- **Listagem Contextual:** Visualização apenas das turmas pertencentes à escola selecionada.
- **Cadastro Ágil:** Adição de turmas com seleção de turno (Manhã/Tarde/Noite).
- **UX Aprimorada:** Feedback visual com Badges coloridos por turno e tratamento de teclado (KeyboardAvoidingView).
- **Exclusão:** Remoção individual de turmas da lista.

## Estrutura do Projeto

A arquitetura foi pensada para ser modular e escalável:

```bash
src/
  ├── app/                # Rotas e Telas (Expo Router)
  │    ├── index.tsx      # Home (Lista de Escolas)
  │    └── school/
  │         └── [id].tsx  # Detalhes da Escola (Lista de Turmas)
  ├── components/         # Componentes isolados (Modals, Cards)
  ├── services/           # Camada de Dados e API
  │    ├── api.ts         # Instância do Axios
  │    └── server.ts      # Configuração do MirageJS (Rotas, Seeds e Models)
  └── types/              # Tipagens globais do TypeScript

Como rodar o projeto
Pré-requisitos

Node.js LTS

NPM ou Yarn

Expo Go no celular OU emulador Android/iOS configurado

Passo a passo
1. Clone o repositório
git clone https://github.com/SEU-USUARIO/school-manager-app.git
cd school-manager-app

2. Instale as dependências

Recomendado usar:

npm install --legacy-peer-deps

3. Inicie o servidor de desenvolvimento

O -c limpa o cache do Expo:

npx expo start -c

4. Execute o Aplicativo

Celular físico: Abra o Expo Go e escaneie o QR Code

Emulador Android: pressione a

Simulador iOS (macOS): pressione i

Notas sobre o Back-end (MirageJS)

Este projeto não depende de back-end real.
Toda a API é simulada com MirageJS, que:

Intercepta as chamadas do Axios

Inicializa um servidor virtual no src/services/server.ts

Possui seeds com dados iniciais (Escolas e Turmas)

Aplica um delay de 500ms para simular rede real

Armazena os dados em memória (reset ao recarregar o app)

💙 Desenvolvido com React Native