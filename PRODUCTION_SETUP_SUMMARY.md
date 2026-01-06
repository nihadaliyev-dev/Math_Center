# Production Setup Summary (Azərbaycanca)

## ✅ Tamamlanan İşlər

### 1. Domain Allow List Konfiqurasiyası

**robots.txt** - `front/public/robots.txt`

- ✅ `mrc.asoiu.edu.az` domaini allow siyahısına əlavə edildi
- ✅ Search engine crawler-lər üçün konfiqurasiya
- ✅ Admin və API endpoint-lər block edildi
- ✅ Public uploads (şəkillər) allow edildi

**.htaccess** - `front/public/.htaccess` (Apache üçün)

- ✅ `mrc.asoiu.edu.az` domaini allow siyahısına əlavə edildi
- ✅ Yalnız icazə verilən domainlərdən gələn request-lər qəbul edilir
- ✅ Security headers konfiqurasiyası
- ✅ Compression və caching
- ✅ React Router SPA routing dəstəyi

**web.config** - `server/web.config` (IIS üçün)

- ✅ Windows Server IIS üçün konfiqurasiya
- ✅ Domain allow list
- ✅ Security headers
- ✅ SPA routing

### 2. Security Təkmilləşdirmələri

**Helmet.js Konfiqurasiyası** - `server/app.js`

- ✅ Content Security Policy (CSP) production üçün aktiv
- ✅ HSTS (HTTPS) dəstəyi
- ✅ XSS Protection
- ✅ MIME type sniffing prevention
- ✅ Referrer Policy

**CORS Konfiqurasiyası** - `server/app.js`

- ✅ `mrc.asoiu.edu.az` (HTTP və HTTPS) əlavə edildi
- ✅ Production üçün təhlükəsizlik təkmilləşdirildi

**Vite Konfiqurasiyası** - `front/vite.config.ts`

- ✅ Domain `allowedHosts`-a əlavə edildi
- ✅ Production build optimizasiyası
- ✅ Sourcemap production-da deaktiv edildi (təhlükəsizlik)

### 3. Yaradılan Fayllar

1. **`front/public/robots.txt`** - SEO və crawler konfiqurasiyası
2. **`front/public/.htaccess`** - Apache web server konfiqurasiyası
3. **`server/public/.htaccess`** - API server üçün Apache konfiqurasiyası
4. **`server/web.config`** - IIS (Windows Server) üçün konfiqurasiya
5. **`PRODUCTION_READINESS_CHECKLIST.md`** - Production hazırlıq checklist

## 📋 Növbəti Addımlar

### 1. Environment Variables Yenilənməlidir

**Server `.env`:**

```env
NODE_ENV=production
FRONTEND_URL=https://mrc.asoiu.edu.az
```

**Frontend `.env.production`:**

```env
VITE_API_BASE_URL=https://mrc.asoiu.edu.az
```

### 2. Frontend Rebuild

```powershell
cd front
npm run build
```

Bu zaman `robots.txt` və `.htaccess` avtomatik olaraq `dist` qovluğuna kopyalanacaq.

### 3. Server Restart

```powershell
cd server
pm2 restart math-center-server --update-env
```

### 4. SSL Certificate (HTTPS)

SSL certificate quraşdırıldıqdan sonra:

- `.htaccess`-də HTTPS redirect-i aktiv edin (comment-dən çıxarın)
- `web.config`-də HTTPS redirect-i aktiv edin

## 🔍 Yoxlama

1. **robots.txt yoxla:**

   ```
   https://mrc.asoiu.edu.az/robots.txt
   ```

2. **Domain allow yoxla:**

   - Başqa domaindən gələn request-lər block edilməlidir
   - Yalnız `mrc.asoiu.edu.az` işləməlidir

3. **Security headers yoxla:**
   - Browser Dev Tools > Network > Headers
   - X-Frame-Options, X-XSS-Protection və s. görünməlidir

## ⚠️ Qeydlər

- **Apache** istifadə edirsinizsə: `.htaccess` faylı işləyəcək
- **IIS** istifadə edirsinizsə: `web.config` faylından istifadə edin
- **Nginx** istifadə edirsinizsə: nginx.conf-da konfiqurasiya edin
- **Express birbaşa** (reverse proxy olmadan): `.htaccess` işləməyəcək, Express middleware-ləri istifadə edin

## ✅ Hazır!

Proyekt production üçün hazırdır! Bütün domain allow list-lər, security konfiqurasiyaları və lazımi fayllar yaradılıb.
