# GDEM Error Realization Data Portal 
*A portal for downloading SRTM and ASTER GDEM data and error realizations.  Project funded by the National Geospatial-Intelligence Agency (NGA) and conducted in partnership with Dr. Ashton Shortridge and Dr. Joe Messina of Michigan State University. All web-related code is written by Nicholas Ronnei.*

## Background
The project centers on the use of open GDEM datasets such as those from SRTM and ASTER for important geospatial modeling such as watershed deliniation, floodplain modeling, and erosion control planning to name a few.  The error inherent in these datasets is not random - it is spatially structured ([Shortridge, A. & Messina, J., 2011][1]).  Statistical modeling of the relationships between various landscape and data charateristics reveals that error in these datasets can be predicted.  The goal of this project is to make these predictions available to the public so that they may be used in research.

## Current Progress
At the time of writing (9/3/2015), the project is in its early stages.  This GitHub Repo will contain only the front-end work for the time being.  The back-end is finished, but only in a prototype state.  When the time comes to rewrite the backend to reflect the ultimate form of our application, the whole project will move to GitHub.  Currently, we are working on implementing a responsive, intuitive front-end using Material Design so that it will work with any modern browser on any device.  We are in the earliest stages, but plan to have a usable prototype within the next two weeks.

## Plans
Ultimately, this project will be realized as a server side application running on the Express framework that uses Mapbox JS/Turf for the front-end interface, Express as the middleware, and tilestrata, Mapnik, and Postgres/PostGIS as the back-end.  Users will be able to draw a bounding box around or enter the bounding coordinates of their area of study, then recieve options to download standard GDEM data, error realizations, and maybe even more?  The timeline for this is on the order of one year, but in reality unknown.

### References
[1]: http://www.scopus.com/record/display.url?eid=2-s2.0-79953172857&origin=inward&txGid=5A18DE0C5E43C7B2354634EB15DCB820.aqHV0EoE4xlIF3hgVWgA%3a9
