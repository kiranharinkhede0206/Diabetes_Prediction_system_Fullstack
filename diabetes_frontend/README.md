# Diabetes Risk Assessment — Frontend

A React + TypeScript + Tailwind frontend for a diabetes prediction system,
built as a cinematic editorial product website around a real Random Forest
classification model served by a FastAPI backend.

This package is **frontend only**. It calls out to `POST {VITE_API_URL}/predict`
and expects your backend to run the actual model — there is no prediction
logic, mock data, or fake probabilities anywhere in this code.

## Setup

```bash
npm install
cp .env.example .env
# edit .env and point VITE_API_URL at your FastAPI backend
npm run dev
```

## Backend contract

**Request** — `POST {VITE_API_URL}/predict`

```json
{
  "Pregnancies": 2,
  "Glucose": 140,
  "BloodPressure": 72,
  "SkinThickness": 30,
  "Insulin": 125,
  "BMI": 32.3,
  "DiabetesPedigreeFunction": 0.5,
  "Age": 35
}
```

**Response**

```json
{
  "prediction": "Diabetes Predicted",
  "probability": 0.6372
}
```

`probability` is a 0–1 float; the UI converts it to a percentage (e.g. `0.6372` → `63.72%`).

## Structure

```
src/
  components/     UI sections (Hero, Assessment, PredictionResult, ...)
  services/       predictionApi.ts — the only place that calls fetch()
  types/          shared TypeScript interfaces for the API contract
  utils/          validation.ts (pure functions) and fieldConfig.ts
  hooks/          useCountUp.ts — animates the probability ring
```

## Replacing the hero image

`public/images/hero-placeholder.svg` is a generated placeholder standing in
for real photography (a person checking a glucose reading, natural light,
muted tones — see the design brief). Replace it with a licensed photo and
update the `src` in `src/components/Hero.tsx`.

## Design tokens

Colors, type families, and spacing live in `tailwind.config.ts` under
`theme.extend`. The palette is a warm near-black (`ink`), warm off-white
(`paper`), and a muted teal (`clinical`) — no bright blues, no glassmorphism,
no rounded card grids.
