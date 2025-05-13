---
title: High Availability
description: High availability in Parseable
sidebar_position: 4
sidebar_label: High Availability
---


## Introduction

From the release v1.0.0 and onwards, Parseable supports a distributed, high-availability mode for production use cases where downtime is not an option. The distributed setup is designed to ensure fault tolerance and high availability for log ingestion.

The distributed setup consists of multiple Parseable ingestion server, a query server and a S3 (or other object store) bucket. The cluster is managed by a leader server, doubling up as the query server.

The Query (and leader) server uses metadata stored in the object store to query the data. The query server uses the Parseable manifest file and the Parquet footers in tandem to ensure that the data is read in fewest possible object store API calls.

## Architecture

Parseable distributed mode is based on a completely decoupled design with clear segregation between the compute and storage. Different components like the ingestor and querier, are on independent paths, and can be scaled independently.

Each ingestor creates its own set of metadata files and data files - storing these files in a (internally) well-known location within the object storage system. This allows for a simple, clean path to scale ingestors as workloads increase. Similarly, this allows for clean scaling down of ingestors when workloads decrease. You can even scale ingestors to zero, and the system will continue to operate normally.

The Query server primarily serves as a reader server, barring a few metadata files that it writes to the object store. This allows for a clean separation of concerns, and allows for the query server to be scaled vertically as needed. Query server also maintains a lazy list of ingestors that are currently active and uses this list to query the data.

## Migration from Standalone to Distributed

If you're already running Parseable in standalone mode, and want to migrate to distributed mode, you can start the Parseable server(s) in distributed mode, and the server will automatically migrate the metadata and other relevant manifest files to the distributed mode. There is no additional step involved.

<Callout type="info">
This is a one way and one time process. It is not possible to move from a distributed deployment to a standalone deployment.
</Callout>

## High Availability in Parseable Enterprise (New Feature)

Parseable Enterprise builds upon the distributed architecture of Parseable OSS, enhancing it with an even more robust high availability framework. This feature allows you to independently scale the query nodes along with the independently scalable ingest nodes.

The high availability architecture in Parseable Enterprise consists of four specialized node types, each serving a distinct function within the cluster:

### Node specific Env var 

| Node Type | Role | Scalability | Node specific Env var |
| --- | --- | --- | --- |
| Prism (Leader) | Manages UI, dataset configuration, and RBAC | Single Node | - |
| Query | Handles data querying and analytics | Independently scalable | P_QUERIER_ENDPOINT |
| Ingest | Processes incoming log event | Independently scalable | P_INGESTOR_ENDPOINT |
| Index | Manages indexing and search | Single Node (multi node planned) | P_INDEXER_ENDPOINT |

Details of the environment variables are available in the [Environment Variables](https://www.parseable.com/docs/server/environment-variables).

Each node in the cluster generates and maintains its own NodeMetadata file containing:

- Domain name information
- Authentication tokens
- Node-specific configuration

These metadata files are stored in the configured S3 bucket and serve as the foundation for inter-node communication.

### Prism Node

Functions as a lightweight coordinator that:

- Monitors the health and availability of all nodes in the cluster
- Collects performance metrics from other nodes
- Handles administrative tasks like dataset and RBAC management

### Query Node

Handles data querying and analytics

### Ingest Node

Processes incoming log event

### Index Node

Manages indexing and search

### Routes requests to appropriate node types

- Query requests from the UI are distributed across available query nodes
- Search requests are routed to the index node
- This load balancing ensures optimal resource utilization and performance

### For optimal performance, we recommend the following specifications for each node type:

| Node Type | vCPU | Memory |
| --- | --- | --- |
| Prism (leader) | 4 | 8 GiB |
| Query | 16 | 32 GiB |
| Ingest | 8 | 16 GiB |
| Index | 16 | 32 GiB |

### Migration Paths

#### Migrating from Parseable OSS to Enterprise

If you're currently running Parseable OSS in distributed mode, the migration process is straightforward:

1. Deploy a new Prism node using the Parseable Enterprise image/binary
2. Configure the Prism node to use the same S3 bucket as your existing deployment
3. Start the Prism node
4. Start an Index node for search capabilities

Your existing OSS nodes will automatically be incorporated into the Enterprise cluster with no additional configuration required.

<Callout type="info">
Prism and Index nodes are Enterprise-only features and cannot be deployed with OSS versions.
</Callout>

#### Migrating from Enterprise to OSS

If you need to revert from Enterprise to OSS, follow these steps:

1. Stop all nodes in your Enterprise deployment
2. Switch to the Parseable OSS image/binary
3. Start a query node and remaining ingest nodes configured to use the same S3 bucket
4. Your data will remain intact and accessible

### Best Practices

- Start with the recommended hardware specifications and adjust based on observed performance
- Scale Query nodes horizontally for improved query performance during peak usage periods
- Scale Ingest nodes to handle spikes in log volume