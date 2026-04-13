# 🚀 GitHub + Vercel Deployment Guide

## 📋 Schritt-für-Schritt Anleitung (5 Minuten!)

### ✅ **Schritt 1: Package entpacken**

```bash
tar -xzf flameout-vercel-deploy.tar.gz
cd flameout-deploy
```

✅ Das Git Repository ist bereits initialisiert mit 2 Commits!

---

### ✅ **Schritt 2: GitHub Repository erstellen**

**Option A: Via GitHub Website (empfohlen)**

1. Gehe zu [github.com/new](https://github.com/new)
2. Repository Name: **`flameout-app`**
3. Description: "Burnout recovery app with gamification"
4. **Public** ✓
5. **KEINE** README, .gitignore oder License hinzufügen (haben wir schon!)
6. Click **"Create repository"**

**Option B: Via GitHub CLI**

```bash
gh repo create flameout-app --public --source=. --remote=origin --push
```

---

### ✅ **Schritt 3: Code zu GitHub pushen**

**GitHub gibt dir diese Commands - KOPIERE SIE:**

```bash
# Remote hinzufügen (ersetze USERNAME mit deinem GitHub Username!)
git remote add origin https://github.com/USERNAME/flameout-app.git

# Branch umbenennen zu main
git branch -M main

# Push!
git push -u origin main
```

**Beispiel:**
```bash
git remote add origin https://github.com/annasophiaschnabel-5065/flameout-app.git
git branch -M main
git push -u origin main
```

✅ **Code ist jetzt auf GitHub!**

---

### ✅ **Schritt 4: Vercel mit GitHub verbinden**

1. **Gehe zu:** [vercel.com/new](https://vercel.com/new)

2. **Click:** "Import Git Repository"

3. **Wähle:** Dein `flameout-app` Repository

4. **Configure Project:**
   - **Project Name:** `flameout-app`
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** (leer lassen)
   - **Output Directory:** (leer lassen)
   - **Install Command:** (leer lassen)

5. **Team:** flameout-team (auto-selected)

6. **Click:** "Deploy"

**⏱️ Deployment dauert ~30 Sekunden**

---

### 🎉 **FERTIG! Deine App ist LIVE!**

**Live-URL:** `https://flameout-app.vercel.app`

**Auto-Deploy aktiviert:**
- Jeder Push zu `main` → Automatisches Deployment! 🚀

---

## 🔧 **Quick Commands Reference**

### GitHub Setup
```bash
# 1. Entpacken
tar -xzf flameout-vercel-deploy.tar.gz
cd flameout-deploy

# 2. Remote setzen (ERSETZE USERNAME!)
git remote add origin https://github.com/USERNAME/flameout-app.git

# 3. Branch zu main
git branch -M main

# 4. Push
git push -u origin main
```

### Zukünftige Updates
```bash
# Code ändern in app.js oder index.html
# Dann:
git add .
git commit -m "Update: beschreibung der Änderung"
git push

# → Vercel deployed automatisch! 🚀
```

---

## 📊 **Repository Info**

**GitHub Repository:**
- Name: `flameout-app`
- Visibility: Public
- Branch: `main`

**Git History:**
```
a14ace6 Add .gitignore
1e65307 Initial Flameout app deployment
```

**Files:**
```
flameout-deploy/
├── .git/              # Git repository
├── .gitignore         # Git ignore rules
├── index.html         # HTML wrapper (1.3KB)
├── app.js             # React app (222KB)
├── vercel.json        # Vercel config
└── README.md          # Documentation
```

---

## 🎯 **Nach dem Deployment**

### Custom Domain hinzufügen

1. **Vercel Dashboard** → Project → Settings → Domains
2. **Add Domain:** `flameout.app`
3. **DNS konfigurieren** (Vercel gibt dir die Records)
4. **Warten** (~5 Minuten für DNS Propagation)
5. **SSL automatisch aktiviert!** ✅

### Analytics aktivieren

1. **Vercel Dashboard** → Analytics
2. **Enable Web Analytics** (kostenlos!)
3. **Siehe:**
   - Page Views
   - Unique Visitors
   - Top Pages
   - Performance Metrics

### Environment Variables (Future)

Für Backend-Integration später:

**Dashboard → Settings → Environment Variables**

```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
ENABLE_PREMIUM=true
```

---

## ⚠️ **WICHTIG: localStorage Fix**

Die App nutzt `window.storage` (claude.ai).

Für Production auf Vercel musst du **localStorage als Fallback** hinzufügen!

### Fix in app.js:

Finde diese Zeile (~Zeile 109):
```javascript
const storage = {
  async get(key) {
    try {
      const result = await window.storage.get(key);
```

Ersetze mit:
```javascript
const storage = {
  async get(key) {
    try {
      if (typeof window !== 'undefined' && window.storage) {
        const result = await window.storage.get(key);
        return result ? JSON.parse(result.value) : null;
      }
      // Fallback zu localStorage für Production
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  async set(key, value) {
    try {
      if (typeof window !== 'undefined' && window.storage) {
        await window.storage.set(key, JSON.stringify(value));
      } else {
        // Fallback zu localStorage für Production
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error('Storage error:', e);
    }
  }
};
```

**Dann committen & pushen:**
```bash
git add app.js
git commit -m "Add localStorage fallback for production"
git push
```

Vercel deployed automatisch die neue Version! ✅

---

## 🔄 **Auto-Deploy Workflow**

```
Local Change
    ↓
git add .
    ↓
git commit -m "..."
    ↓
git push
    ↓
GitHub webhook → Vercel
    ↓
Build & Deploy
    ↓
🎉 LIVE!
```

**Zeit:** ~30 Sekunden pro Deploy

---

## 📱 **Deployment-URLs**

**Production:**
```
https://flameout-app.vercel.app
https://flameout-app-git-main-TEAM.vercel.app
```

**Custom Domain (nach Setup):**
```
https://flameout.app
https://www.flameout.app
```

---

## 🐛 **Troubleshooting**

### "Permission denied" beim Push

**Lösung:** GitHub Token erstellen
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select: `repo` scope
4. Copy token
5. Bei git push nach Passwort: Token einfügen!

### "Repository not found"

**Lösung:** Remote URL prüfen
```bash
git remote -v
# Sollte zeigen:
# origin  https://github.com/USERNAME/flameout-app.git (fetch)
# origin  https://github.com/USERNAME/flameout-app.git (push)
```

Falls falsch:
```bash
git remote remove origin
git remote add origin https://github.com/CORRECT-USERNAME/flameout-app.git
```

### Vercel findet Repository nicht

**Lösung:**
1. Vercel Dashboard → Settings → Git Integration
2. "Connect Git Provider" → GitHub
3. Authorisiere Vercel
4. Import Repository erneut versuchen

---

## 💡 **Pro Tips**

### Preview Deployments

Jeder Branch und PR bekommt eine Preview-URL!

```bash
# Feature branch erstellen
git checkout -b feature/new-exercise
# Änderungen machen
git add .
git commit -m "Add new exercise"
git push -u origin feature/new-exercise
```

Vercel erstellt automatisch: `https://flameout-app-git-feature-new-exercise.vercel.app`

### Rollback

**Dashboard → Deployments → Alte Version auswählen → "Promote to Production"**

### Branch Protection

**GitHub → Settings → Branches → Add rule für `main`:**
- Require pull request before merging ✓
- Require status checks to pass ✓

### Monitoring

**Vercel → Integrations → Add:**
- Sentry (Error Tracking)
- LogRocket (Session Replay)
- Mixpanel (Analytics)

---

## 📚 **Weitere Ressourcen**

- [Vercel Docs](https://vercel.com/docs)
- [GitHub Docs](https://docs.github.com)
- [Git Basics](https://git-scm.com/book/en/v2)

---

## ✅ **Deployment Checklist**

- [ ] Package entpackt
- [ ] GitHub Repository erstellt
- [ ] Remote hinzugefügt
- [ ] Code gepusht
- [ ] Vercel verbunden
- [ ] Deployment gestartet
- [ ] Live-URL getestet
- [ ] localStorage Fix angewendet
- [ ] Analytics aktiviert
- [ ] Custom Domain hinzugefügt (optional)

---

**Du bist 5 Minuten von LIVE entfernt! 🚀**

```bash
# Quick Start:
tar -xzf flameout-vercel-deploy.tar.gz
cd flameout-deploy
git remote add origin https://github.com/USERNAME/flameout-app.git
git branch -M main
git push -u origin main

# Dann: vercel.com/new → Import Repository → Deploy!
```

🎉 **FERTIG!**
