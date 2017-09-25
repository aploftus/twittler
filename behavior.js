$(document).ready(function(){

  var $feed = $('.feed');
  var $refresh = $('.refresh'); 
  var count = streams.home.length;

  function displayTweets(context) {
    
    var stream;
    var index;

    $feed.html('');

    if (context = 'all') {
      stream = streams.home;
    } else {
      stream = streams.users[context];
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
      $tweet.hide().appendTo($feed).fadeIn();

    }

    // $('.username').on('click', function (event) {
    //   event.preventDefault();
    //   displayTweets($(this).data('user')); //can't yet filter by username;
    // });
  };

  // function newTweetsCounter() {
  //   if (streams.home.length > count) {
  //     var numNewTweets = streams.home.length - count;
  //   }
  // }

  // $refresh.clone().appendTo($feed);

  displayTweets('all');

  $('.refresh').on('click', function (event) {
    event.preventDefault();
    $feed.slideDown();
    displayTweets('all');
  });



});

//     $('.username').on('click', function(event) {
//       event.preventDefault();
//       displayTweets($(this).data('user'));
//     });

//   }

//   // $refresh.clone().prependTo($feed);

//   displayTweets('all');

//   $('.refresh').on('click', function(event) {
//     printTweets('all');
//   });

// });