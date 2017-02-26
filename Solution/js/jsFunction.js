window.onload = function(){
	document.getElementById("SearchBtn").addEventListener("click", function () {
		userSearch(document.getElementById("searchUserName").value);
  	});
};

function ajaxRequest (sUrl, fCallback) {
	var xhr = new XMLHttpRequest ();
	xhr.open('GET', sUrl); 
	xhr.onreadystatechange = function(){
	    if(xhr.readyState == 4) {
	        if(xhr.status == 200) {
	        	fCallback (xhr.responseText);
	        } else{
	        	// Show error section
	        	document.getElementById("errorMessage").className = "";
	        	//Reset user's fields
	        	document.getElementById("userName").textContent = "";
				document.getElementById("name").textContent = "";
				document.getElementById("bio").textContent = "";

				document.getElementById("userInfo").className = "hidden";
				document.getElementById("reposBox").className = "hidden";
			}
		}
	};
	xhr.send();
}


function reposSearch (sUser) {
	ajaxRequest('https://api.github.com/users/' + sUser + '/repos', parseRepos);	
}

function userSearch (sUser) {
	ajaxRequest('https://api.github.com/users/' + sUser, parseUser);		
}


function parseRepos (sData){
	var aRepos = JSON.parse(sData); 
	var htmlContent = "";

	for (var i = 0; i < aRepos.length; i++) {
		console.log(aRepos[i].name); 
		console.log(aRepos[i].stargazers_count);
		console.log(aRepos[i].forks_count);

		htmlContent += "<div class ='reposN' >\n";
		htmlContent += "<div style='width:60%;float:left;'>\n";
		htmlContent += "<span  style='font-weight: bold; float: left;'>"
		htmlContent += aRepos[i].name;
		htmlContent += "</span><br>\n";
		htmlContent += "</div>\n";
		htmlContent += "<div id= 'followers' style='float: left; width: 35%;'>\n";
		htmlContent += "<div style='float:right;'>\n";
		htmlContent += "<img src='images/star.svg'>\n";
		htmlContent += "<span id='star'>";
		htmlContent += aRepos[i].stargazers_count;
		htmlContent += "</span>\n";
		htmlContent += "<img src='images/repo-forked.svg'>";
		htmlContent += "<span id='fork'>";
		htmlContent += aRepos[i].forks_count;
		htmlContent += "</span>\n"
		htmlContent += "</div>" + "</div>" + "</div>";
	}

	document.getElementById('listRepos').innerHTML = htmlContent;
}

function parseUser (sData){
	var aUser = JSON.parse(sData);

	// Hide error section
	document.getElementById("searchUserName").value = ""; 	
	document.getElementById("errorMessage").className = "hidden";
	document.getElementById("userInfo").className = "";
	document.getElementById("reposBox").className = "";

	document.getElementById("avatar").src = aUser.avatar_url;
	document.getElementById("userName").textContent = "@" + aUser.login;
	document.getElementById("name").textContent = aUser.name;
	document.getElementById("bio").textContent = aUser.bio;
	reposSearch(aUser.login);
}

 