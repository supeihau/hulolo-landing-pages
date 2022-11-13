function oAuth2() {
				var URL = 'https://notify-bot.line.me/oauth/authorize?';
				URL += 'response_type=code';
				URL += '&client_id=4akXIp9MaNRtWg92JaktGc';
				URL += '&redirect_uri=https://ncuelecturenotify.herokuapp.com/callback';
				URL += '&scope=notify';
				URL += '&state=abcde';
				window.location.href = URL;
			}
			
				