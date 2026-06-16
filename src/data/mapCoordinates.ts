export function worldToMinimap(
    mapId: string,
    x: number,
    z: number
)
{
    const config = {
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
    }[mapId];

    const u =
        (x - config.originX) /
        config.scale;

    const v =
        (z - config.originZ) /
        config.scale;

    return {
        x: u * 1024,
        y: (1 - v) * 1024,
    };
}
