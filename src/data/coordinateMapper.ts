const MAP_CONFIG = {
    AmbroseValley: {
        scale: 900,
        originX: -370,
        originZ: -473,
    },
    GrandRift: {
        scale: 581,
        originX: -290,
        originZ: -290,
    },
    Lockdown: {
        scale: 1000,
        originX: -500,
        originZ: -500,
    },
} as const;

export function worldToPixel(
    mapId: keyof typeof MAP_CONFIG,
    x: number,
    z: number
)
{
    const map = MAP_CONFIG[mapId];

    const u = (x - map.originX) / map.scale;
    const v = (z - map.originZ) / map.scale;

    return {
        x: u * 1024,
        y: (1 - v) * 1024,
    };
}
