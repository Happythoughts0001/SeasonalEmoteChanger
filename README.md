# Twitch-VOD-music-sync

Uses Puppeteer to scrape some of the websites then clicks buttons to make it all work.

This script will be useful if you moderate multiple channels with similar emotes

### Data sets

We use CSV files for the emotes that you want to get replaced/removed.

Current means seasonal/normal version that should be changed into normal/seasonal

Replace is which emote that should replace the Current version

### Usage

`node index.js <launch flag>`

To run different scripts for different sites use the launch flags

```
-7TV
-BTTV
-FFZ
```

It only handles the first launch flag you write so `node index.js -7TV -BTTV` will currently not work
