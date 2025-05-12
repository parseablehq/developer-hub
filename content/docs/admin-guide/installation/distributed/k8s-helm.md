---
title: Kubernetes
description: Kubernetes distributed installation guide for Parseable
sidebar_position: 3
sidebar_label: Kubernetes
---

This page explains the steps required to setup Parseable in a distributed mode on Kubernetes via Helm.

### Prerequisites

- `kubectl` and `helm` installed and configured to point to relevant Kubernetes cluster.
- Use S3 or a compatible object store such as MinIO to store logs.

### Set up object store

:::info
The MinIO installation steps below are for testing purposes only. For production level deployment please refer to the [MinIO documentation](https://min.io/docs/minio).
:::

This step is required only if you want to setup MinIO as the backend for Parseable. Please skip this step if you have another object store, like S3, already available.
Make sure you configure `storageClass` in the helm install command.

```bash
helm repo add minio https://charts.min.io/
helm install --namespace minio --create-namespace --set "buckets[0].name=parseable,buckets[0].policy=none,buckets[0].purge=false,rootUser=minioadmin,rootPassword=minioadmin,replicas=1,persistence.enabled=true,persistence.storageClass="",resources.requests.memory=128Mi,mode=standalone" minio minio/minio
kubectl port-forward svc/minio-console -n minio 9001:9001
```

You can now access the MinIO console at `http://localhost:9001`. You should see a bucket called `parseable` created.

#### Create configuration secret

Create a secret file with the configuration for Parseable. Note that the values set below are based on the MinIO installation above. If you are using a different object store, please update the values accordingly.

```bash
cat << EOF > parseable-env-secret
s3.url=http://minio.minio.svc.cluster.local:9000
s3.access.key=minioadmin
s3.secret.key=minioadmin
s3.region=us-east-1
s3.bucket=parseable
addr=0.0.0.0:8000
staging.dir=./staging
fs.dir=./data
username=admin
password=admin
EOF
```

After this, create the secret in Kubernetes.

```bash
kubectl create ns parseable
kubectl create secret generic parseable-env-secret --from-env-file=parseable-env-secret -n parseable
```

#### Install Parseable

```bash
helm repo add parseable https://charts.parseable.com/
helm install parseable parseable/parseable -n parseable --set "parseable.highAvailability.enabled=true" --set "parseable.store=s3-store" --set "parseable.s3ModeSecret.enabled=true"
```

:::info
Note that `parseable.highAvailability.enabled=true` flag enables high availability mode. By default, the helm chart installs 3 Parseable ingest services and 1 Parseable query service. It also creates a ClusterIP service for Parseable ingestors.
:::

#### Access Parseable

Since we're running Parseable in a distributed mode, the ingestor service and querier services are different. Any log agent or client should send events to the `parseable-ingestor-service` service. To expose the ingress service, you can use the following command:

```bash
kubectl port-forward svc/parseable-ingestor-service 8000:80 -n parseable
```

To access the Parseable UI, you'll need to expose the `parseable-querier-service` service:

```bash
kubectl port-forward svc/parseable-querier-service 8001:80 -n parseable
```

You should now be able to point your browser to `http://localhost:8001` and see the Parseable login page. You can login with the values set in `username` and `password` fields in the `parseable-env-secret` file above.

### Migration

This section is for users using Parseable helm chart version `1.3.1` or previous. Parseable release `v1.4.0` introduced a hot-tier mechanism for query nodes. Accordingly, the query nodes in the helm chart are now deployed as a StatefulSet instead of a Deployment. The helm chart version `1.4.0` and above removes the Deployment and creates a StatefulSet for query nodes.

Since distributed mode always runs with S3 store mode, the data is stored remotely and there is no manual migration required. If you face any issues during the upgrade, please reach out to us in the [community Slack](https://logg.ing/community).