class TemplateColumnCopier {

  constructor(buttonName, sourceListId, targetListId) {
    this.buttonName = buttonName;
    this.sourceListId = sourceListId;
    this.targetListId = targetListId;

    let button = $('<a class="board-header-btn sub-btn" href="#"><span class="icon-sm icon-sparkle board-header-btn-icon"></span><span class="board-header-btn-text">' + buttonName + '</span></a>');
    $(".board-header-btns.mod-right").prepend(button);
    let self = this;
    button.click(function(){
      self.copyColumn();
    });
  }

  authenticationFailure() {
    console.log('Failed authentication');
  }

  copyColumn() {
    let self = this;
    window.Trello.authorize({
      type: 'popup',
      name: 'Trello plugin application',
      scope: {
        read: 'true',
        write: 'true' },
      expiration: 'never',
      success: function(){ self.copyColumnAfterAuthentication(); },
      error: self.authenticationFailure
    });
  }

   copyColumnAfterAuthentication() {
     let self = this;
     window.Trello.get(`list/${self.sourceListId}/cards`, function(cardsToCopy){

         window.Trello.get(`list/${self.targetListId}/cards`, function(currentCards){
         cardsToCopy.forEach(function(card){

           currentCards.forEach(function(currentCard){
             if(currentCard.name.indexOf(card.name) > -1) {
               window.Trello.delete("cards/" + currentCard.id, function(response){
                 self.sleep(1);
                 ;});
             }
           });

         });

           self.addCard(cardsToCopy, 0);

         });
     })
   }

   sleep(seconds)
   {
     var e = new Date().getTime() + (seconds * 1000);
     while (new Date().getTime() <= e) {}
   }

   addCard(cardsToCopy, index)
   {
     if (index != cardsToCopy.length) {
        var payload = {
               "pos" : "bottom",
               "idList" : this.targetListId,
               "idCardSource" : cardsToCopy[index].id,
               "keepFromSource" : "all"
           }

           let self = this;

          window.Trello.post("cards", payload, function(response){
             self.addCard(cardsToCopy, index + 1);
          });
     }
   }

}

/*jQuery(".list-header-num-cards").show()

var sourceListId = "5ae0d2a367010d62a34326bb";
var targetListId = "5ae0d2d91e9b0e62e09b3074";
var apiKey = "c7370f03abb9ed0538a38b1de29242d6";

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

});*/
