			var json={
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
