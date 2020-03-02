jQuery(".list-header-num-cards").show()

var sourceListId = "<<INSERT_ID_HERE>>";
var targetListId = "<<INSERT_ID_HERE>>";
var apiKey = "<<INSERT_ID_HERE>>";

function sleep(seconds)
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}

function addCard(cardsToCopy, index)
{
  if (index != cardsToCopy.length) {
     var payload = {
            "pos" : "bottom",
            "idList" : targetListId,
            "idCardSource" : cardsToCopy[index].id,
            "keepFromSource" : "all"
        }

        window.Trello.post("cards", payload, function(response){
          console.log(response);
          addCard(cardsToCopy, index + 1);
          });
  }
}

jQuery.getScript(`https://api.trello.com/1/client.js?key=${apiKey}`, function() {

var authenticationSuccess = function() {
    window.Trello.get(`list/${sourceListId}/cards`, function(cardsToCopy){

        window.Trello.get(`list/${targetListId}/cards`, function(currentCards){

        console.log(currentCards);
        cardsToCopy.forEach(function(card){

          currentCards.forEach(function(currentCard){
            if(currentCard.name.indexOf(card.name) > -1) {
              window.Trello.delete("cards/" + currentCard.id, function(response){
                console.log(response);
                sleep(1);
                ;});
            }
          });

        });

          addCard(cardsToCopy, 0);

        });
    })
};

var authenticationFailure = function() {
  console.log('Failed authentication');
};

window.Trello.authorize({
  type: 'popup',
  name: 'Getting Started Application',
  scope: {
    read: 'true',
    write: 'true' },
  expiration: 'never',
  success: authenticationSuccess,
  error: authenticationFailure
});

});
