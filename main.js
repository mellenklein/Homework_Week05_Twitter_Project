var Router = Backbone.Router.extend({
  routes: {
    ''          :'home',
    'login'     :'login',
    'register'  :'register',
    'dashboard' :'dashboard', // need to make funciton called db
    'users'     :'users', //need to make function called users
    'user/:id'  :'userId'  //need to make function called userId
  },
})


// $.ajaxSetup({
//  headers: {
//    "Authorization": "token " + token
//  }
// });


// Make a new model.
var Tweet = Backbone.Model.extend({
  // When we make a new Tweet,
  // this will use the POST Method to create a new tweet on this URL.
  url: 'http://tiny-starburst.herokuapp.com/collections/chat'
});

// Make a new collection.
var Tweets = Backbone.Collection.extend({
  model: Tweet,
  url: 'http://tiny-starburst.herokuapp.com/collections/chat'
})



//Make a new view for individual tweets.
var TweetView = Backbone.View.extend({
  tagName: 'article',
  className: 'tweet',
  template: _.template($('#tweetViewTemplate').html()),


  render: function(){
    var data = this.model.toJSON();
    this.$el.html(this.template(data));
    return this;
  }
});

//Make a new view the twitter feed.
var FeedView = Backbone.View.extend({
  tagName: 'section',
  className: 'feed',

  initialize: function(){
    this.listenTo(this.collection, 'fetch sync', this.render)
  },

  render: function(){
    var view = this;

    this.collection.each(function(model){
      var tweet = new TweetView({
        model: model
      });
      tweet.render();
      view.$el.append(tweet.el);
    });
  }
});

// creates new instance of collected tweets
var tweetsCollection = new Tweets();

// creates new instance of view of the feed.
var feedView = new FeedView({
  collection: tweetsCollection
});

tweetsCollection.fetch({
  success: function(){
    $('main').append(feedView.el);
  }
});
//
// var router = new Router();   //tells Backbone to listen for changes
// Backbone.history.start();
