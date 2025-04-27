---
title: Environment Variables
description: List of Environment Variables to be used in Parseable
sidebar_position: 1
sidebar_label: Environment Variables
---

This document lists all the environment variables supported by Parseable server.

### Common environment variables

| Variable Name | Required | Description | Default | Example |
| --- | --- | --- | --- | --- |
| `P_USERNAME` | `Yes` | Username for the admin user. Will be used to access API and UI. | admin | `AKIAIOSFODNN7` |
| `P_PASSWORD` | `Yes` | Password for the admin user. Will be used to access API and UI. | admin | `wJalrXUtnaYrOq7phc6l` |
| `RUST_LOG` | `No` | Control the log level of Parseable server. By default, all logging is disabled, except for the error level. Refer the docs here for possible values. | error | `info` |
| `P_ADDR` | `No` | Address (IP Address and Port without the scheme) on which the Parseable server would listen for new connections. | `127.0.0.1:8000` | `127.0.0.1:7000` |
| `P_GRPC_PORT` | `No` | Port to be used for gRPC response. | `8001` | `5001` |
| `P_FLIGHT_PORT` | `No` | Port to be used for Arrow Flight response. | `8002` | `5002` |
| `P_TLS_CERT_PATH` | `No` | Location of the TLS Cert file on the server. Use this and P_TLS_KEY_PATH variable together to enable TLS on your Parseable server. | - | `/home/user/fullchain.pem` |
| `P_TLS_KEY_PATH` | `No` | Location of TLS Private key file on the server. Use this and P_TLS_CERT_PATH variable together to enable TLS on your Parseable server. | - | `/home/user/privkey.pem` |
| `P_STAGING_DIR` | `No` | Path on the local machine, where the Parseable server would stage data before pushing it to storage. | `$PWD/staging` | `/home/user/parseable/staging` |
| `P_CHECK_UPDATE` | `No` | Specify whether server should check for new updates from Parseable download server. | `true` | `false` |
| `P_SEND_ANONYMOUS_USAGE_DATA` | `No` | Specify whether the server should send anonymous usage data to Parseable analytics. | `true` | `false` |
| `P_PARQUET_COMPRESSION_ALGO` | `No` | Specify the compression algorithm to use for Parquet files. Support values are `UNCOMPRESSED`, `SNAPPY`, `GZIP`, `LZO`, `BROTLI`, `LZ4`, `ZSTD`. | `LZ4` | `GZIP` |
| `P_OPENAI_API_KEY` | `No` | Specify your OpenAI API key to generate SQL automatically from plain text. Read more here. | - | `sk-open-ai-api-key` |
| `P_CORS` | `No` | Specify whether the server should enable/disable CORS. Supported values are `true` to disable, `false` to enable CORS | `true` | `false` |

### Applicable to distributed mode
| Variable Name | Required | Description | Default | Example |
| --- | --- | --- | --- | --- |
| `P_MODE` | `Yes` | Mode for this Parseable instance. Can be INGEST or QUERY or ALL. If set to ALL, instance will behave as a standalone deployment. | `ALL` | `INGEST` |
| `P_HOT_TIER_DIR` | `No` | Path on the query node (or standalone node), where the Parseable server would store recent data. Refer [Hot Tier documentation](https://www.parseable.com/docs/server/features/tiering) for details. | `-` | `/home/user/hot-tier` |
| `P_MAX_DISK_USAGE_PERCENT` | `No` | Maximum percentage of total disk that should be used for hot tier. Refer [Hot Tier documentation](https://www.parseable.com/docs/server/features/tiering) for details. | `80` | `70` |
| `P_INGESTOR_ENDPOINT` | `No` | Endpoint (IP, DNS or URL and Port, without the scheme) of the ingestor. If set, the query node will use this address to access this Ingestor. If not set, the query node will use the P_ADDR value if set. If `P_ADDR` is also not set, then defaults to `0.0.0.0:8000`. You can also set this variable to point to another environment variable. For example, if `P_INGESTOR_ENDPOINT` is set to `$HOSTNAME:$PORT`, Parseable process will look for environment variables `HOSTNAME` and `PORT` and replace their values in the `P_INGESTOR_ENDPOINT`. | `0.0.0.0:8000` | `ingestor1.parseable.svc.cluster.local` |

### Applicable to the S3 storage mode
This section lists all the environment variables applicable to the S3 storage mode. This is applicable to AWS S3 or any other S3 compatible object storage platform.

| Variable Name | Required | Description | Default | Example |
| --- | --- | --- | --- | --- |
| `P_S3_URL` | `Yes` | URL for S3 or compatible object storage server. | `-` | `https://s3.us-east-1.amazonaws.com` |
| `P_S3_ACCESS_KEY` | `Yes` | Access key for S3 or compatible object storage server. | `-` | `AKIAIOSFODNN7EXAMPLE` |
| `P_S3_SECRET_KEY` | `Yes` | Secret key for S3 or compatible object storage server. | `-` | `wJalrXUtnaEXAMPLEKEY` |
| `P_S3_BUCKET` | `Yes` | Bucket to use for Parseable data storage. | `-` | `parseable` |
| `P_S3_REGION` | `Yes` | Region for the object storage platform. | `-` | `us-east-1` |
| `P_S3_PATH_STYLE` | `No` | Force Parseable to use [Path style access](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-bucket-intro.html#path-style-url-ex) to S3 store. | `true` | `false` |
| `P_S3_TLS_SKIP_VERIFY` | `No` | Skip checking for S3 store's TLS certificate validity. | `false` | `true` |
| `P_S3_CHECKSUM` | `No` | Set SHA256 checksum in requests to allow S3 buckets with [WORM enabled](https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html). | `false` | `true` |
| `P_S3_SSEC_ENCRYPTION_KEY` | `No` | Set server side encryption key with [customer provided key for S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html). | `-` | `SSE-C:AES256:lgYvIsNHaYFh45knxlpxCdLFJaLnmXiibQcDrUYZt9Q=` |

### Applicable to the Azure storage account

This section lists all the environment variables applicable to the Azure blobstore storage mode. These environment are mandatory, if you're staring Parseable server in Azure storage mode i.e. `parseable server blob-store`.

| Variable Name | Required | Description | Default | Example |
| --- | --- | --- | --- | --- |
| `P_AZR_URL` | `Yes` | URL to communicate with blob storage. | `-` | `https://parseable.blob.core.windows.net` |
| `P_AZR_ACCOUNT` | `Yes` | Azure storage account name. [Refer the docs here](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview). | `-` | `parseable` |
| `P_AZR_CONTAINER` | `Yes` | Container name created in the storage storage account. | `-` | `parseable` |
| `P_AZR_ACCESS_KEY` | `No` | Access key to authenticate azure storage account. | `-` | `AKIAIOSFODNN7EXAMPLE` |
| `P_AZR_CLIENT_ID` | `No` | Client ID of app registered in Azure AD to authenticate azure storage account. | `-` | `AKIAIOSFODNN7EXAMPLE` |
| `P_AZR_CLIENT_SECRET` | `No` | Client secret of app registered in Azure AD to authenticate azure storage account. | `-` | `wJalrXUtnaEXAMPLEKEY` |
| `P_AZR_TENANT_ID` | `No` | Tenant ID associated with your Azure AD | `-` | `AKIAIOSFODNN7EXAMPLE` |

### Applicable to AWS

This section lists all the environment variables applicable to the AWS blobstore storage mode. These environment are mandatory, if you're staring Parseable server in AWS storage mode i.e. `parseable server blob-store`.

| Variable Name | Required | Description | Default | Example |
| --- | --- | --- | --- | --- |
| `P_AWS_PROFILE_NAME` | `No` | Set AWS profile name which will be used for fetching credentials | `-` | `default` |
| `P_AWS_IMDSV1_FALLBACK` | `No` | Sets if object store client should fallback to imdsv1. | `false` | `true` |
| `P_AWS_METADATA_ENDPOINT` | `No` | Sets AWS instance metadata endpoint to use. | `http://169.254.169.254` | `http://fd00:ec2::254` |

### Applicable to local drive mode

This section lists all the environment variables applicable to the local drive storage mode. These environment are mandatory, if you're staring Parseable server in local drive storage mode i.e. `parseable server blob-store`.

| Variable Name | Required | Description | Default | Example |
| --- | --- | --- | --- | --- |
| `P_FS_DIR` | `No` | Path on the local machine where Parseable server would store data. | `$PWD/data` | `/home/user/parseable/data` |

### Applicable to OIDC

This section lists all the environment variables applicable to the OIDC mode. These environment are mandatory, if you're staring Parseable server in OIDC mode i.e. `parseable server oidc`.

| Variable Name | Required | Description | Default | Example |
| --- | --- | --- | --- | --- |
| `P_OIDC_CLIENT_ID` | `Yes` | Your OIDC client identifier, provided by your identity provider. | `-` | `client-id` |
| `P_OIDC_CLIENT_SECRET` | `Yes` | Your OIDC client secret, provided by your identity provider. | `-` | `client-secret` |
| `P_OIDC_ISSUER` | `Yes` | The OIDC issuer URL, typically provided by your identity provider. It points to the OIDC authorization server. Should support discovery protocol. | `-` | `https://accounts.google.com` |
| `P_ORIGIN_URI` | `Yes` | The URI where Parseable is hosted or accessible. This should be the base URL of your Parseable instance. | `-` | `https://demo.parseable.com/` |

Refer to [OIDC](docs/features/oepnid.md) section for more details.