---
title: "C#"
description: C# application for Parseable
sidebar_position: 6
---

### Create a log stream
First, we'll need to create a log stream. This is a one time operation, and we recommend storing log entries with same schema in a single log stream. So, for example, you can use one log stream per application (given that all logs from that application have the same schema).

```csharp
Console.WriteLine("Create logstream!");
var client = new HttpClient();
var logstream_name = "teststream";
var request = new HttpRequestMessage(HttpMethod.Put, String.Concat("http://localhost:8000/api/v1/logstream/", logstream_name));
request.Headers.Add("Authorization", "Basic YWRtaW46YWRtaW4=");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```
### Send logs to the log stream
After log stream is created, you can start sending logs to the log stream using HTTP POST requests.


```csharp
Console.WriteLine("Ingest a log event to the created logstream!");
request = new HttpRequestMessage(HttpMethod.Post, "http://localhost:8000/api/v1/ingest");
request.Headers.Add("Authorization", "Basic YWRtaW46YWRtaW4=");
request.Headers.Add("X-P-Stream", logstream_name);
var content = new StringContent("{\"source_time\":\"2024-03-27T10:29:00.434Z\",\"level\":\"info\",\"message\":\"Application is failing\",\"version\":\"1.2.0\",\"user_id\":13912,\"device_id\":4138,\"session_id\":\"abc\",\"os\":\"Windows\",\"host\":\"112.168.1.110\",\"location\":\"ngeuprqhynuvpxgp\",\"request_body\":\"rnkmffyawtdcindtrdqruyxbndbjpfsptzpwtujbmkwcqastmxwbvjwphmyvpnhordwljnodxhtvpjesjldtifswqbpyuhlcytmm\",\"status_code\":300,\"app_meta\":\"ckgpibhmlusqqfunnpxbfxbc\", \"new_field_added_by\":\"ingester 8020\"}", null, "application/json");
request.Content = content;
response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
Console.WriteLine("Log event ingested successfully!");
```
### Querying a log stream
Once you have started sending logs to a log stream, you can query the logs using standard SQL.


```csharp
Console.WriteLine("Query the logstream!");
request = new HttpRequestMessage(HttpMethod.Post, "http://localhost:8000/api/v1/query");
request.Headers.Add("Authorization", "Basic YWRtaW46YWRtaW4=");
content = new StringContent("{\n    \"query\": \"SELECT * from teststream\",\n    \"startTime\": \"2024-03-27T00:00:00.000Z\",\n    \"endTime\": \"2024-03-28T23:59:00.000Z\"\n}\n", null, "application/json");
request.Content = content;
response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```