---
sidebar_position: 1
---

# Introduction to Parseable

Welcome to the official documentation for **Parseable**, the fast observability on S3.

## What is Parseable?

Parseable is built for fast observability on object storage systems like S3: deploy anywhere in minutes, 10x cheaper, extremely scalable and built with open standards.

With Parseable, you can:

- Deploy across cloud providers, data centers, or edge infrastructure with minimal effort
- Ingest logs, metrics, and traces from any agent and extract value in minutes
- Integrate with your AI infrastructure to summarize logs and prioritize alerts
- Benefit from up to 90% faster query performance than Elastic for analytical queries
- Save costs with 70% less CPU & memory usage and up to 80% data compression
- Maintain control of your data with open standards for access, storage, and format
- Connect with 100+ data and observability ecosystem tools

## Getting Started

There are several ways to get started with Parseable:

### Quick Installation

The fastest way to install Parseable is using the installation script:

```bash
curl -fsSL https://logg.ing/install | bash
```

### Docker Installation

For Docker deployment:

```bash
docker run -p 8000:8000 parseablehq/parseable:latest
```

### Kubernetes Installation

For production deployments on Kubernetes, use our Helm chart:

```bash
helm repo add parseable https://charts.parseable.io
helm install parseable parseable/parseable
```

### Requirements

- For script installation: MacOS, Linux, or FreeBSD
- For Docker deployment: Docker 20.10 or later
- For Kubernetes deployment: Kubernetes 1.19 or later

## Learn More

Watch our [introductory video](https://youtu.be/2Eg_Keqt1I0?si=AofFXJ-jW3POGUbT) to learn more about Parseable and how it can transform your observability workflow.

## Core Concepts

Before diving deeper into Parseable, it's helpful to understand these core concepts:

- **Streams**: Logical containers for your observability data
- **Schemas**: Structure definitions for your data
- **Queries**: SQL-based queries for fast analysis
- **Alerts**: Notifications based on data patterns
- **Users & Roles**: Access control mechanisms

The following sections will guide you through these concepts in detail and help you make the most of Parseable for your observability needs.
