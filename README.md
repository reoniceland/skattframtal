# 🧰 Island.is hackathon

Þetta repo notar **Turborepo**, **pnpm** og **TypeScript** til að halda utan um bæði `backend` og `frontend` app.

## 📦 Uppsetning

```bash
pnpm install
```

## 🚀 Verkefnastrengir (scripts)

| Skilyrði         | Lýsing                                                                 |
|------------------|------------------------------------------------------------------------|
| 🛠 `pnpm build`     | Keyrir `turbo run build` fyrir öll forrit.                           |
| 🔍 `pnpm check-types` | Keyrir týpuskannanir með `turbo run check-types`.                  |
| 🧪 `pnpm typecheck`   | Eins og að ofan, en getur verið notað sér fyrir CI o.fl.            |
| ⚙️ `pnpm dev`       | Keyrir `dev` á öllum verkefnum í þróunarham.                         |
| 💅 `pnpm format`    | Format-ar kóða með Prettier (`.ts`, `.tsx`, `.md`).                  |
| 🧹 `pnpm lint`      | Keyrir lint fyrir öll verkefni með `turbo run lint`.                |
| 💣 `pnpm nuke:node_modules` | Eyðir öllum `node_modules` möppum í repo-inu.                  |
| 📚 `pnpm storybook` | Keyrir Storybook fyrir `@reon-island/ui-core`.                      |

## 🏗 Verkefnauppsetning

```
.
├── apps/
│   ├── backend/
│   └── frontend/
└── packages/
    └── ... (sameiginleg pakkar eins og UI, utils o.fl.)
```
