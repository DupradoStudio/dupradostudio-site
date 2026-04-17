# Duprado Studio — Website

Site institucional e portfólio do **Duprado Studio** (audiovisual, estratégia e marca).
Estático, performático, sem dependências de build. Inspirado em mobagency.pt, com identidade visual própria.

---

## 1. Estrutura

```
Duprado Studio/
├── index.html              ← Home (single-page com todos os blocos principais)
├── servicos.html           ← Detalhe dos 6 serviços
├── manifesto.html          ← Manifesto (dark mode)
├── sobre.html              ← Antonio Duprado (bio, track record, toolkit)
├── contato.html            ← Formulário de briefing
│
├── css/
│   └── style.css           ← Design system completo (tokens, componentes, páginas)
│
├── js/
│   └── main.js             ← Lenis smooth scroll, cursor custom, menu, reveals, FAQ
│
├── assets/
│   ├── images/             ← COLOQUE SUAS 13 FOTOS AQUI (nomes abaixo)
│   └── fonts/              ← (opcional, fontes já vêm via Google Fonts)
│
├── .github/workflows/
│   └── deploy.yml          ← CI/CD automático para GitHub Pages
│
├── CNAME                   ← Domínio custom (dupradostudio.com)
├── .gitignore
└── README.md
```

---

## 2. Fotos — instruções críticas

O site tem slots prontos apontando para `/assets/images/` com nomes definidos.
**Salve as 13 fotos enviadas com exatamente os seguintes nomes** (formato `.jpg` recomendado, ~1600px no lado maior):

| Arquivo | Uso no site |
| --- | --- |
| `duprado-01-hero.jpg` | Serviço 01 (Audiovisual) + gallery sobre |
| `duprado-02-serious.jpg` | Serviço 02 (Conteúdo) |
| `duprado-03-profile.jpg` | Serviço 03 (Fotografia) |
| `duprado-04-beige.jpg` | Serviço 04 (Marca) |
| `duprado-05-studio.jpg` | Serviço 05 (Redes) |
| `duprado-06-portrait.jpg` | Serviço 06 (Consultoria) |
| `duprado-07-director.jpg` | About block (portrait principal) |
| `duprado-08-smile.jpg` | Gallery |
| `duprado-09-wide.jpg` | Gallery (wide shot) |
| `duprado-10-frame.jpg` | Gallery (moldura) |
| `duprado-11-hands.jpg` | Gallery (mãos na moldura) |
| `duprado-12-closeup.jpg` | Gallery |
| `duprado-13-bw.jpg` | Gallery (preto e branco) |

**Importante:**
- Enquanto os arquivos não existirem, o site exibe um **placeholder elegante** com o wordmark "DUPRADO STUDIO" — não quebra o layout.
- Nomes que você usa podem ser trocados, mas precisam bater com os paths no HTML. Mais fácil: use exatamente os nomes da tabela.
- **Recomendação de preparo**: comprima em [TinyJPG](https://tinyjpg.com) antes de subir. Cada foto deve pesar < 400kb para performance.

---

## 3. Deploy em GitHub Pages

### 3.1 Repositório

```bash
cd "Duprado Studio"
git init
git add .
git commit -m "Initial commit — Duprado Studio website"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/dupradostudio-site.git
git push -u origin main
```

### 3.2 Ativar GitHub Pages

1. Vá em **Settings → Pages** no repo.
2. Em **Source**, selecione **GitHub Actions**.
3. O workflow `.github/workflows/deploy.yml` publica automaticamente a cada push na `main`.
4. Em ~1 minuto, o site estará no ar em `https://SEU-USUARIO.github.io/dupradostudio-site/` ou no domínio custom.

### 3.3 Domínio custom (dupradostudio.com)

O arquivo `CNAME` já está com `dupradostudio.com`. Para funcionar:

**No provedor DNS do domínio** (GoDaddy, Namecheap, Cloudflare, etc.) adicione:

| Tipo | Host | Valor |
| --- | --- | --- |
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |
| CNAME | www | `SEU-USUARIO.github.io` |

No GitHub: **Settings → Pages → Custom domain**, insira `dupradostudio.com`, marque **Enforce HTTPS** (leva ~1h para o SSL propagar).

Se ainda não tiver o domínio, **apague o arquivo CNAME** e o site funciona no `github.io` normalmente.

---

## 4. Rodar localmente

Qualquer servidor estático serve. Mais simples:

```bash
cd "Duprado Studio"
python3 -m http.server 8000
# abra http://localhost:8000
```

Ou use a extensão **Live Server** no VS Code.

---

## 5. Customizar

### Textos
Todo o copy está nos arquivos `.html` — edite direto. É PT-BR, com tom consultivo e direto.

### Cores / fontes / espaçamentos
`css/style.css`, bloco `:root { ... }`. Alteração em um token propaga para o site todo.

Tokens principais:
- `--color-black` / `--color-white` / `--color-grey-mid` / `--color-grey-light`
- `--font-display` (Bebas Neue) / `--font-body` (Space Grotesk) / `--font-mono` (Space Mono)
- Tipografia fluida via `clamp()` — responsiva automaticamente.

### Formulário de contato
Hoje o form usa `mailto:` (abre cliente de email). Para produção **real**, integre com:
- [Formspree](https://formspree.io) (grátis até 50 envios/mês)
- [Getform](https://getform.io)
- [Basin](https://usebasin.com)

Troque o `action` do `<form>` em `contato.html` pelo endpoint do serviço escolhido.

### Email do Duprado
Todos os `contato@dupradostudio.com` e `@antonioduprado` estão espalhados nos 5 HTMLs. Se mudar, use Find & Replace.

---

## 6. Checklist de go-live

- [ ] 13 fotos salvas em `/assets/images/` com os nomes corretos
- [ ] Fotos comprimidas (< 400kb cada)
- [ ] Email real do formulário configurado (Formspree ou similar)
- [ ] Domínio configurado no DNS + CNAME
- [ ] Google Analytics / Meta Pixel adicionados (opcional — colar antes do `</head>`)
- [ ] `og-image.jpg` (1200×630px) criado e salvo em `/assets/images/` para preview em WhatsApp/LinkedIn
- [ ] Teste em Chrome, Safari, Firefox, mobile iOS e Android
- [ ] Lighthouse score: Performance ≥ 90, SEO = 100, Accessibility ≥ 95

---

## 7. Stack técnico

- **HTML5** semântico, sem framework
- **CSS** moderno (custom properties, clamp, grid, flexbox)
- **JS** vanilla (ES6+)
- **Lenis** (smooth scroll, via CDN)
- **Google Fonts**: Bebas Neue + Space Grotesk + Space Mono

Sem build step. Sem node_modules. Edita um arquivo, salva, publica.

---

## 8. Contato do desenvolvimento

Dúvidas ou ajustes: contato@dupradostudio.com

© 2026 Duprado Studio. Desenhado &amp; dirigido no Porto.
