$(document).ready(function(){

  var $feed = $('.feed');
  var $refresh = $('.refresh'); 
  var count = streams.home.length;

  function displayTweets(user) {
    
    var stream;
    var index;

    $feed.html('');

    if (user) {
      stream = streams.users[user];
    } else {
      stream = streams.home;
    }

    index = stream.length - 1;

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

      count = streams.home.length;
    }
    $('.current-display').text('Home Feed');

    $('.username').on('click', function (event) {
      event.preventDefault();
      displayTweets($(this).data('user'));
      clearInterval(newTweetsTimer);
      $('.feed-header').slideUp();
      $('.current-display').text('@' + $(this).data('user') + '\'s Feed');
    });
  };

  var newTweetsTimer;
  function newTweetsCounter() {
    newTweetsTimer = setInterval(function() {
      if (streams.home.length > count) {
        var numNewTweets = streams.home.length - count;
        $refresh.text(numNewTweets + ' new tweets available');
        $('.feed-header').slideDown();
      }
    }, 3000);
  }

  displayTweets();
  newTweetsCounter();

  $refresh.on('click', function(event) {
    event.preventDefault();
    displayTweets();
    $('.feed-header').slideUp();
    clearInterval(newTweetsTimer);
    newTweetsCounter();
  });

  $('input').on('keypress', function(event) {
    if (event.keyCode === 13) {
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