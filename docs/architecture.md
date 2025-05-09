---
title: Architecture
description: Architecture of Parseable
sidebar_position: 3
sidebar_label: Architecture
---

This document outlines the overall architecture of the Parseable Observability Platform, detailing the flow of MELT data from ingestion to storage and querying. 

This document is organiszed into specific sections for each sub-system like ingestion, query, search, and index. To understand the specific decisions and trade-offs, refer the [design choices document](./design-choices.md).

## Overview

Parseable is shipped as a single unified binary (or container image if you prefer). This includes the Prism UI and Parseable DB. There is no additional dependency to run Parseable.

The binary can be run in different modes. You’d generally run standalone mode to test and experience Parseable on your laptop, or a small testing server. 

As you move to a production setup, we recommend running the distributed mode. Here each node has a specific role, i.e. ingestion, query or search.  

## Ingestion

Parseable ingestion nodes follow a shared-nothing architecture, meaning each node independently handles the entire ingestion pipeline. In production, you typically place a load balancer in front of two or more ingestion nodes, allowing ingestion requests to be distributed across nodes seamlessly.

When a node receives an ingestion request (via HTTP or Kafka), it first validates the request, then converts the payload into an Apache Arrow-based file format. During this process, it also performs auto schema detection, enabling Parseable to intelligently classify logs and generate structured schemas on the fly. This makes it easy for users to filter, search, and analyze across diverse log types with minimal upfront configuration.

The Arrow files are temporarily staged in a dedicated local disk area. Once the disk write completes, the ingestion node acknowledges the request with a success response.

To ensure data durability during staging, we recommend attaching a small, reliable disk (such as NFS, Azure Files, or EFS) to each ingestion node.

A background job then reads the staged Arrow files, converts them into highly compressed Parquet files, and uploads them to S3 or any configured object store. During this transformation, the ingestion node also generates query metadata, which significantly enhances performance during log searches and queries.

## Query

Query node is primarily responsible responding to query API. This node also serves as the leader node in a Parseable cluster and hence it also responds to other API. 

The query workflow starts when someone calls the query API with (a PostgreSQL compatible) SQL query, and a start and end timestamp. The query node looks up the metadata locally first, falling back to object store only if not found. 

Based on metadata, the node identifies the relevant parquet files and uses the object store API to get these files. Here again, this only happens if the files are not already present locally. If the files are to be downloaded from object storage - this adds to latency and hence the occasional cold queries. 

Another node called Prism node responds to all the role, user management, dataset management API. 