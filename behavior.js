$(document).ready(function(){

  var $feed = $('.feed');
  var $refresh = $('.refresh'); 
  // count needed for "new tweets available" button
  var count = streams.home.length;

  function displayTweets(user) {
    
    var stream;
    var index;

    // creates space for html within jquery obj
    $feed.html('');

    // accommodates diff view options for indiv user or all tweets
    // streams created from data_generator.js
    if (user) {
      stream = streams.users[user];
    } else {
      stream = streams.home;
    }

    index = stream.length - 1;

    // new tweets added to top of stream via countdown
    // tweet object created from data_generator.js
    for (index; index >= 0; index -= 1){
      var tweet = stream[index];
      var $tweet = $('<div></div>').addClass('tweet');

      $user = $('<a></a>').addClass('username');
      $user.attr({'href': '#', 'data-user': tweet.user});
      $user.text('@' + tweet.user);

      $time = $('<span></span>').addClass('timestamp');
      var timeFromNow = moment(tweet.created_at).fromNow();
      $time.text(timeFromNow);

      $message = $('<div></div>').addClass('message');
      $message.text(tweet.message);

      $tweet.append($user, $time, $message).fadeIn();
      $tweet.appendTo($feed);

      // count updated for "new tweets available" button
      count = streams.home.length;
    }

    // updates sidebar for view option
    $('.current-display').text('Home Feed');

    // changes view to single user
    $('.username').on('click', function (event) {
      event.preventDefault();
      displayTweets($(this).data('user'));
      // resets newTweetsTimer because clicking user automatically loads
      // most current tweets from user
      // *** NOTE: Could we update "new tweets available" to count just for
      // specific user, and upon clicking, load in just user's new tweets?
      // (currently, will send viewer back to Home view) ***
      clearInterval(newTweetsTimer);
      $('.feed-header').slideUp();
      // updates sidebar for view option
      $('.current-display').text('@' + $(this).data('user') + '\'s Feed');
    });
  };

  // updates "new tweets available" button with current num of new tweets
  // from streams.home
  var newTweetsTimer;
  function newTweetsCounter() {
    newTweetsTimer = setInterval(function() {
      if (streams.home.length > count) {
        var numNewTweets = streams.home.length - count;
        $refresh.text(numNewTweets + ' new tweets available');
        $('.feed-header').slideDown();
      }
    }, 5000);
  }

  displayTweets();
  newTweetsCounter();

  // resets "new tweets available" counter, hides button, loads new tweets
  $refresh.on('click', function(event) {
    event.preventDefault();
    displayTweets();
    $('.feed-header').slideUp();
    clearInterval(newTweetsTimer);
    newTweetsCounter();
  });

  // allows for visitor to submit tweets to main feed, refreshes feed
  // bonus! can filter by visitor's tweets, just like other users!
  $('input').on('keypress', function(event) {
    if (event.keyCode === 13) { // keyCode 13 = Enter key
      window.visitor = 'visitor';
      if (!streams.users[window.visitor]) {
        streams.users[window.visitor] = [];
      }
      writeTweet($(this).val());
      $(this).val('');
      displayTweets();
    }  
  });

});