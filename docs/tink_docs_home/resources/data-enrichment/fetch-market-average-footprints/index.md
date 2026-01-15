---
title: "Fetch Market Average Footprints - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-market-average-footprints/"
exportedAt: "2026-01-13T12:48:18.585Z"
---
To fetch market average footprints, call the `/enrichment/v1/sustainability/market-average?market={MARKET_CODE}` endpoint.

**Example request:**

```
curl '[external url removed]' \
--header 'Authorization: Bearer ' \
--header 'Accept: application/json'
```

**Example response:**

```
{ 
    "averageCo2FootprintInGrams": "6380000.0" 
} 
```

**Required Parameters:**

Almost all\* markets in the ISO 3166-1 alpha-2 code standard are supported.

| PARAMETER | DESCRIPTION |
| --- | --- |
| market | ISO 3166-1 alpha-2 code |

\*Below is a list of unsupported market codes, the rest are supported - eh,wf,vi,vg,um,tc,tk,sj,gs,sx,sc,sm,pm,mf,sh,bl,re,pr,pn,ps,mp,nf,nu,nc,ms,yt,mq,mo,ki,je,im,va,hm, gg,gu,gp,gl,gi,tf,pf,gf,fo,fk,cw,ck,cc,cx,ky,io,bv,bq,bm,aw,aq,ai,as,ax
