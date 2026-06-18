# PlayTracer

PlayTracer is a telemetry visualization tool for exploring player behavior in multiplayer matches.

The tool converts raw gameplay telemetry into interactive minimap visualizations, allowing designers and analysts to understand player movement, combat activity, looting patterns, area eliminations, and overall map utilization.

---

## Live Demo

**Hosted Application:** https://play-tracer.vercel.app/

---

## Features

### Match Exploration

* Interactive minimap visualization
* Match playback with timeline controls
* Human and bot player differentiation
* Match filtering by date and match ID
* Event visualization:

  * Player Position
  * Bot Position
  * Loot
  * Kill
  * Death
  * Area Death

### Dataset Analysis

* Dataset statistics overview
* Match metadata inspection
* Event counts and player counts
* Match duration calculation

---

## Dataset Overview

Dataset: **Player Event Data**

| Metric     | Value   |
| ---------- | ------- |
| Days       | 5       |
| Matches    | 796     |
| Players    | 339     |
| Event Rows | ~89,000 |
| Maps       | 3       |

Supported maps:

* AmbroseValley
* GrandRift
* Lockdown

---

## Technology Stack

| Technology | Purpose                          |
| ---------- | -------------------------------- |
| Next.js    | Application framework            |
| React      | User interface                   |
| TypeScript | Type safety                      |
| DuckDB     | Telemetry querying and analytics |
| Python     | Dataset preparation              |
| Vercel     | Hosting and deployment           |

---

## Project Structure

```text
PlayTracer/
├── public/
│   ├── telemetry.db
│   └── minimaps/
│
├── scripts/
│   ├── build-db.py
│   └── verify-db.py
│
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── data/
│   └── types/
│
├── README.md
├── ARCHITECTURE.md
└── INSIGHTS.md
```

### Important Directories

| Directory         | Purpose                                        |
| ----------------- | ---------------------------------------------- |
| `public/`         | Static assets and generated telemetry database |
| `scripts/`        | Dataset generation and validation utilities    |
| `src/data/`       | Database queries and data access layer         |
| `src/hooks/`      | State management and playback logic            |
| `src/components/` | Reusable UI components                         |
| `src/app/`        | Application pages and layout                   |
| `src/types/`      | Shared TypeScript types                        |

---

## Getting Started

### Prerequisites

* Node.js 20+
* Python 3.10+
* npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

---

## Environment Variables

No environment variables are currently required.

---

## Dataset Setup

### Install Python Dependencies

```bash
pip install pandas pyarrow duckdb
```

### Generate Database

Build a DuckDB database from the telemetry dataset:

```bash
python scripts/build-db.py
```

Output:

```text
public/telemetry.db
```

### Verify Database

```bash
python scripts/verify-db.py
```

---

## Expected Dataset Layout

```text
dataset/
├── February_10/
├── February_11/
├── February_12/
├── February_13/
├── February_14/
└── README.md
```

All telemetry files are Apache Parquet files.

Each file represents:

```text
1 Player/Bot
+
1 Match
```

Filename format:

```text
{user_id}_{match_id}.nakama-0
```

Examples:

```text
f4e072fa-b7af-4761-b567-1d95b7ad0108_b71aaad8-aa62-4b3a-8534-927d4de18f22.nakama-0
1440_d7e50fad-fb7a-4ed4-932f-e4ca9ff0c97b.nakama-0
```

Human players use UUID identifiers while bots use numeric identifiers.

---

## How to Use

1. Open the application.
2. Select a date from the dataset.
3. Select a match.
4. Explore player activity on the minimap.
5. Use playback controls to replay events over time.
6. Toggle event visibility to inspect specific gameplay behaviors.

---

## Documentation

Additional project documentation:

* **ARCHITECTURE.md** – System design, data flow, coordinate mapping approach, assumptions, and tradeoffs.
* **INSIGHTS.md** – Gameplay observations and findings discovered using PlayTracer.

---

## Future Improvements

* Kill heatmaps
* Death heatmaps
* Traffic heatmaps
* Player path visualization
* Multi-match comparison
* Event search
* Real-time telemetry support
* Additional telemetry sources

---

## Author

**Pratik Chavan**
<br> ppchavan001@gmail.com
<br> Software Engineer C++, Unreal Engine, Full-Stack Development
