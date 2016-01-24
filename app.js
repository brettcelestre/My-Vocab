$(document).ready(function(){
    var allWords = [],      // Complete List of Words
        newWords = [],      // newWords Holding Array
        synTotal = 0,       // synTotal Counter
        tagTotal = 0,       // tagTotal Counter
        exampleTotal = 0;   // exampleTotal Counter


    // If no allWords.length < 1 show newWordForm
    if(allWords.length < 1){
      $('#newWordForm').hide();
    } else if(allWords.length > 1){
      $('#newWordForm').show();
    }

    // addWord btn shows newWordForm
    $('#addWordBtn').click(function(){
      $('#newWordForm').show(50);
      $('#addWordBtn').hide();
      $('#close').show();
      $('#submit').addClass('disabled');
    });

    // close form button
    $('#close').click(function() {
      $('#newWordForm').hide(50);
      $('#close').hide();
      $('#addWordBtn').show();
      clear();
    });

    // Hides extra forms
    $('#syntax, #example, #tags, #close').hide();

    // More text
    $('<a>').text('More +').prependTo('#more');

    // More / Less Button
    $('#more').click(function(){
      $('#syntax, #example, #tags').toggle(50);

      if ($('#more').hasClass('plus')){
        $('#more').text('Less -');
        $('#more').removeClass('plus');
        $('#more').addClass('minus');
      } else {
        $('#more').text('More +');
        $('#more').removeClass('minus');
        $('#more').addClass('plus');
      }
    });

    // This enables Post button once word & def form is filled out
    $('#word' && '#def').keyup(function(){
        var length = $(this).val().length;

        if (length < 0){
            $('#submit').addClass('disabled');
        } else if (length => 1){
            $('#submit').removeClass('disabled');
        }
    });

    // Setting Counter Badges
    $('#word_count, #def_count, #syn_count, #ex_count, #tag_count').text(0);

    $('#word, #def, #example, #syntax, #tags').keypress(function(e) {
        if(e.which == 13) {
          $('#submit').click();
          clear();
        }
    });

    function test(){
        console.log('delete test');
    }

    // Clear Forms Function
    function clear(){
        $('#word, #def, #example, #syntax, #tags').val('');
    }

    // Creates a new word object
    function newWord(word, def, example, syntax, tag, views){
        this.word = word;
        this.def = def;
        this.example = example;
        this.syntax = syntax;
        this.tag = tag;
        this.views = views;
    }

    // -----vvv DELETE BUTTON vvv-------------------------------------------------------
    // id="' + allWords[0].word + 'Delete"
    /*
    if ($(this.id) == for(var i = 0, x = allWords.length; i<x; i++){
        (allWords[i].word + 'Delete')).click(function(){
        console.log('delete test');
    }
    */

    $('#gone').click(function(){
        console.log('delete test');
        //test();
        /*
        var deleteID = this.id;
        console.log(deleteID + ' is to be deleted somehow');
        for(var i = 0, x = allWords.length; i<x; i++){
            console.log(' delete click for loop works!');
            if(this.id == (allWords[i].word + 'Delete')){
                console.log(' delete click if statement works!');
            }
        }
        */
    });

    // Delete Button Function
    function deleteWord(){
        //$(this.id).remove();
        console.log(this.id + ' has been deleted');
    }
    // -----^^^ DELETE BUTTON ^^^-------------------------------------------------------

    function completeList(){
        $('#completeList').empty();
        for(var i = 0, x = allWords.length; i<x; i++){
            $('#completeList').prepend('Array index ' + i + ' = ' + allWords[i].word + '<br>');
        }
    }

    // Submit Button Function
    $('#submit').click(function(){
        // hides close / add word btn
        $('#close').hide();
        $('#addWordBtn').show();

        // Clears forms and resets toggle
        if ($('#syntax, #example, #tags').is(':visible')){
            $('#syntax, #example, #tags').toggle(50);
            $('#more').text('More +');
            $('#more').removeClass('minus');
            $('#more').addClass('plus');
        } 

        // Hides form / Shows Add Word
        $('#newWordForm').hide(50);
        $('#addWord').show(50);


        // Checks to make sure there is at least 1 word in allWords before checking whether there is a duplication
        if (allWords.length < 1){ // If this is the first word in your library it doesn't check whether it is a duplicate
            createWord();
        } else if (allWords.length >= 1){ // If there is at least 1 word in the library see if it is a duplicate
            createWord();

            /*
            // Check whether word exists
            var wordCheck = $('#word').val();
            for(var i = 0, x = (allWords.length - 1); i<=x  ; i++){
                console.log('For Loop rotation #' + i + '/' + x);
                if(wordCheck === allWords[i].word){
                    clear();
                    alert(wordCheck + ' already exists in your list.');
                    break;
                } else if ( (wordCheck !== allWords[i].word) && (i == x) ) {
                    createWord();
                }
            }
            */
        }

        function createWord() {
            console.log('createWord function ran');

            // Declaring var's out of forms
            var word = $('#word').val(),
                def = $('#def').val(),
                example = $('#example').val(),
                syntax = $('#syntax').val(),
                tag = $('#tags').val(),
                views = 0;

            clear();

            // Sends word through object constructor: newWord
            var wordRelay = new newWord(word, def, example, syntax, tag, views);

            // Adds our newWord to our allWords array
            allWords.unshift(wordRelay);

            /*
            var items = [
              { name: 'Edward', value: 21 },
              { name: 'Sharpe', value: 37 },
              { name: 'And', value: 45 },
              { name: 'The', value: -12 },
              { name: 'Magnetic' },
              { name: 'Zeros', value: 37 }
            ];
            items.sort(function (a, b) {
              if (a.value > b.value) {
                return 1;
              }
              if (a.value < b.value) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
            */

            completeList();

            createDOM();

            console.log(allWords);
            //console.log('Entire allWords array: ' + allWords);
            console.log('last word submitted - allWords[0] = ' + allWords[0].word);
            console.log('allWords length = ' + allWords.length);
            console.log('-------------------break------------------');
        }
    });
    // ^^ END SUBMIT BUTTON

    function createDOM(){
        console.log('createDom function ran')

        // Clears previous DOM
        if (allWords.length >= 1){ 
            $('.posts').empty();
        }

        // Loops through allWords and places each word in DOM
        for(var i = 0, x = allWords.length; i<x; i++){
            // **** This needs to create a new DOM object, consider implementing Angular! *****
            // Create a div with the id = the word. also has section for def.
            //$('.posts').prepend('<div class="panel panel-default" id="' + allWords[0].word + 'Div"><div class="panel-heading"><h3 class="panel-title" id="' + allWords[0].word + 'Title"></h3></div><div class="panel-body" id="' + allWords[0].word + 'Def' + '"></div></div>');
            $('.posts').prepend('<div class="panel panel-default"><div class="panel-heading" role="tab" id="headingOne"><h4 class="panel-title"><a role="collapsed" data-toggle="collapse" data-parent="#accordion" href="#' + allWords[i].word + '" aria-expanded="false" aria-controls="' + allWords[i].word + '" id="' + allWords[i].word + 'Title" onclick="addView(' + allWords[i].view + ',' + allWords[i].word + ');"><!-- New Word --></a></h4></div><div id="' + allWords[i].word + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne"><div class="panel-body" id="' + allWords[i].word + 'Def"></div></div>');

            // Delete Button DOM Placement
            //$('#' + def).prepend('<span class="label label-danger pull-right" id="' + word + 'Delete" onclick="deleteWord();">Delete</span>');
            var deleteIndex = i;
            $('#' + allWords[i].word + 'Def').prepend('<button type="button" class="btn btn-primary btn-xs pull-right deleteWord" id="' + deleteIndex + '">Delete</button>');

            // Views DOM Placement
            $('#' + allWords[i].word + 'Def').prepend('<h6 style="opacity: .5;" class="pull-left">Views <span class="badge" id="' + allWords[i].word + 'Views"></span></h6>');
            $('#' + allWords[i].word + 'Views').text(allWords[i].views);

            // Example DOM placement
            if(allWords[i].example){
                $('#' + allWords[i].word + 'Def').prepend('<pre id="' + allWords[i].word + 'Example"></pre>');
                $('<samp>').text(allWords[i].example).prependTo('#' + allWords[i].word + 'Example');
                $('<small>').text('EXAMPLE').prependTo('#' + allWords[i].word + 'Def');
            }
            // Syntax DOM placement
            if(allWords[i].syntax){
                $('#' + allWords[i].word + 'Def').prepend('<pre id="' + allWords[i].word + 'Syntax"></pre>');
                $('<samp>').text(allWords[i].syntax).prependTo('#' + allWords[i].word + 'Syntax');
                $('<small>').text('SYNTAX').prependTo('#' + allWords[i].word + 'Def');
            }
            
            // Word DOM placement
            $('<h4>').text(allWords[i].word).prependTo('#' + allWords[i].word + 'Title');
            console.log('word = ' + allWords[i].word);

            // Def DOM placement
            $('<p>').text(allWords[i].def).prependTo('#' + allWords[i].word + 'Def');
            console.log('def = ' + allWords[i].def);
            
            // This should be in Angular.JS
            /*
            function createDOM(this){
                $('<a>').text(word.wordToo).prependTo('#newWord');
                // Here I want to create and place the words data into HTML
                // Then, I will send that through my alphabetization function 
            }
            */

            // STATS SECTION
            $('#word_count').text(allWords.length); // If there is a word there is a def. There are absolutes.
            $('#def_count').text(allWords.length);

            // Syntax Counter. Because not every word will have a syntax.
            if(allWords[i].syntax){
              synTotal++;
              $('#syn_count').text(synTotal);
            }

            // Example Counter.
            if(allWords[i].example){
              exampleTotal++;
              $('#ex_count').text(exampleTotal);
            }
            
            // Tag Counter.
            if(allWords[i].tag){
              tagTotal++;
              $('#tag_count').text(tagTotal);
            }
        }
    }

    //if( ($(this).clicked()) == )

    //$(this).
    /*
    $(this).click(function(){
        var thisID = $(this).attr('id');

        console.log('thisID = ' + thisID);
        for(var i = 0, x = allWords.length; i<x; i++){
            if( thisID == ( allWords[i] )){
                console.log('this click worked!');
                console.log('thisID = ' + thisID + ' && allWord[i] = ' + allWords[i].word + 'Title');
            }

        }
    });
    */

    $('.deleteWord').click(function(){
        alert('delete');
    });

    $('.sort').click(function(){
        sortAlpha();
    });

    //$('.collapsed').click(function(){
    //    console.log('fTitle was clicked');
    //});
    //a=$('[myc="blue"][myid="1"][myid="3"]');

    function addView(a, b){
        this.a = a++;
        this.b = allWords[i].word;
        $('#' + b + 'Views').text(this);
        console.log('addView ran');
    }

    function sortAlpha(){
        allWords.sort(function(a, b) {
            return parseFloat(a.word) - parseFloat(b.word);
        });
        completeList();
    }

    function sortViews(){
        allWords.sort(function(a, b) {
            return parseFloat(a.views) - parseFloat(b.views);
        });
    }
});