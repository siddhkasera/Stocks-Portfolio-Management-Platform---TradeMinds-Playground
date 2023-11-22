const express = require("express")
const router = new express.Router()
const UserWatchList = require("../middleware/user_watchlist")

router.get("/user_watchlist/:uid", async (req,res)=>{
    try{
        const uid = req.params["uid"];
        const WatchLists = await UserWatchList.getUserWatchlist(uid);
        if(WatchLists)
        res.send(WatchLists)
        else
        res.status(404).send("Watchlists not found")
    }catch(e){
        res.status(400).send(e.message);
    }
})


router.delete("/rem_watchlist/:uid",async (req,res)=>{
    try{
        const uid = req["params"];
        const watchlist = {...req.body}
        const userDeleted = await UserWatchList.deleteWatchlist(watchlist.id, uid)
        res.send({userDeleted})
    }catch(e){
        res.status(400).send(e.message)
    }
})


router.post("/add_watchlist/:uid",async(req,res)=>{
    try{
        const uid = req.params["uid"];

        const watchlist = {...req.body}

        const insertData = {
            user_id: uid,
            long_name: watchlist.long_name,
            price: watchlist.close,
        }
        const exist = await UserWatchList.checkUserWatchlist(uid,watchlist.long_name);
        if(!exist){
        const created = await UserWatchList.Create(insertData)
        if(created)
        res.send({created})
        else
        res.status(400).send("Watchlist Not Created")
    }

    }catch(e){
        res.status(400).send(`Error adding watchlist ${e.message}`)
    }
})

module.exports = router