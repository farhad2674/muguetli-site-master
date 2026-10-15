'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Copy, MessageCircle } from 'lucide-react';
import type { Locale } from '@/lib/muguetli';
import styles from './pre-collection-page.module.css';

export function PreCollectionInquiry({ locale }: { locale: Locale }) {
  const fa = locale === 'fa';
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, '');
  const message = () => [
    'سلام، دربارهٔ روسری آرشیوی مجموعهٔ Pre با رنگ پسته‌ای پرسش دارم.',
    name.trim() ? `نام: ${name.trim().replace(/[\r\n]+/g, ' ')}` : '',
    'ارجاع: Pre collection / پسته‌ای',
    `صفحهٔ اثر: ${new URL(window.location.pathname, process.env.NEXT_PUBLIC_SITE_URL || window.location.origin).href}`,
  ].filter(Boolean).join('\n');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch { setCopied(false); }
  };
  const open = () => {
    if (number) window.open(`https://wa.me/${number}?text=${encodeURIComponent(message())}`, '_blank', 'noopener,noreferrer');
  };
  return <section className={styles.inquiry} aria-labelledby="pre-inquiry-title">
    <span>{fa ? 'پرسش خصوصی' : 'PRIVATE INQUIRY'}</span>
    <h2 id="pre-inquiry-title">{fa ? 'دربارهٔ این روسری بپرسید.' : 'Ask about this scarf.'}</h2>
    <p>{fa ? 'ارجاع آرشیوی در متن پیام آماده است. اندازه، جنس، موجودی و قیمت پس از تأیید صاحب اثر مشخص می‌شوند.' : 'The archive reference is ready in your message. Size, fabric, availability and price await confirmation from the artist.'}</p>
    <label htmlFor="pre-customer-name">{fa ? 'نام شما (اختیاری)' : 'Your name (optional)'}</label>
    <input id="pre-customer-name" value={name} onChange={event => setName(event.target.value)} maxLength={80} autoComplete="name" />
    <div className={styles.inquiryActions}>
      {number ? <button type="button" onClick={open}><MessageCircle size={17} />{fa ? 'مرور در واتس‌اپ' : 'Review in WhatsApp'}<ArrowUpRight size={17} /></button> : <button type="button" onClick={copy}><Copy size={17} />{copied ? (fa ? 'متن کپی شد' : 'Message copied') : (fa ? 'کپی متن پرسش' : 'Copy inquiry text')}</button>}
      <Link href={`/${locale}/contact`}>{fa ? 'راه‌های ارتباط' : 'Contact options'}<ArrowUpRight size={16} /></Link>
    </div>
    {!number && <small>{fa ? 'شمارهٔ رسمی واتس‌اپ هنوز تأیید و متصل نشده است.' : 'The official WhatsApp number has not been connected yet.'}</small>}
  </section>;
}
