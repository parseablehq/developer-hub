---
title: "Go"
description: Go application for Parseable
sidebar_position: 1
---

### Create a log stream
First, we'll need to create a log stream. This is a one time operation, and we recommend storing log entries with same schema in a single log stream. So, for example, you can use one log stream per application (given that all logs from that application have the same schema).


```go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	// highlight-start
	// TODO: Replace the url with your Parseable URL and stream name
	url := "https://<parseable-url>/api/v1/logstream/<stream-name>"
	// highlight-end
	method := "PUT"

	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)

	if err != nil {
		fmt.Println(err)
		return
	}

	// highlight-start
	// TODO: Replace the basic auth credentials with your Parseable credentials
	req.Header.Add("Authorization", "Basic YWRtaW46YWRtaW4=")
	// highlight-end

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(body))
}
```

### Send logs to the log stream
After log stream is created, you can start sending logs to the log stream using HTTP POST requests.


```go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

func main() {

	// highlight-start
	// TODO: Replace the url with your Parseable URL and stream name
	url := "https://<parseable-url>/api/v1/logstream/<stream-name>"
	// highlight-end
	method := "POST"

	payload := strings.NewReader(`[{
        "id": "434a5f5e-2f5f-11ed-a261-asdasdafgdfd",
        "datetime": "24/Jun/2022:14:12:15 +0000",
        "host": "153.10.110.81", 
        "user-identifier": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0", 
        "method": "PUT", 
        "status": 500, 
        "referrer": "http://www.google.com/"
  }]`)

	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)

	if err != nil {
		fmt.Println(err)
		return
	}
	// highlight-start
	// INFO: Use X-P-META-<key>:<value> to add custom metadata to the log event
	req.Header.Add("X-P-META-Host", "192.168.1.3")
	// INFO: Use X-P-TAG-<key>:<value> to add tags to the log event
	req.Header.Add("X-P-TAG-Language", "golang")
	// TODO: Replace the basic auth credentials with your Parseable credentials
	req.Header.Add("Authorization", "Basic YWRtaW46YWRtaW4=")
	// highlight-end
	req.Header.Add("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(body))
}
```

### Querying a log stream
Once you have started sending logs to a log stream, you can query the logs using standard SQL.


```go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

func main() {
	// highlight-start
	// TODO: Replace the url with your Parseable URL
	url := "https://<parseable-url>/api/v1/query"
	// highlight-end
	method := "POST"

	payload := strings.NewReader(`{
    // highlight-start
    // TODO: Replace the stream name with your log stream name
    "query": "select * from <stream-name>",
    // TODO: Replace the time range with your desired time range
    "startTime": "2022-09-10T08:20:00+00:00",
    "endTime": "2022-09-10T08:20:31+00:00"
    // highlight-end
}
`)

	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)

	if err != nil {
		fmt.Println(err)
		return
	}

	// highlight-start
	// TODO: Replace the basic auth credentials with your Parseable credentials
	req.Header.Add("Authorization", "Basic YWRtaW46YWRtaW4=")
	// highlight-end
	req.Header.Add("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(body))
}
```



