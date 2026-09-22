import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100svh', display: 'grid', placeContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <p style={{ color: 'var(--teal)', fontWeight: 800, letterSpacing: '.18em' }}>404 — BETWEEN PASSAGES</p>
      <h1 style={{ margin: '1rem 0', fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 12vw, 10rem)', fontWeight: 400, letterSpacing: '-.06em', lineHeight: .8 }}>THIS PATH HAS DISSOLVED.</h1>
      <Link href="/" style={{ width: 'fit-content', margin: '2rem auto 0', borderBottom: '2px solid var(--teal)', paddingBottom: '.35rem', fontWeight: 750 }}>Return to Muguetli →</Link>
    </main>
  );
}
