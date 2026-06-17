import { useMemo } from "react";

import { MatchEvent }
    from "@/data/loadMatchEvents";

import { worldToMinimap }
    from "@/data/mapCoordinates";

import { getEventStyle }
    from "@/data/eventVisualization";

interface Props
{
    map: string;
    events: MatchEvent[];
}

export function EventMarkers({
    map,
    events,
}: Props)
{
    const markers = useMemo(
        () =>
            events.map((event) =>
            {
                const point =
                    worldToMinimap(
                        map,
                        event.x,
                        event.z
                    );

                return {
                    event,
                    point,
                    style:
                        getEventStyle(
                            event.event
                        ),
                };
            }),
        [map, events]
    );

    return (
        <>
            {markers.map(
                ({
                    event,
                    point,
                    style,
                }) => (
                    <div
                        key={`${event.userId}-${event.ts}-${event.event}-${event.x}-${event.z}`}
                        style={{
                            position:
                                "absolute",
                            left: `${(point.x / 1024) * 100}%`,
                            top: `${(point.y / 1024) * 100}%`,
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
                )
            )}
        </>
    );
}
