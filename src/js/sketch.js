import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';

const sketch = (p5) => {

  // Variables scoped within p5
  // const canvasWidth = p5.windowWidth;
  // const canvasHeight = p5.windowHeight;
  // const d = new Star(500, 300, 4);

  // make library globally available
  // window.p5 = p5;

  // Setup function
  // ======================================
  // p5.setup = () => {
  //   let canvas = p5.createCanvas(canvasWidth, canvasHeight);
  //   canvas.parent('sketch');
  //   p5.frameRate(10);
  // }

  let userInput;
  let searchUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
  let contentUrl = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=";
  let counter = 0;

  p5.setup = () => {
    p5.noCanvas();
    userInput = p5.select('#userinput');
    userInput.changed(startSearch);
  }

  function startSearch() {
    counter = 0;
    goWiki(userInput.value());
  }

  function goWiki(term) {
    counter = counter + 1;
    if (counter < 10) {
      let url = searchUrl + term;
      p5.loadJSON(url, gotSearch, 'jsonp');
    }
  }

  function gotSearch(data) {
    let len = data[1].length;
    let index = p5.floor(p5.random(len));
    let title = data[1][index];
    title = title.replace(/\s+/g, '_');
    p5.createP(title);
    console.log('Querying: ' + title);

    let url = contentUrl + title;
    p5.loadJSON(url, gotContent, 'jsonp');
  }

  function gotContent(data) {
    let page = data.query.pages
    let pageId = Object.keys(data.query.pages)[0];
    console.log(pageId);
    let content = page[pageId].revisions[0]['*'];
    console.log(content);
    let wordRegex = /\b\w{4,}\b/g;
    var words = content.match(wordRegex);
    var word = p5.random(words);
    goWiki(word);
    console.log(word);
  }

  // Draw function
  // ======================================
  p5.draw = () => {
  }
}

export default sketch;
