# ComposablesAssessment
This is my second assessment for MYCURE which was completed at April 5, 2025 12:00AM. The BFF backend for my first assessment has already been improved by me after the feedback from the first assessment, and I made a pull request for it in the repository. Here is the link for my pull request for my updated BFF backend: https://github.com/mycurelabs/monorepo/pull/1245/commits/9242eaa6df601d780218edf6c13f1ecb1953faa8 


## Rationale for several arguments in the useAuth() composable
This is my final version for the assessment, improved based on the previous discussions. All watchers have been removed, and functions inside my main composable functions were created.

The reason why useAuth() composable function has many arguments is to update certain UI elements of the app. For ex., logging in with or without an access token can mean the difference when you search your own profile which was unpublished (or hidden, like in Instagram). accessToken is also updated, and the updates for isPublished variable enables the UI to display the publish or unpublish button, depending on if the personal-details entity related to the queriedUser entity has an 'unpublished' string inside it.
