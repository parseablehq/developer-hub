---
title: Benchmarks and Limits
description: Benchmarks of Parseable
sidebar_position: 4
sidebar_label: Benchmarks and Limits
---

## Introduction

This page outlines the performance characteristics and tested limits of Parseable in real-world scenarios. It helps you understand how Parseable scales with data volume, query concurrency, and storage size. Whether you're planning capacity or benchmarking against your workloads, this page gives you actionable insights into ingestion throughput, query latency, resource utilization, and architectural boundaries.

We include:

- Benchmark Results and Performance Metrics: Ingestion speed, query response time, and system resource consumption under load.

### Performance Metrics

As part of our continuous performance improvement efforts, we benchmarked ParseableDB against other popular OLAP systems using the ClickBench suite.

The goal: reliably quantify ParseableDB’s query and ingestion performance in a standardized environment.

Parseable now ranks among the **fastest databases** on ClickBench, outperforming several OLAP systems in structured query benchmarks.

### Environment

We ran the benchmarks on the two most popular instance types used in ClickBench:

- c6a.4xlarge – 16 vCPUs, 32 GiB RAM
- c6a.metal – 192 vCPUs, 384 GiB RAM

### Dataset

- Source: ClickBench dataset (~22 GB compressed)

- Decompressed size: ~216 GB

- Total rows: **100 million**

- File format: `hits.json` (JSON Lines)

### Ingestion Preparation

1. Split Data

- Original `hits.json` (216 GB) is split into **39,999 files**, each with 2,500 rows

- Rationale: Smaller files improve ingestion parallelism and avoid large object overhead

2. Format Conversion

- Each file is converted into a **valid JSON array** for optimal ingestion into ParseableDB

### Benchmark Workflow

1. Ingest Data

```sh
./ingestion.sh
```

This script performs parallel ingestion of all prepared JSON files into ParseableDB.

2. Execute Queries

We used the standard 43 queries provided in `queries.sql` from ClickBench.

```sh
./run_query.sh
```

Each query is executed **three times**:

- **Cold Run**: First execution with page cache cleared
- **Hot Run**: Average of next two runs with page cache benefits

All timings are recorded in `result.csv`.

### Results

Parseable demonstrates:

- **Fast ingestion** of JSON-based semi-structured data
- **Low-latency query** execution, even on large datasets
- **Efficient memory** and CPU usage due to tight internal schema-on-read pipeline

### Observability vs OLAP Benchmarks

While ClickBench provides a standardized baseline, it's important to note:

- The ClickBench dataset (~216 GB) is **small** compared to real-world observability workloads (often **>5 TB/day**)
- Queries in ClickBench are analytical and not optimized for **log search** or **time-series analytics**
- Observability workloads require high ingestion throughput, support for **semi-structured** and **unstructured** data, and low-latency **textual search**

### Limits

For optimal performance, we recommend the following specifications for each node type:

- Prism (leader) - 4 vCPU, 8 GiB memory
- Query - 16 vCPU, 32 GiB memory
- Ingest - 8 vCPU, 16 GiB memory
- Index - 16 vCPU, 32 GiB memory

