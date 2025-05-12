---
title: "Retention"
description: "Retention for Parseable"
sidebar_position: 15
---

## Overview
Parseable allows setting the retention, or the amount of time that log data is kept in the system, for each log stream. The time can be set to a multiple of 1 day. Note that retention works at a stream level, and each stream can have a different retention period. Also, you can only set a single log stream per retention period.

### Setting up
You can set Retention via the Stream Management page (Stream >> Manage >> Retention). If you're using external applications to interact with Parseable, you can also use the retention API calls. Refer to the [API documentation](https://www.parseable.com/docs/api/retention) for details.

### Configuration
Here is sample retention configuration, with all the available options.


```json
[
    {
        "duration": "20d",
        "action": "delete",
        "description": "delete logs after 20 days"
    }
]
```

This table explains the configuration options.

|Variable Name|Required|Description|
|---|---|---|
duration|Yes|Total duration for which logs should be retained. Can be multiple of 1 day, e.g. 20d.|
action|Yes|Action to be taken when log data passes retention duration. Currently only delete is supported|
description|No|Human friendly description of the log retention rule|

