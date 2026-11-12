# Guia de Importação da Base de Dados — Origem do Vale (Wix)

Arquivo gerado: `base_dados_origem_do_vale_wix_cms.csv`  
Total de produtos consolidados: **41 itens** (extraídos dos 8 catálogos PDF enviados).

---

## 1. Atenção: CMS vs. Stores vs. CRM no Wix

Os 8 arquivos enviados contêm **catálogo de produtos (`Produto` + `imagem`)**, e não dados de clientes/contatos. Por isso, o arquivo gerado foi estruturado para a **Base de Dados do Wix (CMS / Content Manager)**:

- **Se o objetivo for subir no Wix CMS (Base de Dados / Coleções dinâmicas):** use o arquivo `base_dados_origem_do_vale_wix_cms.csv` diretamente conforme o passo a passo abaixo.
- **Se o objetivo for subir na Loja Virtual (Wix Stores):** o Wix exige o template rígido exato da versão do catálogo da loja (`Produtos da Loja > Mais Ações > Importar > Baixar Modelo`). Nesse caso, exporte o modelo em branco da loja do cliente, copie as colunas equivalentes (`Nome do Produto` → `name`, `Descricao Curta` → `description`/`plainDescription`, `Categoria` → `collection`/`categorySlugs`, `SKU` → `sku`, `Visivel` → `visible`) e preencha os preços (que não constavam nos PDFs).
- **Se houver também uma planilha de clientes/leads (Wix CRM / Contatos):** ela precisa ter pelo menos **E-mail ou Telefone** por linha. Se existir outro arquivo desse tipo dentro de `pommer/`, envie-o aqui para gerarmos o CSV de Contatos separado.

---

## 2. Como importar no Wix CMS (Passo a Passo)

1. No painel do site Wix (ou Wix Studio), acesse **CMS > Coleções** e clique em **Criar Coleção** (tipo *Coleção de Conteúdo* / *Content Collection*, ex.: `Produtos`).
2. Abra a coleção criada → clique em **Mais Ações > Importar itens** (ou **Importar CSV**).
3. Selecione o arquivo `base_dados_origem_do_vale_wix_cms.csv` (codificado em **UTF-8**, separado por vírgulas `,`, mantendo os acentos intactos).
4. **Mapeamento de campos recomendado:**
   - `Nome do Produto` → **Title** (campo principal de texto)
   - `SKU`, `Nome Original Catalogo`, `Categoria`, `Subcategoria`, `Marca`, `Peso Liquido ou Volume`, `Peso Drenado`, `Embalagem`, `Destaques do Rotulo`, `Descricao Curta`, `Slug`, `Observacoes de Revisao` → **Texto**
   - `Visivel` → **Booleano** (`TRUE`)
   - `Imagem URL` → **Imagem** (ou deixe sem importar inicialmente e suba as fotos pelo Gerenciador de Mídia do Wix)
5. **Sobre as imagens:** CSVs no Wix não importam imagens embutidas dentro de PDFs — apenas URLs públicas ou imagens já enviadas ao **Wix Media Manager**. Após importar o CSV, basta anexar cada foto na coluna de imagem da coleção (ou subir as fotos para o Wix Media e colar as URLs).

> **Dica de acentuação no Excel:** se precisar editar o CSV antes de subir para o Wix, prefira abrir pelo **Google Sheets** (*Arquivo > Importar* e depois *Fazer download > CSV*), pois o Excel tradicional no Windows costuma alterar a codificação UTF-8 ao salvar diretamente.

---

## 3. Pontos de Revisão Encontrados nos 8 PDFs

Antes de publicar no site, vale confirmar com a Origem do Vale os seguintes pontos identificados na conferência visual:

1. **Erros de digitação no catálogo original (já corrigidos em `Nome do Produto`, com o original preservado em `Nome Original Catalogo`):**
   - `PALMITO PUPUNPUPHA TOLETE 300GR` → corrigido para `Palmito Pupunha Tolete 540g` (300g é o peso drenado indicado no vidro).
   - `ITTS MORANJO COM HORTELÃ 260ML` → corrigido para `Itts Morango com Hortelã Zero Açúcar 260ml`.
2. **Divergência entre título e foto:**
   - `PUPUNHA MINI TOLETE P/CHURRASCO` (Ouro do Vale): o texto da tabela diz *Mini Tolete p/ Churrasco*, mas o rótulo do vidro na foto mostra **PICADO** (`570g líquido / 300g drenado`).
3. **Campos deixados em branco propositalmente por falta de legibilidade na foto (sem dados inventados):**
   - **Peso líquido não visível/ilegível:** `Doce de Leite Ecila`, `Doce Pingo de Leite`, `Doce de Abóbora`, `Cocada Cremosa Maestro`, `Queijo de Minas Ecila` e as 5 linguiças `Nalín`.
   - **Marca não visível na embalagem:** `Doce Pingo de Leite`, `Doce de Abóbora`.
   - **Fotos ilustrativas sem rótulo/marca/peso:** `Torresmo de Rolo` e `Salame`.
4. **Preços e imagens:** nenhum dos 8 PDFs informa valores de venda ou SKUs internos (os códigos `ODV-001` a `ODV-041` foram criados para padronização da base).
