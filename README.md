# PlayTracer
### developed by Pratik : ppchavan001@gmail.com

PlayTracer is a web-based telemetry visualization tool for exploring player behavior in LILA BLACK matches. It transforms raw gameplay telemetry stored in Parquet files into interactive minimap visualizations, allowing level designers to analyze player movement, combat activity, looting patterns, storm deaths, and map utilization.

## Features

- [ ] Direct Parquet file loading using DuckDB-WASM
- [ ] Interactive minimap visualization for all supported maps
- [ ] Human and bot player differentiation
- [ ] Match playback with timeline controls
- [ ] Kill, death, loot, and storm event visualization
- [ ] Traffic, kill, and death heatmaps
- [ ] Filtering by date, map, and match

## Tech Stack

| Technology  | Purpose                                |
| ----------- | -------------------------------------- |
| React       | User interface                         |
| TypeScript  | Type safety and maintainability        |
| Vite        | Development and build tooling          |
| DuckDB-WASM | Direct Parquet querying in the browser |
| PixiJS      | High-performance minimap rendering     |
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

Place the provided telemetry dataset inside the application's public data directory.

```text
public/
│── February_10/
│── February_11/
│── February_12/
│── February_13/
│── February_14/
└── minimaps/
    ├── AmbroseValley_Minimap.png
    ├── GrandRift_Minimap.png
    └── Lockdown_Minimap.jpg
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

```text
<DEPLOYMENT_URL>
```

## Assumptions

* All telemetry files are valid Apache Parquet files.
* Match timelines are reconstructed using the ts field.
* Human players are identified by UUID user IDs.
* Bots are identified by numeric user IDs.
* Minimap images are fixed at 1024x1024 resolution.

## Future Improvements

* Additional telemetry sources
* Multi-match comparison
* Real-time telemetry support
