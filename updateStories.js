const fetch = require("node-fetch");

const dayInMilliseconds = 1000 * 60 * 60 * 24;
let searchDate = new Date().getTime() - 2600000 * 1000;
let stories = [];

const getStory = (req, res) => {
    if (stories.length > 0) {
        res.status(200).send(
            `https://mspfa.com/?s=${
                stories[Math.floor(Math.random() * (stories.length - 1))].i
            }&p=1`
        );
    } else {
        res.status(500).send("https://mspfa.com/?s=1&p=1");
    }
};

const updateStories = async () => {
    searchDate += dayInMilliseconds;
    stories = [];
    let offset = 0;
    let passes = 0;

    while (
        (stories.length == 0 || stories[stories.length - 1].u > searchDate) &&
        passes < 10
    ) {
        passes++;

        await fetch("https://mspfa.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            },
            body: `do=stories&n=&t=&h=4&o=updated&p=p&m=500&f=${offset}`,
        })
            .then((e) => e.json())
            .then((data) => {
                offset += 500;
                stories = stories.concat(data);
            });
    }
};

module.exports = { updateStories, dayInMilliseconds, getStory };
