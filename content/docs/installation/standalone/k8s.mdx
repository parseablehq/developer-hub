---
title: Kubernetes
description: Kubernetes standalone installation guide for Parseable
sidebar_position: 3
sidebar_label: Kubernetes
---

This page explains the steps required to setup Parseable (in S3 or Local mode) on Kubernetes via Helm.

### Prerequisites
- `kubectl` and `helm` installed and configured to point to relevant Kubernetes clusters.

### Setup Parseable with Local Storage
#### Create configuration secret

Create a secret file with the configuration for Parseable.

```bash
cat << EOF > parseable-env-secret
addr=0.0.0.0:8000
staging.dir=./staging
fs.dir=./data
username=admin
password=admin
EOF
```

Then create the secret in Kubernetes.

```bash
kubectl create ns parseable
kubectl create secret generic parseable-env-secret --from-env-file=parseable-env-secret -n parseable
```

#### Install Parseable

```bash
helm repo add parseable https://charts.parseable.com
helm install parseable parseable/parseable -n parseable --set "parseable.local=true"
kubectl port-forward svc/parseable 8000:80 -n parseable
```

You should now be able to point your browser to `http://localhost:8000` and see the Parseable login page. You can login with the values set in the username and password fields in the `parseable-env-secret` file above.

### Setup Parseable with S3 Storage
#### Setup object store
This step is required only if you want to setup [MinIO](https://min.io/) as the backend for Parseable. Please skip this step if you have another object store, like S3, already available.

```bash
helm repo add minio https://charts.min.io/
helm install --namespace minio --create-namespace --set "buckets[0].name=parseable,buckets[0].policy=none,buckets[0].purge=false,rootUser=minioadmin,rootPassword=minioadmin,replicas=1,persistence.enabled=false,resources.requests.memory=128Mi,mode=standalone" minio minio/minio
kubectl port-forward svc/minio-console -n minio 9001:9001
```
You can now access the MinIO console on http://localhost:9001. You should see a bucket called `parseable` created.


<Callout type="info">
MinIO installation steps above are for testing purposes only. For production, please refer to the [MinIO documentation](https://min.io/docs/minio).
</Callout>

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

Then create the secret in Kubernetes.

```bash
kubectl create ns parseable
kubectl create secret generic parseable-env-secret --from-env-file=parseable-env-secret -n parseable
```

#### Install Parseable

```bash
helm repo add parseable https://charts.parseable.com
helm install parseable parseable/parseable -n parseable
kubectl port-forward svc/parseable 8000:80 -n parseable
```

You should now be able to point your browser to `http://localhost:8000` and see the Parseable login page. You can login with the values set in the username and password fields in the `parseable-env-secret` file above.


