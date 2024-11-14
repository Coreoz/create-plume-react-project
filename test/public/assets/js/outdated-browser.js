var content = {
  'fr': '<h6>Votre navigateur est obsolète !</h6>\n' +
    ' <p>Mettez à jour votre navigateur pour afficher correctement ce site Web.<br/><a id="btn-update-browser" href="http://outdatedbrowser.com/fr">Mettre à jour maintenant </a></p>\n' +
    ' <p class="last"><a href="#" id="btn-close-update-browser" title="Fermer">&times;</a></p>',
  'en': '<h6>Your browser is out of date!</h6>\n' +
    ' <p>Update your browser to view this website correctly.<br/><a id="btn-update-browser" href="http://outdatedbrowser.com/">Update my browser now </a></p>\n' +
    ' <p class="last"><a href="#" id="btn-close-update-browser" title="Close">&times;</a></p>\n',
  'it': '<h6>Il tuo browser non &egrave; aggiornato!</h6>\n' +
    ' <p>Aggiornalo per vedere questo sito correttamente.<br/><a id="btn-update-browser" href="http://outdatedbrowser.com/it">Aggiorna ora</a></p>\n' +
    ' <p class="last"><a href="#" id="btn-close-update-browser" title="Chiudi">&times;</a></p>\n',
  'de': ' <h6>Ihr Browser ist veraltet !</h6>\n' +
    ' <p>Bitte aktualisieren Sie Ihren Browser, um diese Website korrekt dazustellen.<br/><a id="btn-update-browser" href="http://outdatedbrowser.com/de">Den Browser jetzt aktualisieren </a></p>\n' +
    ' <p class="last"><a href="#" id="btn-close-update-browser" title="Schließen">&times;</a></p>\n'
}

function insertStyle() {
  var s = document.createElement('link');
  s.href = '/assets/css/outdated-browser.css';
  s.rel = 'stylesheet';
  document.head.appendChild(s);
}

function insertContent() {
  var lang = (navigator && navigator.language) || '';
  var htmlContentToInsert = content[lang.substring(0, 2)] || content['en'];
  var newDiv = document.createElement('div');
  newDiv.id = 'outdated';
  newDiv.innerHTML = htmlContentToInsert;
  var parentDiv = document.getElementsByTagName('div')[0];
  parentDiv.parentNode.insertBefore(newDiv, parentDiv);
  var buttonClose = document.getElementById('btn-close-update-browser');
  buttonClose.onmousedown = function() {
    newDiv.style.display = 'none';
    return false;
  };
}

insertStyle();
insertContent();
