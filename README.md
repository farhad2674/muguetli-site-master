# Muguetli

وب‌سایت دوزبانهٔ Muguetli با Next.js و React.

## اجرای production روی سرور

پیش‌نیازها: Node.js نسخهٔ `22.13` یا بالاتر و pnpm.

```bash
pnpm install --frozen-lockfile
pnpm build
PORT=3000 pnpm start
```

سرور روی `0.0.0.0` گوش می‌دهد و مقدار `PORT` را از محیط می‌خواند. برای استفاده با دامنه، برنامه را پشت reverse proxy مانند Nginx اجرا کنید و TLS را روی proxy فعال کنید. در سرویس‌هایی مانند systemd یا Docker، همین دستور build و start را اجرا و `PORT` را در تنظیمات محیطی سرویس تعیین کنید.

تنظیمات اختیاری فروشگاه و نشانی سایت در `.env.example` آمده‌اند. برای فعال کردن آن‌ها، مقادیر واقعی را در متغیرهای محیطی سرور بگذارید؛ فایل `.env` را commit نکنید.

## اجرای محلی

```bash
pnpm install --frozen-lockfile
pnpm dev
```
