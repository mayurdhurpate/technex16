			//FROM HELLO
			// var json={
			// 			"category":[
			// 				{
			// 					"events":[
			// 						{
			// 							"intro":"bla bla bla",
			// 							"contact":"alb alb alb"
			// 						},
			// 						{
			// 							"intro":"bla bla",
			// 							"contact":"alb alb"
			// 						},
			// 						{
			// 							"intro":"bla",
			// 							"contact":"alb"
			// 						}
			// 					]
			// 				},
			// 				{
			// 					"events":[
			// 						{
			// 							"intro":"blah blah blah",
			// 							"contact":"halb halb halb"
			// 						},
			// 						{
			// 							"intro":"blah blah",
			// 							"contact":"halb halb"
			// 						}
			// 					]
			// 				}
			// 			]
			// 		};

			var json={
				"mainEvent":[
					{
						"event":"Robonex",
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

			 
			$(document).ready(function(){
				$(".events").click(function(event){set_text(event.target.id)});
			});


			function set_text(yo){
					//pr("pr1");
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

			$(document).ready(function(){
				$(".sub_e").click(function(event){
					pr("pr1");
					$('#wrapper').hide();
					$("#finalMiddle").show();
					set_text(event.target.id);
					
				});
			});

/*			var json={
						"category":[
							{
								"events":[
									{
										"intro":"bla bla bla",
										"contact":"alb alb alb",
										"balh":"blaj"
									},
									{
										"intro":"bla bla",
										"contact":"alb alb"
									},
									{
										"intro":"bla",
										"contact":"alb"
									}
								]
							},
							{
								"events":[
									{
										"intro":"blah blah blah",
										"contact":"halb halb halb"
									},
									{
										"intro":"blah blah",
										"contact":"halb halb"
									}
								]
							}
						],

						"category":[
							{
								"events":[
									{
										"intro":"bla bla bla",
										"contact":"alb alb alb"
									},
									{
										"intro":"bla bla",
										"contact":"alb alb"
									},
									{
										"intro":"bla",
										"contact":"alb"
									}
								]
							},
							{
								"events":[
									{
										"intro":"blah blah blah",
										"contact":"halb halb halb"
									},
									{
										"intro":"blah blah",
										"contact":"halb halb"
									}
								]
							}
						]
					};

			$(document).ready(function(){
				$(".events").click(function(event){set_text(event.target.id)});
			});


			function set_text(yo){
					pr1();
					//$('.events').hide();
					 var left=$('.left').index($('.backadd')[0]);
					// for(i=1;i<=json.category[left].events.length;i++){
					// 	$('#sub'+i).show();
					// }
					$('.events').removeClass('backadd');
					$('#'+yo).addClass("backadd");
					$('#sub'+yo.charAt(yo.length-1)).addClass('backadd')
					$("#finalMiddle").animate({height: '800px'});
					$("#pr1").addClass("backadd"); 
					$("#intro").html('');$("#contact").html('');
					var z=parseInt(yo.charAt(yo.length-1));
					var intro="<br>"+json.category[left].events[z-1].intro;
					var contact="<br>"+json.category[left].events[z-1].contact;
					$("#intro").append(intro);
					$("#contact").append(contact);					
			};

			

			function pr3(){
					$("#pr1").removeClass("backadd");
					$("#pr3").addClass("backadd");
					$("#intro").hide();
					$("#contact").show();
				};
			

			function pr1(){
					$("#pr3").removeClass("backadd");
					$("#pr1").addClass("backadd");
					$("#intro").show();
					$("#contact").hide();
				};
			$(document).ready(function(){
				$(".sub_e").click(function(event){
					pr1();
					$('#wrapper').hide();
					$("#finalMiddle").show();
					set_text(event.target.id);
					
				});
			});

			$(document).ready(function(){
				$("#pr3").click(pr3);

			$(document).ready(function(){
				$("#pr1").click(pr1);
			});
		});
*/