Simple Chrome extension that shows if the current page has already been saved or not on [Delicious](http://delicious.com/) - it changes the icon from a grey one to a coloured one.

### Usage
* Clone the repository
* Goto background.js and change the username and password with your credentials from Delicious (line 14, 15)
* Open chrome://extensions in your Chrome browser, make sure that Developer mode is activated
* Load unpacked extension...

### TODO
* Login form inside the popup
* Send authorization headers instead of username and password
* Use the popup to bookmark an URL
* Package and upload it to Chrome Web Store

### Limitations
Because of the way Delicious saves bookmarks, it is currently not possible (or at least I can't think of a proper, generic way of doing this) to check for URL's that have various params attached to it. For example, if the bookmarked linked in Delicious looks something like this: [http://buildnewgames.com/real-time-multiplayer/__?utm_source=javascriptweekly&utm_medium=email__](http://buildnewgames.com/real-time-multiplayer/?utm_source=javascriptweekly&utm_medium=email) and the URL you have in your address bar is this: http://buildnewgames.com/real-time-multiplayer/ it won't show up as already saved