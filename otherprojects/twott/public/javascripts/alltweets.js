var $tweetform = $(".tweetform");
var username = $("div.twoper").text();
// .val might be more helpful here
var $tweetTemp = $('#hidden-tweet');
var $allTweets = $('.main');
var $delTweet = $('.del');

$tweetform.submit(function(event) {
	$this = $(this);
	event.preventDefault();
	var formvals = $this.serializeArray();
	var tweet = formvals[0].value;
	$.post("tweet",{
		username: username,
		tweet: tweet
	})
	.done(onSuccess) // TODO: Add cases
	.error();
});

// New Tweets should appear on screen
var onSuccess = function(data, status) {
	var $newTweet = $tweetTemp.clone();
	$newTweet.find('div#tw').text(data.tweet+' -'+data.name);
	$newTweet.attr('id',data._id);
	$newTweet.find('#tempId').attr('id','d'+data._id);
	$allTweets.prepend($newTweet); 
	$tweetform.trigger('reset');
};

$delTweet.click(function(event) {
	event.preventDefault();
	var isCurr = this.alt; //Saving username in alt
	if (isCurr===username){
		var id = this.id;
		console.log(id);
		var delId = id.replace("d","#");
		var sendId = id.replace("d","");//To remove from the database
		$(delId).remove();
		$.post("delete", {
		id: sendId
		});
	}
});

$('#sidebar').find('.eachtw').click(function(event) {
	event.preventDefault();
	$('.tweet').css({'background-color':'#808080'});
	var clickedUser = $(this).attr('author');
	var $clickedTweets = $("[autho="+clickedUser+"]");
	$clickedTweets.css({'background-color': 'pink'});
});