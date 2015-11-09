			var json={
				"mainEvent":[
					{
						"event":"Robonex",
						"intro":"intro of Robonex",
						"subEvent":[
							{
								"name":"Robowars",
								"mem":"5",
								"data":[
									{
										"intro":"abc",
										"contact":"123",
										"judging":"ABC"
									}
								]
							},

							{
								"name":"Pixelate",
								"mem":"4",
								"data":[
									{
										"intro":"efg",
										"contact":"456",
										"rules":"lol"
									}
								]
							}
						]
					},
					{
						"event":"Extreme Engineering",
						"intro":"intro of ee",
						"subEvent":[
							{
								"name":"Bridge It",
								"mem":"6",
								"data":[
									{
										"intro":"hij",
										"contact":"789"
									}
								]
							},
							{
								"name":"abc",
								"mem":"6",
								"data":[
									{
										"intro":"mno",
										"contact":"111"
									}
								]
							}
						]
					}

				]
			};


			function set_category(id){
				$("#main_ul").html("<ul id='side_ul' style='left: 200px; top: 0;'>");
				var pos=parseInt((id).charAt(4));
				$('#category_intro').text(json.mainEvent[pos].intro);
				$('#category_name').text(json.mainEvent[pos].event);
				var length=json.mainEvent[pos].subEvent.length;
				var half=Math.round(length/2);
				for(var i=0;i<length;i++){
					if(i<half){
						$("#main_ul").append("<li id='e_"+i+"' class='sub_e'></li>");
						$("#e_"+i).text(json.mainEvent[pos].subEvent[i].name);
					}else{
						$("#side_ul").append("<li id='e_"+i+"' class='sub_e'></li>");
						$("#e_"+i).text(json.mainEvent[pos].subEvent[i].name);
					};

				};

				$(".sub_e").click(function(event){
					sub_click(event.target.id);
				});
			};

			function function1(name){
				setTimeout(function(){
				var pos=$(".left").index($(".backadd")[0]);
				//var name=$(".backadd").attr("id");
				//switch(pos){
					//case 0:
					$("#icons").css("background",'url(static/css/images/'+name+'.png) no-repeat center');//break;
					// case 1:icons.css("background",'url(static/css/images/'+name+'.png) no-repeat center');break;
					// case 2:icons.css("background",'url(static/css/images/'+name+'.png) no-repeat center');break;
					// case 3:icons.css("background",'url(static/css/images/'+name+'.png) no-repeat center');break;
					// case 4:icons.css("background",'url(static/css/images/'+name+'.png) no-repeat center');break;
					// case 5:icons.css("background",'url(static/css/images/'+name+'.png) no-repeat center');break;
					// case 6:icons.css("background",'url(static/css/images/'+name+'.png) no-repeat center');break;
					// case 7:icons.css("background",'url(static/css/images/'+name+'.png) no-repeat center');break;
					// case 8:icons.css("background",'url(static/css/images/'+name+'.png) no-repeat center');break;
					// case 9:icons.css("background",'url(static/css/images/'+name+'.png) no-repeat center');break;}
				},1);
				

			};

			$(document).ready(function(){
				set_category("item0");
			});


			$(document).ready(function(){
				$(".left").click(function(event){
					$('.MiddleElement1').css('display','block');
					function1(event.target.id);
					set_category(event.target.id)});
			})
			 
			$(document).ready(function(){
				$(".events").click(function(event){set_text(event.target.id)});
			});


			function set_text(yo){
					var left=$('.left').index($('.backadd')[0]);
					$('.events').removeClass('backadd');
					$('#'+yo).addClass("backadd");
					$('#sub'+yo.charAt(yo.length-1)).addClass('backadd')
					$("#finalMiddle").animate({height: '800px'});
					$("#pr1_").html('');$("#pr2_").html('');$("#last_ul").html('');$("#finalMiddle").html('');
					var z=parseInt(yo.charAt(yo.length-1));
					var keys=Object.keys(json.mainEvent[left].subEvent[z-1].data[0]);
					li(keys);
					$("#pr1").addClass("backadd"); 
					div(keys,left,z);
					$('#pr1_').show();
			};

			function div(keys,left,z){
				for(var i=1;i<=keys.length;i++){
					$('#finalMiddle').append("<div id='pr"+i+"_' class='pr_data' style='display:none'></div>");
					var x=json.mainEvent[left].subEvent[z-1].data[0][keys[i-1]];
					$("#pr"+i+"_").append("<br>"+x);
				}
			}

			function subs(){
				$('#sub_ul').html('');
				var left=$('.left').index($('.backadd')[0]);
				var length=json.mainEvent[left].subEvent.length;
				console.log("subs "+length);
				for(var i=1;i<=length;i++){
					$('#sub_ul').append("<li id='sub"+i+"' class='events'></li>");
					$('#sub'+i).text(json.mainEvent[left].subEvent[i-1].name);
				};
				$(".events").click(function(event){set_text(event.target.id)});
				
			}

			function li(keys){

				for(var i=1;i<=keys.length;i++){
					$("#last_ul").append("<li class='pr' id='pr"+i+"'></li>");
					$("#pr"+i).text(keys[i-1]);
				};
				console.log('li');
				$(".pr").click(function(event){pr(event.target.id);});
			}

			function pr(sup){
					$(".pr").removeClass("backadd");
					$(".pr_data").hide();
					$("#"+sup+"_").show();
					$('#'+sup).addClass('backadd');
				};

			// $(document).ready(function(){
			// 	$(".sub_e").click(function(event){
			// 		sub_click(event.target.id);
			// 	});
			// });

			function sub_click(id){
				pr("pr1");
				$("#LastElement").show();
				$("#LastElement").animate({left: '78%'});
				$('#wrapper').hide();
				$("#finalMiddle").show();
				$("#LeftElement").hide("fast");
				$("#middle").show();
				$("#middle").animate({left: '-41px'});
				set_text(id);
				subs();
				$('#sub'+parseInt(id.charAt(id.length-1))).addClass("backadd");
				console.log();
			};

			$(document).ready(function(){
				$("#back").click(function(){
					var x=$('.left').index($('.backadd')[0]);
					var id=$('.backadd').attr('id');
					$('.left').removeClass('backadd');
					$('#'+id).addClass('backadd');
					$("#LastElement").animate({left: '1400px'});
					$("#LastElement").hide();
					$("#middle").hide();
					$("#middle").animate({left: '-800px'});
					$("#LeftElement").show();
					$("#events").show();
					$("#finalMiddle").animate({height: '0px'}, "fast");
					$("#finalMiddle h2").hide("fast");
					$("#finalMiddle").hide();
					$('#wrapper').show();
					$('#intro').html("");
					$('#contact').html("");
					$('#intro').hide();
					$('#contact').hide();
					for(i=1;i<8;i++){
						$('#sub'+i).text('');
						$('#sub'+i).show();
						$('#sub'+i).removeClass('backadd check10');
					}
				});
			});