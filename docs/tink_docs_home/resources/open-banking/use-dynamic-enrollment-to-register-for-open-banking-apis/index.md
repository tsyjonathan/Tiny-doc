---
title: "Use dynamic enrollment to register for open banking APIs"
source: "/Tiny-doc/tink_docs_home/resources/open-banking/use-dynamic-enrollment-to-register-for-open-banking-apis/"
exportedAt: "2026-01-13T12:55:10.627Z"
---
Dynamic enrollment (referred to as [Dynamic Client Registration](/Tiny-doc/tink_docs_home/resources/open-banking/open-banking-glossary/) allows TPPs to enroll programmatically for access to an Account Service Payment Service Provider’s (ASPSP’s) open banking API. For the ASPSPs that support this, dynamic enrollment is typically easier compared to manually logging in to a developer portal, creating accounts and validating your identity. To view a list of ASPS that support dynamic enrollment for a market, open our [dynamic enrollment providers link](https://api.tink.com/ess/v1/dynamic-enrollment-providers?marketCode=uk) and update the market parameter.

This guide describes how you can use Tink’s `tink_secret_utils.py` script to complete dynamic enrollment. It consists of four steps:

1.  Get schema of enrollment parameters
2.  Format enrollment input to a JSON file
3.  Execute enrollment using the JSON file
4.  Validate credentials for enrolled banks and test the connection

## Get schema of enrollment parameters[](#get-schema-of-enrollment-parameters)

The `get-enrollment-information` method accepts a provider ID and responds with a JSON schema defining the parameters required to enroll and how to format them. If the ASPSP does not support dynamic enrollment, the response will contain a guide about how to enroll with the ASPSP.

For some ASPSPs, the same TPP’s credentials can be shared among a group or between personal and business banking. The `get-enrollment-information` response will contain a list of provider IDs that could share the same TPP credentials. Enrolling with any of the providers in the group is sufficient.

Example `get-enrollment-information` command for NatWest, a bank that has support for dynamic enrolment:

Get schema of enrollment parameters

```
python tink_secret_utils.py enrollment get-enrollment-information \
   --provider-name uk-natwest-oauth2 \
    api-gateway --cluster oxford --environment production \
    oauth2 --client-id  --client-secret 
```

Example response for NatWest, a bank with support for dynamic enrollment:

```
{
  "enrollmentInputsSchema": {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "additionalProperties": false,
    "properties": {
      "ssa": {
        "description": "Make sure that redirect URLs in the SSA are correct. SSA can be obtained by going to Directory, choosing appropriate software client and clicking the 'Generate' button.",
        "examples": [
          "eyJhbGciOiJQUzI1NiIsImtpZCI6Ikh6YTl2NWJnREpjT25oY1VaN0JNd2JTTF80TlYwZ1NGdklqYVNYZEMtMWM9IiwidHlwIjoiSldUIn0.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE1OTg4ODg2ODgsImp0aSI6ImY0NDNmYmExNDk5YzQ5NGQiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoibWprY2FsczFzcTI3cHYwWmxKNzhFeiIsInNvZnR3YXJlX2NsaWVudF9pZCI6Im1qa2NhbHMxc3EyN3B2MFpsSjc4RXoiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IlRpbmsgU2FuZGJveCIsInNvZnR3YXJlX2NsaWVudF9kZXNjcmlwdGlvbiI6IlVzZWQgdG8gdGVzdCBzYW5kYm94Iiwic29mdHdhcmVfdmVyc2lvbiI6MS4wLCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly9jb25zdW1lci50aW5rLnNlLyIsInNvZnR3YXJlX3JlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly8xMjcuMC4wLjE6NzM1Ny9hcGkvdjEvdGhpcmRwYXJ0eS9jYWxsYmFjayJdLCJzb2Z0d2FyZV9yb2xlcyI6WyJBSVNQIiwiUElTUCJdLCJvcmdhbmlzYXRpb25fY29tcGV0ZW50X2F1dGhvcml0eV9jbGFpbXMiOnsiYXV0aG9yaXR5X2lkIjoiU0ZTQVNXRSIsInJlZ2lzdHJhdGlvbl9pZCI6IjQ0MDU5Iiwic3RhdHVzIjoiQWN0aXZlIiwiYXV0aG9yaXNhdGlvbnMiOlt7Im1lbWJlcl9zdGF0ZSI6IlNFIiwicm9sZXMiOlsiQUlTUCIsIlBJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIkFJU1AiLCJQSVNQIl19LHsibWVtYmVyX3N0YXRlIjoiSUUiLCJyb2xlcyI6WyJBSVNQIiwiUElTUCJdfSx7Im1lbWJlcl9zdGF0ZSI6Ik5MIiwicm9sZXMiOlsiQUlTUCIsIlBJU1AiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL2Nkbi50aW5rLnNlL3RpbmstbG9nb3MvTE9XL1RpbmtfTGF4LnBuZyIsIm9yZ19zdGF0dXMiOiJBY3RpdmUiLCJvcmdfaWQiOiIwMDE1ODAwMDAxNmk0NElBQVEiLCJvcmdfbmFtZSI6IlRpbmsgQUIiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6Im9wZW5iYW5raW5nK3Vrb2J0ZWNoQHRpbmsuc2UiLCJwaG9uZSI6IjAwNDY3MDMyMzk2NDciLCJ0eXBlIjoiVGVjaG5pY2FsIn0seyJuYW1lIjoiQnVzaW5lc3MiLCJlbWFpbCI6Im9wZW5iYW5raW5nK3Vrb2JiaXpAdGluay5zZSIsInBob25lIjoiMDA0Njc2MDAyNDgzNyIsInR5cGUiOiJCdXNpbmVzcyJ9XSwib3JnX2p3a3NfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMTZpNDRJQUFRLzAwMTU4MDAwMDE2aTQ0SUFBUS5qd2tzIiwib3JnX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxNmk0NElBQVEvcmV2b2tlZC8wMDE1ODAwMDAxNmk0NElBQVEuandrcyIsInNvZnR3YXJlX2p3a3NfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMTZpNDRJQUFRL21qa2NhbHMxc3EyN3B2MFpsSjc4RXouandrcyIsInNvZnR3YXJlX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxNmk0NElBQVEvcmV2b2tlZC9tamtjYWxzMXNxMjdwdjBabEo3OEV6Lmp3a3MiLCJzb2Z0d2FyZV9wb2xpY3lfdXJpIjoiaHR0cHM6Ly9jb25zdW1lci50aW5rLnNlL2ludGVncml0eS1wb2xpY3kiLCJzb2Z0d2FyZV90b3NfdXJpIjoiaHR0cHM6Ly9jb25zdW1lci50aW5rLnNlL3Rlcm1zLWFuZC1jb25kaXRpb25zIiwic29mdHdhcmVfb25fYmVoYWxmX29mX29yZyI6bnVsbH0.sBFpkUCqMraUfRts2294fYxGc7d_0duTIU4s0I48B9jT8398vI8p9NsrrkexgLAnUbHIurGuGEqk3flM4pMxMVmZtCn4AFQoXDM2r2f0d7d1bbfOJ9MbgPvxi0sOEZlGZGVZogyjKtAHSdWMqDkNWLdPqLRil3PadqttDWv6mIuOFXjjYlkclSW9KgT8vI1RMgMdhLNFPJN18jNZdrZbfNtantcQcbFiOnYvpg8fB6PskOZLM8cMkRCAnBde3XLVAN8JcFz0YCO4gG23c5Kom_ftMlkKGcV3TWJX-o04g_n0k2xC1Cznr-YHQjOHX784tUv_xdoAWA9SVWnlNSl81Q"
        ],
        "minLength": 1000,
        "title": "SSA JWT obtained from UKOB Directory",
        "type": "string"
      }
    },
    "required": [
      "ssa"
    ],
    "title": "Uk Ob Input",
    "type": "object"
  },
  "isDynamicEnrollmentPossible": true,
  "providerIds": [
    "uk-natwest-bankline-ob",
    "uk-natwest-clearspend-ob",
    "uk-natwest-oauth2"
  ]
}
```

Example response for Barclays, a bank that doesn’t support dynamic enrollment:

```
{
  "enrollmentInputsSchema": {},
  "guide": "**Barclays**\n\n1.  Go to [https://developer.barclays.com/add-application](https://developer.barclays.com/add-application)\n2.  Log in with Openbanking.\n3.  Add SSA and go to the next step.\n4.  In the authentication section choose \"Private Key JWT\", in the ID token section choose \"PS256\" and confirm.\n5.  After the app is created, click the \"Manage App\" button.\n6.  Upload Client Id and Shared Secret, which are present in the App overview section, to Tink.\n",
  "isDynamicEnrollmentPossible": false,
  "providerIds": [
    "uk-barclaycard-business-ob",
    "uk-barclays-business-ob",
    "uk-barclays-corporate-ob",
    "uk-barclays-oauth2"
  ]
}
```

## Format enrollment input to a JSON file[](#format-enrollment-input-to-a-json-file)

Before calling the `enroll` method in the next step, you first need to construct a JSON file. This file should contain the `providerId` and the `properties` defined in the `enrollmentInputsSchema` (in this example `ssa`). The properties should be completed with your values and then provided as `enrollmentInputs` in the JSON file.

In the previous example from NatWest, the file would look like this:

```
{
    "providerId": "uk-natwest-oauth2",
    "enrollmentInputs": {
        "ssa": "eyJhbGciOiJQUzI1NiIsImtpZCI6Ikh6YTl2NWJnREpjT25oY1VaN0JNd2JTTF80TlYwZ1NGdklqYVNYZEMtMWM9IiwidHlwIjoiSldUIn0.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE1OTg4ODg2ODgsImp0aSI6ImY0NDNmYmExNDk5YzQ5NGQiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoibWprY2FsczFzcTI3cHYwWmxKNzhFeiIsInNvZnR3YXJlX2NsaWVudF9pZCI6Im1qa2NhbHMxc3EyN3B2MFpsSjc4RXoiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IlRpbmsgU2FuZGJveCIsInNvZnR3YXJlX2NsaWVudF9kZXNjcmlwdGlvbiI6IlVzZWQgdG8gdGVzdCBzYW5kYm94Iiwic29mdHdhcmVfdmVyc2lvbiI6MS4wLCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly9jb25zdW1lci50aW5rLnNlLyIsInNvZnR3YXJlX3JlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly8xMjcuMC4wLjE6NzM1Ny9hcGkvdjEvdGhpcmRwYXJ0eS9jYWxsYmFjayJdLCJzb2Z0d2FyZV9yb2xlcyI6WyJBSVNQIiwiUElTUCJdLCJvcmdhbmlzYXRpb25fY29tcGV0ZW50X2F1dGhvcml0eV9jbGFpbXMiOnsiYXV0aG9yaXR5X2lkIjoiU0ZTQVNXRSIsInJlZ2lzdHJhdGlvbl9pZCI6IjQ0MDU5Iiwic3RhdHVzIjoiQWN0aXZlIiwiYXV0aG9yaXNhdGlvbnMiOlt7Im1lbWJlcl9zdGF0ZSI6IlNFIiwicm9sZXMiOlsiQUlTUCIsIlBJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIkFJU1AiLCJQSVNQIl19LHsibWVtYmVyX3N0YXRlIjoiSUUiLCJyb2xlcyI6WyJBSVNQIiwiUElTUCJdfSx7Im1lbWJlcl9zdGF0ZSI6Ik5MIiwicm9sZXMiOlsiQUlTUCIsIlBJU1AiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL2Nkbi50aW5rLnNlL3RpbmstbG9nb3MvTE9XL1RpbmtfTGF4LnBuZyIsIm9yZ19zdGF0dXMiOiJBY3RpdmUiLCJvcmdfaWQiOiIwMDE1ODAwMDAxNmk0NElBQVEiLCJvcmdfbmFtZSI6IlRpbmsgQUIiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6Im9wZW5iYW5raW5nK3Vrb2J0ZWNoQHRpbmsuc2UiLCJwaG9uZSI6IjAwNDY3MDMyMzk2NDciLCJ0eXBlIjoiVGVjaG5pY2FsIn0seyJuYW1lIjoiQnVzaW5lc3MiLCJlbWFpbCI6Im9wZW5iYW5raW5nK3Vrb2JiaXpAdGluay5zZSIsInBob25lIjoiMDA0Njc2MDAyNDgzNyIsInR5cGUiOiJCdXNpbmVzcyJ9XSwib3JnX2p3a3NfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMTZpNDRJQUFRLzAwMTU4MDAwMDE2aTQ0SUFBUS5qd2tzIiwib3JnX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxNmk0NElBQVEvcmV2b2tlZC8wMDE1ODAwMDAxNmk0NElBQVEuandrcyIsInNvZnR3YXJlX2p3a3NfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMTZpNDRJQUFRL21qa2NhbHMxc3EyN3B2MFpsSjc4RXouandrcyIsInNvZnR3YXJlX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxNmk0NElBQVEvcmV2b2tlZC9tamtjYWxzMXNxMjdwdjBabEo3OEV6Lmp3a3MiLCJzb2Z0d2FyZV9wb2xpY3lfdXJpIjoiaHR0cHM6Ly9jb25zdW1lci50aW5rLnNlL2ludGVncml0eS1wb2xpY3kiLCJzb2Z0d2FyZV90b3NfdXJpIjoiaHR0cHM6Ly9jb25zdW1lci50aW5rLnNlL3Rlcm1zLWFuZC1jb25kaXRpb25zIiwic29mdHdhcmVfb25fYmVoYWxmX29mX29yZyI6bnVsbH0.sBFpkUCqMraUfRts2294fYxGc7d_0duTIU4s0I48B9jT8398vI8p9NsrrkexgLAnUbHIurGuGEqk3flM4pMxMVmZtCn4AFQoXDM2r2f0d7d1bbfOJ9MbgPvxi0sOEZlGZGVZogyjKtAHSdWMqDkNWLdPqLRil3PadqttDWv6mIuOFXjjYlkclSW9KgT8vI1RMgMdhLNFPJN18jNZdrZbfNtantcQcbFiOnYvpg8fB6PskOZLM8cMkRCAnBde3XLVAN8JcFz0YCO4gG23c5Kom_ftMlkKGcV3TWJX-o04g_n0k2xC1Cznr-YHQjOHX784tUv_xdoAWA9SVWnlNSl81Q"
    }
}
```

## Enroll[](#enroll)

In case dynamic enrollment is supported by the provider (indicated by `isDynamicEnrollmentPossible` flag in the response of `get-enrollment-information`), you can use the `enroll` method to perform the dynamic enrollment.

The `enroll` method takes a JSON file, which contains the provider you want to enroll and the required data which is defined in the `get-enrollment-information` response.

Perform dynamic enrollment

```
python tink_secret_utils.py enrollment enroll --infile example.json \
    api-gateway --cluster oxford --environment production \
    oauth2 --client-id  --client-secret 
```

Upon successful enrollment, the resulting TPP credentials will be automatically constructed and persisted to all applicable providers (indicated by the `providerId` list in the response of `get-enrollment-information`) that share the same TPP credentials.

Example successful `enroll` response:

```
{
  "enrolled": {
    "appId": "5f98e87106384b2981c0354a33b51590",
    "providerId": [
      "uk-natwest-corporate-ob",
      "uk-natwest-oauth2"
    ],
    "secrets": {
      "softwareStatementAssertion": "eyJhbGciOiJQUzI1NiIsImtpZCI6Ikh6YTl2NWJnREpjT25oY1VaN0JNd2JTTF80TlYwZ1NGdklqYVNYZEMtMWM9IiwidHlwIjoiSldUIn0.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE1OTg4ODg2ODgsImp0aSI6ImY0NDNmYmExNDk5YzQ5NGQiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoibWprY2FsczFzcTI3cHYwWmxKNzhFeiIsInNvZnR3YXJlX2NsaWVudF9pZCI6Im1qa2NhbHMxc3EyN3B2MFpsSjc4RXoiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IlRpbmsgU2FuZGJveCIsInNvZnR3YXJlX2NsaWVudF9kZXNjcmlwdGlvbiI6IlVzZWQgdG8gdGVzdCBzYW5kYm94Iiwic29mdHdhcmVfdmVyc2lvbiI6MS4wLCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly9jb25zdW1lci50aW5rLnNlLyIsInNvZnR3YXJlX3JlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly8xMjcuMC4wLjE6NzM1Ny9hcGkvdjEvdGhpcmRwYXJ0eS9jYWxsYmFjayJdLCJzb2Z0d2FyZV9yb2xlcyI6WyJBSVNQIiwiUElTUCJdLCJvcmdhbmlzYXRpb25fY29tcGV0ZW50X2F1dGhvcml0eV9jbGFpbXMiOnsiYXV0aG9yaXR5X2lkIjoiU0ZTQVNXRSIsInJlZ2lzdHJhdGlvbl9pZCI6IjQ0MDU5Iiwic3RhdHVzIjoiQWN0aXZlIiwiYXV0aG9yaXNhdGlvbnMiOlt7Im1lbWJlcl9zdGF0ZSI6IlNFIiwicm9sZXMiOlsiQUlTUCIsIlBJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIkFJU1AiLCJQSVNQIl19LHsibWVtYmVyX3N0YXRlIjoiSUUiLCJyb2xlcyI6WyJBSVNQIiwiUElTUCJdfSx7Im1lbWJlcl9zdGF0ZSI6Ik5MIiwicm9sZXMiOlsiQUlTUCIsIlBJU1AiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL2Nkbi50aW5rLnNlL3RpbmstbG9nb3MvTE9XL1RpbmtfTGF4LnBuZyIsIm9yZ19zdGF0dXMiOiJBY3RpdmUiLCJvcmdfaWQiOiIwMDE1ODAwMDAxNmk0NElBQVEiLCJvcmdfbmFtZSI6IlRpbmsgQUIiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6Im9wZW5iYW5raW5nK3Vrb2J0ZWNoQHRpbmsuc2UiLCJwaG9uZSI6IjAwNDY3MDMyMzk2NDciLCJ0eXBlIjoiVGVjaG5pY2FsIn0seyJuYW1lIjoiQnVzaW5lc3MiLCJlbWFpbCI6Im9wZW5iYW5raW5nK3Vrb2JiaXpAdGluay5zZSIsInBob25lIjoiMDA0Njc2MDAyNDgzNyIsInR5cGUiOiJCdXNpbmVzcyJ9XSwib3JnX2p3a3NfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMTZpNDRJQUFRLzAwMTU4MDAwMDE2aTQ0SUFBUS5qd2tzIiwib3JnX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxNmk0NElBQVEvcmV2b2tlZC8wMDE1ODAwMDAxNmk0NElBQVEuandrcyIsInNvZnR3YXJlX2p3a3NfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMTZpNDRJQUFRL21qa2NhbHMxc3EyN3B2MFpsSjc4RXouandrcyIsInNvZnR3YXJlX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxNmk0NElBQVEvcmV2b2tlZC9tamtjYWxzMXNxMjdwdjBabEo3OEV6Lmp3a3MiLCJzb2Z0d2FyZV9wb2xpY3lfdXJpIjoiaHR0cHM6Ly9jb25zdW1lci50aW5rLnNlL2ludGVncml0eS1wb2xpY3kiLCJzb2Z0d2FyZV90b3NfdXJpIjoiaHR0cHM6Ly9jb25zdW1lci50aW5rLnNlL3Rlcm1zLWFuZC1jb25kaXRpb25zIiwic29mdHdhcmVfb25fYmVoYWxmX29mX29yZyI6bnVsbH0.sBFpkUCqMraUfRts2294fYxGc7d_0duTIU4s0I48B9jT8398vI8p9NsrrkexgLAnUbHIurGuGEqk3flM4pMxMVmZtCn4AFQoXDM2r2f0d7d1bbfOJ9MbgPvxi0sOEZlGZGVZogyjKtAHSdWMqDkNWLdPqLRil3PadqttDWv6mIuOFXjjYlkclSW9KgT8vI1RMgMdhLNFPJN18jNZdrZbfNtantcQcbFiOnYvpg8fB6PskOZLM8cMkRCAnBde3XLVAN8JcFz0YCO4gG23c5Kom_ftMlkKGcV3TWJX-o04g_n0k2xC1Cznr-YHQjOHX784tUv_xdoAWA9SVWnlNSl81Q",
      "tokenEndpointAuthMethod": "private_key_jwt",
      "tokenEndpointAuthSigningAlg": "PS256"
    },
    "sensitive": {
      "clientId": "mjkcals1sq27pv0ZlJ78Ez",
      "clientSecret": ""
    }
  }
}
```

After the successful dynamic enrollment, Tink will persist the returned TPP credentials for all providers that can use them. The set of provider-ids is listed in the 'providerId' array. In this example both `uk-natwest-oauth2` and `uk-natwest-corporate-ob` will be enabled.

> **Note:** TPP credentials are also returned in the successful response to the `enroll` command. It can be useful to store these temporarily for troubleshooting purposes as they can be used with the manual [TPP credentials feature](/Tiny-doc/tink_docs_home/resources/open-banking/enroll-with-psd2/) in Console.

## Validate credentials for enrolled ASPSPs and test the connection[](#validate-credentials-for-enrolled-aspsps-and-test-the-connection)

After successful dynamic enrollment, you can see a list of the registered ASPSPs and non-sensitive TPP credentials in the [TPP Credentials section of Console](https://console.tink.com/app-settings/tpp-credentials). The final validation step is to perform a full product flow using for a real end user with accounts from this ASPSP.

## Handling errors[](#handling-errors)

If you encounter errors when using the DCR method in `tink_secret_utils.py` or during connection testing, [contact Support](https://tinkab.atlassian.net/servicedesk/customer/portals). When reaching out, please include any relevant error messages and logs to help us resolve your issue faster.
