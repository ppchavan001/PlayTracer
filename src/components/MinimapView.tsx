"use client";

import { useState } from "react";

import Image from "next/image";

import { MatchEvent }
    from "@/data/loadMatchEvents";

import { MINIMAPS }
    from "@/data/minimaps";

import { worldToMinimap }
    from "@/data/mapCoordinates";

import
    {
        EVENT_TYPES,
        getEventStyle,
    } from "@/data/eventVisualization";

interface Props
{
    selectedMap: string | null;

    visualizationMode: string;

    onVisualizationModeChange: (
        value: string
    ) => void;

    visibleEvents: MatchEvent[];
}

export default function MinimapView({
    selectedMap,
    visualizationMode,
    onVisualizationModeChange,
    visibleEvents,
}: Props)
{
    const [showLegend, setShowLegend] =
        useState(false);

    return (
        <div
            style={{
                flex: 1,
                borderRadius: 12,
                border: "1px solid #222",
                background: "#151922",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {!selectedMap && (
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0.6,
                    }}
                >
                    Select a match
                </div>
            )}

            {selectedMap && (
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: 16,
                            left: 16,
                            zIndex: 100,
                            padding: "6px 12px",
                            borderRadius: 999,
                            background:
                                "rgba(30,35,45,0.8)",
                            fontSize: 12,
                            fontWeight: 600,
                        }}
                    >
                        {selectedMap}
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            zIndex: 100,
                        }}
                    >
                        <select
                            value={visualizationMode}
                            onChange={(e) =>
                                onVisualizationModeChange(
                                    e.target.value
                                )
                            }
                            style={{
                                padding: "6px 12px",
                                borderRadius: 999,
                                border: "none",
                                background:
                                    "rgba(30,35,45,0.8)",
                                color: "#fff",
                                fontSize: 12,
                                fontWeight: 600,
                                appearance: "none",
                                paddingRight: 28,
                            }}
                        >
                            <option value="events">
                                Events
                            </option>

                            <option
                                value="heatmap"
                                disabled
                            >
                                Heatmap
                            </option>
                        </select>

                        <span
                            style={{
                                position: "absolute",
                                right: 10,
                                top: "50%",
                                transform:
                                    "translateY(-50%)",
                                pointerEvents: "none",
                                fontSize: 10,
                            }}
                        >
                            ▼
                        </span>
                    </div>

                    <button
                        onClick={() =>
                            setShowLegend(
                                !showLegend
                            )
                        }
                        style={{
                            position: "absolute",
                            left: 16,
                            bottom: 16,

                            zIndex: 100,

                            padding:
                                "6px 12px",

                            border: "none",

                            borderRadius:
                                999,

                            background:
                                "rgba(30,35,45,0.8)",

                            color: "#fff",

                            fontSize: 12,

                            fontWeight: 600,

                            cursor: "pointer",
                        }}
                    >
                        Legend
                    </button>

                    {showLegend && (
                        <div
                            style={{
                                position:
                                    "absolute",

                                left: 16,
                                bottom: 56,

                                zIndex: 100,

                                minWidth: 180,

                                padding: 12,

                                borderRadius:
                                    12,

                                background:
                                    "rgba(21,25,34,0.95)",

                                border:
                                    "1px solid #2b3444",

                                display:
                                    "flex",

                                flexDirection:
                                    "column",

                                gap: 8,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    opacity: 0.8,
                                }}
                            >
                                Map Legend
                            </div>

                            {EVENT_TYPES.map(
                                (
                                    eventType
                                ) =>
                                {
                                    const style =
                                        getEventStyle(
                                            eventType
                                        );

                                    return (
                                        <div
                                            key={
                                                eventType
                                            }
                                            style={{
                                                display:
                                                    "flex",

                                                alignItems:
                                                    "center",

                                                gap: 8,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width:
                                                        style.width,

                                                    height:
                                                        style.height,

                                                    borderRadius:
                                                        "50%",

                                                    background:
                                                        style.color,

                                                    flexShrink:
                                                        0,
                                                }}
                                            />

                                            <span
                                                style={{
                                                    fontSize: 12,
                                                }}
                                            >
                                                {
                                                    eventType
                                                }
                                            </span>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    )}

                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                width: "90%",
                                aspectRatio: "1",
                                maxHeight: "90%",
                            }}
                        >
                            <Image
                                src={
                                    MINIMAPS[selectedMap]
                                }
                                alt={selectedMap}
                                fill
                                priority
                                style={{
                                    objectFit:
                                        "contain",
                                }}
                            />

                            {visibleEvents.map(
                                (
                                    event
                                ) =>
                                {
                                    const point =
                                        worldToMinimap(
                                            selectedMap,
                                            event.x,
                                            event.z
                                        );

                                    const style =
                                        getEventStyle(
                                            event.event
                                        );

                                    return (
                                        <div
                                            key={`${event.userId}-${event.ts}-${event.event}`}
                                            style={{
                                                position:
                                                    "absolute",

                                                left: `${(point.x /
                                                    1024) *
                                                    100}%`,

                                                top: `${(point.y /
                                                    1024) *
                                                    100}%`,

                                                width:
                                                    style.width,

                                                height:
                                                    style.height,

                                                borderRadius:
                                                    "50%",

                                                background:
                                                    style.color,

                                                border:
                                                    "1px solid rgba(255,255,255,0.5)",

                                                transform:
                                                    "translate(-50%, -50%)",

                                                zIndex:
                                                    style.zIndex,
                                            }}
                                        />
                                    );
                                }
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
