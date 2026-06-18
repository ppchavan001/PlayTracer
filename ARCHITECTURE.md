# Architecture

## Technology Choices

| Technology    | Why It Was Chosen                                    |
| ----------    | ---------------------------------------------------- |
| Python        | Efficient dataset processing and database generation |
| DuckDB-WASM   | Fast analytical queries over telemetry data          |
| Next.js       | Simple deployment, routing, and React integration    |
| React         | Interactive UI and playback controls                 |
| TypeScript    | Strong typing and maintainability                    |
| Vercel        | Quick deployment and hosting                         |

---

## System Overview

PlayTracer transforms raw telemetry files into an interactive minimap visualization.

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
Data Layer
      │
      ▼
React Hooks
      │
      ▼
UI Components
      │
      ▼
Minimap Visualization
```

---

## Data Flow

### 1. Telemetry Processing

Telemetry files are provided as individual parquet files where each file represents a single player (or bot) participating in a match.

A preprocessing script:

* Discovers all telemetry files
* Extracts relevant columns
* Merges data into a single DuckDB database
* Stores the result as:

```text
public/telemetry.db
```

### 2. Query Layer

The application queries DuckDB to retrieve:

* Available dates
* Available matches
* Match metadata
* Match events
* Dataset statistics

### 3. Playback Layer

When a match is selected:

1. All events for that match are loaded.
2. Events are stored in memory.
3. Timeline playback filters events by timestamp.
4. Visible events are rendered on the minimap.

This avoids repeated database queries during playback and provides smooth interaction.

---

## Coordinate Mapping

Telemetry events contain world-space coordinates:

```text
x, z
```

The minimap uses image-space coordinates:

```text
pixelX, pixelY
```

To place events correctly, coordinates are normalized using map-specific bounds.

### Step 1 — Normalize World Coordinates

```text
normalizedX =
(worldX - minX) / (maxX - minX)

normalizedY =
(worldZ - minZ) / (maxZ - minZ)
```

This converts world coordinates into values between:

```text
0 → 1
```

### Step 2 — Convert To Image Space

```text
pixelX = normalizedX * imageWidth

pixelY =
imageHeight -
(normalizedY * imageHeight)
```

The Y axis is inverted because:

* Game coordinates originate at the bottom-left.
* Browser image coordinates originate at the top-left.

### Step 3 — Render Overlay

The minimap image and event markers are rendered inside the same square container.

Markers use percentage-based positioning:

```text
left = normalizedX * 100%
top  = (1 - normalizedY) * 100%
```

This keeps markers aligned regardless of screen size or image scaling.

---

## Assumptions

| Ambiguity                   | Assumption                                                          |
| --------------------------- | ------------------------------------------------------------------- |
| Human vs Bot identification | UUID user IDs represent humans, numeric IDs represent bots          |
| Match timestamps            | Timestamps represent elapsed match time rather than wall-clock time |
| World bounds                | Bounds are derived from observed telemetry values for each map      |
| Coordinate mapping          | Linear scaling is sufficient for minimap alignment                  |
| Area Death events           | Represent player eliminations caused by the playable area shrinking |

---

## Major Tradeoffs

| Considered                   | Chosen                                 | Reason                                           |
| ---------------------------- | -------------------------------------- | ------------------------------------------------ |
| Query parquet files directly | Prebuilt DuckDB database               | Faster startup and simpler runtime queries       |
| Server-side playback         | Client-side playback                   | Lower latency and smoother interaction           |
| Query during playback        | Load match once into memory            | Eliminates repeated database access              |
| Dynamic coordinate fitting   | Fixed map transforms                   | Predictable rendering and simpler implementation |
| Large component hierarchy    | Layered data → hooks → UI architecture | Easier maintenance and extension                 |

---

## Architecture Summary

The application follows a simple layered design:

```text
Data Layer
    ↓
State Layer
    ↓
UI Layer
    ↓
Page Composition
```

This separation keeps database access, application state, and rendering concerns independent, making the project easier to maintain and extend.
