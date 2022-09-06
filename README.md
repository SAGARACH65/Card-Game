# Card-Game

Front end
- React
- End to end testing using Cypress
- Tailwind
- Apollo client

Backend
- Express
- Apollo server
- Postgres database
- Unit tests using Jest


#Desktop Design

https://user-images.githubusercontent.com/24357040/188599154-841c26db-b17c-4354-b23e-995614b68e04.mp4

#Mobile Design

https://user-images.githubusercontent.com/24357040/188599283-58643507-dac9-4116-b49d-2d26790c75df.mp4


# Rules of the game

1. Assuming a standard deck (52 cards of 4 suits: ♣ Clubs, ♦ Diamonds, ♥ Hearts, ♠ Spades).
2. Press a "Deal" button to deal 5 random cards.
3. Pressing the button again should deal 5 unique, random cards. Within the same game, you should never get the same cards again that you got in the past (just like a physical deck).
4. Add a card counter which shows how many cards are left.
5. Add an ace counter which shows how many aces are left. (this is not present in the designs at the time of this writing, you can do it the way it makes most sense to you, consistent with the designs)
6. Add a button to reset the game.
7. When all the aces have been dealt, "Game Over" should be displayed.
8. If there is an ace in the last draw and there are no more cards left to deal, display "Winner", otherwise display "You Lose. Better luck next time!" Last draw means the last draw that is allowed, as there could be additional cards left to deal, but no aces.
