interface Props
{
    map: string;

    visualizationMode: string;

    onVisualizationModeChange: (
        value: string
    ) => void;
}

export function MinimapToolbar({
    map,
    visualizationMode,
    onVisualizationModeChange,
}: Props)
{
    return (
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
                {map}
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
                    value={
                        visualizationMode
                    }
                    onChange={(e) =>
                        onVisualizationModeChange(
                            e.target.value
                        )
                    }
                    style={{
                        padding:
                            "6px 12px",
                        borderRadius:
                            999,
                        border: "none",
                        background:
                            "rgba(30,35,45,0.8)",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 600,
                        appearance:
                            "none",
                        paddingRight:
                            28,
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
                        position:
                            "absolute",
                        right: 10,
                        top: "50%",
                        transform:
                            "translateY(-50%)",
                        pointerEvents:
                            "none",
                        fontSize: 10,
                    }}
                >
                    ▼
                </span>
            </div>
        </>
    );
}
