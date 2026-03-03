# Cloudflare R2 Image Upload Demo

This project is a simple full-stack app where a user selects an image in the frontend, gets a presigned URL from the backend, uploads directly to Cloudflare R2, and sees an instant preview.

## What Is Used In This Project

### Frontend

- React 19 + TypeScript
- Vite (development + build)
- Tailwind CSS v4
- shadcn/ui components + Lucide icons
- ESLint + TypeScript ESLint

### Backend

- Bun runtime
- Express 5 API server
- AWS SDK v3 (`S3Client`, `PutObjectCommand`) for Cloudflare R2
- `@aws-sdk/s3-request-presigner` for presigned upload URLs
- CORS + JSON body parsing

### Cloud Storage

- Cloudflare R2 bucket
- Direct browser upload using `PUT` to a short-lived signed URL

## Project Flow (Simple)

1. User picks an image in frontend.
2. Frontend sends `fileName` + `fileType` to `POST /presign`.
3. Backend validates input and creates an R2 upload key.
4. Backend returns `signedUrl` (and `publicUrl`).
5. Frontend uploads the file directly to `signedUrl`.
6. Frontend shows local preview using `URL.createObjectURL(file)`.

## What I Learned In This Project

- How presigned URL uploads work (server signs, client uploads directly).
- How to connect Cloudflare R2 using the S3-compatible AWS SDK.
- Why backend should validate input (`fileName`, `fileType`, image-only check).
- How to keep secrets in env variables and never expose keys in frontend.
- How to build a clean React upload flow with loading + success/error messages.
- How TypeScript helps catch frontend and API response mistakes early.
- How path aliases (`@/...`) and project config affect build stability.

## Environment Variables (Backend)

Set these in `backend/.env`:

- `R2_ACCESS_KEY_ID`
- `R2_ACCESS_SECRET_KEY`
- `R2_ENDPOINT`
- `R2_BUCKET`
- `R2_PUBLIC_URL`

## Run Locally

### 1. Start backend

```bash
cd backend
bun run dev
```

### 2. Start frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend expects backend at `http://localhost:3000`.

## API

### `POST /presign`

Request body:

```json
{
  "fileName": "photo.jpg",
  "fileType": "image/jpeg"
}
```

Success response (example):

```json
{
  "signedUrl": "https://...",
  "key": "uploads/...",
  "publicUrl": "https://..."
}
```
