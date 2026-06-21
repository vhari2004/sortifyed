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
