---
title: OpenTelemetry Metrics
description: Ingesting OpenTelemetry metrics in Parseable
sidebar_position: 3
sidebar_label: OpenTelemetry Metrics
---

## Introduction

Parseable enables ingesting the OpenTelemetry metrics sent from the OTEL collectors in the JSON format. In order to do so, Parseable exposes default endpoint `/v1/metrics` at which the OTEL collector sends the metric data.

Below is the sample configuration of the OTEL collector to send the metrics to Parseable

```yaml
exporters:
  otlphttp/parseablemetrics:
    endpoint: "<parseable-endpoint> eg. http://localhost:8000"
    headers:
      Authorization: "Basic <base64 encoded string of username:password>"
      X-P-Stream: otel-metrics
      X-P-Log-Source: otel-metrics
      Content-Type: application/json
    encoding: json
    tls:
      insecure: true

service:
  pipelines:
    metrics:
      exporters: [otlphttp/parseablemetrics]
```

### Data Flattening
The OpenTelemetry metrics that are in the form of a nested JSON. When the metric event is received at `/v1/metrics` endpoint, Parseable will flatten the nested JSON to a flat JSON object. This is done to make the data more queryable and filterable. Here's a quick comparison of the nested JSON and the flattened JSON:

OTEL JSON format sample:

```json
{
  "resourceMetrics": [
    {
      "resource": {
        "attributes": [
          {
            "key": "service.name",
            "value": {
              "stringValue": "otelcol"
            }
          },
          {
            "key": "service.instance.id",
            "value": {
              "stringValue": "0.0.0.0:8888"
            }
          },
          {
            "key": "net.host.port",
            "value": {
              "stringValue": "8888"
            }
          },
          {
            "key": "http.scheme",
            "value": {
              "stringValue": "http"
            }
          },
          {
            "key": "server.port",
            "value": {
              "stringValue": "8888"
            }
          },
          {
            "key": "url.scheme",
            "value": {
              "stringValue": "http"
            }
          },
          {
            "key": "service_instance_id",
            "value": {
              "stringValue": "45df285f-1c8a-4fcf-8a7c-8e8ebc6ee068"
            }
          },
          {
            "key": "service_name",
            "value": {
              "stringValue": "otelcol-contrib"
            }
          },
          {
            "key": "service_version",
            "value": {
              "stringValue": "0.113.0"
            }
          }
        ]
      },
      "scopeMetrics": [
        {
          "scope": {
            "name": "github.com/open-telemetry/opentelemetry-collector-contrib/receiver/prometheusreceiver",
            "version": "0.113.0"
          },
          "metrics": [
            {
              "name": "otelcol_receiver_accepted_log_records",
              "description": "Number of log records successfully pushed into the pipeline.",
              "sum": {
                "dataPoints": [
                  {
                    "attributes": [
                      {
                        "key": "receiver",
                        "value": {
                          "stringValue": "otlp"
                        }
                      },
                      {
                        "key": "service_instance_id",
                        "value": {
                          "stringValue": "45df285f-1c8a-4fcf-8a7c-8e8ebc6ee068"
                        }
                      },
                      {
                        "key": "service_name",
                        "value": {
                          "stringValue": "otelcol-contrib"
                        }
                      },
                      {
                        "key": "service_version",
                        "value": {
                          "stringValue": "0.113.0"
                        }
                      },
                      {
                        "key": "transport",
                        "value": {
                          "stringValue": "grpc"
                        }
                      }
                    ],
                    "startTimeUnixNano": "1734185431888000000",
                    "timeUnixNano": "1734185431888000000",
                    "asDouble": 11
                  },
                  {
                    "attributes": [
                      {
                        "key": "receiver",
                        "value": {
                          "stringValue": "otlp"
                        }
                      },
                      {
                        "key": "service_instance_id",
                        "value": {
                          "stringValue": "45df285f-1c8a-4fcf-8a7c-8e8ebc6ee068"
                        }
                      },
                      {
                        "key": "service_name",
                        "value": {
                          "stringValue": "otelcol-contrib"
                        }
                      },
                      {
                        "key": "service_version",
                        "value": {
                          "stringValue": "0.113.0"
                        }
                      },
                      {
                        "key": "transport",
                        "value": {
                          "stringValue": "http"
                        }
                      }
                    ],
                    "startTimeUnixNano": "1734185431888000000",
                    "timeUnixNano": "1734185431888000000",
                    "asDouble": 4
                  }
                ],
                "aggregationTemporality": 2,
                "isMonotonic": true
              },
              "metadata": [
                {
                  "key": "prometheus.type",
                  "value": {
                    "stringValue": "counter"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ] 
}
```

#### Flattened JSON:

```json
[
  {
    "aggregation_temporality": 2,
    "aggregation_temporality_description": "AGGREGATION_TEMPORALITY_CUMULATIVE",
    "http.scheme": "http",
    "metric_description": "Number of log records successfully pushed into the pipeline.",
    "metric_name": "otelcol_receiver_accepted_log_records",
    "metric_unit": "",
    "net.host.port": "8888",
    "p_metadata": "",
    "p_tags": "",
    "p_timestamp": "2025-01-02T00:00:08.290+05:30",
    "prometheus.type": "counter",
    "resource_dropped_attributes_count": 0,
    "resource_metrics_schema_url": "",
    "scope_dropped_attributes_count": 0,
    "scope_metrics_schema_url": "",
    "scope_name": "github.com/open-telemetry/opentelemetry-collector-contrib/receiver/prometheusreceiver",
    "scope_version": "0.113.0",
    "server.port": "8888",
    "service.instance.id": "0.0.0.0:8888",
    "service.name": "otelcol",
    "service_instance_id": "45df285f-1c8a-4fcf-8a7c-8e8ebc6ee068",
    "service_name": "otelcol-contrib",
    "service_version": "0.113.0",
    "sum_data_point_flags": 0,
    "sum_data_point_flags_description": "DATA_POINT_FLAGS_DO_NOT_USE",
    "sum_data_point_value_as_double": 11,
    "sum_is_monotonic": true,
    "sum_receiver": "otlp",
    "sum_service_instance_id": "45df285f-1c8a-4fcf-8a7c-8e8ebc6ee068",
    "sum_service_name": "otelcol-contrib",
    "sum_service_version": "0.113.0",
    "sum_start_time_unix_nano": 1734185431888000000,
    "sum_time_unix_nano": 1734185431888000000,
    "sum_transport": "grpc",
    "url.scheme": "http"
  },
  {
    "aggregation_temporality": 2,
    "aggregation_temporality_description": "AGGREGATION_TEMPORALITY_CUMULATIVE",
    "http.scheme": "http",
    "metric_description": "Number of log records successfully pushed into the pipeline.",
    "metric_name": "otelcol_receiver_accepted_log_records",
    "metric_unit": "",
    "net.host.port": "8888",
    "p_metadata": "",
    "p_tags": "",
    "p_timestamp": "2025-01-02T00:00:08.292+05:30",
    "prometheus.type": "counter",
    "resource_dropped_attributes_count": 0,
    "resource_metrics_schema_url": "",
    "scope_dropped_attributes_count": 0,
    "scope_metrics_schema_url": "",
    "scope_name": "github.com/open-telemetry/opentelemetry-collector-contrib/receiver/prometheusreceiver",
    "scope_version": "0.113.0",
    "server.port": "8888",
    "service.instance.id": "0.0.0.0:8888",
    "service.name": "otelcol",
    "service_instance_id": "45df285f-1c8a-4fcf-8a7c-8e8ebc6ee068",
    "service_name": "otelcol-contrib",
    "service_version": "0.113.0",
    "sum_data_point_flags": 0,
    "sum_data_point_flags_description": "DATA_POINT_FLAGS_DO_NOT_USE",
    "sum_data_point_value_as_double": 4,
    "sum_is_monotonic": true,
    "sum_receiver": "otlp",
    "sum_service_instance_id": "45df285f-1c8a-4fcf-8a7c-8e8ebc6ee068",
    "sum_service_name": "otelcol-contrib",
    "sum_service_version": "0.113.0",
    "sum_start_time_unix_nano": 1734185431888000000,
    "sum_time_unix_nano": 1734185431888000000,
    "sum_transport": "http",
    "url.scheme": "http"
  }
]
```

All the resource attributes are stored as key-value pair where each attribute key becomes the field and the value, which may be of one of `stringValue/intValue/doubleValue etc`, becomes the value for that particular field.

Each metric record has data which is one of `sum` `gauge` `histogram` `exponentialHistogram` `summary` type.

Each data has one or more data points. Each data point is stored as individual record in Parseable and all resource attributes, scope name, version, other metric elements such as metric name, description, metadata etc are copied in each ingested record. In the above example, there are 2 dataPoints under `sum` record, thus, Parseable stores the incoming event as 2 records making it simpler to query and analyse.