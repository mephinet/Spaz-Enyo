enyo.kind({
	name: "Spaz.TweetView",
	//kind: "SlidingView",
	kind: "Toaster", 
	flyInFrom: "right",
	width: "300px",
	height: "100%",
	style: "background-color: #D8D8D8;",
	flex: 1,
	published: {
		tweet: {}
	},
	components: [
		{className: "tweet-view", height: "100%", layoutKind: "VFlexLayout", components: [

			{kind: "Header", components: [
				{kind: "VFlexBox", className: "header", components: [
					{kind: "HFlexBox", components: [
						{kind: "Image", width: "75px",  height: "75px", className: "avatar"},
						{kind: "VFlexBox", flex: 1, components: [
							{name: "realname", className: "realname"},
							{name: "username", className: "link username"},

						]},		
					]},
					{name: "bio", className: "small"},

				]},
			]},
			//{layoutKind: "HFlexLayout", pack: "center", components: [
		    {kind: "Scroller", flex: 1, className: "tweet-view", components: [
				{kind: "VFlexBox", className: "header", style: "", components: [
						//{kind: "Divider", className: "divider", style: "display: none", caption: ""},
						{name: "tweet", className: "tweet"},
						{name: "timeFrom", className: "small", style: "padding-top: 10px"}
				]},
				//]},
				
	        ]},
	        {kind: "Toolbar", components: [
				//{kind: "GrabButton"},
				{kind: "Spacer"},
				{kind: "ToolButton", disabled: true, icon: "source/images/icon-reply.png"},
				{kind: "ToolButton", disabled: true, icon: "source/images/icon-share.png"},
				{kind: "ToolButton", disabled: true, icon: "source/images/icon-favorite.png"},
				{kind: "Spacer"}
			]}
		]}
	],
	tweetChanged: function(){
		if(this.$.tweet.content !== this.tweet.message){
			this.$.image.setSrc(this.tweet.avatar);
			this.$.image.applyStyle("display", "");
			this.$.realname.setContent(this.tweet.realname);
			this.$.username.setContent("@" + this.tweet.username);
			this.$.bio.setContent("Developer of Koto Player and Mojo Messenger for webOS");
			this.$.timeFrom.setContent(this.tweet.time + " from <span class='link'>" + this.tweet.from + "</span>");
			this.$.tweet.setContent(this.tweet.message);
		} else {
			this.$.image.applyStyle("display", "none");
			this.$.realname.setContent("");
			this.$.username.setContent("");
			this.$.bio.setContent("");
			this.$.timeFrom.setContent("");
			this.$.tweet.setContent("");
		}
	}
});