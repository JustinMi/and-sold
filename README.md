### Overview

## What is it?

- lightweight auction room generator for peer-to-peer transations 
- users selling stuff on Craigslist, FB markets, or other sites without buyer power can instantiate an auction room for a specific item, which carries a unique link on the site
    - they post the link with whatever they are trying to sell
    - interested buyers click on the link, and provide a source of contact (SMS, email) for updates
        - they make bids on the item
        - buyers and sellers get updated on price changes
    - seller can raise or lower the price of the item

## Auction Room

- each auction room is for the auction of a single item
- pictures and/or link to the original posting
- location of seller
- bidders and sellers can leave comments
- seller is able to easily create multiple auction rooms at once

- ID
- multiple pictures
- list price
- bids

## Accounts

- managed using OAUTH, though regular account creation should be an option
    - somehow take advantage of Facebook?
        - get updates using bots?
- users able to manage auction rooms, manage bids
- update subscription preferences
- private messages--potentially this can be the way to connect seller and buyer

## Main page

- description
- main: a button to create an auction room 
- a stream of recent sellings
    - "user 14143 just sold a lamp for $13"

## Post-auction (TODO):

- somehow connect the seller and the buyer after the auction is over

# TODO:

1. Create users and set up database
    - authentication: ensuring users are really who they claim to be
    - authorization: getting permission from users to use their data (do we need this?)
    a. save in database
2. Create unique room IDs

