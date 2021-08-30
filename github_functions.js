'use strict';
const request = require("request-promise");
const fs = require('fs');

/*
1. Get commits done in that day
2. For each commit get sha of the commit, fetch the commit
    2.1 For each file in the commit check if the file is in LeetcodeSolutions folder
    if so fetch that file and send to client
*/
async function getLeetcode(req,res){
  let date = "2021-08-29";
  let filepaths = [];
  if(!!fs.existsSync(date))
    fs.mkdirSync("LeetcodeSolutions/"+ date);
  
  let commits = await getDayCommits("2021-08-29T00:00:01Z");
  
  Promise.all(commits.map(async (commit) => {
    getFilesInCommit(commit).then((filepaths) => 
    Promise.all(filepaths.map(async (filepath) => {
      await downloadFile(filepath,date);
    })));
    
  }));
}

//Solve async issues
async function getDayCommits(date){
  var url = 'https://api.github.com/repos/efeberkeevci/technical_interview_prep/commits?since=' + date;
  var commits = [];

  var options = {
    uri: url,
    json: true,
    headers: {'User-Agent': 'request',"Authorization": "Bearer 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"
  },
    
  } 

  try {
      var data = await request(options);
      data.forEach(commit => {
        commits.push(commit.sha);
    });
    return commits;
  } catch (err) {
      console.error(err);
  }

}

async function getFilesInCommit(commit_id){
    var url = "https://api.github.com/repos/efeberkeevci/technical_interview_prep/commits/" + commit_id;
    var files = [];

    var options = {
      uri: url,
      json: true,
      headers: {'User-Agent': 'request',"Authorization": "Bearer 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"}

    } 
  
    try {
        var data = await request(options);
        // data is already parsed as JSON:
        data.files.forEach( file=> {
          if(file.filename.startsWith("Leetcode"))
            files.push(file.filename)
        });
      return files;
    } catch (err) {
        console.error(err);
    }

}

async function downloadFile(filepath, date){
    var url = "https://raw.githubusercontent.com/efeberkeevci/technical_interview_prep/main/"+ filepath;
    var options = {
      uri: url,
      json: false,
      headers: {'User-Agent': 'request',"Authorization": "Bearer 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"}

    } 
  
    try {
        var data = await request(options);
        if (!fs.existsSync(filepath)) {
          fs.writeFile(filepath, data, function (err) {
            if (err) throw err;
            console.log('Saved!');
          }); 
        }else{
          console.log("exists");
        }
        return;
    } catch (err) {
        console.error(err);
    }
    
}
module.exports = { getLeetcode};
