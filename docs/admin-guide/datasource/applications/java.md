---
title: "Java"
description: Java application for Parseable
sidebar_position: 2
---

### Create a log stream
First, we'll need to create a log stream. This is a one time operation, and we recommend storing log entries with same schema in a single log stream. So, for example, you can use one log stream per application (given that all logs from that application have the same schema).


```java
OkHttpClient client = new OkHttpClient().newBuilder().build();
MediaType mediaType = MediaType.parse("text/plain");
RequestBody body = RequestBody.create(mediaType, "");
Request request = new Request.Builder()
    // highlight-start 
    // TODO: Replace the url with your Parseable URL and stream name
    .url("https://<parseable-url>/api/v1/logstream/<stream-name>")
    // highlight-end
    .method("PUT", body)
    // highlight-start 
    // TODO: Replace the basic auth credentials with your Parseable credentials
    .addHeader("Authorization", "Basic YWRtaW46YWRtaW4=")
    // highlight-end
    .build();

Response response = client.newCall(request).execute();
```
### Send logs to the log stream

After log stream is created, you can start sending logs to the log stream using HTTP POST requests.

```java
OkHttpClient client = new OkHttpClient().newBuilder()
    .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "[\n    {\n        \"id\": \"434a5f5e-2f5f-11ed-a261-asdasdafgdfd\",\n        \"datetime\": \"24/Jun/2022:14:12:15 +0000\",\n        \"host\": \"153.10.110.81\", \n        \"user-identifier\": \"Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0\", \n        \"method\": \"PUT\", \n        \"status\": 500, \n        \"referrer\": \"http://www.google.com/\"\n    }\n]");
Request request = new Request.Builder()
    // highlight-start
    // TODO: Replace the url with your Parseable URL and stream name
    .url("https://<parseable-url>/api/v1/logstream/<stream-name>")
    // highlight-end
    .method("POST", body)
    // highlight-start
    // INFO: Use X-P-META-<key>:<value> to add custom metadata to the log event
    .addHeader("X-P-META-Host", "192.168.1.3")
    // INFO: Use X-P-TAG-<key>:<value> to add tags to the log event
    .addHeader("X-P-TAG-Language", "java")
    // TODO: Replace the basic auth credentials with your Parseable credentials
    .addHeader("Authorization", "Basic YWRtaW46YWRtaW4=")
    // highlight-end
    .addHeader("Content-Type", "application/json")
    .build();
Response response = client.newCall(request).execute();
```
### Querying a log stream
Once you have started sending logs to a log stream, you can query the logs using standard SQL.


```java
OkHttpClient client = new OkHttpClient().newBuilder()
    .build();
MediaType mediaType = MediaType.parse("application/json");
// highlight-start
// TODO: Replace the stream name with your log stream name
RequestBody body = RequestBody.create(mediaType, "{\n    \"query\": \"select * from <stream-name>\",\n    \"startTime\": \"2022-09-10T08:20:00+00:00\",\n    \"endTime\": \"2022-09-10T08:20:31+00:00\"\n}\n");
// highlight-end
Request request = new Request.Builder()
    // highlight-start
    // TODO: Replace the url with your Parseable URL
    .url("https://<parseable-url>/api/v1/query")
    // highlight-end
    .method("POST", body)
    // highlight-start
    // TODO: Replace the basic auth credentials with your Parseable credentials
    .addHeader("Authorization", "Basic YWRtaW46YWRtaW4=")
    // highlight-end
    .addHeader("Content-Type", "application/json")
    .build();
Response response = client.newCall(request).execute();
```
    