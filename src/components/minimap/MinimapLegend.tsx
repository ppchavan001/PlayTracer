import
{
    EVENT_TYPES,
    getEventStyle,
} from "@/data/eventVisualization";

export function MinimapLegend()
{
    return (
        <div
            style={{
                position: "absolute",
                right: 16,
                bottom: 56,
                zIndex: 100,
                minWidth: 180,
                padding: 12,
                borderRadius: 12,
                background:
                    "rgba(21,25,34,0.95)",
                border:
                    "1px solid #2b3444",
                display: "flex",
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
                (eventType) =>
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
                                }}
                            />

                            <span
                                style={{
                                    fontSize: 12,
                                }}
                            >
                                {eventType}
                            </span>
                        </div>
                    );
                }
            )}
        </div>
    );
}
