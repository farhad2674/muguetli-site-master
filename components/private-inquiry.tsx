'use client';

import { useState } from 'react';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import type { Locale } from '@/lib/muguetli';
import styles from './private-inquiry.module.css';

export function PrivateInquiry({ locale }: { locale: Locale }) {
  const fa = locale === 'fa';
  const [copied, setCopied] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, '');
  const email = process.env.NEXT_PUBLIC_INQUIRY_EMAIL;
  const message = fa
    ? 'سلام، برای شروع یک گفت‌وگوی خصوصی با موگه‌تلی پیام می‌دهم.'
    : 'Hello, I would like to begin a private conversation with Muguetli.';
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` : '';
  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return <div className={styles.inquiry} dir={fa ? 'rtl' : 'ltr'}>
    <div className={styles.intro}><span>{fa ? 'مسیر ارتباط' : 'THE NEXT STEP'}</span><p>{fa ? 'یک اثر، یک نسخه از زنگله‌ام یا یک سفارش اختصاصی را انتخاب کنید؛ ادامهٔ مسیر با شماست.' : 'Choose an artwork, a Zangole’am edition or an Atelier commission. The next step stays personal.'}</p></div>
    <div className={styles.options}>
      <div className={styles.option}>
        <MessageCircle size={26} strokeWidth={1.2} />
        <h2>{fa ? 'واتس‌اپ' : 'WhatsApp'}</h2>
        <p>{fa ? 'پیام آماده است؛ پیش از ارسال آن را مرور کنید.' : 'A prepared message is ready for you to review before sending.'}</p>
        {whatsappHref ? <a href={whatsappHref} target="_blank" rel="noreferrer">{fa ? 'باز کردن واتس‌اپ' : 'Open WhatsApp'}<ArrowUpRight size={17} /></a> : <button type="button" onClick={copyMessage}>{copied ? (fa ? 'متن کپی شد' : 'Message copied') : (fa ? 'کپی پیام نمونه' : 'Copy sample message')}<ArrowUpRight size={17} /></button>}
        {!whatsappHref && <small>{fa ? 'لینک رسمی واتس‌اپ پس از افزودن شمارهٔ تأییدشده فعال می‌شود.' : 'The official WhatsApp link will appear once a verified number is configured.'}</small>}
      </div>
      <div className={styles.option}>
        <Mail size={26} strokeWidth={1.2} />
        <h2>{fa ? 'ایمیل' : 'Email'}</h2>
        <p>{fa ? 'برای همکاری، کتاب یا اثر موردنظر خود زمینهٔ گفت‌وگو را مشخص کنید.' : 'Tell us whether your inquiry is about an artwork, a book or the Atelier.'}</p>
        {email ? <a href={`mailto:${email}?subject=${encodeURIComponent(fa ? 'پرسش خصوصی از موگه‌تلی' : 'Private inquiry — Muguetli')}`}>{fa ? 'نوشتن ایمیل' : 'Write an email'}<ArrowUpRight size={17} /></a> : <span className={styles.unavailable}>{fa ? 'ایمیل رسمی هنوز متصل نشده است.' : 'Official email is not connected yet.'}</span>}
        {!email && <small>{fa ? 'اطلاعات تماس ساختگی نمایش داده نمی‌شود.' : 'No unverified contact detail is displayed.'}</small>}
      </div>
    </div>
  </div>;
}
