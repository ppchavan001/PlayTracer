"use client";

import { useEffect, useState } from "react";

import { DatasetInfo } from "@/types/dataset";
import { Filters } from "@/types/filters";

import { loadDatasetInfo } from "@/data/loadDatasetInfo";
import
{
    loadDates,
    loadMatches,
} from "@/data/loadFilters";

export function useDataset()
{
    const [info, setInfo] =
        useState<DatasetInfo | null>(null);

    const [dates, setDates] =
        useState<string[]>([]);

    const [matches, setMatches] =
        useState<string[]>([]);

    const [filters, setFilters] =
        useState<Filters>({
            startDate: "",
            endDate: "",
            matchId: "",
        });

    useEffect(() =>
    {
        async function initialize()
        {
            const [
                datasetInfo,
                availableDates,
            ] = await Promise.all([
                loadDatasetInfo(),
                loadDates(),
            ]);

            setInfo(datasetInfo);
            setDates(availableDates);

            if (availableDates.length)
            {
                setFilters({
                    startDate:
                        availableDates[0],
                    endDate:
                        availableDates[
                        availableDates.length -
                        1
                        ],
                    matchId: "",
                });
            }
        }

        initialize().catch(
            console.error
        );
    }, []);

    useEffect(() =>
    {
        async function loadData()
        {
            if (
                !filters.startDate ||
                !filters.endDate
            )
            {
                return;
            }

            const result =
                await loadMatches(
                    filters.startDate,
                    filters.endDate
                );

            setMatches(result);
        }

        loadData().catch(
            console.error
        );
    }, [
        filters.startDate,
        filters.endDate,
    ]);

    return {
        info,
        dates,
        matches,
        filters,
        setFilters,
    };
}
