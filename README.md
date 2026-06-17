# PlayTracer
### developed by Pratik : ppchavan001@gmail.com

PlayTracer is a web-based telemetry visualization tool for exploring player behavior in LILA BLACK matches. It transforms raw gameplay telemetry stored in Parquet files into interactive minimap visualizations, allowing level designers to analyze player movement, combat activity, looting patterns, storm deaths, and map utilization.

## Features

- [x] Direct Parquet file loading using DuckDB-WASM
- [x] Interactive minimap visualization for all supported maps
- [x] Human and bot player differentiation
- [x] Match playback with timeline controls
- [x] Kill, death, loot, and storm event visualization
- [x] Filtering by date, map, and match
- [ ] Traffic, kill, and death heatmaps

## Tech Stack

| Technology  | Purpose                                |
| ----------- | -------------------------------------- |
| React       | User interface                         |
| Next.js     | Development and build tooling          |
| TypeScript  | Type safety and maintainability        |
| DuckDB-WASM | Direct Parquet querying in the browser |
| Vercel      | Deployment and hosting                 |

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Run Production Build

```bash
npm run preview
```

## Dataset Setup

- Requires python with packages installed: pandas, pyarrow, duckdb
    ```
    pip install pandas pyarrow duckdb
    ```
- Run the script to generate the telemetry database. Stored in public/telemetry.db
    ```
    python scripts/build-db.py
    ```
- Verify generated dataset using
    ```
    python scripts/verify_db.py
    ```



## Usage

- Select a date.
- Select a match.
- Choose a visualization mode:
   * Match Playback
   * Traffic Heatmap
   * Kill Heatmap
   * Death Heatmap
- Explore player activity on the minimap.

## Deployment

The application is deployed on Vercel.

Deployment URL:

[https://play-tracer.vercel.app/](https://play-tracer.vercel.app/)

## Assumptions

* All telemetry files are valid Apache Parquet files.
* Human players are identified by UUID user IDs.
* Bots are identified by numeric user IDs.
* Minimap images are fixed at 1024x1024 resolution.

## Future Improvements

* Additional telemetry sources
* Multi-match comparison
* Real-time telemetry support
* Path visualization
* Match comparison
* Player filtering
* Event search
* Performance optimizations for large datasets
