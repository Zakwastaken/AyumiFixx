module.exports = {
    token: process.env.TOKEN || "Nzg4NjEwMDQyMTkzNzcyNjI1.X9mAVQ.msROq5ABXKFebZfCV0bSwGaT7Uw",  // your bot token
    prefix: process.env.PREFIX || "y.", // bot prefix
    ownerID: process.env.OWNERID || "760723665372971008", //your discord id
    SpotifyID: process.env.SPOTIFYID || "ad302a75ba9841c7b6dcd1386698ea8d", // spotify client id
    SpotifySecret: process.env.SPOTIFYSECRET || "6dd937898e7a4af09a0bc2268493a6a8", // spotify client secret
    mongourl: process.env.MONGO_URI || "mongodb+srv://youtube:youtube123@cluster0.hmgwx.mongodb.net/Data", // MongoDb URL
    embedColor: process.env.COlOR || "#34eb95", // embed colour
    logs: process.env.LOGS || "932792709805142036", // channel id for guild create and delete logs 

    nodes: {

      host: "disbotlistlavalink.ml",
      id: "local",
      port: 443,
      password: "LAVA",
      secure: true
    
    },
}
