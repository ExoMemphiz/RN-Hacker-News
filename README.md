# RN-Hacker-News

This app is my solution to the coding assignment described below.

It incorporates all the main features described, using all 3 endpoints, this branch uses MobX for state management.  
I included some minor additional features, accessed via the Settings page, such as:

* The ability to toggle between ascending and descending score order.
* The ability to control if stories should first be shown when all have loaded, or if they should populate the list as each request finishes.
* The ability to toggle between a light and a dark theme.

## __Coding Assignment__

Create a React Native app that displays 10 randomized Hacker News top stories  
using the Hacker News API (```https://github.com/HackerNews/API```).  
The stories must be listed in ascending order based on the stories score.  

The UI must include:

* Story title
* Story URL
* Story timestamp
* Story score
* Author id
* Author karma score

Hint: You’ll be needing the following endpoints:

* Top stories: ```https://hacker-news.firebaseio.com/v0/topstories.json```
* Story item: ```https://hacker-news.firebaseio.com/v0/item/${id}.json```
* User: ```https://hacker-news.firebaseio.com/v0/user/${id}.json```  

Requirements:

* Use latest version of React Native (>= 0.59)
* Application must be written in TypeScript (>= 3.0)

Bonus Points:

* Use Redux for state management
* Use Redux-Saga
