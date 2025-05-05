---
title: "Authentik"
description: "Authentik integration for Parseable"
sidebar_position: 1
---

### Overview
Authentik is an open source, multi-tenant authentication and authorization server. It is a drop-in replacement for Okta, Keycloak, and other identity providers. This document offers step-by-step guide to set up Authentik with Parseable using OpenID Connect (OIDC)

### Pre-requisites
- Parseable server setup and receiving logs from your application. Follow the installation guide to set it up.
- Authentik installed and running. Refer their docs here.

### Configure Authentik
- Browse to your Authentik instance and sign in.
- Create an OAuth2 Provider
- Navigate to Applications → Providers.
- Start by creating an OAuth2 provider.
- Set the Redirect URI to:

```sh
[parseable-instance-url]/api/v1/o/code
```

For example, if your Parseable instance is hosted at `https://demo.parseable.com/`, then the redirect URI should be:

```sh
https://demo.parseable.com/api/v1/o/code
```

### Setting up OIDC in Parseable
Set up requires configuring the OIDC provider via environment variables. Please add these environment variables to your Parseable instance.

```sh
P_OIDC_CLIENT_ID → Client ID from Authentik OAuth2 provider.

P_OIDC_CLIENT_SECRET → Client Secret from Authentik OAuth2 provider.

P_OIDC_ISSUER → Authentik issuer URL.

P_ORIGIN_URI → Parseable host URL.
```

After setting the environment variables, restart the Parseable server instance. For more details on environment variables, refer to [Parseable OIDC documentation](https://www.parseable.com/docs/server/features/oidc-openid-connect#environment-variables).

:::info
If you’re running a distributed Parseable set up, please ensure to set these environment variables across all the Parseable instances.
:::

### Configure OIDC Role in Parseable
Once the environment variables are setup,

- Login with admin access.
- Navigate to Users from the left sidebar.
- Click Create Role:
    - Provide a name for the role.
    - Assign the required privileges.
- After creating the role, click Set Default OIDC Role:
    - Select the newly created role from the dropdown.
    - Click Set Default OIDC Role.

:::info
The option to set a default OIDC role will appear only if the OIDC provider is correctly configured.
:::

### Login using SSO
Now logout of Parseable and the next time you try to login using OAuth you'll be redirected to Authentik to login to Parseable

### Troubleshooting
In case of 401 error check for one of the following:

- Incorrect client_id or client_secret
- An invalid or malformed code during the exchange
- A redirect URI mismatch between Parseable and Authentik.

