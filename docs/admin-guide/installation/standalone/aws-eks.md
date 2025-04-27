---
title: AWS EKS
description: AWS EKS standalone installation guide for Parseable
sidebar_position: 4
sidebar_label: AWS EKS
---

This page explains additional EKS specific features and configuration options for Parseable. For general Parseable installation instructions, see [installation documentation](/admin-guide/installation).

### Setup IAM roles for service accounts (IRSA)

IAM roles for service accounts provide the ability to manage credentials for Parseable, similar to the way that Amazon EC2 instance profiles provide credentials to Amazon EC2 instances. Instead of creating and distributing your AWS credentials to the Parseable container or using the Amazon EC2 instance's role, you associate an IAM role with a Kubernetes service account and configure Parseable to use the service account.

Read more in the [AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html).

Here are the steps to set up IRSA for Parseable:

#### Create IAM OIDC provider

Refer to the [AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html).

#### Create an IAM Policy

Parseable requires the below permissions to run on S3. (replace `bucket-name` with your bucket name). Complete list of S3 actions is available [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-actions.html).

```bash
cat >parseable-policy.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetBucketLocation",
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListObjectsV2"
            ],
            "Resource": [
                "arn:aws:s3:::bucket-name",
                "arn:aws:s3:::bucket-name/*"
            ]
        }
    ]
}
EOF
```

```bash
aws iam create-policy --policy-name parseable-policy --policy-document file://parseable-policy.json
```

#### Create an IAM role and associate it with a Kubernetes service account

We'll use `eksctl` for this step. You can also use the AWS CLI. Use the below command to create the IAM role and the service account. Replace `my-service-account` with the name of the Kubernetes service account that you want `eksctl` to create and associate with an IAM role. Replace `default` with the namespace that you want `eksctl` to create the service account in. Replace `my-cluster` with the name of your cluster. Replace `111122223333` with your account ID.

```bash
eksctl create iamserviceaccount --name my-service-account --namespace default --cluster my-cluster --role-name "parseable-role" --attach-policy-arn arn:aws:iam::111122223333:policy/parseable-policy --approve
```

#### Configure Parseable to use the service account

You can now refer to the standard Kubernetes documentation for Parseable installation, with Helm Chart or the Kubernetes Operator. Just ensure to use the service account you created above.

If you're using Parseable Helm Chart, set `serviceAccount.create` to `false` and `serviceAccount.name` to the name of the service account you created above. For example `my-service-account`.

If you're using the Parseable Operator, set `serviceAccountName` under the `k8sConfig` section. Refer to a sample CR example [here][github-link].

[github-link]: https://github.com/parseablehq/operator/blob/main/config/samples/parseable-persistent.yaml
