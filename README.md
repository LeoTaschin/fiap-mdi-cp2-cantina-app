# FIAP Cantina

Um aplicativo mobile desenvolvido em **React Native com Expo** para a cantina da FIAP. O app permite que alunos façam login, naveguem pelo cardápio, adicionem itens ao carrinho, finalizem pedidos e mantenham seus dados persistidos localmente.

## 🎯 Sobre o Projeto

O **FIAP Cantina** oferece uma experiência de cafeteria digital com:
- **Cadastro e login** com validação em tempo real
- **Persistência local** usando AsyncStorage
- **Dark mode** controlado por Context API
- **Carrinho de compras** com histórico de pedidos
- **Navegação protegida** via Expo Router

## ✨ Funcionalidades

- Registro de usuário com **nome completo**, **e-mail**, **senha** e **confirmação de senha**
- Validação de formulário com mensagens de erro em vermelho
- Login com validação de credenciais
- Sessão mantida entre reinicializações do app
- Logout com limpeza de sessão
- Cardápio interativo com itens de cafeteria
- Carrinho persistente e histórico de pedidos locais
- Alternância de tema claro/escuro na tela de perfil
- Componente reutilizável de formulário com ícones
- KeyboardAvoidingView para manter campos visíveis durante a digitação

## 🧠 Arquitetura

- **React Native + Expo**
- **Expo Router** para navegação baseada em arquivos
- **Context API** para autenticação, dados do app e tema
- **AsyncStorage** para dados persistidos localmente
- **TypeScript** para tipagem forte

## 📂 Estrutura principal

```text
app/
  (auth)/
    _layout.tsx
    login.tsx
    register.tsx
  (tabs)/
    _layout.tsx
    index.tsx
    subjects.tsx
    profile.tsx
  index.tsx
context/
  AuthContext.tsx
  AppDataContext.tsx
  ThemeContext.tsx
components/
  FormField.tsx
constants/
  menu.ts
package.json
README.md
```

## �️ Prints do aplicativo

### Tela inicial do cardápio
![Cardápio FIAP](assets/images/screenshot-home.png)

A tela inicial exibe o menu da cantina, com o contador de itens no carrinho e favoritos, além dos cards de produtos com botão `Adicionar ao carrinho`.

### Tela de pedidos
![Pedidos da Cantina](assets/images/screenshot-orders.png)

A tela de pedidos mostra o carrinho atual, os botões de finalizar pedido e limpar carrinho, e o histórico de pedidos já realizados.

### Tela de perfil
![Perfil do usuário](assets/images/screenshot-profile.png)

A tela de perfil apresenta os dados do usuário, o resumo de atividades (pedidos, carrinho e favoritos) e o controle de modo escuro.

### Tela de login
![Login de aluno](assets/images/screenshot-login.png)

A tela de login permite que o aluno faça autenticação com e-mail e senha, mostrando validação de campos em tempo real.

### Tela de cadastro
![Cadastro de aluno](assets/images/screenshot-register.png)

A tela de cadastro coleta nome completo, e-mail, senha e confirmação de senha para criar uma nova conta.

## �🚀 Como rodar

### Contribuições do time

Este projeto foi desenvolvido em equipe com commits simulados para os integrantes do grupo, incluindo ajustes no README, interface e descrições do cardápio.

### Pré-requisitos

- Node.js 16+
- npm ou yarn
- Expo CLI instalado globalmente

### Comandos

```bash
cd /Users/leotaschin/Downloads/fiap-mdi-cp1-checkpoint-tracker-main
npm install
npm start
```

Depois, use `a` para Android, `i` para iOS ou `w` para Web.

## ✅ O que foi implementado

- Autenticação completa com registro e login
- Persistência de sessão e dados de app
- Rotas protegidas para acesso ao conteúdo principal
- Tema claro/escuro com alternância via Context
- Formulários com validação inline e feedback visual
- Tela de carrinho e histórico de pedidos
- Layout responsivo e consistente

## 👥 Integrantes do Grupo

A equipe FIAP Cantina é responsável por este app de pedidos e autenticação.

| Nome Completo | RM |
|---|---|
| Leonardo Ceschim Taschin | 554583 |
| Gabriel Dias | 556830 |
| Gabriel Galerani Almeida | 557421 |
| Pedro Paulo | 554880 |
| Gustavo Teixeira | 557876 |

---