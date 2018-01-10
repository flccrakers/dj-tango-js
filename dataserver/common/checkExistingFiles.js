let readDir;
readDir = require('recursive-readdir');
let delay = 10000;
let mm = require('music-metadata');
const util = require('util');

/*mm.parseFile('../test/samples/Mu' +
  'sicBrainz-multiartist [id3v2.4].V2.mp3', {native: true})
  .then(function (metadata) {
    console.log(util.inspect(metadata, {showHidden: false, depth: null}));
  })
  .catch(function (err) {
    console.error(err.message);
  });*/
let timerId = setTimeout(function searchFiles() {
  console.log('Search files');
  readDir("/home/hoonakker/media/tango-propres-HQ/", function (err, files) {
    // `files` is an array of absolute file paths
    // console.log(files.length);
    // console.log(files);

    files.forEach((file, index) => {
      mm.parseFile(file, {native: true})
        .then(function (metadata) {
          //console.log(index + ' - ' + file);
          // console.log(util.inspect(metadata, {showHidden: false, depth: null}));
        })
        .catch(function (err) {
          // console.error(err.message);
        });
      /*let fs = require('fs');
      let mm = require('musicmetadata');
      let readableStream = fs.createReadStream(file);
      let parser = mm(readableStream, function (err, metadata) {
        if (err) {
          console.log('err for '+index);
        }
        else {

          if (index === 5013 || index===48){
            console.log(index+' - '+file);
            console.log(metadata);
            parser.on('TCOM', (result)=>{
              console.log('Composer: '+result)
            })
          }

        }
        readableStream.close();
      });*/


    });
  });


  //timerId = setTimeout(searchFiles, delay); // (*)
}, delay);


module.exports = timerId;