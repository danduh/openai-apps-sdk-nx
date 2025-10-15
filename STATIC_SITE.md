# AWS Static Website Setup - OpenAPI-APPS-SDK

## 🎉 Deployment Summary

Successfully deployed a static website infrastructure on AWS using S3 and CloudFront.

**Deployment Date:** October 15, 2025

---

## 📦 Created Resources

### S3 Bucket
- **Name:** `openapi-apps-sdk-website-1760553786`
- **Region:** `us-east-1`
- **Purpose:** Static file hosting
- **Access:** Private (CloudFront only via OAC)

### CloudFront Distribution
- **Distribution ID:** `E37FFIFV98XTLC`
- **Domain Name:** `d20hg2q9c0qj9d.cloudfront.net`
- **Status:** Deploying (takes 10-15 minutes)
- **Origin:** S3 bucket via Origin Access Control (OAC)
- **Default Root Object:** `index.html`
- **SSL/TLS:** CloudFront default certificate
- **HTTP → HTTPS:** Redirect enabled

### Origin Access Control (OAC)
- **OAC ID:** `E10CI9BC3SZT5A`
- **Type:** S3 Origin Access Control
- **Purpose:** Secure access from CloudFront to S3

---

## 🌐 Access Your Website

**CloudFront URL:** https://d20hg2q9c0qj9d.cloudfront.net

⏳ **Note:** CloudFront distribution is deploying. Wait 10-15 minutes before accessing.

---

## 🚀 Deploy Your Website

### Deploy payo_ui_balance Application

Build and sync your `payo_ui_balance` application to S3:

```bash
# Set your bucket name
BUCKET_NAME="openapi-apps-sdk-website-1760553786"

# 1. Build the application
nx build payo_ui_balance

# 2. Sync build output to S3 (with prefix path)
aws s3 sync dist/payo_ui_balance s3://$BUCKET_NAME/openapi-apps/payo_ui_balance/ --delete --no-verify-ssl

# 3. Invalidate CloudFront cache for this path
aws cloudfront create-invalidation \
  --distribution-id E37FFIFV98XTLC \
  --paths "/openapi-apps/payo_ui_balance/*" \
  --no-verify-ssl
```

**Access your app at:** https://d20hg2q9c0qj9d.cloudfront.net/openapi-apps/payo_ui_balance/index.html

> ⚠️ **Note:** CloudFront only supports default root object (`index.html`) at the distribution root, not in subdirectories. You must include `/index.html` in the URL for subdirectory paths, or use CloudFront Functions to rewrite URLs (see solution below).

### Upload Files to S3

```bash
# Set your bucket name
BUCKET_NAME="openapi-apps-sdk-website-1760553786"

# Upload a single file
aws s3 cp index.html s3://$BUCKET_NAME/ --content-type "text/html"

# Upload entire directory to root
aws s3 sync ./dist s3://$BUCKET_NAME/ --delete

# Upload to a specific prefix/folder
aws s3 sync ./dist/my-app s3://$BUCKET_NAME/path/to/app/ --delete

# Upload with specific content types
aws s3 sync ./dist s3://$BUCKET_NAME/ \
  --exclude "*" \
  --include "*.html" --content-type "text/html" \
  --include "*.css" --content-type "text/css" \
  --include "*.js" --content-type "application/javascript" \
  --include "*.json" --content-type "application/json"
```

### Invalidate CloudFront Cache

After uploading new files, invalidate the CloudFront cache:

```bash
CF_DISTRIBUTION_ID="E37FFIFV98XTLC"

# Invalidate all files
aws cloudfront create-invalidation \
  --distribution-id $CF_DISTRIBUTION_ID \
  --paths "/*"

# Invalidate specific files
aws cloudfront create-invalidation \
  --distribution-id $CF_DISTRIBUTION_ID \
  --paths "/index.html" "/css/*" "/js/*"
```

---

## � Subdirectory Index File Handling

CloudFront's `DefaultRootObject` only works at the distribution root. For subdirectories, you need to explicitly include `/index.html` in the URL or implement one of these solutions:

### Solution 1: CloudFront Function (Recommended)

Create a CloudFront Function to automatically append `index.html` to directory requests:

```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // Check whether the URI is missing a file name.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    } 
    // Check whether the URI is missing a file extension.
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }
    
    return request;
}
```

**Steps to implement:**

```bash
# 1. Create the function
aws cloudfront create-function \
  --name append-index-html \
  --function-config Comment="Append index.html to directory URLs",Runtime=cloudfront-js-1.0 \
  --function-code fileb://function.js \
  --no-verify-ssl

# 2. Publish the function
FUNCTION_ARN=$(aws cloudfront describe-function --name append-index-html --query 'FunctionSummary.FunctionMetadata.FunctionARN' --output text --no-verify-ssl)

aws cloudfront publish-function \
  --name append-index-html \
  --if-match <ETAG-from-create> \
  --no-verify-ssl

# 3. Associate function with CloudFront distribution
# Get current config
aws cloudfront get-distribution-config --id E37FFIFV98XTLC --no-verify-ssl > cf-config.json

# Edit cf-config.json to add function association under DefaultCacheBehavior:
# "FunctionAssociations": {
#   "Quantity": 1,
#   "Items": [{
#     "FunctionARN": "<FUNCTION_ARN>",
#     "EventType": "viewer-request"
#   }]
# }

# Update distribution
aws cloudfront update-distribution \
  --id E37FFIFV98XTLC \
  --distribution-config file://cf-config.json \
  --if-match <ETAG> \
  --no-verify-ssl
```

### Solution 2: Use Full Paths

Always include `index.html` in your URLs:
- ✅ `https://d20hg2q9c0qj9d.cloudfront.net/openapi-apps/payo_ui_balance/index.html`
- ❌ `https://d20hg2q9c0qj9d.cloudfront.net/openapi-apps/payo_ui_balance/`

### Solution 3: Deploy to Root

Deploy your app to the root instead of a subdirectory:

```bash
# Deploy to root
aws s3 sync dist/payo_ui_balance s3://openapi-apps-sdk-website-1760553786/ --delete --no-verify-ssl

# Access at root
# https://d20hg2q9c0qj9d.cloudfront.net/
```

---

## �🔧 Management Commands

### Check CloudFront Distribution Status

```bash
aws cloudfront get-distribution --id E37FFIFV98XTLC --query 'Distribution.Status'
```

### List Files in S3 Bucket

```bash
aws s3 ls s3://openapi-apps-sdk-website-1760553786/ --recursive
```

### View CloudFront Distribution Config

```bash
aws cloudfront get-distribution-config --id E37FFIFV98XTLC
```

### Update Distribution (if needed)

```bash
# Get current config and ETag
aws cloudfront get-distribution-config --id E37FFIFV98XTLC > cf-config.json

# Edit cf-config.json as needed, then update
aws cloudfront update-distribution \
  --id E37FFIFV98XTLC \
  --distribution-config file://cf-config.json \
  --if-match <ETag-from-get-config>
```

---

## 🗑️ Cleanup / Deletion

If you need to delete the infrastructure:

```bash
# 1. Empty S3 bucket
aws s3 rm s3://openapi-apps-sdk-website-1760553786/ --recursive

# 2. Delete S3 bucket
aws s3api delete-bucket --bucket openapi-apps-sdk-website-1760553786

# 3. Disable CloudFront distribution first
aws cloudfront get-distribution-config --id E37FFIFV98XTLC > cf-config.json
# Edit cf-config.json: set "Enabled": false
aws cloudfront update-distribution --id E37FFIFV98XTLC --distribution-config file://cf-config.json --if-match <ETag>

# 4. Wait for distribution to be disabled (check status)
aws cloudfront get-distribution --id E37FFIFV98XTLC --query 'Distribution.Status'

# 5. Delete CloudFront distribution
aws cloudfront delete-distribution --id E37FFIFV98XTLC --if-match <ETag>

# 6. Delete OAC
aws cloudfront delete-origin-access-control --id E10CI9BC3SZT5A
```

---

## 📋 Architecture

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────────┐
│   CloudFront CDN    │
│  (Global Edge)      │
│  SSL/TLS Enabled    │
└──────┬──────────────┘
       │ OAC Auth
       ▼
┌─────────────────────┐
│   S3 Bucket         │
│  (Private Access)   │
│  Static Files       │
└─────────────────────┘
```

---

## 🔒 Security Features

- ✅ S3 bucket is **private** (no public access)
- ✅ CloudFront uses **Origin Access Control (OAC)** for secure S3 access
- ✅ HTTPS enforced via CloudFront
- ✅ HTTP automatically redirects to HTTPS
- ✅ Bucket policy only allows CloudFront distribution access

---

## 💡 Best Practices Implemented

1. **Security:** Private S3 bucket with OAC (modern replacement for OAI)
2. **Performance:** CloudFront CDN for global distribution
3. **SSL/TLS:** HTTPS enabled by default
4. **Caching:** CloudFront caching reduces S3 requests
5. **Cost Optimization:** S3 Standard storage class, CloudFront compression enabled

---

## 📝 Notes

- **SSL Note:** Commands use `--no-verify-ssl` flag due to local SSL verification issues
- **Bucket Naming:** Timestamp suffix ensures global uniqueness
- **Region:** Resources created in `us-east-1`
- **Custom Domain:** Not configured (Route53 not included per requirements)
- **Cost:** S3 + CloudFront standard pricing applies

---

## 🆘 Troubleshooting

### CloudFront returns 403 error
- Wait for distribution to fully deploy (10-15 minutes)
- Verify S3 bucket policy is correctly set
- Check that files exist in S3 bucket

### Files not updating
- Invalidate CloudFront cache after uploads
- CloudFront caches files for 24 hours by default

### S3 commands fail
- Verify AWS CLI credentials: `aws sts get-caller-identity`
- Check IAM permissions for S3 and CloudFront

---

**Project:** OpenAPI-APPS-SDK  
**Infrastructure:** AWS S3 + CloudFront  
**Created:** October 15, 2025


aws s3 sync dist/payo_ui_balance s3://openapi-apps-sdk-website-1760553786/openapi-apps/payo_ui_balance/ --delete --no-verify-ssl