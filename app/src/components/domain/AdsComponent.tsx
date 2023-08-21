import React, { useEffect } from 'react'

function AdsComponent({ dataAdSlot }: { dataAdSlot: string }) {

  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({
        google_ad_client: "ca-pub-3615380460314119",
        enable_page_level_ads: true
      });
    }
    catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <>
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3615380460314119"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </>
  )
}

export default AdsComponent
