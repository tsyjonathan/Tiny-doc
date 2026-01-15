---
title: "Partner integration - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/partner-integration-one-time-payments/"
exportedAt: "2026-01-13T12:42:40.981Z"
---
There are three levels of system entities in our hierarchy: Organization, app, and merchant. Merchants allows partners to manage their customers.

Merchants can create and manage sub-merchants without having to set up separate organizations, apps, or manage multiple API credentials. PSPs that use Tink’s PISP license are required to onboard their merchants.

Merchants are used to separate traffic, manage configuration on a more granular level, and make sure that every partner has verified customers using our payment method.

Merchants are created and onboarded either in Console under the merchant tab or by using our [Merchants API](/Tiny-doc/tink_docs_api/api/#partner-integration/merchants/create-merchant).

We require this information to be submitted: `Name`, `Country`, `Organization number`, `URL`, `CategoryCode`. Optionally customers can input their own `externalId` that we will save and return together with the Tink Merchant ID.

`CategoryCode` refers to the industry of the merchant, following ISO 18245 standards for Merchant Category codes.Once information has been sent via Console or our API, the screening happens instantly.

When the merchant is created, you receive a unique Merchant ID in the UUID v4 format. The ID is found in the Merchant list in Console or by using our [List Merchants endpoint](/Tiny-doc/tink_docs_api/api/#payment/merchants/list-merchants).

The ID should be used in the `Merchant ID` field in the [payment request](/Tiny-doc/tink_docs_api/api/#payment/payment-request/create-payment-request) so that the traffic can be separated to the onboarded Merchant.

To enable Merchant Customization make sure to use [Sessions](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/one-time-payments-sdk-sessions/#merchant-customization) and input the Merchant ID there as well.

You can configure the merchant brand and theming in the Console under **app settings** and **merchants**.

Tink uses the ISO 18245 standard for merchant category codes. Supported categories:

| Merchant category code | Description |
| --- | --- |
| 0742 | Veterinary services |
| 0763 | Agricultural co-operatives |
| 0780 | Landscaping and horticultural services |
| 1520 | General contractors -- residential & commercial |
| 1711 | Heating, plumbing, and air conditioning contractors |
| 1731 | Electrical contractors |
| 1740 | Masonry, stonework, tile setting, plastering & insulation contractors |
| 1750 | Carpentry contractors |
| 1761 | Roofing, siding, and sheet metal work contractors |
| 1771 | Asphalt, cement, and concrete work contractors |
| 1799 | Special trade contractors (not elsewhere classified) |
| 2741 | Miscellaneous publishing and printing |
| 2791 | Typesetting, plate making, and related services |
| 2842 | Specialty cleaning, polishing, & sanitation preparations |
| 4011 | Freight Railways |
| 4111 | Local passenger transportation |
| 4112 | Passenger railways |
| 4119 | Ambulance services |
| 4121 | Taxicabs and limousines |
| 4131 | Bus lines |
| 4214 | Motor freight carriers and trucking |
| 4215 | Courier services |
| 4225 | Public warehousing and storage |
| 4411 | Steamship and cruise lines |
| 4457 | Boat rentals and leasing |
| 4468 | Marinas, marine service, and supplies |
| 4511 | Airlines and air carriers (not elsewhere classified) |
| 4582 | Airports, flying fields, and airport terminals |
| 4722 | Travel agencies and tour operators |
| 4784 | Toll and bridge fees |
| 4789 | Transportation services (not elsewhere classified) |
| 4812 | Telecommunication equipment and telephone sales |
| 4813 | Key-entry telecom merchants |
| 4814 | Telecommunication services |
| 4816 | Computer network / information services |
| 4821 | Telegraph services |
| 4829 | Money transfer |
| 4899 | Cable, satellite, and other pay television and radio services |
| 4900 | Utilities -- electric, gas, heating oil, sanitary, water |
| 5013 | Motor vehicle supplies and new parts |
| 5021 | Office and commercial furniture |
| 5039 | Construction materials (not elsewhere classified) |
| 5044 | Office, photographic, photocopy, and microfilm equipment |
| 5045 | Computers and computer peripheral equipment and services |
| 5046 | Commercial equipment (not elsewhere classified) |
| 5047 | Medical, dental, ophthalmic, and hospital equipment and supplies |
| 5051 | Metal service centers and offices |
| 5065 | Electrical parts and equipment |
| 5072 | Hardware equipment and supplies |
| 5074 | Plumbing and heating equipment and supplies |
| 5085 | Industrial supplies (not elsewhere classified) |
| 5094 | Precious stones, metals, watches, and jewelry |
| 5099 | Durable goods (not elsewhere classified) |
| 5111 | Stationery, office supplies, printing, and writing paper |
| 5122 | Drugs, drug proprietaries, and druggist sundries |
| 5131 | Piece goods, notions, and other dry goods |
| 5137 | Men's, women's, and children's uniforms, and commercial clothing |
| 5139 | Commercial footwear |
| 5169 | Chemicals and allied products (not elsewhere classified) |
| 5172 | Petroleum and petroleum products |
| 5192 | Books, periodicals, and newspapers |
| 5193 | Florist supplies, nursery stock, and flowers |
| 5198 | Paint, varnishes, and supplies |
| 5199 | Nondurable goods (not elsewhere classified) |
| 5200 | Home supply warehouse stores |
| 5211 | Lumber and building materials stores |
| 5231 | Glass, paint, and wallpaper stores |
| 5251 | Hardware stores |
| 5261 | Nurseries and lawn and garden supply stores |
| 5262 | Online marketplaces |
| 5271 | Mobile home dealers |
| 5300 | Wholesale clubs |
| 5309 | Duty free stores |
| 5310 | Discount stores |
| 5311 | Department stores |
| 5331 | Variety stores |
| 5399 | Miscellaneous general merchandise |
| 5411 | Grocery stores and supermarkets |
| 5422 | Freezer and locker meat provisioners |
| 5441 | Candy, nut, and confectionery stores |
| 5451 | Dairy products stores |
| 5462 | Bakeries |
| 5499 | Miscellaneous food stores -- convenience stores and specialty markets |
| 5511 | Car and truck dealers (new and used) -- sales, service, repairs, parts, and leasing |
| 5521 | Car and truck dealers (used only) -- sales, service, repairs, parts, and leasing |
| 5531 | Auto and home supply stores |
| 5532 | Automotive tire stores |
| 5533 | Automotive parts and accessories stores |
| 5541 | Service stations |
| 5542 | Automated fuel dispensers |
| 5551 | Boat dealers |
| 5552 | Electric vehicle charging |
| 5561 | Camper, recreational, and utility trailer dealers |
| 5571 | Motorcycle shops and dealers |
| 5592 | Motor home dealers |
| 5598 | Snowmobile dealers |
| 5599 | Miscellaneous automotive, aircraft, and farm equipment dealers (not elsewhere classified) |
| 5611 | Men's and boys' clothing and accessories stores |
| 5621 | Women's ready-to-wear stores |
| 5631 | Women's accessory and specialty shops |
| 5641 | Children's and infants' wear stores |
| 5651 | Family clothing stores |
| 5655 | Sports and riding apparel stores |
| 5661 | Shoe stores |
| 5681 | Furriers and fur shops |
| 5691 | Men's and women's clothing stores |
| 5697 | Tailors, seamstresses, mending, and alterations |
| 5698 | Wig and toupee stores |
| 5699 | Miscellaneous apparel and accessory shops |
| 5712 | Furniture, home furnishings, and equipment stores, excepting appliances |
| 5713 | Floor covering stores |
| 5714 | Drapery, window covering, and upholstery stores |
| 5718 | Fireplace, fireplace screens, and accessories stores |
| 5719 | Miscellaneous home furnishing specialty stores |
| 5722 | Household appliance stores |
| 5732 | Electronics stores |
| 5733 | Music stores -- musical instruments, pianos, and sheet music |
| 5734 | Computer software stores |
| 5735 | Record stores |
| 5811 | Caterers |
| 5812 | Eating places & restaurants |
| 5813 | Drinking places -- bars, taverns, nightclubs, cocktail lounges, and discotheques |
| 5814 | Fast food restaurants |
| 5815 | Digital goods -- books, movies, music, and NFTs |
| 5816 | Digital goods -- games |
| 5817 | Digital goods -- software applications (excluding games) |
| 5818 | Digital goods -- multi-category |
| 5912 | Drug stores and pharmacies |
| 5921 | Package stores -- beer, wine, and liquor |
| 5931 | Used merchandise and secondhand stores |
| 5932 | Antique shops -- sales, repairs, and restoration services |
| 5933 | Pawn shops |
| 5935 | Wrecking and salvage yards |
| 5937 | Antique reproductions |
| 5940 | Bicycle shops -- sales and service |
| 5941 | Sporting goods stores |
| 5942 | Book stores |
| 5943 | Stationery stores, office and school supply stores |
| 5944 | Jewelry stores, watches, clocks, and silverware stores |
| 5945 | Hobby, toy, and game shops |
| 5946 | Camera and photographic supply stores |
| 5947 | Gift, card, novelty, and souvenir shops |
| 5948 | Luggage and leather goods stores |
| 5949 | Sewing needlework, fabric, and piece goods stores |
| 5950 | Glassware / crystal stores |
| 5960 | Direct marketing -- insurance services |
| 5963 | Door-to-door sales |
| 5964 | Direct marketing -- catalog merchants |
| 5965 | Direct marketing -- combination catalog and retail merchants |
| 5966 | Direct marketing -- outbound telemarketing merchants (high-risk MCC) |
| 5967 | Direct marketing -- inbound telemarketing merchants (high-risk MCC) |
| 5968 | Direct marketing -- continuity/subscription merchants |
| 5969 | Direct marketing -- other direct marketers (not elsewhere classified) |
| 5970 | Artists supply and craft shops |
| 5971 | Art dealers and galleries |
| 5972 | Stamp and coin stores |
| 5973 | Religious goods stores |
| 5975 | Hearing aids -- sales, service, and supply |
| 5976 | Orthopedic goods -- prosthetic devices |
| 5977 | Cosmetic stores |
| 5978 | Typewriters -- sales, rentals, & service |
| 5983 | Fuel dealers -- fuel oil, wood, coal, liquefied petroleum |
| 5992 | Florists |
| 5993 | Cigar stores and stands |
| 5994 | News dealers and newsstands |
| 5995 | Pet shops, pet foods and supplies stores |
| 5996 | Swimming pools -- sales and service |
| 5997 | Electric razor stores |
| 5998 | Tent and awning shops |
| 5999 | Miscellaneous and specialty retail shops |
| 6010 | Financial institutions -- manual cash disbursements |
| 6011 | Financial institutions -- automated cash disbursements |
| 6012 | Financial institutions merchandise and services |
| 6050 | Quasi cash -- customer financial institutions |
| 6051 | Non-financial institutions -- foreign currency, Crypto, money orders, and travelers cheques |
| 6211 | Security brokers / dealers |
| 6300 | Insurance sales, underwriting, and premiums |
| 6513 | Real estate agents and managers -- rentals |
| 6532 | Payment transaction -- customer financial institution |
| 6533 | Payment transaction -- merchant |
| 6536 | MoneySend Intracountry |
| 6537 | MoneySend Intercountry |
| 6538 | MoneySend Funding |
| 6540 | POI Funding Transaction |
| 7011 | Lodging -- hotels, motels, resorts, and central reservation services (not elsewhere classified) |
| 7012 | Timeshares |
| 7032 | Sporting and recreational camps |
| 7033 | Trailer parks and campgrounds |
| 7210 | Laundry, cleaning, and garment services |
| 7211 | Laundries -- family and commercial |
| 7216 | Dry cleaners |
| 7217 | Carpet and upholstery cleaning |
| 7221 | Photographic studios |
| 7230 | Beauty and barber shops |
| 7251 | Shoe repair shops, shoe shine parlors, and hat cleaning shops |
| 7261 | Funeral service and crematories |
| 7273 | Dating services |
| 7276 | Tax preparation services |
| 7277 | Counseling services -- debt, marriage, and personal |
| 7278 | Buying and shopping services and clubs |
| 7296 | Clothing rental -- costumes, uniforms, and formal wear |
| 7297 | Massage parlors |
| 7298 | Health and beauty spas |
| 7299 | Miscellaneous personal services (not elsewhere classified) |
| 7311 | Advertising services |
| 7321 | Consumer credit reporting agencies |
| 7333 | Commercial photography, art, and graphics |
| 7338 | Quick copy, reproduction, and blueprinting services |
| 7339 | Stenographic and secretarial support |
| 7342 | Exterminating and disinfecting services |
| 7349 | Cleaning, maintenance, and janitorial services |
| 7361 | Employment agencies and temporary help services |
| 7372 | Computer programming, data processing, and integrated systems design services |
| 7375 | Information retrieval services |
| 7379 | Computer maintenance, repair, and services (not elsewhere classified) |
| 7392 | Management, consulting, and public relations services |
| 7393 | Detective agencies, protective services, and security services |
| 7394 | Equipment, tool, furniture, and appliance rental and leasing |
| 7395 | Photofinishing laboratories and photo developing |
| 7399 | Business services (not elsewhere classified) |
| 7512 | Automobile rental agency |
| 7513 | Truck and utility trailer rentals |
| 7519 | Motor home and recreational vehicle rentals |
| 7523 | Parking lots and garages |
| 7531 | Automotive body repair shops |
| 7534 | Tire retreading and repair shops |
| 7535 | Automotive paint shops |
| 7538 | Automotive service shops (non-dealer) |
| 7542 | Car washes |
| 7549 | Towing services |
| 7622 | Electronics repair shops |
| 7623 | Air conditioning and refrigeration repair shops |
| 7629 | Electrical and small appliance repair shops |
| 7631 | Watch, clock, and jewelry repair |
| 7641 | Furniture -- reupholstery, repair, and refinishing |
| 7692 | Welding services |
| 7699 | Miscellaneous repair shops and related services |
| 7800 | Government-owned lotteries (US only) |
| 7801 | Internet gambling (US only) |
| 7802 | Government-licensed horse/dog racing (US only) |
| 7829 | Motion picture and video tape production and distribution |
| 7832 | Motion picture theaters |
| 7841 | Video tape rental stores |
| 7911 | Dance halls, studios, and schools |
| 7922 | Theatrical producers and ticket agencies |
| 7929 | Bands, orchestras, and miscellaneous entertainers (not elsewhere classified) |
| 7932 | Billiard and pool establishments |
| 7933 | Bowling alleys |
| 7941 | Commercial sports, professional sports clubs, athletic fields, and sports promoters |
| 7991 | Tourist attractions and exhibits |
| 7992 | Public golf courses |
| 7993 | Video amusement game supplies |
| 7994 | Video game arcades / establishments |
| 7995 | Betting, including lottery tickets, casino gaming chips, off-track betting, and wagers at race tracks |
| 7996 | Amusement parks, circuses, carnivals, and fortune tellers |
| 7997 | Membership clubs, country clubs, and private golf courses |
| 7998 | Aquariums, dolphinariums, zoos, and seaquariums |
| 7999 | Recreation services (not elsewhere classified) |
| 8011 | Doctors and physicians (not elsewhere classified) |
| 8021 | Dentists and orthodontists |
| 8031 | Osteopaths |
| 8041 | Chiropractors |
| 8042 | Optometrists and ophthalmologists |
| 8043 | Opticians, optical goods, and eyeglasses |
| 8049 | Podiatrists and chiropodists |
| 8050 | Nursing and personal care facilities |
| 8062 | Hospitals |
| 8071 | Medical and dental laboratories |
| 8099 | Medical services and health practitioners (not elsewhere classified) |
| 8111 | Legal services and attorneys |
| 8211 | Elementary and secondary schools |
| 8220 | Colleges, universities, professional schools, and junior colleges |
| 8241 | Correspondence schools |
| 8244 | Business and secretarial schools |
| 8249 | Vocational and trade schools |
| 8299 | Schools and educational services (not elsewhere classified) |
| 8351 | Child care services |
| 8398 | Charitable and social service organizations |
| 8641 | Civic, social, and fraternal associations |
| 8651 | Political organizations |
| 8661 | Religious organizations |
| 8675 | Automobile associations |
| 8699 | Membership organizations (not elsewhere classified) |
| 8734 | Testing laboratories (non-medical testing) |
| 8911 | Architectural, engineering, and surveying services |
| 8931 | Accounting, auditing, and bookkeeping services |
| 8999 | Professional sevices (not elsewhere classified) |
| 9211 | Court costs, including alimony and child support |
| 9222 | Fines |
| 9223 | Bail and bond payments |
| 9311 | Tax payments |
| 9399 | Government services (not elsewhere classified) |
| 9402 | Postal services -- government only |
| 9405 | US federal government agencies or departments |
| 9406 | Government-owned lotteries (non-US) |
| 9950 | Intra-company purchases |

Tink also supports the 3000-3999 categories for private companies as per usual ISO and card standards:
