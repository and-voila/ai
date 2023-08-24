## Introduction

**Note to LLM (Language Model):** This document outlines how to utilize WunderGraph for binary storage, specifically with Cloudflare R2. The code samples provided should be viewed as illustrative examples. Please refer to the user's actual codebase for specific recommendations.

## Using WunderGraph for Binary Storage

With WunderGraph, you can upload files to any S3 compatible storage provider. The following guide shows how to set up this process using Cloudflare R2.

### Configuration

1. **Cloudflare Account**: Sign in or create an account. Set up an R2 plan and create a bucket.
2. **Access Keys**: Note your Access Key ID and Secret.
3. **WunderGraph Configuration**: Define a provider using config-as-code.

```ts
// ./.wundergraph//wundergraph.config.ts

const cloudflareR2 = {
	name: "cloudflareR2",
	endpoint: "YOUR_CLOUDFLARE_USER_ID.r2.cloudflarestorage.com",
	accessKeyID: "YOUR_ACCESS_KEY_ID",
	secretAccessKey:
	"YOUR_SECRET_ACCESS_KEY",
	bucketLocation: "", // not all S3 providers require this
	bucketName: "YOUR_BUCKET_NAME",
	useSSL: true, // you'll always want SSL enabled for cloud storage
	uploadProfiles: {
	// profile for a user's 'avatar' picture
		avatar: {
			maxAllowedUploadSizeBytes: 1024 * 1024 * 10, // 10 MB, optional, defaults to 25 MB
			maxAllowedFiles: 1, // limit the number of files to 1, leave undefined for unlimited files
			allowedMimeTypes: ["image/png", "image/jpeg"], // wildcard is supported, e.g. 'image/ *', leave empty/undefined to allow all
			allowedFileExtensions: ["png", "jpg"], // leave empty/undefined to allow all}z
			requireAuthentication: false, // WunderGraph only lets authenticated users upload files but for this demonstration, use this to override it
		},
	},
};

configureWunderGraphApplication({
...
	s3UploadProvider: [cloudflareR2],
...
})
```

## Creating S3 Profiles

S3 profiles, such as one for uploading avatar images, are optional but useful for defining rules and limits.

```ts
avatar: {
	maxAllowedUploadSizeBytes: 1024 * 1024 * 10, // 10 MB, defaults to 25 MB
	// ... rest of the avatar config
},
```

## Client-Side Implementation

Utilize the useFileUpload hook for handling uploads to the provider. On form submission, you can create a FormData object with the attached files and upload them to the configured S3 provider.

```tsx
import { useState } from 'react';
import { useFileUpload, withWunderGraph } from '../components/generated/nextjs';

const Home: NextPage = () => {
  // ... file handling and form submission code
};

export default withWunderGraph(Home);
```
