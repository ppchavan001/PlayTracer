import * as duckdb from "@duckdb/duckdb-wasm";

let db: duckdb.AsyncDuckDB | null = null;

export async function getDb()
{
    if (db)
    {
        return db;
    }

    // const bundles: duckdb.DuckDBBundles = {
    //     mvp: {
    //         mainModule:
    //             "/duckdb/duckdb-browser-mvp.wasm",
    //         mainWorker:
    //             "/duckdb/duckdb-browser-mvp.worker.js",
    //     },
    //     eh: {
    //         mainModule:
    //             "/duckdb/duckdb-browser-eh.wasm",
    //         mainWorker:
    //             "/duckdb/duckdb-browser-eh.worker.js",
    //     },
    // };

    // const bundle =
    //     await duckdb.selectBundle(bundles);

    // const worker = new Worker(
    //     bundle.mainWorker!
    // );

    const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();

    // Select a bundle based on browser checks
    const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);

    const worker_url = URL.createObjectURL(
        new Blob([`importScripts("${bundle.mainWorker!}");`], { type: 'text/javascript' })
    );

    // Instantiate the asynchronous version of DuckDB-wasm
    const worker = new Worker(worker_url);

    db = new duckdb.AsyncDuckDB(
        new duckdb.ConsoleLogger(),
        worker
    );

    await db.instantiate(
        bundle.mainModule
    );

    return db;
}
