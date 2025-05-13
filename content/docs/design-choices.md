---
title: Design Choices
description: Key design choices behind Parseable
sidebar_position: 2
sidebar_label: Design Choices
---

This document outlines our key design choices, ensuring durability, scalability, and efficiency for modern observability workloads. This page also covers the technical trade offs in Parseable.

<Callout type="info">
If you have a specific use case or need a feature tailored to your observability needs, let us know at [sales@parseable.com](mailto:sales@parseable.com). We ship fast and most of such requests can be done in a matter of days.
</Callout>

### Highlights

- **Low latency writes:** Ingested data is staged on local disk upon successful return by Parseable API. Data is then asynchronously committed to object store like S3. The commit window is one minute. This ensures low latency, high throughput ingestion. 

- **Atomic batches:** Each ingestion batch received via API is concurrently appended to the same file within a one-minute window. When converted from Arrow to Parquet, entries are reordered to ensure the latest data appears first.

- **Efficient storage:** All data is stored initially (in staging phase) as Arrow files and then asynchronously converted to Parquet files and uploaded to object store. Parquet files are on an average compressed by 85% of the original data size. Parquet files on object storage, gives you the best value for money.

- **Index on demand:** By default data is stored in columnar Parquet files, allowing fast aggregations, filtering numerical columns and SQL queries. Parseable allows indexing specific chunks of data, on demand - to allow text search on log data as and when needed.

- **Global reads:** A query call requires start and end timestamp. This ensures data is queried across a fixed, definite set of files. Parseable ensures query response includes the staging and committed data on object storage as required.

- **Smart caching:** Frequently accessed logs are cached in memory and NVMe SSDs on query nodes for faster access. The system prioritizes recent data, manages cache eviction automatically, and minimizes object store API calls using Parseable manifest files and Parquet footers.

- **Stateless high availability:** High availability (HA) is ensured through a distributed mode in which multiple ingestion and query servers operate independently. 

- **Object storage is the only dependency:** There is no separate consensus layer, eliminating complex coordination and reducing operational overhead. Object storage manages all concurrency control.

### Trade-offs

- **High throughput, staged writes:** Parseable can ingestion millions of events per minute per node. All this data is staged on the ingestion node, for at least a minute. This trades immediate persistence for low latency ingestion. With a small, reliable storage attached to ingesting nodes (EFS, Azure Files, NFS or equivalent), users can ensure complete data protection.

- **Occasional Cold Queries:** The query layer fetches indexes from object storage (e.g., S3) and uses intelligent caching to accelerate future access. During the initial cache warm-up, some queries may access data directly from cold storage, resulting in higher latencies.

    **Tradeoff:**

    - Cold data not present on S3 cannot be queried until it lands and gets indexed.

    - Indexing lag: Data is typically available for search within 2 minutes and for querying within 1 minute of ingestion.

    - External updates to object storage may not be immediately reflected in the query cache, introducing temporary sync delays.

- **Caching latency:** To accelerate repeated queries, Parseable employs a multi-tiered caching approach using RAM and NVMe SSDs. While this significantly boosts performance, it introduces:

    - Storage overhead on query nodes.

    - A short latency window during cache initialization.

    - Potential inconsistencies if external tools modify object storage due to caching prioritizing performance over real-time sync.

- **BYOC first:** Parseable is built from first principles for observability and telemetry optimized for storage efficiency, ease of use, and resource minimization. Designed to thrive in customer-managed environments, it runs as a single binary with a built-in UI (Prism), requiring minimal configuration. Our commercial offerings are aligned with this BYOC-first philosophy, delivering maximum value when deployed in your own infrastructure across public clouds, private clouds, VMs, or bare metal.