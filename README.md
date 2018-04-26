# Project 2 - EarBuddies
### Collaboration between [Ryan Liu](https://github.com/shiang), [Mac Radinoff](https://github.com/mradinoff), [Joseph Ocampo](https://github.com/joseph-michael) & [Taryn Ewens](https://github.com/tarynelise).

See it in action here: https://earbuddies-react.herokuapp.com/

It is a social media platform allowing users to find events, see who's attending and "match" with a friend Tinder style, as well as live chat with the other attending users of the event.

![alt text](screenshots/# "Screenshot")

## How to use
- Follow the sign up link to create an account, then update your profile.
- Explore events you might like to attend. Click "attending" to add yourself to the attending list.

![alt text](screenshots/Screen Shot 2018-04-27 at 8.38.05 am.png "Screenshot of explore events page")

- Take a look through other people attending and "like" the people you would like to hang out with at the event.
- Changed your mind? You can unlike them too!



- If they like you back, they'll show up in your friends list but don't worry - you can always remove them if need be! No pressure "friendships". Did they not like you? Did they just not see you were attending? You can't be offended, because you'll never know!

![alt text](screenshots/Screen Shot 2018-04-27 at 8.39.01 am.png "Screenshot of event details on event page")

- Click the "Join Chat" button on each event to enter that events live chat and see what others are saying about the event!

![alt text](screenshots/Screen Shot 2018-04-27 at 8.48.51 am.png "Screenshot of live chat function")




## Objectives
- Models. Your app should have at least 3 models. Make sure they are associated correctly!
- Views. Use partials to DRY (Don’t Repeat Yourself) up your views.
- Handles invalid data. Forms in your application should validate data and handle incorrect inputs. Validate sign up information, verify valid email addresses and secure passwords.
- Use Gems Use a GEM that talks to an API to add functionality to your app.
- User Login. Make sure you have basic authentication and authorization set up (if you need it).
- Heroku. Deploy your code to Heroku.

## Built With
- HTML
- CSS
- React
- Ruby on Rails
- Bootstrap

## Scope
EarBuddies - Find buddies to go to a gig with!
Features will include
- Sign up
- Sign in via email address
- Set up profile with photo, name, bio etc.
- View own profile, including attending events and "matched" friends
- Like other users to "match" with them
- Find events and say you're attending
- Live chat with other users for that event. Make plans before the event, discuss the gig, chat during the gig!
- Edit profile

## Object models
- User has and belongs to many events. Has many friends through friendships. Has many messages.
- Event has and belongs to many users. Belongs to a venue.
- Venue has many events.
- Message belongs to user, and belongs to event.
- Friendship belongs to user, and friend (user).

## Approach

## To do:
- [ ] One on one direct messaging between matched friends
- [ ] Interactive google map on event page
- [ ] Improve search function

## License
This project is licensed under the MIT license.

## Acknowledgments
Thanks to Joel, John and Theo @ General Assembly for the help.

This project was undertaken as part of the General Assembly Sydney's WDI 26 course, April 2018.
