---
title: Docker Compose
description: Docker Compose distributed installation guide for Parseable
sidebar_position: 1
sidebar_label: Docker Compose
---

This document explains how to set up Parseable in **high availability mode** with Docker Compose, with `s3-store` mode. This mode is used to store logs on S3 or compatible object storage.

### Prerequisites
Docker and Docker Compose, installed on your machine. Refer to this doc to install Docker if you haven't already.

### Download Docker Compose File
Download the Docker Compose file.

```bash
mkdir parseable
cd parseable
wget https://www.parseable.com/parseable/docker-compose.yaml
```

### Run Parseable
This Compose file contains the configuration for Parseable, along with the required environment variables. You can modify the environment variables in the file as needed. It also includes a [MinIO](https://min.io/) service for S3 compatible storage. This compose creates 4 Parseable ingest services and 1 Parseable query service.

Once you've setup the env as per your requirements, you can start Parseable cluster using the following command:

```bash
docker compose up 
```

### Access Parseable
Once Parseable is up and running, you can access it at `http://localhost:8000` (assuming you've set `P_ADDR` to `:8000` in the env file). Credentials to login to Parseable are set via `P_USERNAME` and `P_PASSWORD` fields in the compose file.

### Troubleshoot
#### Running docker on AWS EC2
When trying to fetch credentials over IMDSv2 inside of docker container the client can hang indefinitely. This can happen due to AWS not allowing more than 1 hop in IMDSv2 endpoint response. You can change this configuration, please refer to the consideration section of [retrieve instance metadata](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html#imds-considerations).

