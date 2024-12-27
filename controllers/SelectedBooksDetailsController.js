import pkg from "duckdb";
const {Database} = pkg;
const db =  new Database(":memory:");

export async function getBooksDetails(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection = db.connect();
            connection.run(
                "CREATE TABLE IF NOT EXISTS Books_Details AS SELECT * FROM read_parquet('ParquetFiles/Books_Data.parquet')",
                (err) => {
                   if(err){
                    console.log("Error in reading parquet", err);
                    return reject (err);
                   }
                   connection.all(
                    `SELECT CAST(bd."Index" AS TEXT) AS index, CAST(bd."Author" AS TEXT) AS author, CAST(bd."Book Name" AS TEXT) AS bookName, CAST(bd."Rating" AS TEXT) AS rating, CAST(bd."Number of Votes" AS TEXT) AS votes, CAST(bd."Score" AS TEXT) AS score,CAST(bd."Image" AS TEXT) AS image from  Books_Details bd
                   
                    LIMIT 12`,
                    (err, rows) => {
                        connection.close();
                        if(err){
                            console.log("Error in selecting columns Books_Details", err);
                            return reject(err);
                        }
                        resolve(rows);
                    }
                   )
                }
            )
        });
        res.json(rows)
    } catch (error) {
        console.log('error in controller file');
    }
}