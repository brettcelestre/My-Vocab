$(document).ready(function(){
    var allWords = [], // Complete List of Words
        newWords = []; // newWords Holding Array

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
    
    // Enables 'enter' hotkey for submit
    $('#word, #def, #example, #syntax, #tags').keypress(function(e) {
        if(e.which == 13) {
          $('#submit').click();
          clear();
        }
    });

    // Clear Forms Function
    function clear(){
        $('#word, #def, #example, #syntax, #tags').val('');
    }

    // Add View button 
    $('.posts').on('click', '.addView', function() {
        // This needs to be more secure, if you click really fast it just keeps increasing
        // the view count. Maybe implement a state class/check or something

        // Checks if the toggle is closed or open
        if ( $(this).hasClass('collapsed') ){
            // Grabs the ID of this element, equals the word
            var id = $(this).attr('id');
            // Grabs the state of the toggle
                state = false;
            addView(id, state);
        }
    });

    // Adds a view to word when toggling word
    function addView( word, state ){
        // Assigns thisWord to the word
        var thisWord = word,
        // Assigns thisState to the state
            thisState = state;
        // Finds the word inside of allWords array
        _.each(allWords, function ( val ){
            if( val.word === thisWord ){
                // Increases the view count for that word
                val.views++;
                // Updates the text for views for that word
                $('#' + thisWord + 'Views').text(val.views);
            }
        });
    }

    // Creates a new word object
    function newWord(word, def, example, syntax, tag, views, date){
        this.word = word;
        this.def = def;
        this.example = example;
        this.syntax = syntax;
        this.tag = tag;
        this.views = views;
        this.date = date;
    }

    // Developer view of the allWords array, currently hidden in html file
    function completeList(){
        $('#completeList').empty();
        for(var i = 0, x = allWords.length; i<x; i++){
            $('#completeList').prepend('allWords index ' + i + ' = ' + allWords[i].word + '<br>');
        }
    }

    // Updates all of the counters
    function counterUpdate(){
        var syntaxTotal = 0,    // total syntax counter
            tagTotal = 0,       // total tags counter
            exampleTotal = 0;   // total example counter

        // Loops through allWords and tallies up the counters
        _.each(allWords,function( val ){
            if( val.syntax ){ syntaxTotal++; }
            if( val.example ){ exampleTotal++ }
            if( val.tag ){ tagTotal++ }
        });

        // Adding Stats to DOM
        $('#word_count').text(allWords.length); // If there is a word there is a def. There are absolutes.
        $('#def_count').text(allWords.length);
        $('#syn_count').text(syntaxTotal);
        $('#ex_count').text(exampleTotal);
        $('#tag_count').text(tagTotal);
    }

    // FILTER SECTION
    // Turns the filter buttons blue
    $('.filter').click(function(){
        $('.filter').removeClass('btn-primary').addClass('btn-default');
        $(this).removeClass('btn-default').addClass('btn-primary');
    });

    $('#filterAlphabet').click(function(){
        var list = allWords;
        filter( list, 'word' );
    });

    $('#filterViews').click(function(){
        var list = allWords;
        filter( list, 'views' );
    });

    $('#filterDate').click(function(){
        var list = allWords;
        filter( list, 'date' );
    });

    function filter( list, type ){ 
        // Sorts words by type and stores in var sorted
        var sorted = _.sortBy(list, type);
        if ( type === 'views' ){
            // If type = views then we don't need to reverse sorted
            allWords = sorted;
        } else {
            // if type = date || word then we need to reverse the sorted array
            allWords = sorted.reverse();
        }
        // Prints out the words off to the side
        completeList();
        // Builds the updated list on the DOM
        createDOM();
    } // END FILTER SECTION ^ 

    // Delete Button 
    $('.posts').on('click', '.deleteWord', function() {
        console.log('delete ran');
        // id of delete button equals index of word in the allWords array
        var index = $(this).attr('id');
        console.log('Deleting index ' + index + ' of allWords.');
        console.log('allWords[' + index + '] = ', allWords[index]);
        console.log('allWords before splice = ', allWords);
        // Deletes that index from allWords array
        allWords.splice(index, 1);
        console.log('allWords after splice = ', allWords);
        // Prints out the words off to the side
        completeList();
        // Builds the updated list on the DOM
        createDOM();
        //console.log('Delete Word button, index = ', index);
    }); // End Delete Button

    // Submit Button Function
    $('#submit').click(function(){
        $('#close').hide();
        $('#addWordBtn').show();

        // Resets toggle for extra word options
        if ( $('#syntax, #example, #tags').is(':visible') ){
            $('#syntax, #example, #tags').toggle(50);
            $('#more').text('More +');
            $('#more').removeClass('minus');
            $('#more').addClass('plus');
        } 

        // Hides form / Shows Add Word
        $('#newWordForm').hide(50);

        // If this is the first word in your library it doesn't check whether it is a duplicate
        if (allWords.length < 1){           
            createWord();
        } else if (allWords.length >= 1){   // If at least 1 word in library see if it is a duplicate
            // Checks whether word exists
            var wordCheck = $('#word').val();
            for(var i = 0, x = (allWords.length - 1); i<=x  ; i++){
                if(wordCheck === allWords[i].word){                     // If the word already exists
                    clear();                                            // Clear the forms
                    alert(wordCheck + ' already exists in your list.'); // Alert the user
                    return;
                } else if ( (wordCheck !== allWords[i].word) && (i == x) ) {    // If the word doesn't exist
                    createWord();                                               // Create the word
                }
            }
        }

        // createWord grabs all values from forms, creates a word object, then stores in allWords array
        function createWord() {
            // Declaring var's out of forms
            var word = $('#word').val(),
                def = $('#def').val(),
                example = $('#example').val(),
                syntax = $('#syntax').val(),
                tag = $('#tags').val(),
                views = 1,
                date = new Date();

            // Clears out all of the forms
            clear();

            // Sends word through object constructor: newWord
            var wordRelay = new newWord(word, def, example, syntax, tag, views, date);

            // Adds our newWord to our allWords array
            allWords.unshift(wordRelay);

            completeList();

            // Create a filter check to keep the words in order according the current selected filter
            if ( $('#filterAlphabet').hasClass('btn-primary') ){
                var list = allWords;
                filter( list, 'word' );
            } else if ( $('#filterViews').hasClass('btn-primary') ){
                var list = allWords;
                filter( list, 'views' );
            } else if ( $('#filterDate').hasClass('btn-primary') ){
                var list = allWords;
                filter( list, 'date' ); 
            }

            createDOM();
            counterUpdate();
        }
    }); // ^ END SUBMIT BUTTON

    // CreateDOM loops through allWords array and places each word on the DOM
    function createDOM(){
        // This should be in Angular.js

        // Clears previous DOM
        if (allWords.length >= 1){ 
            $('.posts').empty();
        // If the last word is deleted, this clears the last word
        } else if ( allWords.length < 1){
            $('.posts').empty();
        }

        // Loops through allWords and places each word in DOM
        for(var i = 0, x = allWords.length; i<x; i++){
            // Create a div with the id = the word. also has section for def.
            $('.posts').prepend('<div class="panel panel-default"><div class="panel-heading" role="tab" id="headingOne"><h4 class="panel-title"><a role="collapsed" data-toggle="collapse" data-parent="#accordion" href="#' + allWords[i].word + 'Toggle" aria-expanded="false" aria-controls="' + allWords[i].word + '" id="' + allWords[i].word + '" class="addView"><h4>'+ allWords[i].word + '</h4></a></div><div id="' + allWords[i].word + 'Toggle" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne"><div class="panel-body" id="' + allWords[i].word + 'Def"></div></div>');

            // Delete Button DOM Placement
            var deleteIndex = i;
            $('#' + allWords[i].word + 'Def').prepend('<button type="button" class="btn btn-primary btn-xs pull-right deleteWord" id="' + i + '">Delete</button>');

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

            // Def DOM placement
            $('<p>').text(allWords[i].def).prependTo('#' + allWords[i].word + 'Def');
        }
    }

});