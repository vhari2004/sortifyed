# Job Finder

A job discovery app with a React + Vite frontend and a Django REST backend.

## Project Structure

- `frontend/` - React UI, job dashboard, saved jobs, and authentication screens
- `sortifyed/` - Django API for jobs, accounts, and dashboard stats

## Frontend

The frontend lives in `frontend/`.

```bash
cd frontend
npm install
npm run dev
```

Useful scripts:

```bash
npm run build
npm run lint
npm run preview
```

## Backend

The backend lives in `sortifyed/`.

```bash
cd sortifyed
python manage.py runserver
```

The API is served from `http://127.0.0.1:8000/api`.

## Features

- Browse and filter jobs by keyword and source
- View dashboard stats
- Paginate job results 10 per page
- Save jobs for later review
- Register and sign in with JWT authentication

## Notes

- The frontend expects JWT tokens in local storage.
- The API client automatically retries requests after refreshing an expired access token.
- Local virtual environments such as `.venv/` and `venv/` are ignored in the frontend gitignore.

## Deployment

### Backend: Render

1. Push this repository to GitHub and create a Render **Blueprint** using `render.yaml`.
2. Render creates the Django web service and PostgreSQL database, then applies migrations during the build.
3. After deployment, copy the API service URL, for example `https://job-finder-api.onrender.com`.
4. Set `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` on the Render service to your Vercel URL, for example `https://job-finder.vercel.app`.

### Frontend: Vercel

1. Import the same repository in Vercel; `vercel.json` builds the `frontend` application and supports React client-side routes.
2. Add the environment variable `VITE_API_BASE_URL` with the Render API URL and `/api` suffix, for example `https://job-finder-api.onrender.com/api`.
3. Redeploy the Vercel project after adding the environment variable.

Use `frontend/.env.example` as the local environment-variable template. Keep `DJANGO_SECRET_KEY` private; Render generates it from the Blueprint configuration.
