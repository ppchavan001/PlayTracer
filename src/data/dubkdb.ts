import * as duckdb from "@duckdb/duckdb-wasm";

let db: duckdb.AsyncDuckDB | null = null;

export async function getDb()
{
    if (db)
    {
        return db;
    }

    const bundles = duckdb.getJsDelivrBundles();
    const bundle = await duckdb.selectBundle(bundles);

    const worker = new Worker(bundle.mainWorker!);

    db = new duckdb.AsyncDuckDB(
        new duckdb.ConsoleLogger(),
        worker
    );

    await db.instantiate(
        bundle.mainModule,
        bundle.pthreadWorker
    );

    return db;
}   
