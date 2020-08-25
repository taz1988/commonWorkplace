
window.addEventListener ("load", myMain, false);

function addHeaderRightButton(text) {
  let button = $('<a class="board-header-btn sub-btn" href="#"><span class="board-header-btn-text">' + text + '</span></a>');
  $(".board-header-btns.mod-right").prepend(button);
  button.click(function(){
    let templateColumnCopier = new TemplateColumnCopier("5b6ed502439fe915f32c8b9e", "5b84f191f3e43113c25e7958", "c7370f03abb9ed0538a38b1de29242d6");
    templateColumnCopier.copyColumn();
  });
}

function myMain (evt) {
  console.log("Trello plugin is loaded!");
  jQuery(".list-header-num-cards").show();
  //let opts={"version":1,"apiEndpoint":"https://api.trello.com","authEndpoint":"https://trello.com","intentEndpoint":"https://trello.com","key":"c7370f03abb9ed0538a38b1de29242d6"};
  chrome.storage.sync.get({
    trelloApiKey: ''
  }, function(items) {
      let opts={"version":1,"apiEndpoint":"https://api.trello.com","authEndpoint":"https://trello.com","intentEndpoint":"https://trello.com","key":items.trelloApiKey};
      initTrelloApi(opts);
      let weeklyTemplateColumnCopier = new TemplateColumnCopier("Heti másolása", "5ae0d2a367010d62a34326bb", "5ae0d2d91e9b0e62e09b3074");
      let dailyTemplateColumnCopier = new TemplateColumnCopier("Napi másolása", "5b6ed502439fe915f32c8b9e", "5b84f191f3e43113c25e7958");
    });
}
