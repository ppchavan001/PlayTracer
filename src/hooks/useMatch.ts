"use client";

import { useEffect, useState } from "react";

import { MatchInfo } from "@/types/matchInfo";

import { loadMatchMap }
    from "@/data/loadMatchMap";

import { loadMatchInfo }
    from "@/data/loadMatchInfo";

export function useMatch(
    matchId: string
)
{
    const [selectedMap,
        setSelectedMap] =
        useState<string | null>(null);

    const [matchInfo,
        setMatchInfo] =
        useState<MatchInfo | null>(
            null
        );

    useEffect(() =>
    {
        if (!matchId)
        {
            setSelectedMap(null);
            return;
        }

        loadMatchMap(matchId)
            .then(setSelectedMap)
            .catch(console.error);
    }, [matchId]);

    useEffect(() =>
    {
        if (!matchId)
        {
            setMatchInfo(null);
            return;
        }

        loadMatchInfo(matchId)
            .then(setMatchInfo)
            .catch(console.error);
    }, [matchId]);

    return {
        selectedMap,
        matchInfo,
    };
}
