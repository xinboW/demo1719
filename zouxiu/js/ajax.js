function ajaxPost(url,data=null){
	var promise = new Promise(function(success,faild){
		var ajax = new XMLHttpRequest();
		ajax.open("POST",url,true);
		data ? ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded") : "";
		ajax.send(data);
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				success(ajax.responseText);
			}
		}
	})
	return promise;
}

function ajaxGet(url){
	var promise = new Promise(function(success,failed){
			var ajax = new XMLHttpRequest();
			ajax.open("GET",url,true);
			ajax.send(null);
			ajax.onreadystatechange = function(){
				if(ajax.readyState == 4 && ajax.status == 200){
					success(ajax.responseText);
				}
			}
	})	
	return promise;
}

function jsonp(url){
	var promise = new Promise(function(success,failed){
		window.callback = function(res){
			success(res);
		}
		var script = document.createElement("script");
		script.src = url;
		document.body.appendChild(script)
	})
	return promise;
}