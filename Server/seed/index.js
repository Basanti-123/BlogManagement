require("dotenv").config();

const mongoose = require("mongoose");
const data = require("./data");
const blogController = require("../modules/blogs/blog.controller");

mongoose.connect(process.env.DB).then(()=> {
   // console.log("DB Connected");
});

const user1= "65cd7fdfedbf48df3e8f06c4"; // admin
const user2 = "65d0e93a786871709346e7df" // user

const setup = {
    initialize: async () => {
        try{
            //console.log("Adding Random Blogs");
            for (let i = 0; i < 10; i++) {
                const rawData = data[i];
                rawData.author = user1;
                rawData.status = "published";
                rawData.words = rawData.content.split(" ").length;
               await  blogController.create(rawData)
            }
           for (let i = 10; i < 20; i++) {

            const rawData = data[i];
            rawData.author = user2;
            rawData.status = "published";
            rawData.words = rawData.content.split(" ").length;
            await  blogController.create(rawData)
           }
          // console.log("Successfully Added Random Blogs");
        } catch (e) {
            //console.log({e})
        }
    }
};

setup.initialize(); 