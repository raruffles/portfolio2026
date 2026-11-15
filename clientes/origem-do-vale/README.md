# Origem do Vale — Catálogo Oficial & Vitrine de Produtos

Distribuição de palmitos nobres, conservas selecionadas, frios artesanais, bebidas e doces da serra para empórios, restaurantes e consumidores finais.

## 🚀 Como Executar Localmente

Você não precisa instalar dependências pesadas. Basta rodar:

```bash
# Iniciar servidor local
npm run dev
# ou
npx -y http-server . -p 3000 -c-1
```

Acesse: `http://localhost:3000`

---

## 🌐 Publicação no Vercel (Instância Independente)

Este projeto foi configurado com `vercel.json` para rodar diretamente na Vercel com zero-config, suporte a **Clean URLs** (`/catalogo`, `/vendedor`) e cache de borda global.

### Método 1: Vinculando via GitHub (Recomendado)
1. Crie um novo repositório no seu GitHub (ex: `origem-do-vale` ou `catalogo-origem-do-vale`).
2. Suba o conteúdo desta pasta para a raiz desse novo repositório.
3. Acesse [vercel.com](https://vercel.com) e clique em **Add New Project**.
4. Importe o repositório `origem-do-vale`.
5. Em **Framework Preset**, deixe **Other**.
6. Clique em **Deploy**. O site estará no ar em poucos segundos com certificado SSL automático.

### Método 2: Deploy Direto via Vercel CLI
No terminal dentro desta pasta:
```bash
npx vercel
```
Siga as instruções rápidas na tela e, para produção:
```bash
npm run deploy
```

---

## 📁 Estrutura de Arquivos

```
├── index.html            # Página institucional da marca Origem do Vale
├── catalogo.html         # Catálogo completo com carrinho, filtros e busca
├── vendedor.html         # Catálogo com alternância interativa de representantes
├── styles.css            # Folha de estilos centralizada e 100% responsiva
├── produtos.js           # Base de dados oficial dos 41 produtos e contatos
├── app.js                # Lógica do carrinho, filtros e checkout no WhatsApp
├── vercel.json           # Rotas amigáveis, headers de segurança e CDN da Vercel
├── package.json          # Metadados e scripts de inicialização
└── assets/               # Imagens otimizadas dos produtos e marcas parceiras
    └── produtos/
```

---

## 📱 Contatos Oficiais Configurados
- **Paulo (Representante Comercial):** (12) 99623-3563
- **Elaine (Representante Comercial):** (12) 99131-8893
