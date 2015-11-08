//left side: displayed in brower. right side: fucnction to call.
var AppRouter = Backbone.Router.extend({
  routes: {
    ''          :'home',
    'login'     :'login',
    'register'  :'register',
    'dashboard' :'dashboard', // need to make funciton called db
    'users'     :'users', //need to make function called users
    'user/:id'  :'userId'  //need to make function called userId
  },

  home: function(){
    tweetsCollection.fetch({
      success: function(){
        $('.feed').html(feedView.el);
      }
    });
  },

  dashboard: function(){
    dashboardCollection.fetch({
      success: function(){
        $('.feed').html(dashboardView.el);
      }
    });
  },

  userId: function(){
    tweetsCollection.fetch({
      success: function(){
        $('.feed').html(feedView.el);
      }
    });
  },

  login: function(){
    var loginForm = new FormView();
    loginForm.render();
    $('main').html(loginForm.el);
  },

  register: function(){
    var loginForm = new FormView();
    loginForm.render();
    $('main').html(loginForm.el);
    $('.forms').html('Register');
    $('.forms').attr('href', 'register');
  }

})
// $('nav a').click(function(){
//
// });

// $.ajaxSetup({
//  headers: {
//    "Authorization": "token " + token
//  }
// });



//////////////////////////////////////////
//       MODELS AND COLLECTIONS        //
////////////////////////////////////////
// Make a new model.
var Tweet = Backbone.Model.extend({
  // When we make a new Tweet,
  // this will use the GET Method to print a new tweet from this API.
  url: 'https://twittertiy.herokuapp.com/users'
});

// Make a new collection.
var Tweets = Backbone.Collection.extend({
  model: Tweet,
  url: 'https://twittertiy.herokuapp.com/users'
});

var Dashboard = Backbone.Collection.extend({
  model: Tweet,
  url: 'https://twittertiy.herokuapp.com/users'
});

// Make a new Model for the login and register pages:
var Form1 = Backbone.Model.extend({
  //When we click the login button,
  // this will use the POST method to send the form info to the server.
  url: 'https://twittertiy.herokuapp.com/oauth/token'
});


//////////////////////////////////////////
//              VIEWS                  //
////////////////////////////////////////
//Make a new view for individual tweets.
var TweetView = Backbone.View.extend({
  tagName: 'article',
  className: 'tweet',
  template: _.template($('#tweetViewTemplate').html()),

  initialize: function(){
    this.listenTo(this.collection, 'fetch sync', this.render)
  },

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

    this.$el.html('');
    this.collection.each(function(model){
      var tweet = new TweetView({
        model: model
      });
      tweet.render();
      view.$el.append(tweet.el);
    });
  }
});

var DashboardTweetView = Backbone.View.extend({
  tagName: 'article',
  className: 'tweet',
  template: _.template($('#followedTweetsTemplate').html()),

  // initialize: function(){
  //   this.listenTo(this.collection, 'fetch sync', this.render)
  // },

  render: function(){
    var data = this.model.toJSON();
    this.$el.html(this.template(data));
    return this;
  }
});

var DashboardFeedView = Backbone.View.extend({
  tagName: 'section',
  className: 'feed',

  initialize: function(){
    this.listenTo(this.collection, 'fetch sync', this.render)
  },

  render: function(){
    var view = this;

    this.$el.html('');
    this.collection.each(function(model){
      var tweet = new DashboardTweetView({
        model: model
      });
      tweet.render();
      view.$el.append(tweet.el);
    });
  }
});

//Make a new view for the form.
var FormView = Backbone.View.extend({
  tagName: 'section',
  className: 'form',
  template: _.template($('#inputBoxTemplate').html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});



//////////////////////////////////////////
//              RENDERING              //
////////////////////////////////////////
// creates new instance of Collection (collected tweets)
var tweetsCollection = new Tweets();

// creates new instance of View of the feed.
var feedView = new FeedView({
  collection: tweetsCollection
});

var dashboardCollection = new Dashboard();

var dashboardView = new DashboardFeedView({
  collection: dashboardCollection
});



var router = new AppRouter();   //tells Backbone to listen for changes
Backbone.history.start();
