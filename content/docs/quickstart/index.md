---
title: Quickstart Guide
description: Get started with Parseable in minutes 
---

# Quickstart Guide

Get Parseable up and running in minutes with our recommended Docker setup. This guide will help you quickly deploy Parseable and start ingesting logs.

## Prerequisites

- **Docker**: Docker Engine (version 20.10.0 or later)
- **System Requirements**: Minimum 2 CPU cores and 4GB RAM

## Deploy with Docker

### 1. Create directories for Parseable data

```bash
mkdir -p /tmp/parseable/data /tmp/parseable/staging
```

### 2. Start Parseable with Docker run

```bash
docker run -p 8000:8000 \
-p 8001:8001 \
-p 8002:8002 \
-v /tmp/parseable/data:/parseable/data \
-v /tmp/parseable/staging:/parseable/staging \
-e P_FS_DIR=/parseable/data \
-e P_STAGING_DIR=/parseable/staging \
containers.parseable.com/parseable/parseable:latest \
parseable local-store
```

### 3. Access the Parseable UI

Open your browser and navigate to [http://localhost:8000](http://localhost:8000)

Login with the default credentials:
- Username: `admin`
- Password: `admin`

> ⚠️ **Warning**: Remember to change the default credentials in a production environment!

## Send Your First Logs

Once Parseable is running, you can create a log stream and send your first logs:

// TODO: Add Script

### 3. Query your logs

Navigate to the Parseable UI at [http://localhost:8000](http://localhost:8000) and select your `my-first-stream` to view your logs.

## Other Installation Options

While Docker is the quickest way to get started, Parseable supports multiple deployment options:

- **Kubernetes (Helm)**: You can use Helm charts on Kubernetes. [Learn more about Kubernetes installation](/content/docs/installation/standalone/k8s.mdx)


- **Binary**: You can use the Parseable binary. [Learn more about binary installation](/content/docs/installation/standalone/linux.mdx)

- **Distributed**: We recommend using Parseable distributed mode for production deployments. [Learn more about distributed installation](/content/docs/installation/distributed/k8s-helm.mdx)

## Next Steps

- [**Data Model**](/content/docs/key-concepts/data-model.mdx): Learn about Parseable's data model and how it organizes your logs.

- [**Ingestion**](/content/docs/key-concepts/ingestion.mdx): Discover different ways to ingest logs into Parseable.

- [**High Availability**](/content/docs/key-concepts/high-availability.mdx): Learn how to set up Parseable for high availability.