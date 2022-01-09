# 21-16-Explore-Safe
<p align="center">
  <img src="https://github.com/BostonUniversitySeniorDesign/21-16-Explore-Safe/blob/master/ExploreSafe/Logos/mainLogo.png" width="250">
</p>

## Overview
While nature is beautiful to explore, it can also be unpredictable and dangerous for the inexperienced hiker. Having the knowledge to stay safe in the wilderness is key to preventing injuries and casualties, but it can be hard for potential explorers to know what to know. ExploreSafe is a cross-platform mobile application designed using React Native to help nature explorers—particularly those without experience—plan and execute hiking trips safely. The app consists of a number of different ‘pages’ which implement different functionality. Users are able to: 

* Create, customize an account, and edit their account information - Profile page
* Search for fun new hiking locations near them and save the information for their trip - Planning page
* Learn more about their hiking destination and what they are recommended to bring with them on their next adventure - Details page
* As they explore, drop pins down, name and explain them to warn other users of threats or notable features on certain paths - Maps page
* Learn about their surroundings by taking photos of interesting plants and get species predictions, with confidence level and indication of dangerous plants - Smart Camera page
* Let others know what they thought about their latest trip or read about what others have said before - Reviews page 

A selection of the pages in the app are displayed below to visualise the a few of the mentioned features:

| ![](https://github.com/hmao1/BostonUniveristy-SeniorDesignProject-ExploreSafe/blob/main/UIPics/Login.png) |  <img src="https://github.com/hmao1/BostonUniveristy-SeniorDesignProject-ExploreSafe/blob/main/UIPics/Home.jpg" width="700" />|![](https://github.com/hmao1/BostonUniveristy-SeniorDesignProject-ExploreSafe/blob/main/UIPics/Planning.png) | ![](https://github.com/hmao1/BostonUniveristy-SeniorDesignProject-ExploreSafe/blob/main/UIPics/Details.png) | ![](https://github.com/hmao1/BostonUniveristy-SeniorDesignProject-ExploreSafe/blob/main/UIPics/SmartCam.jpg) |![](https://github.com/hmao1/BostonUniveristy-SeniorDesignProject-ExploreSafe/blob/main/UIPics/Map.png) | 
|:---:|:---:|:---:|:---:|:---:|:---:|
| Login | Home | Planning | Details | Smart Camera|Map |


## Technologies

ExploreSafe was created using the following main technologies:

* React Native CLI 
* Firebase Realtime Database 
* SQLite Local Database 
* Tensorflow Lite

## State of the project:
Currently, the project is compatible with both Android and iOS, with the same functionality displayed across both platforms. The health page, which was intended to integrate statistics from a users smart watch, is currently unfinished. If the user clicks the button to travel to this page, they receive a message stating that it is not available at this time. However, there is an existing .js file within the screens folder of the project where work on this page was being done. There is also a settings button on the home page that currently does not work and has no functionality. There is no corresponding page for this functionality, as we did not begin work on this. With the exception of those, the other buttons on the home page leads to their corresponding pages, which work as previously explained. There is no further incomplete work in our project repo. 

Our project scope in terms of the information provided by the app is focused on the New England area at the moment, with users able to plan trips and find information about this area only. However, the framework is there to add support for a greater area, as additional trips can be added to the database to be searched and saved by the user. 

The most up-to-date code is in the master branch, along with a copy of our reports from the semester and documentation on our project software. The remaining branches were used by individual members of the team for different features that were being worked on. The compatibility branch was used when merging individual members branches together to test compatibility with both iOS and Android before committing it to the master branch. 

## Look Out For:

When developing, work that is done on one platform (for example, iOS) may not immediately be compatible when run on Android. Ensure that necessary packages that are installed by a developer using one platform can also be used and installed correctly on the other platform to minimize issues caused by this. If you are trying to use the SmartCamera feature in our app, please do not run it on the emulator. The emulator does not have the correct capabilities to run that feature, as it is unable to use a camera to display anything other than a black screen, so ensure that you use a physical device to run that feature. 

It is also helpful to note that our packages are not all the most recent versions, and they may not be compatible with the current version of our app. This is important to consider when updating the project, as it may cause build failures. If you do try to update these package versions just make sure that you update all the packages uniformly or the app will not launch/work properly. 

A machine with sufficient computing power is required to train the image recognition model used in the app. If this is not done, the training will most likely crash before completion after a few days. A computer with a decent GPU will likely work. If necessary, the Jupyter Notebook can be used as a python script on a computing cluster such as BU’s SCC.

Keeping versions in mind, I think one issue that we faced during our app development was outdated packages. React Native has been around for a while now and so there are plenty of packages that are available on the web for a variety of different applications. However, we found that many of them can be easily incompatible with React Native because of how old they are. We found that usually that happens because React Native can be very nitpicky about versions. Plus finding a more updated version will be hard because many of these packages are developed by fellow React Native users. 

Our app currently depends on two API keys which are not included in this github repo for security reasons. If attempting to work on this project, developers must get their own OpenWeather API key and Google Maps API key and add these in the appropriate location in order for the project to function properly. They should also ensure that the API keys are shared with any other team members who may work on the project, but not specifically with those APIs, as this is still necessary. 

The user interface of our app is designed using the colours with the corresponding hex codes pictured below. These are also the colours used for our logo, and will help to ensure that the application UI looks uniform throughout development. 

<p align="center">
 <img src="https://github.com/hmao1/BostonUniveristy-SeniorDesignProject-ExploreSafe/blob/main/UIPics/colourScheme.PNG" width="500" />
  </p>
 
## Created By
Carlos Eduardo Lousan Padilha \
Hongcheng Mao \
Neha Rai \
Steven Tong \
Mohammed Alsoughayer 

