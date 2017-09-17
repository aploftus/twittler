$(document).ready(function(){

  var $feed = $('.feed-stream');
  $feed.html('');

  var displayTweets = function(context) {
    
    var stream;
    if (context = 'all') {
      stream = streams.home;
    } else {
      stream = streams.user[context];
    }

    var index = stream.length - 1;

    for (index; index >= 0; index -= 1){
      var tweet = streams.home[index];
      var $tweet = $('<div></div>').addClass('tweet');

      $user = $('<a></a>');
      $user.attr({'href': '#', 'data-user': tweet.user, 'class': 'username'});
      $user.text('@' + tweet.user);

      $time = $('<span></span>').addClass('timestamp');
      var timeFromNow = moment(tweet.created_at).fromNow();
      $time.text(timeFromNow);

      $message = $('<div></div>').addClass('message');
      $message.text(tweet.message);

      $tweet.append($user, $time, $message);
      $tweet.appendTo($feed);

    }
  }

  

  ('.username').on('click', function(event) {
    event.preventDefault;
    tweet = streams.home[user][index];
  });

});