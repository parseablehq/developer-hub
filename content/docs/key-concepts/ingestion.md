---
title: Ingestion
description: Ingesting telemtry data into Parseable
sidebar_position: 1
sidebar_label: Ingestion
---

## Introduction 
You can send Log events to Parseable via HTTP POST requests with data as JSON payload. You can use the HTTP output plugins of all the common logging agents like [FluentBit](https://www.parseable.com/docs/server/log-ingestion/agents/how-to-setup-fluent-bit), [Vector](https://www.parseable.com/docs/server/log-ingestion/agents/how-to-setup-vector), [syslog-ng](https://www.parseable.com/docs/server/log-ingestion/agents/how-to-setup-syslog-ng), [LogStash](https://www.parseable.com/docs/server/log-ingestion/agents/how-to-setup-logstash), among others to send log events to Parseable.

You can also directly integrate Parseable with your application via [REST API](https://www.parseable.com/docs/api-reference/apireference/put_%2Fapi%2Fv1%2Flogstream%2F%7Bstream_name%7D).

## Log Streams

Log streams are logical (and physical) collections of related log events. For example, in a Kubernetes cluster, you can have a log stream for each application or a log stream for each namespace - depending on how you want to query the data. A log stream is identified by a unique name, and role based access control, alerts, and notifications are supported at the log stream level.

To start sending logs, you'll need to create a log stream first, via the Console `Create Log Stream` button.

## Schema

Schema is the structure of the log event. It defines the fields and their types. Parseable supports two types of schema - dynamic and static. You can choose the schema type while creating the log stream. Additionally, if you want to enforce a specific schema, you'll need to send that schema at the time of creating the log stream.

At any point in time, you can fetch the schema of a log stream on the Console or the [Get Schema API](https://www.parseable.com/docs/api-reference/apireference/get_%2Fapi%2Fv1%2Flogstream%2F%7Bstream_name%7D%2Fschema).

### Dynamic

Log streams by default have dynamic schema. This means you don't need to define a schema for a log stream. The Parseable server detects the schema from first event. If there are subsequent events (with new schema), it updates internal schema accordingly.

Log data formats evolve over time, and users prefer a dynamic schema approach, where they don't have to worry about schema changes, and they are still able to ingest events to a given stream.

<Callout type="note">
For dynamic schema, Parseable doesn't allow changing the type of an existing column whose type is already set. For example, if a column is detected as string in the first event, it can't be changed to int or timestamp in a later event. If you'd like to force a specific schema, you can set the schema while creating the stream.
</Callout>

### Static

In some cases, you may want to enforce a specific schema for a log stream. You can do this by setting the static schema flag while creating the log stream. This schema will be enforced for all the events ingested to the stream. You'll need to provide the schema in the form of a JSON object with field names and their types, with the create stream API call. The following types are supported in the schema: `string`, `int`, `float`, `timestamp`, `boolean`.

## Partitioning

By default, the log events are partitioned based on the `p_timestamp` field. `p_timestamp` is an internal field added by Parseable to each log event. This field specifies the time when the Parseable server received this event. Parseable adds this field to ensure there is always a time axis to the log events, so it becomes easier to query the events based on time. Refer to the historical data ingestion section for more details.

You can also partition the log events based on a custom time field. For example, if you're sending events that contain a field called `datetime` (a column that has a timestamp in a valid format), you can specify this field as the partition field. This helps speed up the query performance when you're querying based on the partition field. Refer to the `custom partitioning section for more details.

## Flattening

Nested JSON objects are automatically flattened. For example, the following JSON object

```json
{
  "foo": {
    "bar": "baz"
  }
}
```

will be flattened to

```json
{
  "foo.bar": "baz"
}
```

before it gets stored. While querying, this field should be referred to as foo.bar. For example, select `foo.bar` from `<stream-name>`. The flattened field will be available in the schema as well.

## Batching and Compression

Wherever applicable, we recommend enabling the log agent's compression and batching features to reduce network traffic and improve ingestion performance. The maximum payload size in Parseable is 10 MiB (10485760 Bytes). The payload can contain single log event as a JSON object or multiple log events in a JSON array. There is no limit to the number of batched events in a single call.

## Timestamp

Correct time is critical to understand the proper sequence of events. Timestamps are important for debugging, analytics, and deriving transactions. We recommend that you include a timestamp in your log events formatted in RFC3339 format.

Parseable uses the event-received timestamp and adds it to the log event in the field `p_timestamp`. This ensures there is a time reference in the log event, even if the original event doesn't have a timestamp. If you'd like to use your own timestamp instead for partitioning of data, please refer the documentation here.


## Staging

Staging in Parseable refers to the process of storing log data on locally attached storage before it is pushed to a long term and persistent store like S3 or something similar. Staging acts as a buffer for incoming events and allows a stable approach to pushing events to the persistent store.

Once an HTTP call is received on the Parseable server, events are parsed and converted to Arrow format in memory. This Arrow data is then written to the staging directory (defaults to `$PWD/staging`). Every minute, the server converts the Arrow data to Parquet format and pushes it to the persistent store. We chose a minute as the default interval, so there is a clear boundary between events, and the prefix structure on S3 is predictable.

The query flow in Parseable allows transparent access to the data in the staging directory. This means that the data in the staging directory is queryable in real-time. As a user, you won't see any difference in the data fetched from the staging directory or the persistent store.

The staging directory can be configured using the `P_STAGING_DIR` environment variable, as explained in the environment vars section.

## Planning for Production

When planning for the production deployment of Parseable, the two most important considerations from a staging perspective are:

Storage size: Ensure that the staging area has sufficient capacity to handle the anticipated log volume. This prevents data loss due to disk space exhaustion. To calculate the storage size, consider the average log event size, the expected log volume for 5-10 minutes. This is done as under high loads, the conversion to Parquet and subsequent push to S3 may lag behind.

Local storage redundancy: Data in staging has not been committed to persistent store, it is important to have the staging itself reliable and redundant. This way, the staging data is protected from data loss due to simple disk failures. If using AWS, choose from services like EBS (Elastic Block Store) or EFS (Elastic File System), and mount these volumes on the Parseable server. Similarly, on Azure chose from Managed Disks or Azure Files. If you're using a private cloud, a reliable mounted volume from a NAS or SAN can be used.