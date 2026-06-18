# PlayTracer

PlayTracer is a telemetry visualization tool for exploring player behavior in multiplayer matches.

The application converts raw gameplay telemetry into interactive minimap visualizations, helping designers and analysts understand:

* Player movement patterns
* Looting behavior
* Combat hotspots
* Area eliminations
* Human vs Bot activity
* Map utilization

---

## Demo

Deployment: https://play-tracer.vercel.app/

---

# For End Users

## Getting Started

1. Select a date.
2. Select a match.
3. Explore player activity on the minimap.
4. Use playback controls to replay match events over time.

## Features

### Match Exploration

* Interactive minimap visualization
* Timeline playback controls
* Human and bot differentiation
* Event filtering

### Supported Events

* Player Position
* Bot Position
* Loot
* Kill
* Death
* Area Death

### Maps

* AmbroseValley
* GrandRift
* Lockdown

---

# Architecture

## Data Flow

```text
Telemetry Files
       │
       ▼
Database Build Script
       │
       ▼
telemetry.db
       │
       ▼
DuckDB Queries
       │
       ▼
React Hooks
       │
       ▼
UI Components
```

The application separates:

```text
Data Layer
    ↓
State Layer
    ↓
UI Layer
    ↓
Page Composition
```

This keeps database access, business logic, and presentation independent.

---

# Design Decisions

## Prebuilt Database

### Decision

Convert telemetry files into a single DuckDB database before running the application.

### Why

Querying hundreds of telemetry files directly would increase:

* Startup time
* Browser memory usage
* Query complexity

A prebuilt database provides a simpler runtime experience.

### Trade-offs

**Pros**

* Faster queries
* Simpler deployment
* Easier filtering and aggregation

**Cons**

* Database must be regenerated when new telemetry arrives

---

## In-Memory Playback

### Decision

Load all match events once and perform playback entirely in memory.

### Why

Typical match sizes are small enough to fit comfortably in memory.

Avoiding repeated database queries results in smoother playback.

### Trade-offs

**Pros**

* Responsive timeline controls
* Smooth playback
* Simple implementation

**Cons**

* Memory usage grows with match size

For the current dataset, the trade-off is acceptable.

---

# Project Structure

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
├── package.json
└── README.md
```

## Key Folders

| Folder          | Purpose                             |
| --------------- | ----------------------------------- |
| public/         | Database and static assets          |
| scripts/        | Dataset generation and validation   |
| src/data/       | Queries, loaders, and map utilities |
| src/hooks/      | State management and playback logic |
| src/components/ | Reusable UI components              |
| src/app/        | Application entry points            |
| src/types/      | Shared TypeScript types             |

---

# Local Development

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

---

# Dataset Generation

## Requirements

```bash
pip install pandas pyarrow duckdb
```

## Build Database

```bash
python scripts/build-db.py
```

Output:

```text
public/telemetry.db
```

## Verify Database

```bash
python scripts/verify-db.py
```

---

# Telemetry File Format

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
UUID      → Human Player
NumericID → Bot
```

A match with 10 humans and 40 bots produces 50 telemetry files.

---

# Technology Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| Next.js    | Application framework |
| React      | UI rendering          |
| TypeScript | Type safety           |
| DuckDB     | Analytics database    |
| Vercel     | Deployment            |

---

# Future Improvements

* Heatmap visualizations
* Player path rendering
* Multi-match comparison
* Event search
* Real-time telemetry support
* Additional telemetry sources

---

## Author

Pratik Chavan
<br> ppchavan001@gmail.com
<br> Software Engineer | C++ | Unreal Engine | Full Stack Development
