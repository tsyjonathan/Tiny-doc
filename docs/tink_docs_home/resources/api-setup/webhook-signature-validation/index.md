---
title: "Webhook signature validation - Tink Docs"
source: "https://docs.tink.com/resources/api-setup/webhook-signature-validation"
exportedAt: "2026-01-13T12:53:46.554Z"
---
Tink signs every message delivered via the [Events V2](https://docs.tink.com/api#events-v2/webhook/create-webhook-endpoint) webhook with a signature header added to the outgoing HTTP request.

When using the Events V2 API, we recommend implementing signature verification on your end to validate the authenticity of the incoming request.

## How to verify a signature[](#how-to-verify-a-signature)

The incoming request will include a `X-Tink-Signature` header. The header consists of two properties that are separated by a comma. The first property is the timestamp (UNIX timestamp format), with they key `t`, followed by the actual message signature key signalled with the `v1` key.

Example of header:

```
X-Tink-Signature: t=1620198421,v1=3808bca389150582fd78bdb5e3dfcf46f99ff168d37d60cdc13da7c5e49abefb
```

### 1\. Extract the timestamp and signatures from the header[](#extract-the-timestamp-and-signatures-from-the-header)

Parse the header contents to extract the timestamp `t` and the signature values `v`. Make sure your implementation ignores any other values.

**JavaScript example:**

```
let header = "t=1620198421,v1=3808bca389150582fd78bdb5e3dfcf46f99ff168d37d60cdc13da7c5e49abefb";
let keyValues = header.split(",");
let validKeys = ["t", "v1"]
let values = 
    keyValues.map(kv => kv.split("="))
             .filter(kv => validKeys.includes(kv[0]))
             .flatMap(kv => kv[1])

// ["1620198421", "3808bca389150582fd78bdb5e3dfcf46f99ff168d37d60cdc13da7c5e49abefb"]
```

### 2\. Calculate the expected signature[](#calculate-the-expected-signature)

To validate the signature, you must recreate it on your end, and then compare it. To create a signature, three elements are used:

-   The secret (which you have stored when setting up the webhook)
-   The timestamp of the request (which is the `t` value in the header)
-   The body of the request exactly as you have received it

> In this context, "request body" refers to the content immediately after the request headers. In most frameworks and languages, there are helpers to retrieve the raw incoming request body.

The signature is the result of the concatenation of `timestamp` as extracted from the header, followed by a dot, and then followed by the entire body of the incoming `request`. Take this and sign it with a specific encryption function. First, you should build the message to sign:

```
let timestamp = "1620198421";
let requestBody = '{"context": {...}, "event": "...",  "content": {...}}';

let messageToSign = timestamp + "." + requestBody;
```

Once you have done so, you need to encrypt it using the secret that you know:

```
let crypto = require("crypto")

let secret = "top_secret_top_secret_top_secret"

let signature = crypto.createHmac("sha256", secret).update(messageToSign).digest("hex")

// Result: 3808bca389150582fd78bdb5e3dfcf46f99ff168d37d60cdc13da7c5e49abefb
```

### 3\. Compare the signatures[](#compare-the-signatures)

All that is left is to compare the expected signature with the incoming signature. These should match exactly. If these do not match, it signals that something is wrong: the implementation is not correct, the secret you stored is not the right one, or someone is supplanting Tink. In any case - you should discard the information and ignore the request.

In addition to comparing the signatures, the timestamp can be used to discard messages older than a set threshold. Consider keeping the threshold at no less than 5 minutes to allow for retries on failed message delivieries.
