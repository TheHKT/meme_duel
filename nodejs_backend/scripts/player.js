module.exports = {
    getMatch: async (playerID, sql) =>{
        const ps = new sql.PreparedStatement()
        ps.input("playerID", sql.Int)
        ps.prepare("SELECT * FROM Match WHERE playerID=@playerID", err => {
            ps.execute({ playerID: playerID}, (err, result) => {
                ps.unprepare(err => {
                        return new Promise((resolve, reject) => {
                            if(err){
                                reject({});
                            }else{
                                resolve(result);
                            }
                        })
                    })
                })
            })
    }
}
