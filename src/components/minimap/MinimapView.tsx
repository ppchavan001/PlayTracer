"use client";

import { useState } from "react";
import Image from "next/image";

import { MatchEvent } from "@/data/loadMatchEvents";
import { MINIMAPS } from "@/data/minimaps";

import { MinimapLegend } from "./MinimapLegend";
import { MinimapToolbar } from "./MinimapToolbar";
import { EventMarkers } from "./EventMarkers";
import { containerStyle } from "./styles";

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

    if (!selectedMap)
    {
        return (
            <div style={containerStyle}>
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
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <MinimapToolbar
                map={selectedMap}
                visualizationMode={
                    visualizationMode
                }
                onVisualizationModeChange={
                    onVisualizationModeChange
                }
            />

            <button
                onClick={() =>
                    setShowLegend(
                        (v) => !v
                    )
                }
                style={{
                    position: "absolute",
                    right: 16,
                    bottom: 16,
                    zIndex: 100,
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: 999,
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
                <MinimapLegend />
            )}

            <div
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    aspectRatio: "1",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "1",
                        maxHeight: "100%",
                    }}
                >
                    <Image
                        src={
                            MINIMAPS[
                            selectedMap
                            ]
                        }
                        alt={selectedMap}
                        fill
                        priority
                        style={{
                            objectFit:
                                "contain",
                        }}
                    />

                    <EventMarkers
                        map={selectedMap}
                        events={
                            visibleEvents
                        }
                    />
                </div>
            </div>
        </div>
    );
}
