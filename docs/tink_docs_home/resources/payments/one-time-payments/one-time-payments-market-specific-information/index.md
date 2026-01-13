---
title: "specific information - Tink Docs"
source: "https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-market-specific-information"
exportedAt: "2026-01-13T12:42:30.494Z"
---
> **Note:** This article shows examples with **simulated** values. To test the flow by using real funds, use a production app and use real values. For more information on how to use simulated funds, see [Test different one-time payment scenarios](https://docs.tink.com/resources/payments/test-different-one-time-payment-scenarios).

## Market details[](#market-details)

The following table shows different markets and which account types, schemes, scheme fees, and remittance formats apply to each market.

| Market | Account type | Scheme | Remittance format |
| --- | --- | --- | --- |
| Austria | IBAN[1](#Sup1) | SEPA Instant Credit Transfer, SEPA Credit Transfer | UNSTRUCTURED[3](#Sup3) |
| Denmark | IBAN[1](#Sup1) | Danish Domestic Credit Transfer, Instant Danish Domestic Credit Transfer Straks, Instant Danish Domestic Credit Transfer Intradag | UNSTRUCTURED[3](#Sup3) |
| Estonia | IBAN[1](#Sup1) | SEPA Instant Credit Transfer, SEPA Credit Transfer | UNSTRUCTURED[3](#Sup3), REFERENCE[4](#Sup4) |
| Finland | IBAN[1](#Sup1) | SEPA Instant Credit Transfer, SEPA Credit Transfer | UNSTRUCTURED[3](#Sup3), INVOICE[6](#Sup6) |
| France | IBAN[1](#Sup1) | SEPA Instant Credit Transfer, SEPA Credit Transfer | UNSTRUCTURED[3](#Sup3) |
| Germany | IBAN[1](#Sup1) | SEPA Instant Credit Transfer, SEPA Credit Transfer | UNSTRUCTURED[3](#Sup3) |
| Ireland | IBAN[1](#Sup1) | SEPA Credit Transfer | UNSTRUCTURED[3](#Sup3), REFERENCE[4](#Sup4) |
| Italy | IBAN[1](#Sup1) | SEPA Instant Credit Transfer, SEPA Credit Transfer | UNSTRUCTURED[3](#Sup3) |
| Lithuania | IBAN[1](#Sup1) | SEPA Instant Credit Transfer, SEPA Credit Transfer | UNSTRUCTURED[3](#Sup3), REFERENCE[4](#Sup4) |
| Netherlands | IBAN[1](#Sup1) | SEPA Instant Credit Transfer, SEPA Credit Transfer | UNSTRUCTURED[3](#Sup3) |
| Norway | IBAN[1](#Sup1), BBAN[2](#Sup2) | Norwegian Domestic Credit Transfer, Instant Norwegian Domestic Credit Transfer Straks | UNSTRUCTURED[3](#Sup3), KID |
| Poland | IBAN[1](#Sup1) | SEPA Credit Transfer, Polish Domestic Credit Transfer, Instant Polish Domestic Credit Transfer | UNSTRUCTURED[3](#Sup3) |
| Portugal | IBAN[1](#Sup1) | SEPA Credit Transfer, SEPA Instant Credit Transfer, Multibanco Service | UNSTRUCTURED[3](#Sup3) |
| Spain | IBAN[1](#Sup1) | SEPA Credit Transfer, SEPA Instant Credit Transfer | UNSTRUCTURED[3](#Sup3) |
| Sweden | IBAN[1](#Sup1), se, se-bg, se-pg | SEPA Credit Transfer, SEPA Instant Credit Transfer, Bankgiro, Plusgiro, Account-to-account transfer | UNSTRUCTURED[3](#Sup3), OCR |
| Switzerland | IBAN[1](#Sup1) | Swiss domestic credit transfer, SEPA Credit Transfer | UNSTRUCTURED[3](#Sup3) |
| United Kingdom | SORT-CODE[5](#Sup5) | Faster Payments, CHAPS, BACS | UNSTRUCTURED[3](#Sup3), REFERENCE[4](#Sup4) |

1 IBAN: International Bank Account Number. Consists of up to 34 alphanumeric characters. For more information, see [IBAN: Structure](https://en.wikipedia.org/wiki/International_Bank_Account_Number#Structure).  
2 BBAN: Basic Bank Account Number. The format is decided by the national central bank or designated payment authority of each country. For more information, see [IBAN: Basic Bank Account Number](https://en.wikipedia.org/wiki/International_Bank_Account_Number#Basic_Bank_Account_Number).  
3 An UNSTRUCTURED remittance value can contain up to 140 alphanumeric characters.  
4 A REFERENCE remittance value can contain up to 18 alphanumeric characters.  
5 A SORT-CODE account-type value must contain 6 numeric characters.  
6 A Finnish reference number is 4—20 digits long. For more information, see Finance Finland's (PDF) report, _[Forming a Finnish Reference Number](https://www.finanssiala.fi/wp-content/uploads/2021/03/Forming_a_Finnish_reference_number.pdf)_.

## Examples to create payment requests[](#examples-to-create-payment-requests)

## UK 🇬🇧[](#uk-)

We support domestic transfers and payments with all major banks that use Faster Payments in the UK.

The supported **account type** is `sort-code`. The sort code (also known as sorting code) is a six-digit number, usually formatted as three pairs of numbers, for example, 12-34-56.

The supported account number is an eight-digit number. The `accountNumber` in a payment request is created by using the six-digit sort code (for example, 123456) and then appending the account number (for example, 78901234). Together, they form the `accountNumber` (12345678901234), which is 14 digits in total.

The supported **remittance formats** are `REFERENCE` (limited to 18 characters due to Faster Payments) and `UNSTRUCTURED` (limited to 140 characters). We recommend using `REFERENCE` because some banks require it for third-party payments.

Create a payment request in UK

```
curl -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
         "recipient": {
            "accountNumber": "31245678901234",
            "accountType": "sort-code"
         },  
        "amount": 10,
        "currency": "GBP",
        "market": "GB",
        "recipientName": "Test Ltd",
        "paymentScheme": "FASTER_PAYMENTS",
        "remittanceInformation": {
           "type": "REFERENCE",
           "value": "CREDITOR-REF-12345"
         }
       }
}'
```

## Sweden 🇸🇪[](#sweden-)

The **account numbers** must be filled in without dashes or spaces.

Create a payment request in Sweden

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
         "recipient": {
            "accountNumber": "41054685",
            "accountType": "se-pg"
         },   
        "amount": 10,
        "currency": "SEK",
        "market": "SE",
        "recipientName": "Test AB",
        "sourceMessage": "Payment for Gym Equipment",
        "remittanceInformation": {
            "type": "OCR",
            "value": "1885657302"
          }
       }'
```

## France 🇫🇷[](#france-)

Create a payment request in France

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '
   {
       "recipient": {
           "accountNumber": "FR1420041010050500013M02606",
           "accountType": "iban"
       },       
       "amount": 15,
       "currency": "EUR",
       "market": "FR",
       "recipientName": "Evan Herveau",
       "remittanceInformation": {
           "type": "UNSTRUCTURED",
           "value": "Top-up"
         },
         "paymentScheme": "SEPA_INSTANT_CREDIT_TRANSFER"
       }'
```

## Portugal 🇵🇹[](#portugal-)

Create an account-to-account payment request in Portugal

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '
{
       "recipient": {
           "accountNumber": "PT50002300004556956433294",
           "accountType": "iban"
        },               
        "amount": 10,
        "currency": "EUR",
        "market": "PT",
        "recipientName": "Carlos Vierra",
        "remittanceInformation": {
           "type": "UNSTRUCTURED",
           "value": "Top-up"
         },
         "paymentScheme": "SEPA_INSTANT_CREDIT_TRANSFER"
       }'
```

Create a Multibanco payment request in Portugal

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '
{
       "recipient": {
           "accountNumber": "54321",
           "accountType": "multibanco-entity"
        },                       
        "amount": 10,
        "currency": "EUR",
        "market": "PT",
        "recipientName": "Carlos Vierra",
        "remittanceInformation": {
           "type": "MULTIBANCO_REFERENCE",
           "value": "987654321"
         },
         "paymentScheme": "MULTIBANCO_SERVICE"
       }'
```

## Ireland 🇮🇪[](#ireland-)

Create a payment request in Ireland

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "IE29AIBK93115212345678",
           "accountType": "iban"
        },     
        "amount": 10,
        "currency": "EUR",
        "market": "IE",
        "recipientName": "Test s.r.l.",
        "remittanceInformation": 
           {
            "type": "UNSTRUCTURED",
            "value": "Top-up"
          },
        "paymentScheme": "SEPA_CREDIT_TRANSFER"
       }'
```

## Italy 🇮🇹[](#italy-)

Create a payment request in Italy

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "IT60X0542811101000000123456",
           "accountType": "iban"
        },             
        "amount": 10,
        "currency": "EUR",
        "market": "IT",
        "recipientName": "Test s.r.l.",
        "remittanceInformation": 
           {
            "type": "UNSTRUCTURED",
            "value": "numero di riferimento 1234"
          },
        "paymentScheme": "SEPA_CREDIT_TRANSFER"
       }'
```

## Germany 🇩🇪[](#germany-)

Create a payment request in Germany

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "DE03500105177564668331",
           "accountType": "iban"
        },      
        "amount": 10,
        "currency": "EUR",
        "market": "DE",
        "recipientName": "Horst Schumacher",
        "remittanceInformation": 
           {
            "type": "UNSTRUCTURED",
            "value": "Top-up"
          },
        "paymentScheme": "SEPA_CREDIT_TRANSFER"
       }'
```

## Spain 🇪🇸[](#spain-)

Create a payment request in Spain

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "ES9121000418450200051332",
           "accountType": "iban"
        },    
        "amount": 10,
        "currency": "EUR",
        "market": "ES",
        "recipientName": "Carlos Blanco",
        "remittanceInformation": 
           {
            "type": "UNSTRUCTURED",
            "value": "Top-up"
          },
        "paymentScheme": "SEPA_CREDIT_TRANSFER"
       }'
```

## Finland 🇫🇮[](#finland-)

Create a payment request in Finland

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "FI0207087487287613",
           "accountType": "iban"
        },            
        "amount": 10,
        "currency": "EUR",
        "market": "FI",
        "recipientName": "Hanna Mäkinen",
        "remittanceInformation": 
           {
            "type": "INVOICE",
            "value": "85115125674842817116"
          },
        "paymentScheme": "SEPA_CREDIT_TRANSFER"
       }'
```

For payments to **Aktia**, you also need to include the [RecipientDTO](https://docs.tink.com/api-payment#tag-paymentrequest-recipientdto) in the request.

Create a payment request to Aktia

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
        // ... 
        "recipient": {
           "accountNumber": "FI0207087487287613",
           "accountType": "IBAN",
           "businessIdentifierCode": "<BIC>"
       }'
```

> **Note**: If you are initiating Cross-border SEPA transfers, i.e to a non-Finnish account, then we recommend you to input the `RecipientDTO` fields when creating the [payment request](https://docs.tink.com/api-payment#payment/payment-request/create-payment-request). Receivers BIC and Address information is required by some banks to initiate international PIS transfers.

## Austria 🇦🇹[](#austria-)

Create a payment request in Austria

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "AT639466074958467508",
           "accountType": "iban"
        },                    
        "amount": 15.00,
        "currency": "EUR",
        "market": "AT",
        "recipientName": "Tobias Gruber",
        "remittanceInformation": 
           {
            "type": "UNSTRUCTURED",
            "value": "Tink Test"
          },
        "paymentScheme": "SEPA_CREDIT_TRANSFER"
       }'
```

## Norway 🇳🇴[](#norway-)

The supported **account types** are `iban` and `bban`. BBAN is for domestic schemes only.

The supported **payment schemes** are `NORWEGIAN_DOMESTIC_CREDIT_TRANSFER` and `INSTANT_NORWEGIAN_DOMESTIC_CREDIT_TRANSFER_STRAKS`.

In addition, for Revolut only, the supported **payment schemes** are `SEPA_CREDIT_TRANSFER` and `SEPA_INSTANT_CREDIT_TRANSFER`.

Create a payment request in Norway

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "86011117947",
           "accountType": "bban"
        },              
        "amount": 15.00,
        "currency": "NOK",
        "market": "NO",
        "recipientName": "Magnus Carlsen",
        "remittanceInformation": 
           {
            "type": "KID",
            "value": "76940518888"
          },
        "paymentScheme": "NORWEGIAN_DOMESTIC_CREDIT_TRANSFER"
       }'
```

## Lithuania 🇱🇹[](#lithuania-)

Create a payment request in Lithuania

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "LT121000011101001000",
           "accountType": "iban"
        },  
        "amount": 15.00,
        "currency": "EUR",
        "market": "LT",
        "recipientName": "Andrius Naujokas",
        "remittanceInformation": 
           {
            "type": "UNSTRUCTURED",
            "value": "Tink Test"
          },
        "paymentScheme": "SEPA_CREDIT_TRANSFER"
       }'
```

## Estonia 🇪🇪[](#estonia-)

Create a payment request in Estonia

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "EE382200221020145685",
           "accountType": "iban"
        },          
        "amount": 15.00,
        "currency": "EUR",
        "market": "EE",
        "recipientName": "Olga Tamm",
        "remittanceInformation": 
           {
            "type": "UNSTRUCTURED",
            "value": "Tink Test"
          },
        "paymentScheme": "SEPA_CREDIT_TRANSFER"
       }'
```

## The Netherlands 🇳🇱[](#the-netherlands-)

Create a payment request in Netherlands

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "NL91ABNA0417164300",
           "accountType": "iban"
        },               
        "amount": 15.00,
        "currency": "EUR",
        "market": "NL",
        "recipientName": "Vincent van Gogh",
        "remittanceInformation": 
           {
            "type": "UNSTRUCTURED",
            "value": "Tink Test"
          },
        "paymentScheme": "SEPA_CREDIT_TRANSFER"
       }'
```

## Switzerland 🇨🇭[](#switzerland-)

The supported **payment schemes** are `SWISS_DOMESTIC_CREDIT_TRANSFER` (local clearing system) or `SEPA_CREDIT_TRANSFER`.

Create a Swiss domestic credit payment request in Switzerland

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "CH7989144871725643537",
           "accountType": "iban"
        },    
        "amount": 10,
        "currency": "CHF",
        "market": "CH",
        "recipientName": "Alexandre Schoch",
        "remittanceInformation": {
           "type": "UNSTRUCTURED",
           "value": "Top-up"
         },
         "paymentScheme": "SWISS_DOMESTIC_CREDIT_TRANSFER"
       }'
```

## Poland 🇵🇱[](#poland-)

Create a payment request in Poland

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "PL10105000997603123456789123",
           "accountType": "iban"
        },          
        "amount": 15.00,
        "currency": "PLN",
        "market": "PL",
        "recipientName": "Fryderyk Chopin",
        "remittanceInformation": 
           {
            "type": "UNSTRUCTURED",
            "value": "Tink Test"
          },
        "paymentScheme": "INSTANT_POLISH_DOMESTIC_CREDIT_TRANSFER"
       }'
```

## Denmark 🇩🇰[](#denmark-)

Create a payment request in Denmark

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
       "recipient": {
           "accountNumber": "DK9520000123456789",
           "accountType": "iban"
        },             
        "amount": 15.00,
        "currency": "DKK",
        "market": "DK",
        "recipientName": "Niels Bohr",
        "remittanceInformation": 
           {
            "type": "UNSTRUCTURED",
            "value": "Tink Test"
          },
        "paymentScheme": "DANISH_DOMESTIC_CREDIT_TRANSFER"
       }'
```
