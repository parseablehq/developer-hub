---
title: Smart Cache
description: Smart Cache in Parseable
sidebar_position: 6
sidebar_label: Smart Cache
---

:::info
Smart cache is only available to be set-up through API and not natively supported in the UI from Release `v2.0.0` onwards. We are working on adding this feature to Prism UI and it will be available soon.
:::

### How it works
Tiering in Parseable allows keeping a copy of log data on the query node (in addition to the object store). You can create storage tiers on query node disks, allowing hot/recent data on SSD and older data backed by S3/object storage. This architecture allows for much faster query response, while keeping costs very low because data is always backed on object store.

The tiered storage capacity works at the log dataset level. You can specify the size on disk available to a specific dataset for its hot tier data. This is useful for situations where different datasets have different query patterns, i.e. some dataset need to be queried for predominantly recent data, while others not so much.

### Setup hot tier
To enable hot tier for a query node, add the environment variable `P_HOT_TIER_DIR` to the query node (or the standalone node) before starting the server. The value of environment variable should be set to the path of directory that you want to use for the data store. For example, `P_HOT_TIER_DIR=/path/to/hot/tier/directory`.

Setting the environment variable enables the global hot tier mechanism. You'll now need to set hot tier size for specific datasets based on your requirements. The setting is available in the Manage page of each dataset, under the Hot Tier Storage Size section.

### Under the hood
When the global hot tier mechanism is enabled, the server identifies the drive (where the hot tier directory is created) and calculates the total size and the free size of the drive. The upper threshold for hot tier size is set to 80% of the total drive capacity. So if the drive is of 10 TiB, then 8 TiB is automatically considered the maximum size of hot tier (subject to disk availability).

### Size allocation
Now when a specific dataset requests a hot tier capacity of let's say `2 TiB`, server checks if it is possible to allocate. The maths is : max size possible (8 TiB) - total used size of the disk (assume `1.3 TiB`) = `6.7 TiB`. The server then allocates the `2 TiB` to this dataset.

Once the hot tier is set up, a scheduler is configured to run every minute. This scheduler verifies if new files are available in remote object store and downloads them to the hot tier, ensuring that your most recent and frequently accessed data is always readily available.

### Populating hot tier
Based on the size allocated for the hot tier (for a dataset), the server starts downloading Parquet files from object store, beginning with the most recent data and moving backward in time. This approach ensures that the latest data, which is more likely to be queried, is prioritized.

As each file is downloaded, it’s recorded in a `hottier.manifest.json` file. This manifest file is crucial for tracking which Parquet files are stored locally in the hot tier. Along with this, the system also updates the available and used sizes in the hot tier's JSON file, providing a clear view of the hot tier’s current state.

The server deletes the oldest files when necessary. This happens under two conditions:

- Size exhaustion: When the total size of the files in the hot tier reaches the allocated limit.

- Disk usage threshold: When the combined disk usage, including the hot tier, exceeds the configured disk usage threshold (e.g., 80%).

The `hottier.manifest.json` is updated to reflect the removal of old files, ensuring that the hot tier remains within its defined constraints while continuing to serve the most relevant data efficiently.

### Query flow for hot tier
On receiving a query, the server fetches the dataset.json and related manifest.json files based on the query time range. It then identifies the list of Parquet file paths from the manifest. The server checks if these files are available in the hot tier. If any of the Parquet files are present in the hot tier path, server utilizes those file, avoiding S3 GET calls. For files not in the hot tier, the system fetches the necessary data from S3.

### Adjusting the hot tier Size
If you need to adjust the size of the hot tier for an existing dataset, you can do so with via the dataset Management page. Here’s how it works:

- Increasing the hot tier Size: When you increase the size of an existing hot tier, the system updates the meta file to reflect the new size. This allows for additional data to be stored locally without any interruption in service.
- Decreasing the hot tier Size: Reducing the size of the hot tier is not allowed. If you attempt to do so, the server will respond with an error, maintaining the integrity of your current data storage setup.