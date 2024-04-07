# GamerFund

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/users/:userId
  - Body: none

- Successful Response when there is a logged in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "developer": "True",
        "company": "My GameDev Company"
      }
    }
    ```

- Successful Response when there is no logged in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/session
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
        "developer": "True",
        "company": "My GameDev Company"
      }
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/user
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
      "developer": "true",
      "company": "My GameDev Company"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
        "company": "My GameDev Company"
      }
    }
    ```

- Error response: User already exists with the specified email

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

- Error response: User already exists with the specified username

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## PROJECTS

### Get all Projects

Returns all the projects.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/projects
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Projects": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Greatest Game Evar!",
          "description": "Working towards creating the greatest game ever made in the history of gaming!",
          "genre": "Action",
          "country": "United States of America",
          "deadline": "05/30/2030",
          "investors": 10,
          "funds": 23000
        }
      ]
    }
    ```

### Get all Projects owned by the Current User

Returns all the projects owned (created) by the current user.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/users/:userId/projects
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Projects": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Greatest Game Evar!",
          "description": "Working towards creating the greatest game ever made in the history of gaming!",
          "genre": "Action",
          "country": "United States of America",
          "deadline": "05/30/2030",
          "investors": 10,
          "funds": 23000
        }
      ]
    }
    ```

### Get details of a project

Returns the details of a project specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/projects/:projectId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Projects": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Greatest Game Evar!",
          "description": "Working towards creating the greatest game ever made in the history of gaming!",
          "genre": "Action",
          "country": "United States of America",
          "deadline": "05/30/2030",
          "investors": 10,
          "funds": 23000,
          "Milestones": [
            {
              "name": "1st Milestone",
              "amountReq": 10000,
              "achieved": "true"
            },
            {
              "name": "2nd Milestone",
              "amountReq": 25000,
              "achieved": "false"
            },
            {
              "name": "2nd Milestone",
              "amountReq": 250000,
              "achieved": "false"
            }
          ],
          "Rewards" : [
            {
                "tier": "Copper",
                "amount" : 25,
                "description" : "investing at this level gets you early access to the final release!",
                "quantity": 5000
            },
             {
                "tier": "Silver",
                "amount" : 75,
                "description" : "Awesome! Copper tier reward + an amazing 'Thank You!' t-shirt.",
                "quantity": 3750
            },
            {
                "tier": "Gold",
                "amount" : 150,
                "description" : "You're truly the best! Everything previous + your name IN game as a voiced npc!",
                "quantity": 400
            },
             {
                "tier": "Platinum",
                "amount" : 300,
                "description" : "You didn't have to but you did! At this tier you get everything from before +++ your own questline for your voiced npc AND you get to pick create the awards for completing the quests!",
                "quantity": 30
            }
          ],
          "Grants": [
            {
              "name": "Small-y Grant",
              "rewardAmt": 2500
            },
            {
                "name" : "Awesome Grant",
                "rewardAmt" : 5000
            }
            {
                "name" : "Big Money Grant",
                "rewardAmt" : 5500
            }
          ]
        }
      ]
    }
    ```

- Error response: Couldn't find a Spot with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```

### Create a Project

Creates and returns a new project.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/spots
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "New Old Game Remaster",
      "description": "Remastering your nostalgia for ez moneys",
      "genre": "Fighting",
      "country": "United States of America",
      "deadline": "10/10/2028"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "New Old Game Remaster",
      "description": "Remastering your nostalgia for ez moneys",
      "genre": "Fighting",
      "country": "United States of America",
      "deadline": "10/10/2028",
      "funds": 0,
      "investors": 0,
      "createdAt": "04/06/2024",
      "updatedAt": "04/06/2024"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Name of project required",
        "description": "You must describe your project",
        "genre": "Genre required",
        "country": "Country required",
        "deadline": "Estimated deadline required",
        "description": "Description is required"
      }
    }
    ```

### Edit a Project

Updates and returns an existing project.

- Require Authentication: true
- Require proper authorization: Project must belong to the current user
- Request

  - Method: PUT
  - URL: /api/projects/:projectId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "New Old Game Remastered",
      "description": "Remastering your nostalgia for ez money",
      "genre": "Fighting",
      "country": "United States of America",
      "deadline": "09/15/2030"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "New Old Game Remastered",
      "description": "Remastering your nostalgia for ez money",
      "genre": "Fighting",
      "country": "United States of America",
      "deadline": "09/15/2030",
      "funds": 0,
      "investors": 0,
      "createdAt": "04/06/2024",
      "updatedAt": "04/06/2024"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
     {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Name of project required",
        "description": "You must describe your project",
        "genre": "Genre required",
        "country": "Country required",
        "deadline": "Estimated deadline required",
        "description": "Description is required"
        }
      }
    }
    ```

- Error response: Couldn't find a Spot with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```

### Delete a Project

Deletes an existing project.

- Require Authentication: true
- Require proper authorization: Project must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/projects/:projectId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Spot with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```

## DISCUSSIONS

### Get all Discussions of a project

Returns all the community discussions on a given project.
These are non-developer related posts (Don't belong to any of the developers working on the project)

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/projects/:projectId/discussions
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Posts": [
        {
          "id": 1,
          "userId": 2,
          "projectId": 1,
          "desciption": "I seriously can't wait for this to finish!",
          "likes": 32,
          "dislikes": 2,
          "createdAt": "04/06/2024",
          "updatedAt": "04/06/2024",
          "User": {
            "id": 2,
            "firstName": "Abel",
            "lastName": "Johnson",
            "userName": "DontEndMe"
          },
          {
          "id": 2,
          "userId": 3,
          "projectId": 1,
          "desciption": "Bold claim to be the best game 'EVAR!' I'm not holding my breath on this one. Prob another cash grab scheme.",
          "likes": 540,
          "dislikes": 220,
          "createdAt": "04/06/2024",
          "updatedAt": "04/06/2024",
          "User": {
            "id": 3,
            "firstName": "Rose",
            "lastName": "Carlton",
            "userName": "CandyCarlyRosy"
            },
          },
          {
          "id": 5,
          "userId": 12,
          "projectId": 1,
          "desciption": "I saw that you got a lot of spaghetti code going on. I know it's early in dev, but I highly recommend getting some kind of universal system in place to keep the code clean. Juss saiyan, it'll save you a boatload of issues later.",
          "likes": 5542,
          "dislikes": 3,
          "createdAt": "04/06/2024",
          "updatedAt": "04/06/2024",
          "User": {
            "id": 12,
            "firstName": "Ayr",
            "lastName": "Isbul",
            "userName": "I-is-the-Bull"
            },
          },
        },
      ]
    }
    ```

### Get all developer's Discussions posts for a Project

Returns all the developer discussions that were posted for the project by the developer(s).

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/projects/:projectId/discussions/developers
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Posts": [
        {
          "id": 6,
          "userId": 24,
          "projectId": 1,
          "desciption": "Nothing crazy this week, working through a few bugs on a new mechanic we're trying to implement. Obviously can't say too much on that right now, so stay tuned.",
          "likes": 658,
          "dislikes": 25,
          "createdAt": "04/06/2024",
          "updatedAt": "04/06/2024",
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith",
            "userName": "VanillaBe-a-nMan"
          },
          {
          "id": 9,
          "userId": 21,
          "projectId": 1,
          "desciption": "Heyall! We got through those pesky bugs from last week and got the super awesome new mechanic working great! Can't wait to show you guys. Until then, loves and kisses!",
          "likes": 25578,
          "dislikes": 0,
          "createdAt": "04/11/2024",
          "updatedAt": "04/11/2024",
          "User": {
            "id": 21,
            "firstName": "Selina",
            "lastName": "Stout",
            "userName": "twistNd_SH0UT"
          },
        }
        }

      ]
    }
    ```

- Error response: Couldn't find a Project with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```

### Create a Discussion for a Project based on the Spot's id (non-developer)

Create and return a new discussion for a project specified by id while not being the developer for the project. A check will be put in place to verify if the user is a developer and the projectId doesn't match any of the user's projectIds.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/projects/:projectId/discussions
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "description": "Confidence is key, but this feels arrogant to call it the greatest game ever made in gaming history. Presses 'X' to doubt"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 18,
      "userId": 55,
      "projectId": 1,
      "desciption": "Confidence is key, but this feels arrogant to call it the greatest game ever made in gaming history. Presses 'X' to doubt",
      "likes": 0,
      "dislikes": 0,
      "createdAt": "04/07/2024",
      "updatedAt": "04/07/2024"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "description": "Description is required"
      }
    }
    ```

- Error response: Couldn't find a Spot with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```

### Create a Discussion for a Project based on the Spot's id (developer)

Create and return a new discussion for a project specified by id as the developer for the project. Project must belong to the developer. A check will be put in place to verify if the user is a developer and the projectId matches user's projectId.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/projects/:projectId/discussions/developer
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "description": "Ya'll are gonna hate me, but I tried sneaky adding back in the twerking lobster meme ya'll liked, and ended up breaking the code. Which resulted in me getting a stern talking to and time-out from my team. Please don't destroy me, I'm terribly sorry and working diligently to solve it. Hopefully, I can still get the meme working too. Wish me luck."
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 47,
      "userId": 34,
      "projectId": 1,
      "description": "Ya'll are gonna hate me, but I tried sneaky adding back in the twerking lobster meme ya'll liked, and ended up breaking the code. Which resulted in me getting a stern talking to and time-out from my team. Please don't destroy me, I'm terribly sorry and working diligently to solve it. Hopefully, I can still get the meme working too. Wish me luck.",
      "likes": 0,
      "dislikes": 0,
      "createdAt": "04/12/2024",
      "updatedAt": "04/12/2024"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "description": "Description is required"
      }
    }
    ```

- Error response: Couldn't find a Spot with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```

### Edit a Discussion (non-developer)

Update and return an existing discussion for a project specified by id while not being the developer for the project.

- Require Authentication: true
- Require proper authorization: Discussion must belong to the current user
- Request

  - Method: PUT
  - URL: /api/projects/:projectId/discussions/:discussionId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "description": "Confidence is key, but this feels arrogant to call it the greatest game ever made in gaming history. Presses 'X' to doubt. Edit: Glad to see I ain't the only one. Then again, I love seeing the mighty crumble, so that'll be a fun laugh down the road."
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 18,
      "userId": 55,
      "projectId": 1,
      "desciption": "Confidence is key, but this feels arrogant to call it the greatest game ever made in gaming history. Presses 'X' to doubt. Edit: Glad to see I ain't the only one. Then again, I love seeing the mighty crumble, so that'll be a fun laugh down the road.",
      "likes": 0,
      "dislikes": 0,
      "createdAt": "04/07/2024",
      "updatedAt": "04/15/2024"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "description": "Description is required"
      }
    }
    ```

- Error response: Couldn't find a Spot with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```

### Edit a Discussion (developer)

Update and return an existing discussion for a project specified by id while being the developer for the project.

- Require Authentication: true
- Require proper authorization: Discussion and project must belong to the current user
- Request

  - Method: PUT
  - URL: /api/projects/:projectId/delevopers/discussions/:discussionsId/
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "description": "Ya'll are gonna hate me, but I tried sneaky adding back in the twerking lobster meme ya'll liked, and ended up breaking the code. Which resulted in me getting a stern talking to and time-out from my team. Please don't destroy me, I'm terribly sorry and working diligently to solve it. Hopefully, I can still get the meme working too. Wish me luck. MINOR UPDATE: Got it fixed! Ya'll can stop yelling at me now T_T"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 47,
      "userId": 34,
      "projectId": 1,
      "description": "Ya'll are gonna hate me, but I tried sneaky adding back in the twerking lobster meme ya'll liked, and ended up breaking the code. Which resulted in me getting a stern talking to and time-out from my team. Please don't destroy me, I'm terribly sorry and working diligently to solve it. Hopefully, I can still get the meme working too. Wish me luck. MINOR UPDATE: Got it fixed! Ya'll can stop yelling at me now T_T",
      "likes": 0,
      "dislikes": 0,
      "createdAt": "04/12/2024",
      "updatedAt": "04/20/2024"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "description": "Description is required"
      }
    }
    ```

- Error response: Couldn't find a Spot with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```

### Delete a Discussion (non-developer)

Delete an existing discussion.

- Require Authentication: true
- Require proper authorization: Discussion must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/projects/:projectId/discussions/:discussionId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Discussion couldn't be found"
    }
    ```

### Delete a Discussion (developer)

Delete an existing developer discussion.

- Require Authentication: true
- Require proper authorization: Discussion must belong to the current user and is the developer of the project
- Request

  - Method: DELETE
  - URL: /api/projects/:projectId/developers/discussions/:discussionId/
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Discussion couldn't be found"
    }
    ```

## BOOKINGS

### Get all of the Current User's Bookings

Return all the bookings that the current user has made.

- Require Authentication: true
- Request

  - Method: GET
  - URL: api/users/:userId/bookings
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Bookings": [
        {
          "id": 1,
          "spotId": 1,
          "Spot": {
            "id": 1,
            "ownerId": 1,
            "address": "123 Disney Lane",
            "city": "San Francisco",
            "state": "California",
            "country": "United States of America",
            "lat": 37.7645358,
            "lng": -122.4730327,
            "name": "App Academy",
            "price": 123,
            "previewImage": "image url"
          },
          "userId": 2,
          "startDate": "2021-11-19",
          "endDate": "2021-11-20",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Get all Bookings for a Spot based on the Spot's id

Return all the bookings for a spot specified by id.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/spots/:spotId/bookings
  - Body: none

- Successful Response: If you ARE NOT the owner of the spot.

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Bookings": [
        {
          "spotId": 1,
          "startDate": "2021-11-19",
          "endDate": "2021-11-20"
        }
      ]
    }
    ```

- Successful Response: If you ARE the owner of the spot.

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Bookings": [
        {
          "User": {
            "id": 2,
            "firstName": "John",
            "lastName": "Smith"
          },
          "id": 1,
          "spotId": 1,
          "userId": 2,
          "startDate": "2021-11-19",
          "endDate": "2021-11-20",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

- Error response: Couldn't find a Spot with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Spot couldn't be found"
    }
    ```

### Create a Booking from a Spot based on the Spot's id

Create and return a new booking from a spot specified by id.

- Require Authentication: true
- Require proper authorization: Spot must NOT belong to the current user
- Request

  - Method: POST
  - URL: /api/spots/:spotId/bookings
  - Body:

    ```json
    {
      "startDate": "2021-11-19",
      "endDate": "2021-11-20"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "spotId": 1,
      "userId": 2,
      "startDate": "2021-11-19",
      "endDate": "2021-11-20",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }
    }
    ```

- Error response: Couldn't find a Spot with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Spot couldn't be found"
    }
    ```

- Error response: Booking conflict

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Sorry, this spot is already booked for the specified dates",
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    }
    ```

### Edit a Booking

Update and return an existing booking.

- Require Authentication: true
- Require proper authorization: Booking must belong to the current user
- Request

  - Method: PUT
  - URL: /api/bookings/:bookingId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "startDate": "2021-11-19",
      "endDate": "2021-11-20"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "spotId": 1,
      "userId": 2,
      "startDate": "2021-11-19",
      "endDate": "2021-11-20",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "endDate": "endDate cannot come before startDate"
      }
    }
    ```

- Error response: Couldn't find a Booking with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Booking couldn't be found"
    }
    ```

- Error response: Can't edit a booking that's past the end date

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Past bookings can't be modified"
    }
    ```

- Error response: Booking conflict

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Sorry, this spot is already booked for the specified dates",
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    }
    ```

### Delete a Booking

Delete an existing booking.

- Require Authentication: true
- Require proper authorization: Booking must belong to the current user or the
  Spot must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/booking/:bookingId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Booking with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Booking couldn't be found"
    }
    ```

- Error response: Bookings that have been started can't be deleted

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bookings that have been started can't be deleted"
    }
    ```
