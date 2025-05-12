---
title: Executable Binary
sidebar_position: 1
description: Install Parseable using the executable binary
---

## Introduction

This page shows you how to quickly get started with Parseable, by downloading and running the Parseable executable binary. We'll start the Parseable server in local-store mode, and then insert and read some sample data using SQL.

### Start Parseable

Download the relevant binary and start Parseable in local-store mode with the following commands:

```sh
curl -fsSL https://logg.ing/install | bash
parseable local-store
```

:::info
Parseable listens on the port 8000. You can access Parseable UI at http://localhost:8000. The default credentials are admin and admin.
:::

### Ingest log data

Send your first log event to the log stream demo using below command.

```sh
curl --location --request POST \
'http://localhost:8000/api/v1/ingest' \
--header 'X-P-META-meta1: value1' \
--header 'X-P-TAG-tag1: value1' \
--header 'X-P-Stream: demo' \
--header 'Authorization: Basic YWRtaW46YWRtaW4=' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "id": "434a5f5e-2f5f-11ed-a261-0242ac120002",
        "datetime": "2023-01-05T07:20:50.52Z",
        "host": "153.10.110.81",
        "user-identifier": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) Firefox/64.0",
        "method": "PUT",
        "status": 500,
        "referrer": "http://www.google.com/"
    }
]'

```
Parseable uses log streams to organize log data. Here we posted a sample log data to the log stream demo, by adding the header `X-P-Stream: demo` in the request.

We also added metadata and tags to the log event with `X-P-META-` and `X-P-TAG-` headers in the request. For example, the below command adds `meta1=value1` and `tag1=value1` to the log event. It also posts sample log data to the log stream demo.

Metadata is primarily used to define extra information for a log event, while tags are used to organize events. For example, `severity=warn` and `severity=error` are good examples of metadata, while `environment=prod` and `environment=dev` are good examples of tags.

### Query log data

To query the data via Console, login at http://localhost:8000 and select the log stream demo and correct time stamp.

For complete Parseable API documentation, refer to [Parseable API Ref Docs](https://www.parseable.com/docs/server/api).