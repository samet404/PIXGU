import Script from 'next/script'

export const Adsense = () => {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1248658263644394"
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  )
}
