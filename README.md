# Web Development Final Project - D&D Hobby Hub

Submitted by: Anthony Carmona

This web app: Is a space for D&D fanatics to come together and share their passion

Time spent: 20 hours spent in total

## Video Walkthrough

Here's a walkthrough of implemented user stories:



## Required Features

The following **required** functionality is completed:

- [✅] **A create form that allows the user to create posts**
- [✅] **Posts have a title and optionally additional textual content and/or an image added as an external image URL**
- [✅] **A home feed displaying previously created posts**
- [✅] **By default, the time created, title, and number of upvotes for each post is shown on the feed**
- [✅] **Clicking on a post shall direct the user to a new page for the selected post**
- [✅] **Users can sort posts by either their created time or upvotes count**
- [✅] **Users can search for posts by title**
- [✅] **A separate post page for each created post, where any additional information is shown is linked whenever a user clicks a post**
- [ ] **Users can leave comments underneath a post on the post's separate page**
- [✅] **Each post should have an upvote button on the post's page. Each click increases its upvotes count by one and users can upvote any number of times**
- [✅] **A previously created post can be edited or deleted from its post page**

The following **optional** features are implemented:

- [ ] Users can only edit and deleted posts or delete comments by entering the secret key, which is set by the user during post creation
- [✅] Upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them.
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface of the web app
- [ ] Users can share and view web videos
- [ ] Users can set flags while creating a post. Then users can filter posts by flags on the home feed.
- [ ] Users can upload images directly from their local machine as an image file
- [ ] Display a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [✅] Set up User Authentication with Supabase
* [✅] When signing up for an account, users can create a custom username for them

## Notes

One issue I ran into was when I set up user authentication with supabase, I was unable to use supabase's function to retrieve the user that was loged in. I found a work around to this by just passing the user_id to each page. However, I recognize that this isn't secure.

## License

    Copyright [2025] [Anthony Carmona ]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
