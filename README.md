# STT Services comparator


The idea was to do a review of stt services and figure out a programmatic way to compare their output to give them a score and establish who is best. 

But what would be better then this? Having a system that can generate such report, to keep up to date with latest changes.


Electron app, that generates/updates a jeckyll site. in `docs` folder so that can be deploied on github pages. using the `/data` folder. adds results/report in data folder, and jeckyll site uses the report to generate a human friendly redable report. 

This way it is extensible. it should be easier to fork and add a new service to the mix. 


Idea is to have a settings panel where user can add credential to various services. 

credentials saved in user local library so never risk of push. 


It needs a video or audio file and the accurate human transcription as starting point.


core of the app calls the services, receives the jsons, saves them so that the schema of those jsons can be showed. 
extract text from responses, this needs to costumised on a case by case basis. 

Uses Mark hyperaudio transcription comparison app (?name?) component to rank. 


packages this info into a report. 

Hopefully this a sensible way to help in the decision of which stt to use for next project, with the most up to date info for each stt service. 