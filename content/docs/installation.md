---
title: Installation Planning
description: Installation of Parseable
sidebar_position: 5
sidebar_label: Installation Planning
---

## Introduction
Details on various types of Parseable variants available to install and the value proposition of each of the variants.

There are two variants of Parseable platform:

## 1. Distributed 

In a Distributed deployment, multiple Ingestion nodes work together to ingest data, allowing for better scalability and load distribution. This setup supports ingestion from either a single high-volume data source or multiple independent sources, making it the recommended choice for handling large data streams efficiently. 

:::info
For testing purposes, please use Parseable standalone with `local store` mode. That is the fastest way to experience Parseable with your data.
Parseable distributed cluster is recommended for production grade deployment. Hence it requires an object store as persistent storage.
:::

## 2. Standalone

The Standalone variant of the Parseable Observability Platform is designed for quick value realization, making it ideal for hobbyists and first-time users. In this mode Parseable operates with a single ingestion node, handling all data ingestion from various data sources. This setup is ideal for smaller workloads or testing environments where high availability and horizontal scaling are not primary concerns. 

:::info
Parseable standalone server can be run with local store argument to use the disk attached on the machine as store. So you can see Parseable in action without an object storage.
This is not recommended for production deployments.
:::
