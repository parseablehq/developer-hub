---
title: "Apache Log4j 2"
description: Apache Log4j 2 log agent for Parseable
sidebar_position: 7
---

Apache Log4j 2 is a Java-based logging framework. It is one of most popular logging frameworks in Java. This document explains how to use the [Log4j 2 HTTP appender](https://logging.apache.org/log4j/2.x/manual/appenders.html#HTTP) to send logs to Parseable.

### Prerequisites
- Parseable server installed and running. See [installation](/docs/admin-guide/installation) for more details.
- A Java project with Log4j dependency.

### Setup
Edit the log4j2.xml file to add the following configuration. Please ensure to update the url, Authorization, and X-P-Stream properties with the correct values.


```xml
<?xml version="1.0" encoding="UTF-8" ?>
<Configuration status="TRACE">
    <Appenders>
        <Http name="Parseable" url="<parseable-server-url>/api/v1/ingest" method="POST">
            <Property name="Authorization" value="Basic <basic-auth-hash>" />
            <Property name="X-P-Stream" value="<stream-name>" />
            <Property name="Accept" value="application/json" />
            <JsonLayout properties="true"/>
        </Http>
    </Appenders>
    <Loggers>
        <Root level="info">
            <AppenderRef ref="Parseable"/>
        </Root>
    </Loggers>
</Configuration>
```
Once the configuration is updated, restart the application. You should start seeing logs in Parseable.

