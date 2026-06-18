# Insights

## Overview

The goal of PlayTracer was to build a telemetry exploration tool rather than derive gameplay balance conclusions.

After exploring the dataset, I found that the available telemetry was insufficient to support strong design recommendations. Most matches contained very few participants, and there was no external reference available to validate whether the coordinate mapping accurately represented real gameplay locations.

The observations below focus on the dataset itself and its limitations.

---

# Insight 1 — Most Matches Have Very Low Player Counts

## What Caught My Eye

Many matches contained only one or two participants.

## Evidence

Match-level analysis showed that the majority of recorded matches had very low player counts compared to what would normally be expected from a battle royale style game.

This makes it difficult to identify meaningful player traffic patterns, contested areas, or combat hotspots.

## Actionable Outcome

No gameplay balancing recommendation can be confidently made from this data.

Before performing level design analysis, a larger sample of populated matches would be required.

### Metrics Affected

* Traffic heatmaps
* Combat density
* Landing distribution
* Area popularity
* Match pacing

## Why A Level Designer Should Care

Level design decisions should be based on representative player behavior.

When matches contain only a handful of players, observed movement patterns may reflect random behavior rather than actual player preferences.

---

# Insight 2 — Limited Dataset Prevents Reliable Behavioral Analysis

## What Caught My Eye

The dataset contains a relatively small number of events and participants spread across many matches.

## Evidence

The available telemetry covers:

* Approximately 89,000 events
* 339 unique participants
* 796 matches

Because the data is distributed across many matches, individual matches often contain very little activity.

This makes it difficult to establish statistically significant gameplay trends.

## Actionable Outcome

Additional telemetry covering larger and more active matches would be required before drawing conclusions about:

* Loot placement
* Combat flow
* Safe zone pressure
* Player routing
* Map balance

### Metrics Affected

* Retention analysis
* Engagement analysis
* Match flow analysis
* Area utilization analysis

## Why A Level Designer Should Care

Design changes based on insufficient data can lead to incorrect conclusions and unnecessary map modifications.

Reliable design insights require representative player populations and enough samples to identify recurring patterns.

---

# Insight 3 — Visualization Accuracy Cannot Be Fully Verified

## What Caught My Eye

Although the coordinate mapping produces visually consistent results, there is no reference data available to confirm that the rendered locations match the original game world.

## Evidence

The dataset provides:

* World coordinates
* Map identifiers
* Coordinate system documentation
* Event types

However, it does not provide:

* Ground truth screenshots
* Reference locations

As a result, coordinate transforms were derived from observed telemetry ranges.

## Actionable Outcome

No gameplay conclusions should be treated as definitive until the visualization can be validated against known in-game locations.

Future validation could include:

* Reference gameplay footage
* Known landmark coordinates

### Metrics Affected

* Heatmap accuracy
* Traffic analysis
* Area popularity analysis
* Combat hotspot identification

## Why A Level Designer Should Care

If the visualization is not spatially accurate, decisions based on heatmaps or player paths may target incorrect areas of the map.

Validating coordinate mapping should be completed before using the tool for production-level design decisions.

---

# Conclusion

PlayTracer successfully demonstrates telemetry ingestion, querying, filtering, playback, and minimap visualization.

However, the provided dataset is not large enough to support strong gameplay conclusions, and the coordinate mapping cannot be independently verified with the information available. Additional telemetry and map reference data would be required before making confident level design recommendations.
