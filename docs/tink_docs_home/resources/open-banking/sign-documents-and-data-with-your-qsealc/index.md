---
title: "Sign documents and data with your QSealC"
source: "/Tiny-doc/tink_docs_home/resources/open-banking/sign-documents-and-data-with-your-qsealc/"
exportedAt: "2026-01-13T12:55:14.733Z"
---
In this article, we illustrate how you could sign arbitrary data or pdf with your QSealC certificate using REST API. The same feature is also available from Tink’s secret\_utils script (since version 5.1.0).

**Purpose:** For the authenticated back-end client, this request returns an API token that is used to access signing API tokens for your `client_id`.

**Note:** Store `client_secret` securely and don’t share it outside your organization.

Get the API token

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=tpp-certificate'
```

**Response**: [Access Token Response](https://tools.ietf.org/html/rfc6749#section-5.1) for a client which expires after 30 mins (no refresh token provided, use the same endpoint again to get a new access token). Please note that this token must also be kept a secret and not exposed to any public client.

**Response example:**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": "tpp-certificate"
}
```

For more information, see [OAuth get access token API](/Tiny-doc/tink_docs_api/api/#general/oauth/get-access-token)

## Create digital signatures[](#create-digital-signatures)

**Documentation:**

`POST /ess/v1/sign`

Use the signing API to sign data or a file by using your QSealC.

The signing request

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| regulatoryZone | string | The regulatory zone in which the certificates operates. Values: `EU`, `UK` | Yes |
| signingAlgorithm | string | The algorithm that is used to sign. Values: `EIDAS_RSA_SHA256`, `EIDAS_PSS_SHA256`, `EIDAS_DOC_RSA_SHA256` | Yes |
| data | string | The data that needs to be signed. Format: `Base64` | Yes |

The signing response

| Field | Type | Description |
| --- | --- | --- |
| signature | string | The signature value. Format: `Base64` |

**Purpose:** Create a digital signature for the data or file with the selected signing algorithm and your QSealC that operates in the selected regulatory zone. In particular, the algorithm `EIDAS_DOC_RSA_SHA256` is used for PDF file signing.

Request example

```
curl -v -X POST https://api.tink.com/ess/v1/sign \
-H 'Authorization: Bearer '  \
-H "Content-Type: application/json"  \
-H "Accept: text/plain"  \
-d '{"regulatoryZone": "EU", "signingAlgorithm": "EIDAS_RSA_SHA256", "data": "SGVsbG8gd29ybGQ="}'
```

**Response example:**

```
{
  "signature": "sUWR+PVQFaQO3wB+uJaWMbzgvMeO6JOksrzHNvABwqqz5/kwFAjrcJI5kJYJ8Oj/J7Z1IBgqhmHuq4DegiEkTBjB8zyCVb3S34rlobxpc7GNhhZOxqKH7br1paqMmxeQ8/0tVz4EjziPZfpaJJnv+31UKl0Gf/jwVpw5x5qWNkq6MQWzpCGt8bJHxnxImG+kUfZgfDgWOM+GjtnMLXnvG7PBlV+qr0imUTed7sLjhWV+ZxNI4BwM9nb57olO+opFVasrr6tg/LImSoLEru1RURBLiNR9AeFxAP5iIpoE+KgKqIEe35Vj9ixvqRDmSQP3Sg8y255onNyGY131XVO5JQ=="
}
```

**Example steps for PDF file signing:**

-   Base64 encode PDF

```
cat pdfToBeSigned.pdf | base64 > base64pdf.txt
```

-   Construct the JSON file for signing: sign.json

```
{
  "regulatoryZone": "EU",
  "signingAlgorithm": "EIDAS_DOC_RSA_SHA256",
  "data": "<value in base64pdf.txt>"
}
```

-   Create signature

Create signature

```
curl -v -X POST \
-H 'Authorization: Bearer '  \
-H "Content-Type: application/json"  \
-H "Accept: text/plain"  \
-d @sign.json https://api.tink.com/ess/v1/sign > result.json
```

-   Generate signed PDF file from the JSON result

```
cat result.json | jq -r '.signature' | base64 -D > signed.pdf
```
